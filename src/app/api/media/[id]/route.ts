import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// DELETE /api/media/[id] — deleta do Storage + banco
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Buscar registro no banco
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) {
    return NextResponse.json({ error: "Media not found" }, { status: 404 });
  }

  // Deletar do Supabase Storage
  const { error: storageError } = await supabase.storage
    .from(media.bucket)
    .remove([media.path]);

  if (storageError) {
    console.error("[media/delete] Storage error:", storageError);
    // Continua mesmo com erro no storage para limpar o banco
  }

  // Deletar do banco
  await prisma.media.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
