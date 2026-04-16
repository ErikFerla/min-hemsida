'use client'
import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'

const barnAktiviteter = [
  { name: 'Aqualand El Arenal', lat: 39.493, lon: 2.741, desc: 'Mallorcas populäraste vattenpark' },
  { name: 'Western Water Park', lat: 39.591, lon: 2.455, desc: 'Vattenpark med vilda rutschkanor' },
  { name: 'Palma Aquarium', lat: 39.528, lon: 2.727, desc: 'Stort akvarium med hajar och tropisk fisk' },
  { name: 'Karting Magaluf', lat: 39.507, lon: 2.530, desc: 'Gokart för barn och vuxna' },
  { name: 'Natura Parc', lat: 39.622, lon: 2.592, desc: 'Djurpark med inhemska djur' },
  { name: 'Playa de Muro', lat: 39.795, lon: 3.108, desc: 'Barnvänligaste stranden — grunt och lugnt' },
  { name: 'Coves del Drac', lat: 39.533, lon: 3.328, desc: 'Spektakulära grottor med båttur' },
  { name: 'Golf Fantasia', lat: 39.511, lon: 2.533, desc: 'Minigolf med tropisk miljö' },
]

export default function BarnMap() {
  useEffect(() => {
    import('leaflet').then((L) => {
      const Lm = (L as any).default || L
      const container = document.getElementById('barn-map') as any
      if (!container || container._leaflet_id) return

      const map = Lm.map('barn-map', {
        center: [39.6, 2.9],
        zoom: 9,
        scrollWheelZoom: false,
      })

      Lm.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map)

      barnAktiviteter.forEach((a) => {
        const icon = Lm.divIcon({
          className: '',
          html: `<div style="display:flex;flex-direction:column;align-items:center;">
            <svg width="18" height="18" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="6" fill="#0E7490" stroke="white" stroke-width="2.5"/>
            </svg>
            <span style="font-family:sans-serif;font-size:10px;font-weight:600;color:#1f2937;white-space:nowrap;text-shadow:0 0 3px white,0 0 3px white,0 0 3px white">${a.name}</span>
          </div>`,
          iconAnchor: [9, 9],
          popupAnchor: [0, -14],
        })

        Lm.marker([a.lat, a.lon], { icon })
          .addTo(map)
          .bindPopup(
            `<b style="font-size:13px">${a.name}</b><br>` +
            `<span style="color:#6b7280;font-size:12px">${a.desc}</span>`
          )
      })
    })
  }, [])

  return (
    <div id="barn-map" className="barn-map-container" style={{ width: '100%', height: '450px', borderRadius: '12px' }} />
  )
}
