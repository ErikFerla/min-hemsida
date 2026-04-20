import { TouristDestinationSchema } from '@/app/components/SchemaOrg';
import { type City, cityOgImage, cityUrl } from './city-seo';

export function CityJsonLd({ city }: { city: City }) {
  return (
    <TouristDestinationSchema
      name={city.name}
      description={city.description}
      image={cityOgImage(city)}
      url={cityUrl(city)}
      lat={city.lat}
      lon={city.lon}
    />
  );
}
