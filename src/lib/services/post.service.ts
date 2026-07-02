import prisma from '@/lib/prisma';
import { PostStatus } from '@prisma/client';

export type PostCreateInput = {
  title: string;
  subtitle?: string;
  slug: string;
  excerpt?: string;
  content: any; // JSONB
  categoryId: string;
  authorId: string;
  featuredImageId?: string;
  status: PostStatus;
  scheduledAt?: Date;
  allowComments: boolean;
  hero: boolean;
  featured: boolean;
  breaking: boolean;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  seoKeywords?: string;
  tags?: string[]; // Array de IDs de tags
};

export type PostUpdateInput = Partial<PostCreateInput>;

export const PostService = {
  async createPost(data: PostCreateInput, userId: string) {
    return prisma.$transaction(async (tx) => {
      // 1. Criar o Post
      const post = await tx.post.create({
        data: {
          title: data.title,
          subtitle: data.subtitle,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          categoryId: data.categoryId,
          authorId: data.authorId,
          featuredImageId: data.featuredImageId,
          status: data.status,
          scheduledAt: data.scheduledAt,
          allowComments: data.allowComments,
          hero: data.hero,
          featured: data.featured,
          breaking: data.breaking,
          createdById: userId,
          updatedById: userId,
        },
      });

      // 2. Criar SEO
      await tx.postSeo.create({
        data: {
          postId: post.id,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
          canonicalUrl: data.canonicalUrl,
          ogImage: data.ogImage,
          seoKeywords: data.seoKeywords,
        },
      });

      // 3. Vincular Tags (se existirem)
      if (data.tags && data.tags.length > 0) {
        await tx.postTag.createMany({
          data: data.tags.map(tagId => ({
            postId: post.id,
            tagId,
          })),
        });
      }

      return post;
    });
  },

  async updatePost(id: string, data: PostUpdateInput, userId: string) {
    return prisma.$transaction(async (tx) => {
      // 1. Atualizar Post
      const post = await tx.post.update({
        where: { id },
        data: {
          title: data.title,
          subtitle: data.subtitle,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          categoryId: data.categoryId,
          authorId: data.authorId,
          featuredImageId: data.featuredImageId,
          status: data.status,
          scheduledAt: data.scheduledAt,
          allowComments: data.allowComments,
          hero: data.hero,
          featured: data.featured,
          breaking: data.breaking,
          updatedById: userId,
          // Se estiver mudando de DRAFT para PUBLISHED, podemos definir publishedAt
          ...(data.status === 'PUBLISHED' && { publishedAt: new Date() })
        },
      });

      // 2. Atualizar SEO (usando upsert caso não exista)
      await tx.postSeo.upsert({
        where: { postId: id },
        create: {
          postId: id,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
          canonicalUrl: data.canonicalUrl,
          ogImage: data.ogImage,
          seoKeywords: data.seoKeywords,
        },
        update: {
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
          canonicalUrl: data.canonicalUrl,
          ogImage: data.ogImage,
          seoKeywords: data.seoKeywords,
        },
      });

      // 3. Atualizar Tags
      if (data.tags) {
        // Remove tags antigas
        await tx.postTag.deleteMany({
          where: { postId: id },
        });

        // Insere as novas
        if (data.tags.length > 0) {
          await tx.postTag.createMany({
            data: data.tags.map(tagId => ({
              postId: id,
              tagId,
            })),
          });
        }
      }

      return post;
    });
  },

  async getPostForEdit(id: string) {
    return prisma.post.findUnique({
      where: { id },
      include: {
        seo: true,
        tags: { select: { tagId: true } }
      }
    });
  },
  
  async getAuxiliaryData() {
    const [categories, authors, tags] = await Promise.all([
      prisma.category.findMany({ where: { active: true }, select: { id: true, name: true } }),
      prisma.author.findMany({ where: { active: true }, select: { id: true, name: true } }),
      prisma.tag.findMany({ select: { id: true, name: true } }),
    ]);
    return { categories, authors, tags };
  }
};
