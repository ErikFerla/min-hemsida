'use client'
import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'

const cities = [
  { name: 'Palma de Mallorca', lat: 39.5696, lng: 2.6502, href: '/palma-de-mallorca', desc: 'Mallorcas pulserande huvudstad', main: true },
  { name: 'Sóller', lat: 39.7670, lng: 2.7153, href: '/soller', desc: 'Bergsby med historisk spårvagn' },
  { name: 'Valldemossa', lat: 39.7126, lng: 2.6228, href: '/valldemossa', desc: 'UNESCO-skyddat världsarv' },
  { name: 'Deià', lat: 39.7480, lng: 2.6480, href: '/deia', desc: 'Konstnärsby vid NV-kusten' },
  { name: 'Andratx', lat: 39.5742, lng: 2.4251, href: '/andratx', desc: 'Charmig by i sydväst' },
  { name: 'Pollença', lat: 39.8724, lng: 3.0139, href: '/pollenca', desc: 'Historisk stad i norr' },
  { name: 'Alcúdia', lat: 39.8527, lng: 3.1214, href: '/alcudia', desc: 'Historisk kuststad i norr' },
  { name: 'Inca', lat: 39.7191, lng: 2.9130, href: '/inca', desc: 'Mallorcas tredje stad' },
  { name: 'Sineu', lat: 39.6432, lng: 3.0187, href: '/sineu', desc: 'Charmig marknadsby i centrum' },
  { name: 'Artà', lat: 39.6960, lng: 3.3500, href: '/arta', desc: 'Medeltida bergsby i öst' },
  { name: 'Capdepera', lat: 39.7035, lng: 3.4294, href: '/capdepera', desc: 'By med imponerande borg' },
  { name: 'Felanitx', lat: 39.4683, lng: 3.1481, href: '/felanitx', desc: 'Historisk stad i sydöst' },
  { name: 'Porto Colom', lat: 39.4180, lng: 3.2570, href: '/porto-colom', desc: 'Pittoresk fiskeby på östkusten' },
  { name: 'Santanyí', lat: 39.3580, lng: 3.1273, href: '/santanyi', desc: 'Charmig marknadsby i söder' },
  { name: 'Porto Petro', lat: 39.3620, lng: 3.2195, href: '/porto-petro', desc: 'Exklusiv och lugn marinaby' },
]

export default function MallorcaMap() {
  useEffect(() => {
    import('leaflet').then((L) => {
      const Lm = (L as any).default || L
      const container = document.getElementById('mallorca-map') as any
      if (!container || container._leaflet_id) return

      const map = Lm.map('mallorca-map', {
        center: [39.62, 2.96],
        zoom: 10,
        scrollWheelZoom: false,
      })

      Lm.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map)

      cities.forEach((city) => {
        const color = city.main ? '#383a46' : '#993335'
        const size = city.main ? 22 : 16
        const icon = Lm.divIcon({
          className: '',
          html: `<div style="display:flex;flex-direction:column;align-items:center;">
            <svg width="${size}" height="${size}" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="6" fill="${color}" stroke="white" stroke-width="2.5"/>
              ${city.main ? '<circle cx="7" cy="7" r="3" fill="white" opacity="0.7"/>' : ''}
            </svg>
            <span style="font-family:sans-serif;font-size:10px;font-weight:600;color:#383a46;white-space:nowrap;text-shadow:0 0 3px white,0 0 3px white,0 0 3px white">${city.name}</span>
          </div>`,
          iconAnchor: [city.main ? 11 : 8, city.main ? 11 : 8],
          popupAnchor: [0, -14],
        })

        Lm.marker([city.lat, city.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<b style="font-size:13px">${city.name}</b><br>` +
            `<span style="color:#6b7280;font-size:12px">${city.desc}</span><br>` +
            `<a href="${city.href}" style="display:inline-block;margin-top:8px;background:#383a46;color:white;padding:5px 12px;font-size:11px;letter-spacing:0.08em;text-decoration:none;text-transform:uppercase">Utforska →</a>`
          )
      })
    })
  }, [])

  return (
    <div id="mallorca-map" style={{ width: '100%', height: '500px', borderRadius: '8px' }} />
  )
}
