<<<<<<< HEAD
// content.config.ts
import { defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  contentSchema: {
    case_studies: z.object({
      slug: z.string(),
      category: z.string(),
      order: z.number(),
      color: z.string(),
      title: z.string(),
      subtitle: z.string(),
      roles: z.array(z.string()),
      year: z.number(),
      clients: z.array(z.string()),
      collaborators: z.object({
        brand_design: z.array(z.string()).optional(),
        brand_messaging: z.array(z.string()).optional(),
        development: z.array(z.string()).optional(),
        agency: z.string().optional(),
        creative_direction: z.array(z.string()).optional(),
        web_design: z.array(z.string()).optional()
      }).optional(),
      contributions: z.object({
        research: z.array(z.string()).optional(),
        strategy: z.array(z.string()).optional(),
        design: z.array(z.string()).optional(),
        development: z.array(z.string()).optional()
      }).optional(),
      brief: z.array(z.string()).optional(),
      featured_video: z.string().optional(),
      landing_video: z.string().optional(),
      previous: z.string().optional(),
      next: z.string().optional()
    }),
    projects: z.object({
      slug: z.string(),
      category: z.string(),
      order: z.number(),
      color: z.string(),
      title: z.string(),
      subtitle: z.string(),
      roles: z.array(z.string()),
      year: z.number(),
      clients: z.array(z.string()),
      landing_video: z.string().optional(),
      previous: z.string().optional(),
      next: z.string().optional(),
      featured_image: z.string().optional()
    }),
    art: z.object({
      slug: z.string(),
      category: z.string(),
      order: z.number(),
      color: z.string(),
      title: z.string(),
      subtitle: z.string(),
      roles: z.array(z.string()),
      year: z.number(),
      clients: z.array(z.string()),
      previous: z.string().optional(),
      next: z.string().optional(),
      featured_image: z.string().optional(),
      images: z.array(z.string()).optional()
    })
  }
})
=======
import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
    }),
  },
})
>>>>>>> 23df34ec4b1dc369631019053bdf47cf9b8a5e8f
