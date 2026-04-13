import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://infinityteam.io';

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/swiat-ai`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/kalkulator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/agents`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/case-studies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/bloom`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/polityka-prywatnosci`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/regulamin`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
