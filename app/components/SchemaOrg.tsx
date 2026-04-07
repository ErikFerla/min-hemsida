export function TouristDestinationSchema({ name, description, image }: { name: string; description: string; image: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name,
    description,
    image,
    touristType: ['Family', 'Couple', 'Solo traveler'],
    includesAttraction: [],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MyMallorca',
    url: 'https://www.mymallorca.se',
    description: 'Din personliga guide till Mallorca på svenska',
    inLanguage: 'sv-SE',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.mymallorca.se/strandar?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
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
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
