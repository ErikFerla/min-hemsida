import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mymallorca.se';
  const lastModified = new Date();

  const staticPages = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/strandar`, priority: 0.9 },
    { url: `${baseUrl}/byar`, priority: 0.9 },
    { url: `${baseUrl}/mat`, priority: 0.85 },
    { url: `${baseUrl}/aktiviteter`, priority: 0.85 },
    { url: `${baseUrl}/aktiviteter/golf`, priority: 0.8 },
    { url: `${baseUrl}/sevardheter`, priority: 0.8 },
    { url: `${baseUrl}/evenemang`, priority: 0.8 },
    { url: `${baseUrl}/barn`, priority: 0.75 },
    { url: `${baseUrl}/vader`, priority: 0.7 },
    { url: `${baseUrl}/flyg`, priority: 0.7 },
    { url: `${baseUrl}/palma-de-mallorca`, priority: 0.85 },
    { url: `${baseUrl}/soller`, priority: 0.75 },
    { url: `${baseUrl}/porto-colom`, priority: 0.75 },
    { url: `${baseUrl}/santanyi`, priority: 0.75 },
    { url: `${baseUrl}/valldemossa`, priority: 0.75 },
    { url: `${baseUrl}/deia`, priority: 0.75 },
    { url: `${baseUrl}/alcudia`, priority: 0.75 },
    { url: `${baseUrl}/pollenca`, priority: 0.7 },
    { url: `${baseUrl}/inca`, priority: 0.65 },
    { url: `${baseUrl}/sineu`, priority: 0.65 },
    { url: `${baseUrl}/felanitx`, priority: 0.65 },
    { url: `${baseUrl}/manacor`, priority: 0.65 },
    { url: `${baseUrl}/andratx`, priority: 0.65 },
    { url: `${baseUrl}/capdepera`, priority: 0.65 },
    { url: `${baseUrl}/port-de-soller`, priority: 0.65 },
    { url: `${baseUrl}/arta`, priority: 0.65 },
    { url: `${baseUrl}/porto-petro`, priority: 0.65 },
    { url: `${baseUrl}/campos`, priority: 0.6 },
  ];

  return staticPages.map(page => ({
    url: page.url,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: page.priority,
  }));
}
