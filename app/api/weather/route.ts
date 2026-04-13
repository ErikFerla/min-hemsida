import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing lat/lon' }, { status: 400 })
  }

  const latNum = parseFloat(lat)
  const lonNum = parseFloat(lon)
  if (isNaN(latNum) || isNaN(lonNum) || latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) {
    return NextResponse.json({ error: 'Invalid lat/lon' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latNum}&lon=${lonNum}`,
      {
        headers: { 'User-Agent': 'mymallorca.se/1.0 contact@mymallorca.se' },
        next: { revalidate: 1800 },
      }
    )

    if (!res.ok) {
      return NextResponse.json({ error: 'Weather API error' }, { status: res.status })
    }

    const data = await res.json()
    const response = NextResponse.json(data)
    response.headers.set('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600')
    return response
  } catch {
    return NextResponse.json({ error: 'Failed to reach weather service' }, { status: 502 })
  }
}
