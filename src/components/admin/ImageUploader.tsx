"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
  onRemove?: () => void;
  bucket?: string;
  folder?: string;
  label?: string;
}

// ─── Otimização via Canvas API ─────────────────────────────────────────────────
async function optimizeImage(file: File): Promise<Blob> {
  const MAX_WIDTH = 1600;
  const QUALITY = 0.8;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      // Calcular dimensões mantendo aspect ratio
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        height = Math.round((height * MAX_WIDTH) / width);
        width = MAX_WIDTH;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas not supported"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to convert image"));
            return;
          }
          resolve(blob);
        },
        "image/webp",
        QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function ImageUploader({
  onUpload,
  currentUrl,
  onRemove,
  bucket = "news-images",
  folder = "",
  label = "Imagem",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Apenas imagens são permitidas.");
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      // 1. Otimizar no cliente
      setUploadProgress("Otimizando imagem...");
      const optimized = await optimizeImage(file);

      // 2. Criar FormData
      const formData = new FormData();
      formData.append("file", new File([optimized], `${crypto.randomUUID()}.webp`, { type: "image/webp" }));
      formData.append("bucket", bucket);
      if (folder) formData.append("folder", folder);

      // 3. Enviar para a API
      setUploadProgress("Enviando...");
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload falhou");
      }

      const data = await res.json();
      onUpload(data.url);
    } catch (err: any) {
      setError(err.message || "Erro no upload");
    } finally {
      setIsUploading(false);
      setUploadProgress("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset input para permitir re-upload do mesmo arquivo
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  if (currentUrl) {
    return (
      <div className="relative rounded-lg overflow-hidden border border-gray-200 aspect-video bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={currentUrl} alt={label} className="w-full h-full object-cover" />
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-md hover:bg-red-700 transition-colors shadow-md"
            title="Remover imagem"
          >
            <X size={14} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !isUploading && inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-2 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragging
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        } ${isUploading ? "pointer-events-none opacity-70" : ""}`}
      >
        {isUploading ? (
          <>
            <Loader2 size={24} className="text-blue-500 animate-spin" />
            <span className="text-sm text-gray-500">{uploadProgress}</span>
          </>
        ) : (
          <>
            <Upload size={24} className="text-gray-400" />
            <div className="text-center">
              <span className="text-sm font-medium text-blue-600">Clique para enviar</span>
              <span className="text-sm text-gray-500"> ou arraste aqui</span>
            </div>
            <p className="text-xs text-gray-400">PNG, JPG, WebP — max 10MB (otimizado automaticamente)</p>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <X size={12} /> {error}
        </p>
      )}
    </div>
  );
}
