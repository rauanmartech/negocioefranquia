// ─── Dados estáticos da área Especiais ───────────────────────────────────────
// A listagem do hub é controlada aqui, no frontend.
// O conteúdo interno de cada edição poderá vir do WordPress futuramente.

export type StatusEspecial = 'publicado' | 'em_breve' | 'encerrado';

export type ProjetoEspecial = {
  slug: string;
  nome: string;
  descricao: string;
  edicaoAtual: string | null;  // ex: "2025" | null se em_breve
  status: StatusEspecial;
  corFundo: string;            // cor CSS do bloco visual do card
  corTexto: string;            // cor do numeral/texto no bloco visual
  categoria: string;           // ex: "Rankings", "Perfis", "Publicações"
};

export const PROJETOS_ESPECIAIS: ProjetoEspecial[] = [
  {
    slug: 'ranking-franquias',
    nome: 'Ranking das Franquias',
    descricao: 'As franquias que mais cresceram, inovaram e geraram resultados no Brasil.',
    edicaoAtual: null,
    status: 'em_breve',
    corFundo: '#0E2340',
    corTexto: '#0E4D7A',
    categoria: 'Rankings',
  },
  {
    slug: 'lideres-franchising',
    nome: 'Líderes do Franchising',
    descricao: 'Perfis dos executivos e empreendedores que definem os rumos do setor.',
    edicaoAtual: null,
    status: 'em_breve',
    corFundo: '#0E4D7A',
    corTexto: '#5E97D1',
    categoria: 'Perfis',
  },
  {
    slug: 'mulheres-varejo',
    nome: 'Mulheres do Varejo',
    descricao: 'As lideranças femininas que transformam o varejo e o franchising brasileiro.',
    edicaoAtual: null,
    status: 'em_breve',
    corFundo: '#1A3A5C',
    corTexto: '#5E97D1',
    categoria: 'Perfis',
  },
  {
    slug: 'lideres-shopping-centers',
    nome: 'Líderes dos Shopping Centers',
    descricao: 'Os gestores e executivos que lideram os maiores shoppings do país.',
    edicaoAtual: null,
    status: 'em_breve',
    corFundo: '#1F2937',
    corTexto: '#5E97D1',
    categoria: 'Perfis',
  },
  {
    slug: 'franquias-que-crescem',
    nome: 'Franquias que Crescem',
    descricao: 'Redes em expansão acelerada: estratégias, modelos e resultados.',
    edicaoAtual: null,
    status: 'em_breve',
    corFundo: '#2E6DAF',
    corTexto: '#fff',
    categoria: 'Rankings',
  },
  {
    slug: 'varejo-que-inova',
    nome: 'Varejo que Inova',
    descricao: 'Casos reais de inovação no varejo: tecnologia, experiência e resultado.',
    edicaoAtual: null,
    status: 'em_breve',
    corFundo: '#0E3A5C',
    corTexto: '#5E97D1',
    categoria: 'Dossiês',
  },
  {
    slug: 'anuario',
    nome: 'Anuário Negócios & Franquias',
    descricao: 'A publicação anual de referência do ecossistema de franquias e varejo.',
    edicaoAtual: null,
    status: 'em_breve',
    corFundo: '#111827',
    corTexto: '#0E4D7A',
    categoria: 'Publicações',
  },
];

export function getProjetoBySlug(slug: string): ProjetoEspecial | undefined {
  return PROJETOS_ESPECIAIS.find((p) => p.slug === slug);
}

export function getProjetosPublicados(): ProjetoEspecial[] {
  return PROJETOS_ESPECIAIS.filter((p) => p.status === 'publicado');
}

// Retorna o projeto "destaque" do hub:
// prioridade → publicado > em_breve (primeiro da lista)
export function getProjetoDestaque(): ProjetoEspecial {
  return (
    PROJETOS_ESPECIAIS.find((p) => p.status === 'publicado') ??
    PROJETOS_ESPECIAIS[0]
  );
}
