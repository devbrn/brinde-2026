import { pgTable, text, timestamp, boolean, serial, jsonb } from 'drizzle-orm/pg-core';

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
  // Origem do lead: preenchido a partir da query string quando a visita vem
  // de anúncio (Google Ads envia gclid, Meta envia fbclid).
  utmSource: text('utm_source'),
  utmMedium: text('utm_medium'),
  utmCampaign: text('utm_campaign'),
  utmTerm: text('utm_term'),
  utmContent: text('utm_content'),
  gclid: text('gclid'),
  fbclid: text('fbclid'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const emailEvents = pgTable('email_events', {
  id: serial('id').primaryKey(),
  eventId: text('event_id').notNull().unique(),
  eventType: text('event_type').notNull(),
  emailId: text('email_id'),
  recipient: text('recipient'),
  payload: jsonb('payload').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
