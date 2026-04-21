import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mymallorca.se';
  const lastModified = new Date();

  const staticPages: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/strandar`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/byar`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/mat`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${baseUrl}/aktiviteter`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${baseUrl}/aktiviteter/golf`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/sevardheter`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/evenemang`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/barn`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${baseUrl}/vader`, priority: 0.7, changeFrequency: 'daily' },
    { url: `${baseUrl}/flyg`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${baseUrl}/vingardar`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/kontakt`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${baseUrl}/palma-de-mallorca`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${baseUrl}/soller`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${baseUrl}/porto-colom`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${baseUrl}/santanyi`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${baseUrl}/valldemossa`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${baseUrl}/deia`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${baseUrl}/alcudia`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${baseUrl}/pollenca`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/inca`, priority: 0.65, changeFrequency: 'monthly' },
    { url: `${baseUrl}/sineu`, priority: 0.65, changeFrequency: 'monthly' },
    { url: `${baseUrl}/felanitx`, priority: 0.65, changeFrequency: 'monthly' },
    { url: `${baseUrl}/andratx`, priority: 0.65, changeFrequency: 'monthly' },
    { url: `${baseUrl}/capdepera`, priority: 0.65, changeFrequency: 'monthly' },
    { url: `${baseUrl}/port-de-soller`, priority: 0.65, changeFrequency: 'monthly' },
    { url: `${baseUrl}/arta`, priority: 0.65, changeFrequency: 'monthly' },
    { url: `${baseUrl}/porto-petro`, priority: 0.65, changeFrequency: 'monthly' },
    { url: `${baseUrl}/guide/basta-stranderna-mallorca`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/guide/mallorca-med-barn`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/guide/basta-restauranger-palma`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${baseUrl}/guide/golf-mallorca-guide`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${baseUrl}/guide/basta-tid-resa-mallorca`, priority: 0.85, changeFrequency: 'monthly' },
  ];

  return staticPages.map(page => ({
    url: page.url,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
