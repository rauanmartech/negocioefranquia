"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Search, Trash2, Copy, Eye, X, Loader2, ImageOff, RefreshCw, Upload,
} from "lucide-react";
import ImageUploader from "./ImageUploader";

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  mime: string;
  size: number;
  width: number | null;
  height: number | null;
  createdAt: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<MediaItem | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchMedia = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "40",
        ...(search ? { search } : {}),
      });
      const res = await fetch(`/api/media?${params}`);
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to load media: ${res.status} - ${errText}`);
      }
      const data = await res.json();
      setItems(data.items);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  useEffect(() => { fetchMedia(); }, [fetchMedia]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 400);
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Deletar "${item.originalName}"? Esta ação não pode ser desfeita.`)) return;
    setDeleting(item.id);
    try {
      const res = await fetch(`/api/media/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      setTotal((t) => t - 1);
      if (preview?.id === item.id) setPreview(null);
    } catch (err) {
      alert("Erro ao deletar arquivo.");
    } finally {
      setDeleting(null);
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleUploadComplete = (url: string) => {
    setShowUpload(false);
    fetchMedia();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Biblioteca de Mídia</h1>
          <p className="text-sm text-gray-500 mt-1">{total} arquivo{total !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchMedia}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={15} />
            Atualizar
          </button>
          <button
            onClick={() => setShowUpload((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Upload size={15} />
            Upload
          </button>
        </div>
      </div>

      {/* Upload inline */}
      {showUpload && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Enviar nova imagem</h2>
          <ImageUploader
            onUpload={handleUploadComplete}
            bucket="news-images"
            folder="media"
            label="Nova mídia"
          />
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nome de arquivo..."
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 size={28} className="animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <ImageOff size={40} />
          <p className="text-sm">{search ? "Nenhum arquivo encontrado." : "Nenhuma mídia ainda. Faça o primeiro upload!"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 hover:shadow-md transition-all"
            >
              {/* Thumbnail */}
              <div
                className="aspect-square bg-gray-100 cursor-pointer"
                onClick={() => setPreview(item)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.originalName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-2">
                <p className="text-xs text-gray-700 truncate font-medium" title={item.originalName}>
                  {item.originalName}
                </p>
                <p className="text-xs text-gray-400">{formatBytes(item.size)}</p>
              </div>

              {/* Actions overlay */}
              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setPreview(item)}
                  className="p-1.5 bg-white rounded shadow text-gray-600 hover:text-blue-600 transition-colors"
                  title="Visualizar"
                >
                  <Eye size={13} />
                </button>
                <button
                  onClick={() => handleCopy(item.url, item.id)}
                  className="p-1.5 bg-white rounded shadow text-gray-600 hover:text-green-600 transition-colors"
                  title={copied === item.id ? "Copiado!" : "Copiar URL"}
                >
                  {copied === item.id ? (
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  ) : (
                    <Copy size={13} />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  disabled={deleting === item.id}
                  className="p-1.5 bg-white rounded shadow text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
                  title="Deletar"
                >
                  {deleting === item.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-600">
            Página {page} de {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Próxima
          </button>
        </div>
      )}

      {/* Modal de preview */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="bg-white rounded-xl overflow-hidden max-w-3xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 text-sm truncate">{preview.originalName}</h3>
              <button onClick={() => setPreview(null)} className="text-gray-400 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="bg-gray-100 flex items-center justify-center max-h-[60vh] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview.url} alt={preview.originalName} className="max-w-full max-h-[60vh] object-contain" />
            </div>

            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div><span className="font-medium">Tamanho:</span> {formatBytes(preview.size)}</div>
                <div><span className="font-medium">Tipo:</span> {preview.mime}</div>
                {preview.width && <div><span className="font-medium">Dimensões:</span> {preview.width} × {preview.height}px</div>}
                <div><span className="font-medium">Enviado em:</span> {new Date(preview.createdAt).toLocaleDateString("pt-BR")}</div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={preview.url}
                  className="flex-1 text-xs px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600 font-mono"
                />
                <button
                  onClick={() => handleCopy(preview.url, preview.id)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  {copied === preview.id ? "Copiado!" : <><Copy size={13} /> Copiar URL</>}
                </button>
                <button
                  onClick={() => handleDelete(preview)}
                  disabled={deleting === preview.id}
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {deleting === preview.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
