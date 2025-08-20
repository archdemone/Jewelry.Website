export type SitemapItem = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};

export function makeSitemap(baseUrl: string, items: SitemapItem[]) {
  return items.map((i) => ({
    url: `${baseUrl.replace(/\/$/, '')}${i.url.startsWith('/') ? '' : '/'}${i.url}`,
    lastModified: i.lastModified ? new Date(i.lastModified) : new Date(),
    changeFrequency: i.changeFrequency || 'weekly',
    priority: typeof i.priority === 'number' ? i.priority : 0.7,
  }));
}
