import { defineCollection, z } from 'astro:content';

// Monthly newsletters. Each can either link to an uploaded PDF, contain a
// written body (Markdown), or both. Managed from the /admin CMS.
const newsletters = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    issue: z.string().optional(), // e.g. "Issue 1 — June 2026"
    date: z.coerce.date(),
    summary: z.string(),
    coverImage: z.string().optional(),
    pdf: z.string().optional(), // path to uploaded PDF, e.g. /uploads/june-2026.pdf
    featured: z.boolean().default(false),
  }),
});

// Short community announcements shown on the homepage.
const announcements = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    pinned: z.boolean().default(false),
  }),
});

// "Question of the Month" — current question + previous winner announcement.
const questions = defineCollection({
  type: 'content',
  schema: z.object({
    month: z.string(), // e.g. "June 2026"
    date: z.coerce.date(),
    question: z.string(),
    status: z.enum(['open', 'closed']).default('open'),
    previousWinner: z.string().optional(),
    previousAnswer: z.string().optional(),
  }),
});

// Expert Q&A — questions answered by Muftis / scholars, published here.
const qa = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    answeredBy: z.string().optional(), // e.g. "Mufti ..."
    date: z.coerce.date(),
    category: z.string().optional(),
  }),
});

// Alumni Insights — college experiences, achievements, advice (curated).
const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    gradYear: z.string().optional(),
    college: z.string().optional(),
    date: z.coerce.date(),
    summary: z.string(),
  }),
});

export const collections = { newsletters, announcements, questions, qa, insights };
