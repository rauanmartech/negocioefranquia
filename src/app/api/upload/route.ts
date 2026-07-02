import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // 1. Verificar autenticação
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "news-images";
    const folder = (formData.get("folder") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validações
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // 2. Gerar nome único e path
    const ext = file.type === "image/webp" ? "webp" : file.name.split(".").pop() ?? "bin";
    const filename = `${crypto.randomUUID()}.${ext}`;
    const storagePath = folder ? `${folder}/${filename}` : filename;

    // 3. Upload para Supabase Storage usando o client autenticado
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(storagePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("[upload] Supabase Storage error:", uploadError);
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // 4. Obter URL pública
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(storagePath);

    const publicUrl = urlData.publicUrl;

    // 5. Buscar o user interno no Prisma (pelo supabaseId)
    const internalUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
      select: { id: true },
    }).catch(() => null);

    // 6. Registrar na tabela media do Prisma
    const media = await prisma.media.create({
      data: {
        filename,
        originalName: file.name,
        bucket,
        path: storagePath,
        url: publicUrl,
        mime: file.type,
        extension: ext,
        size: file.size,
        type: "IMAGE",
        ...(internalUser ? { uploadedById: internalUser.id } : {}),
      },
    });

    return NextResponse.json({
      id: media.id,
      url: publicUrl,
      filename,
      path: storagePath,
      bucket,
      size: file.size,
      mime: file.type,
    });
  } catch (error: any) {
    console.error("[upload] Unexpected error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
