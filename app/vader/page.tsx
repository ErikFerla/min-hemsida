"use client";
import { useState, useEffect } from 'react';
import styles from './vader.module.css';

type ForecastData = {
  date: string;
  dayName: string;
  shortDay: string;
  symbol: string;
  description: string;
  maxTemp: number;
  minTemp: number;
  windSpeed: number;
  humidity: number;
  precipitation: number;
};

const locations = [
  { name: 'Palma', lat: 39.5696, lon: 2.6502, fact: 'Största stad, medeltemperatur sommar 28°C, mild vinter' },
  { name: 'Porto Colom', lat: 39.4167, lon: 3.2667, fact: 'Kustby, havsbris, något svalare än inlandet' },
  { name: 'Port de Soller', lat: 39.7958, lon: 2.6942, fact: 'Skyddad av bergen, ofta vindstilla, varm sommar' },
  { name: 'Alcudia', lat: 39.8527, lon: 3.1237, fact: 'Norra Mallorca, något blåsigare, fin sommarsäsong' },
  { name: 'Andratx', lat: 39.5741, lon: 2.4267, fact: 'Sydväst på ön, skyddad av berg, populärt bland segelbåtsägare' },
];

const symbolToEmojiAndDesc: { [key: string]: { emoji: string; desc: string } } = {
  clearsky_day: { emoji: '☀️', desc: 'Klart' },
  fair_day: { emoji: '🌤️', desc: 'Mestadels klart' },
  partlycloudy_day: { emoji: '⛅', desc: 'Halvklart' },
  cloudy: { emoji: '☁️', desc: 'Mulet' },
  fog: { emoji: '🌫️', desc: 'Dimma' },
  lightrain: { emoji: '🌦️', desc: 'Lätt regn' },
  rain: { emoji: '🌧️', desc: 'Regn' },
  heavyrain: { emoji: '⛈️', desc: 'Kraftigt regn' },
  lightrainshowers_day: { emoji: '🌦️', desc: 'Regnskurar' },
  rainshowers_day: { emoji: '🌧️', desc: 'Regnskurar' },
  thunderstorm: { emoji: '⛈️', desc: 'Åskväder' },
  lightsnow: { emoji: '🌨️', desc: 'Lätt snö' },
  snow: { emoji: '❄️', desc: 'Snö' },
};

