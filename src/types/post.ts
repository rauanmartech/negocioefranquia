export interface PostSeo {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML ou rich text
  coverImage: string;
  gallery: string[];
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  seo: PostSeo;
}
