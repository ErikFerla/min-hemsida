import { NextResponse } from 'next/server'

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

  const res = await fetch(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latNum}&lon=${lonNum}`,
    { headers: { 'User-Agent': 'mymallorca.se/1.0 contact@mymallorca.se' } }
  )

  if (!res.ok) {
    return NextResponse.json({ error: 'Weather API error' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
