// env.d.ts

/// <reference types="nuxt" />
/// <reference types="@nuxt/content" />

// https://nuxt.com/docs/guide/concepts/typescript
declare module '@nuxt/content' {
  interface ContentSchema {
    case_studies: {
      slug: string
      category: string
      order: number
      color: string
      title: string
      subtitle: string
      roles: string[]
      year: number
      clients: string[]
      collaborators?: {
        brand_design?: string[]
        brand_messaging?: string[]
        development?: string[]
        agency?: string
        creative_direction?: string[]
        web_design?: string[]
      }
      contributions?: {
        research?: string[]
        strategy?: string[]
        design?: string[]
        development?: string[]
      }
      brief?: string[]
      featured_video?: string
      landing_video?: string
      previous?: string
      next?: string
    }
    projects: {
      slug: string
      category: string
      order: number
      color: string
      title: string
      roles: string[]
      year: number
      clients: string[]
      landing_video?: string
      previous?: string
      next?: string
    }
    art: {
      slug: string
      category: string
      order: number
      color: string
      title: string
      subtitle: string
      roles: string[]
      year: number
      clients: string[]
      previous?: string
      next?: string
      featured_image?: string
      images?: string[]
    }
  }
}

// https://v3.nuxtjs.org/api/configuration/nuxt-config
declare module '@nuxt/schema' {
  interface NuxtConfig {
    content?: {
      experimental?: {
        nativeSqlite?: boolean
      }
      markdown?: {
        rehypePlugins?: string[]
      }
    }
  }
}

// For basic content module configuration
declare module '@nuxt/content' {
  interface ContentModuleOptions {
    experimental?: {
      nativeSqlite?: boolean;
    };
    sources?: Record<string, any>;
    content?: Record<string, any>;
  }

  // Add the defineContentConfig function
  export function defineContentConfig(options: any): any;
}

// Define basic content document types
declare module '#content/types' {
  interface ContentDoc {
    // Basic fields
    _id: string;
    _path: string;
    _draft: boolean;
    
    // Your project fields
    order?: number;
    color?: string;
    title?: string;
    subtitle?: string;
    roles?: string[];
    year?: number;
    clients?: string[];
    collaborators?: Record<string, any>;
    contributions?: Record<string, any>;
    brief?: string;
    results?: string;
    featured_video?: string;
    landing_video?: string;
    previous?: string;
    next?: string;
    featured_image?: string;
    images?: string[];
  }
}