/**
 * Prisma Seed — Negócio & Franquia
 *
 * Popula o banco com os dados iniciais obrigatórios:
 *   - 11 categorias editoriais
 *   - 1 linha de configurações globais (singleton)
 *   - 1 usuário administrador placeholder (vinculado ao Supabase Auth)
 *
 * Executar com: npx prisma db seed
 */

import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // ─── Categorias ────────────────────────────────────────────────────────────
  const categories = [
    { name: 'Franquias',         slug: 'franquias',             color: '#E63946', order: 1 },
    { name: 'Gestão',            slug: 'gestao',                color: '#457B9D', order: 2 },
    { name: 'Mercado',           slug: 'mercado',               color: '#1D3557', order: 3 },
    { name: 'Negócios',          slug: 'negocios',              color: '#2D6A4F', order: 4 },
    { name: 'Shopping Centers',  slug: 'shoppings',             color: '#F4A261', order: 5 },
    { name: 'Varejo',            slug: 'varejo',                color: '#E76F51', order: 6 },
    { name: 'N&F Play',          slug: 'nef-play',              color: '#6A0572', order: 7 },
    { name: 'Na Lata',           slug: 'na-lata',               color: '#D62828', order: 8 },
    { name: 'Especiais',         slug: 'especiais',             color: '#023E8A', order: 9 },
    { name: 'Artigos',           slug: 'artigos',               color: '#4A4E69', order: 10 },
    { name: 'Eventos',           slug: 'eventos',               color: '#588157', order: 11 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, color: cat.color, order: cat.order },
      create: { ...cat, active: true },
    });
    console.log(`  ✓ Categoria: ${cat.name}`);
  }

  // ─── Settings (singleton) ──────────────────────────────────────────────────
  const settingsCount = await prisma.setting.count();
  if (settingsCount === 0) {
    await prisma.setting.create({
      data: {
        siteName: 'Negócio & Franquia',
        siteDescription: 'O ecossistema de inteligência em franquias, varejo e shopping centers.',
        siteUrl: 'https://negocioefranquia.com.br',
        defaultSeoTitle: 'Negócio & Franquia — Franquias, Varejo e Shopping Centers',
        defaultSeoDescription: 'Conteúdo, mídia e relacionamento para os mercados de franquias, varejo e shopping centers.',
      },
    });
    console.log('  ✓ Configurações globais criadas');
  } else {
    console.log('  ↷ Configurações globais já existem, pulando...');
  }

  // ─── Admin placeholder ────────────────────────────────────────────────────
  // O supabaseId real deve ser preenchido após criar o usuário no Supabase Auth.
  const adminExists = await prisma.user.findFirst({
    where: { email: 'admin@negocioefranquia.com.br' },
  });

  if (!adminExists) {
    await prisma.user.create({
      data: {
        supabaseId: 'PENDING_SUPABASE_AUTH_ID', // Substituir pelo UUID do Supabase Auth
        name: 'Administrador',
        email: 'admin@negocioefranquia.com.br',
        role: UserRole.ADMIN,
        active: true,
      },
    });
    console.log('  ✓ Admin placeholder criado');
    console.log('  ⚠ Lembre-se: atualize o supabaseId após criar o usuário no Supabase Auth!');
  } else {
    console.log('  ↷ Admin já existe, pulando...');
  }

  console.log('\n✅ Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Seed falhou:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
