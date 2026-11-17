import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Endast koordinater på och kring Mallorca tillåts, så att routen inte kan
// användas som öppen proxy mot met.no.
const MALLORCA_BOUNDS = { minLat: 39.2, maxLat: 40.0, minLon: 2.3, maxLon: 3.5 }

// met.no kräver en User-Agent som identifierar tjänsten och ger kontaktuppgift:
// https://api.met.no/doc/TermsOfService
const USER_AGENT = 'mymallorca.se/1.0 (+https://mymallorca.se; contact@mymallorca.se)'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing lat/lon' }, { status: 400 })
  }

  const latNum = Number(lat)
  const lonNum = Number(lon)
  if (
    !Number.isFinite(latNum) ||
    !Number.isFinite(lonNum) ||
    latNum < MALLORCA_BOUNDS.minLat ||
    latNum > MALLORCA_BOUNDS.maxLat ||
    lonNum < MALLORCA_BOUNDS.minLon ||
    lonNum > MALLORCA_BOUNDS.maxLon
  ) {
    return NextResponse.json({ error: 'Only Mallorca coordinates are supported' }, { status: 400 })
  }

  // met.no ber om max 4 decimaler – ger också bättre cacheträffar.
  const latRounded = latNum.toFixed(4)
  const lonRounded = lonNum.toFixed(4)

  try {
    const res = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latRounded}&lon=${lonRounded}`,
      {
        headers: { 'User-Agent': USER_AGENT },
        next: { revalidate: 1800 },
      }
    )

    if (!res.ok) {
      return NextResponse.json({ error: 'Weather API error' }, { status: 502 })
    }

    const data = await res.json()
    const response = NextResponse.json(data)
    response.headers.set('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600')
    return response
  } catch {
    return NextResponse.json({ error: 'Failed to reach weather service' }, { status: 502 })
  }
}
