# 01 - Arquitetura Geral da Plataforma Editorial N&F

## Objetivo

A partir desta etapa o projeto deixa de depender do WordPress.

O objetivo é transformar o portal Negócio & Franquia em uma plataforma editorial própria, construída sobre Next.js, utilizando banco de dados autoral, painel administrativo próprio e API própria.

O WordPress será utilizado apenas como fonte temporária de migração de conteúdo.

Após a conclusão da migração nenhuma página deverá depender da REST API do WordPress.

---

# Stack Oficial

Frontend

* Next.js (App Router)
* TypeScript
* TailwindCSS
* Framer Motion

Backend

* Next.js API Routes

ORM

* Prisma

Banco

* PostgreSQL

Storage

* Cloudflare R2

Autenticação

* JWT + HTTP Only Cookies

Deploy

* Vercel

---

# Arquitetura

A arquitetura deverá seguir exatamente o fluxo abaixo.

```
Usuário

↓

Next.js

↓

API Routes

↓

Prisma ORM

↓

PostgreSQL

↓

Cloudflare R2
```

Nenhuma página deverá acessar diretamente o banco.

Toda comunicação deverá ocorrer através das API Routes.

---

# Objetivos

O sistema deverá possuir:

* CMS próprio
* Painel Administrativo
* Editor de Notícias
* Upload de imagens
* Gestão de autores
* Gestão de categorias
* Gestão de tags
* Gestão de anúncios
* Gestão de páginas especiais
* SEO completo
* Newsletter
* Dashboard
* Analytics
* Controle de permissões

---

# Estrutura

O projeto será dividido em módulos independentes.

```
Authentication

Posts

Authors

Categories

Tags

Media

Ads

Specials

Videos

Podcasts

Newsletter

Contacts

Dashboard

SEO
```

Cada módulo deverá possuir:

* schema Prisma
* services
* repository
* API
* interfaces
* validações
* componentes reutilizáveis

Nunca criar código acoplado.

---

# Princípios

Todo código deverá seguir:

* SOLID
* Clean Architecture
* DRY
* Componentização
* Tipagem completa
* Sem any
* Sem duplicação de lógica

---

# Organização

/app

/components

/lib

/services

/repositories

/hooks

/types

/prisma

/public

/uploads

/docs

---

# Convenções

Componentes

PascalCase

Hooks

camelCase

Interfaces

IExample

Enums

UPPER_CASE

---

# Rotas

Portal

/

Notícias

/noticia/[slug]

Categoria

/noticias/[categoria]

Autor

/autor/[slug]

Especial

/especiais/[slug]

Vídeo

/play/[slug]

Podcast

/podcast/[slug]

Contato

/contato

Quem Somos

/quem-somos

Anuncie

/anuncie

---

Painel

/nef-login

/nef-admin

/nef-admin/posts

/nef-admin/media

/nef-admin/authors

/nef-admin/categories

/nef-admin/tags

/nef-admin/ads

/nef-admin/users

/nef-admin/dashboard

---

# Objetivo desta etapa

Nesta fase não implementar funcionalidades.

Somente estruturar toda a arquitetura base do projeto para receber os módulos das próximas fases.

Não criar código temporário.

Não utilizar soluções improvisadas.

Toda implementação deverá ser pensada para produção.
