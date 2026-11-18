import { BASE_URL } from '@/app/lib/city-seo';
import { evenemangMedKalenderfil } from '../../data';
import { byggIcs } from '../../ics';

// En statisk .ics-fil per evenemangstillfälle med känt datum ("Lägg till i kalender").
// Allt förrenderas vid bygget – okända filnamn ger 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return evenemangMedKalenderfil().map(e => ({ fil: `${e.key}.ics` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ fil: string }> }) {
  const { fil } = await params;
  const e = evenemangMedKalenderfil().find(x => `${x.key}.ics` === fil);
  if (!e) return new Response('Hittades inte', { status: 404 });
  return new Response(byggIcs(e, BASE_URL), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${fil}"`,
    },
  });
}
