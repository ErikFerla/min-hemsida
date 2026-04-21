type TouristDestinationSchemaProps = {
  name: string;
  description: string;
  image: string;
  url?: string;
  lat?: number;
  lon?: number;
};

export function TouristDestinationSchema({ name, description, image, url, lat, lon }: TouristDestinationSchemaProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name,
    description,
    image,
    touristType: ['Family', 'Couple', 'Solo traveler'],
    includesAttraction: [],
    containedInPlace: {
      '@type': 'Island',
      name: 'Mallorca',
      containedInPlace: { '@type': 'Country', name: 'Spain' },
    },
  };
  if (url) schema.url = url;
  if (typeof lat === 'number' && typeof lon === 'number') {
    schema.geo = { '@type': 'GeoCoordinates', latitude: lat, longitude: lon };
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'MyMallorca',
    url: 'https://www.mymallorca.se',
    description: 'Din kompletta reseguide till Mallorca på svenska',
    inLanguage: 'sv-SE',
    areaServed: {
      '@type': 'Place',
      name: 'Mallorca, Spain',
    },
    // logo & sameAs intentionally omitted — add when a real logo asset exists in
    // public/ and when public social channels go live (avoid placeholder URLs).
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
