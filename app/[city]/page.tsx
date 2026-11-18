import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cities, getCity } from '@/data/cities';
import { buildCityMetadata } from '@/app/lib/city-seo';
import CityTemplate from './CityTemplate';

/*
 * Alla stadssidor (/palma-de-mallorca, /soller, …) genereras från data/cities.ts.
 * Statiska toppnivåroutes (/strandar, /byar, …) har företräde framför [city],
 * och dynamicParams = false gör att okända slugs ger 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCity((await params).city);
  return city ? buildCityMetadata(city) : {};
}

export default async function CityPage({ params }: Props) {
  const city = getCity((await params).city);
  if (!city) notFound();
  return <CityTemplate city={city} />;
}
