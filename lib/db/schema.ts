import { pgTable, text, timestamp, boolean, serial } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  coverUrl: text('cover_url'),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const cases = pgTable('cases', {
  id: serial('id').primaryKey(),
  clientName: text('client_name').notNull(),
  logoUrl: text('logo_url'),
  videoUrl: text('video_url'),
  category: text('category'),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  company: text('company'),
  service: text('service'),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
