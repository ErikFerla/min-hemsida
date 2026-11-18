import JsonLd from './JsonLd';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MyMallorca',
    url: 'https://www.mymallorca.se',
    email: 'info@mymallorca.se',
    description: 'Redaktionell reseguide till Mallorca på svenska – skriven av passion för ön, inte för att sälja resor.',
    // logo & sameAs intentionally omitted – add when a real logo asset exists in
    // public/ and when public social channels go live (avoid placeholder URLs).
  };
  return <JsonLd data={schema} />;
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MyMallorca',
    url: 'https://www.mymallorca.se',
    description: 'Svensk guide till Mallorca – stränder, byar, mat, golf och barnaktiviteter',
    inLanguage: 'sv-SE',
    publisher: { '@type': 'Organization', name: 'MyMallorca', url: 'https://www.mymallorca.se' },
  };
  return <JsonLd data={schema} />;
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://www.mymallorca.se${item.url}`,
    })),
  };
  return <JsonLd data={schema} />;
}