const fetchWeather = async (lat: number, lon: number): Promise<ForecastData[]> => {
  const response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`, {
    headers: {
      'User-Agent': 'MallorcaGuide/1.0 contact@mallorcaguide.se',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch weather data');
  const data = await response.json();
  const timeseries = data.properties.timeseries;

  const dailyForecasts: ForecastData[] = [];
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  for (let i = 0; i < 10; i++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + i);
    const targetTime = targetDate.getTime();

    // Find the closest entry to 12:00
    let closestEntry = null;
    let minDiff = Infinity;
    for (const entry of timeseries) {
      const entryTime = new Date(entry.time).getTime();
      const diff = Math.abs(entryTime - targetTime);
      if (diff < minDiff) {
        minDiff = diff;
        closestEntry = entry;
      }
    }

    if (closestEntry) {
      const symbol = closestEntry.data.next_1_hours?.summary.symbol_code || 'clearsky_day';
      const temp = closestEntry.data.instant.details.air_temperature;
      const wind = closestEntry.data.instant.details.wind_speed;
      const humidity = closestEntry.data.instant.details.relative_humidity || 50;
      const precipitation = closestEntry.data.next_1_hours?.details.precipitation_amount || 0;
      const dayName = targetDate.toLocaleDateString('sv-SE', { weekday: 'long' });
      const shortDay = targetDate.toLocaleDateString('sv-SE', { weekday: 'short' });
      const dateStr = targetDate.toLocaleDateString('sv-SE');

      dailyForecasts.push({
        date: dateStr,
        dayName,
        shortDay,
        symbol,
        description: symbolToEmojiAndDesc[symbol]?.desc || 'Okänt',
        maxTemp: temp,
        minTemp: temp, // Since we're using one entry, max=min
        windSpeed: wind,
        humidity,
        precipitation,
      });
    }
  }

  return dailyForecasts;
};

const generateTempCurve = (data: ForecastData[], width: number, height: number) => {
  if (data.length === 0) return { path: '', fillPath: '', points: [] as { x: number; y: number }[] };

  const temps = data.map(d => d.maxTemp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempRange = maxTemp - minTemp || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d.maxTemp - minTemp) / tempRange) * (height - 20);
    return { x, y };
  });

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cp1x = prev.x + (curr.x - prev.x) / 3;
    const cp1y = prev.y;
    const cp2x = curr.x - (curr.x - prev.x) / 3;
    const cp2y = curr.y;
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }

  const fillPath = path + ` L ${width} ${height} L 0 ${height} Z`;

  return { path, fillPath, points };
};

export default function Vader() {
  const [activeTab, setActiveTab] = useState(0);
  const [weatherData, setWeatherData] = useState<{ [key: string]: ForecastData[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    const loadAllWeather = async () => {
      try {
        const promises = locations.map(loc => fetchWeather(loc.lat, loc.lon));
        const results = await Promise.all(promises);
        const data: { [key: string]: ForecastData[] } = {};
        locations.forEach((loc, index) => {
          data[loc.name] = results[index];
        });
        setWeatherData(data);
      } catch (err) {
        setError('Kunde inte hämta väderdata. Försök igen senare.');
      } finally {
        setLoading(false);
      }
    };
    loadAllWeather();
  }, []);

  const currentLocation = locations[activeTab];
  const currentData = weatherData[currentLocation.name];
  const currentDay = currentData ? currentData[selectedDay] : null;

  const curveData = currentData ? generateTempCurve(currentData, 600, 200) : { path: '', fillPath: '', points: [] };
  const { path, fillPath, points } = curveData;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.tabs}>
          {locations.map((loc, index) => (
            <button
              key={loc.name}
              className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {loc.name}
            </button>
          ))}
        </div>
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Hämtar prognos...</p>
          </div>
        )}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && currentData && currentDay && (
          <div className={styles.weatherWidget}>
            <div className={styles.currentWeather}>
              <div className={styles.locationDate}>
                <h2>{currentLocation.name}</h2>
                <p>{currentDay.date}</p>
              </div>
              <div className={styles.tempIcon}>
                <span className={styles.currentTemp}>{Math.round(currentDay.maxTemp)}°</span>
                <span className={styles.currentIcon}>{symbolToEmojiAndDesc[currentDay.symbol]?.emoji || '☁️'}</span>
              </div>
              <p className={styles.description}>{currentDay.description}</p>
              <div className={styles.details}>
                <span>Nederbörd: {Math.round(currentDay.precipitation * 100)}%</span>
                <span>Luftfuktighet: {Math.round(currentDay.humidity)}%</span>
                <span>Vind: {Math.round(currentDay.windSpeed)} m/s</span>
              </div>
            </div>
            <div className={styles.tempChart}>
              <svg width="600" height="200" className={styles.chartSvg}>
                <defs>
                  <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f5a623" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f5a623" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={fillPath} fill="url(#tempGradient)" />
                <path d={path} fill="none" stroke="#f5a623" strokeWidth="3" />
                {points.map((point: { x: number; y: number }, i: number) => (
                  <g key={i}>
                    <circle cx={point.x} cy={point.y} r="4" fill="#f5a623" />
                    <text x={point.x} y={point.y - 10} textAnchor="middle" className={styles.tempLabel}>
                      {Math.round(currentData[i].maxTemp)}°
                    </text>
                    <text x={point.x} y={point.y + 25} textAnchor="middle" className={styles.dayLabel}>
                      {currentData[i].shortDay}
                    </text>
                    <text x={point.x} y={point.y + 45} textAnchor="middle" className={styles.emojiLabel}>
                      {symbolToEmojiAndDesc[currentData[i].symbol]?.emoji || '☁️'}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <div className={styles.dayCards} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px' }}>
              {currentData.map((day, index) => (
                <div
                  key={day.date}
                  className={`${styles.dayCard} ${selectedDay === index ? styles.selected : ''}`}
                  onClick={() => setSelectedDay(index)}
                >
                  <p className={styles.dayName}>{day.shortDay}</p>
                  <span className={styles.dayIcon}>{symbolToEmojiAndDesc[day.symbol]?.emoji || '☁️'}</span>
                  <p className={styles.dayTemp}>{Math.round(day.maxTemp)}°</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}