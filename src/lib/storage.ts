/**
 * Supabase Storage Helper
 *
 * Centraliza toda a comunicação com o Supabase Storage.
 * Todas as imagens e arquivos do portal são armazenados aqui.
 *
 * Buckets esperados no Supabase Storage:
 *   - "media"    → imagens e arquivos de notícias/posts
 *   - "avatars"  → fotos de autores e usuários
 *   - "assets"   → logo, favicon, imagens de configuração
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Client com service_role para operações de upload (server-side apenas)
// Na produção, use SUPABASE_SERVICE_ROLE_KEY para uploads autenticados
const supabase = createClient(supabaseUrl, supabaseKey);

export type StorageBucket = 'media' | 'avatars' | 'assets';

// ─── Upload ───────────────────────────────────────────────────────────────────

export interface UploadResult {
  filename: string;
  path: string;
  bucket: StorageBucket;
  url: string;
  size: number;
  mime: string;
}

export async function uploadFile(
  file: File | Blob,
  bucket: StorageBucket,
  folder: string = ''
): Promise<UploadResult> {
  const ext = file instanceof File
    ? file.name.split('.').pop() ?? 'bin'
    : 'bin';

  const filename = `${crypto.randomUUID()}.${ext}`;
  const path = folder ? `${folder}/${filename}` : filename;
  const mime = file.type || 'application/octet-stream';

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      contentType: mime,
      upsert: false,
    });

  if (error) {
    throw new Error(`Supabase Storage upload failed: ${error.message}`);
  }

  const url = getPublicUrl(bucket, path);

  return {
    filename,
    path,
    bucket,
    url,
    size: file.size,
    mime,
  };
}

// ─── URL Pública ──────────────────────────────────────────────────────────────

export function getPublicUrl(bucket: StorageBucket, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteFile(
  bucket: StorageBucket,
  path: string
): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) {
    throw new Error(`Supabase Storage delete failed: ${error.message}`);
  }
}

// ─── List ─────────────────────────────────────────────────────────────────────

export async function listFiles(
  bucket: StorageBucket,
  folder: string = ''
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder, { sortBy: { column: 'created_at', order: 'desc' } });

  if (error) {
    throw new Error(`Supabase Storage list failed: ${error.message}`);
  }

  return data ?? [];
}
