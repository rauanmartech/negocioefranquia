import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

async function DashboardContent() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      createdAt: true,
      author: { select: { name: true } },
      category: { select: { name: true } },
    },
  });

  const statusLabel: Record<string, { label: string; classes: string }> = {
    PUBLISHED: { label: "Publicado", classes: "bg-green-100 text-green-800" },
    DRAFT: { label: "Rascunho", classes: "bg-yellow-100 text-yellow-800" },
    REVIEW: { label: "Em Revisão", classes: "bg-blue-100 text-blue-800" },
    SCHEDULED: { label: "Agendado", classes: "bg-purple-100 text-purple-800" },
    ARCHIVED: { label: "Arquivado", classes: "bg-gray-100 text-gray-700" },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-2">
            <p className="font-medium">Nenhuma notícia encontrada.</p>
            <p className="text-sm">Comece criando a primeira notícia!</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                <th className="p-4 font-medium">Título</th>
                <th className="p-4 font-medium w-32 hidden md:table-cell">Autor</th>
                <th className="p-4 font-medium w-32">Status</th>
                <th className="p-4 font-medium w-36 hidden lg:table-cell">Data</th>
                <th className="p-4 font-medium w-24 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((post) => {
                const s = statusLabel[post.status] ?? { label: post.status, classes: "bg-gray-100 text-gray-700" };
                return (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{post.title}</div>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">/{post.slug}</div>
                      <div className="text-xs text-gray-500 mt-0.5 md:hidden">{post.author.name} · {post.category.name}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600 hidden md:table-cell">
                      <div>{post.author.name}</div>
                      <div className="text-xs text-gray-400">{post.category.name}</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${s.classes}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600 hidden lg:table-cell">
                      {new Date(post.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4 text-right space-x-1">
                      <Link
                        href={`/nef-admin/edit/${post.id}`}
                        className="inline-flex items-center p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <Link
                        href={`/nef-admin/posts/${post.id}/delete`}
                        className="inline-flex items-center p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Notícias</h1>
        <Link
          href="/nef-admin/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus size={18} />
          Nova Notícia
        </Link>
      </div>
      <Suspense fallback={<div className="p-12 text-center text-gray-500">Carregando notícias...</div>}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
