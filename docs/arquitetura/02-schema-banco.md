# 02 - Schema do Banco de Dados

# Objetivo

Nesta etapa iremos criar toda a modelagem do banco de dados da plataforma editorial Negócio & Franquia.

Não iremos implementar telas.

Não iremos implementar API.

Não iremos implementar autenticação.

O objetivo desta etapa é apenas construir um banco de dados robusto, escalável e preparado para sustentar toda a plataforma pelos próximos anos.

---

# Stack

ORM

Prisma

Banco

PostgreSQL

Todo relacionamento deverá ser criado utilizando Prisma.

Não utilizar SQL puro.

---

# Regras Gerais

Utilizar UUID como chave primária em todas as tabelas.

Todas as tabelas deverão possuir:

* id
* createdAt
* updatedAt

Sempre utilizar:

createdAt @default(now())

updatedAt @updatedAt

Nunca utilizar IDs incrementais.

---

# ENUMS

Criar os seguintes Enums.

PostStatus

```text
DRAFT

REVIEW

SCHEDULED

PUBLISHED

ARCHIVED
```

---

UserRole

```text
ADMIN

EDITOR

JOURNALIST

COLUMNIST

ADVERTISER
```

---

MediaType

```text
IMAGE

VIDEO

DOCUMENT

AUDIO
```

---

AdLocation

```text
HOME_TOP

HOME_SIDEBAR

CATEGORY_SIDEBAR

POST_TOP

POST_BOTTOM

FOOTER
```

---

# USERS

Tabela

users

Campos

id

name

email

password

role

avatar

active

lastLogin

createdAt

updatedAt

Relacionamentos

1 usuário possui vários posts

1 usuário pode publicar vários especiais

---

# AUTHORS

Tabela

authors

Campos

id

name

slug

bio

photo

email

phone

linkedin

instagram

website

position

active

createdAt

updatedAt

Relacionamentos

1 autor

N posts

---

# POSTS

Tabela principal.

Campos

id

title

subtitle

slug

excerpt

content

status

publishedAt

scheduledAt

readingTime

views

featured

hero

breaking

allowComments

featuredImageId

authorId

categoryId

createdBy

updatedBy

createdAt

updatedAt

Observações

content deverá armazenar JSON.

Nunca armazenar HTML.

Preparar para utilização futura com Tiptap.

---

# SEO

Cada notícia deverá possuir SEO próprio.

Campos

seoTitle

seoDescription

seoKeywords

canonicalUrl

ogImage

robots

schemaType

---

# CATEGORIES

Campos

id

name

slug

description

color

icon

order

active

createdAt

updatedAt

Relacionamentos

1 categoria

N posts

---

Categorias iniciais

Franquias

Gestão

Mercado

Negócios

Shopping Centers

Varejo

N&F Play

Na Lata

Especiais

Artigos

Eventos

---

# TAGS

Tabela

tags

Campos

id

name

slug

createdAt

updatedAt

---

# POST_TAGS

Tabela intermediária

post_tags

Campos

postId

tagId

Relacionamento

Many To Many

---

# MEDIA

Tabela responsável pelos arquivos.

Campos

id

filename

originalName

bucket

path

url

mime

extension

width

height

size

alt

caption

dominantColor

type

uploadedBy

createdAt

updatedAt

Nunca armazenar imagens no banco.

Apenas referências.

Todo upload deverá ser enviado para Cloudflare R2.

---

# ADS

Tabela

ads

Campos

id

name

description

location

script

width

height

active

startDate

endDate

priority

createdAt

updatedAt

O script deverá aceitar qualquer código JavaScript fornecido pelos anunciantes.

---

# SPECIAL PROJECTS

Tabela

special_projects

Campos

id

title

slug

description

coverImage

sponsor

content

featured

active

createdAt

updatedAt

---

# VIDEOS

Tabela

videos

Campos

id

title

slug

youtubeId

thumbnail

duration

description

publishedAt

featured

createdAt

updatedAt

---

# PODCASTS

Tabela

podcasts

Campos

id

title

slug

spotifyId

cover

description

duration

publishedAt

createdAt

updatedAt

---

# NEWSLETTER

Tabela

newsletter_subscribers

Campos

id

name

email

confirmed

token

createdAt

updatedAt

email deverá ser UNIQUE.

---

# CONTACT

Tabela

contact_messages

Campos

id

name

email

phone

subject

message

status

createdAt

updatedAt

---

# POST VIEWS

Tabela

post_views

Campos

id

postId

ipHash

sessionId

userAgent

createdAt

Nunca armazenar IP puro.

Sempre utilizar hash.

A quantidade de visualizações deverá ser calculada através desta tabela.

Nunca incrementar manualmente um campo views.

---

# COMMENTS

Preparar estrutura mesmo que inicialmente desabilitada.

Campos

id

postId

author

email

message

approved

createdAt

updatedAt

---

# REDIRECTS

Tabela

redirects

Campos

id

oldSlug

newSlug

createdAt

Será utilizada para migração de URLs antigas.

---

# SETTINGS

Tabela única.

Campos

id

siteName

siteDescription

siteUrl

logo

favicon

defaultOgImage

defaultSeoTitle

defaultSeoDescription

googleAnalytics

googleTagManager

facebookPixel

linkedinPixel

createdAt

updatedAt

Esta tabela será responsável pelas configurações globais do portal.

---

# Relacionamentos

User

↓

Posts

↓

Category

↓

Tags

↓

Media

↓

SEO

↓

Views

↓

Comments

Todos os relacionamentos deverão utilizar Foreign Keys.

---

# Índices

Criar índices para:

slug

status

publishedAt

categoryId

authorId

featured

hero

breaking

email

createdAt

Todos os slugs deverão possuir UNIQUE.

Todos os emails deverão possuir UNIQUE.

---

# Seeds

Criar automaticamente:

Categorias

Papéis de usuário

Administrador padrão

---

Administrador

Nome

Administrador

Email

[admin@negocioefranquia.com.br](mailto:admin@negocioefranquia.com.br)

Senha

Definir posteriormente através de variável de ambiente.

Nunca armazenar senha em texto puro.

Utilizar bcrypt.

---

# Objetivo desta etapa

Ao finalizar esta implementação o projeto deverá possuir um banco de dados totalmente funcional, normalizado, escalável e preparado para substituir integralmente o WordPress.

Nesta fase não criar interfaces.

Não criar páginas.

Não criar APIs.

Não criar autenticação.

Apenas modelar corretamente todo o banco utilizando Prisma ORM.
