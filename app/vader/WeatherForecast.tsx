"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { WEATHER_LOCATIONS as locations } from './locations';
import styles from './vader.module.css';

type ForecastData = {
  date: string;
  dateLabel: string;
  shortDay: string;
  symbol: string;
  description: string;
  maxTemp: number;
  minTemp: number;
  windSpeed: number;
  humidity: number;
  precipitation: number;
};

type TimeseriesEntry = {
  time: string;
  data: {
    instant: { details: { air_temperature?: number; wind_speed?: number; relative_humidity?: number } };
    next_1_hours?: { summary?: { symbol_code?: string }; details?: { precipitation_amount?: number } };
    next_6_hours?: { summary?: { symbol_code?: string }; details?: { precipitation_amount?: number } };
    next_12_hours?: { summary?: { symbol_code?: string } };
  };
};

const TIME_ZONE = 'Europe/Madrid';
const MAX_DAYS = 9;

// Alla symbolkoder från met.no (utan _day/_night/_polartwilight-suffix).
// Se https://api.met.no/weatherapi/weathericon/2.0/documentation
const baseSymbols: { [key: string]: { emoji: string; desc: string } } = {
  clearsky: { emoji: '☀️', desc: 'Klart' },
  fair: { emoji: '🌤️', desc: 'Mestadels klart' },
  partlycloudy: { emoji: '⛅', desc: 'Halvklart' },
  cloudy: { emoji: '☁️', desc: 'Mulet' },
  fog: { emoji: '🌫️', desc: 'Dimma' },
  lightrainshowers: { emoji: '🌦️', desc: 'Lätta regnskurar' },
  rainshowers: { emoji: '🌦️', desc: 'Regnskurar' },
  heavyrainshowers: { emoji: '🌧️', desc: 'Kraftiga regnskurar' },
  lightrainshowersandthunder: { emoji: '⛈️', desc: 'Lätta regnskurar och åska' },
  rainshowersandthunder: { emoji: '⛈️', desc: 'Regnskurar och åska' },
  heavyrainshowersandthunder: { emoji: '⛈️', desc: 'Kraftiga regnskurar och åska' },
  lightsleetshowers: { emoji: '🌨️', desc: 'Lätta byar av snöblandat regn' },
  sleetshowers: { emoji: '🌨️', desc: 'Byar av snöblandat regn' },
  heavysleetshowers: { emoji: '🌨️', desc: 'Kraftiga byar av snöblandat regn' },
  lightssleetshowersandthunder: { emoji: '⛈️', desc: 'Lätta byar av snöblandat regn och åska' },
  sleetshowersandthunder: { emoji: '⛈️', desc: 'Byar av snöblandat regn och åska' },
  heavysleetshowersandthunder: { emoji: '⛈️', desc: 'Kraftiga byar av snöblandat regn och åska' },
  lightsnowshowers: { emoji: '🌨️', desc: 'Lätta snöbyar' },
  snowshowers: { emoji: '🌨️', desc: 'Snöbyar' },
  heavysnowshowers: { emoji: '❄️', desc: 'Kraftiga snöbyar' },
  lightssnowshowersandthunder: { emoji: '⛈️', desc: 'Lätta snöbyar och åska' },
  snowshowersandthunder: { emoji: '⛈️', desc: 'Snöbyar och åska' },
  heavysnowshowersandthunder: { emoji: '⛈️', desc: 'Kraftiga snöbyar och åska' },
  lightrain: { emoji: '🌦️', desc: 'Lätt regn' },
  rain: { emoji: '🌧️', desc: 'Regn' },
  heavyrain: { emoji: '🌧️', desc: 'Kraftigt regn' },
  lightrainandthunder: { emoji: '⛈️', desc: 'Lätt regn och åska' },
  rainandthunder: { emoji: '⛈️', desc: 'Regn och åska' },
  heavyrainandthunder: { emoji: '⛈️', desc: 'Kraftigt regn och åska' },
  lightsleet: { emoji: '🌨️', desc: 'Lätt snöblandat regn' },
  sleet: { emoji: '🌨️', desc: 'Snöblandat regn' },
  heavysleet: { emoji: '🌨️', desc: 'Kraftigt snöblandat regn' },
  lightsleetandthunder: { emoji: '⛈️', desc: 'Lätt snöblandat regn och åska' },
  sleetandthunder: { emoji: '⛈️', desc: 'Snöblandat regn och åska' },
  heavysleetandthunder: { emoji: '⛈️', desc: 'Kraftigt snöblandat regn och åska' },
  lightsnow: { emoji: '🌨️', desc: 'Lätt snöfall' },
  snow: { emoji: '❄️', desc: 'Snöfall' },
  heavysnow: { emoji: '❄️', desc: 'Kraftigt snöfall' },
  lightsnowandthunder: { emoji: '⛈️', desc: 'Lätt snöfall och åska' },
  snowandthunder: { emoji: '⛈️', desc: 'Snöfall och åska' },
  heavysnowandthunder: { emoji: '⛈️', desc: 'Kraftigt snöfall och åska' },
};

const nightEmoji: { [key: string]: string } = {
  clearsky: '🌙',
  fair: '🌙',
  partlycloudy: '☁️',
};

function describeSymbol(symbol: string): { emoji: string; desc: string } {
  const [base, variant] = symbol.split('_');
  const match = baseSymbols[base];
  if (!match) return { emoji: '🌡️', desc: 'Prognos saknas' };
  if (variant === 'night' && nightEmoji[base]) return { emoji: nightEmoji[base], desc: match.desc };
  return match;
}

const partsFormatter = new Intl.DateTimeFormat('sv-SE', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  hour12: false,
});

function localDateAndHour(date: Date): { key: string; hour: number } {
  const parts = partsFormatter.formatToParts(date);
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? '';
  return { key: `${get('year')}-${get('month')}-${get('day')}`, hour: parseInt(get('hour'), 10) % 24 };
}

const fetchWeather = async (lat: number, lon: number): Promise<ForecastData[]> => {
  const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  if (!response.ok) throw new Error('Failed to fetch weather data');
  const data = await response.json();
  const timeseries: TimeseriesEntry[] = data?.properties?.timeseries ?? [];

  type DayBucket = { entries: { hour: number; entry: TimeseriesEntry }[]; precipitation: number };
  const days = new Map<string, DayBucket>();

  timeseries.forEach((entry, i) => {
    const time = new Date(entry.time);
    const { key, hour } = localDateAndHour(time);
    let bucket = days.get(key);
    if (!bucket) {
      bucket = { entries: [], precipitation: 0 };
      days.set(key, bucket);
    }
    bucket.entries.push({ hour, entry });

    // Nederbörd: met.no ger next_1_hours de första ~2,5 dygnen och därefter
    // bara next_6_hours. Summera den period som täcks fram till nästa tidssteg.
    const next = timeseries[i + 1];
    const gapHours = next ? (new Date(next.time).getTime() - time.getTime()) / 3_600_000 : 0;
    const p1 = entry.data.next_1_hours?.details?.precipitation_amount;
    const p6 = entry.data.next_6_hours?.details?.precipitation_amount;
    if (gapHours > 0 && gapHours <= 1 && p1 !== undefined) {
      bucket.precipitation += p1;
    } else if (gapHours >= 6 && p6 !== undefined) {
      bucket.precipitation += p6;
    } else if (gapHours > 1 && gapHours < 6 && p6 !== undefined) {
      bucket.precipitation += (p6 * gapHours) / 6;
    }
  });

  const todayKey = localDateAndHour(new Date()).key;
  const forecasts: ForecastData[] = [];

  for (const [key, bucket] of days) {
    if (forecasts.length >= MAX_DAYS) break;
    // Hoppa över sista dygnet om prognosen inte täcker dagtid.
    const hasDaytime = bucket.entries.some(e => e.hour >= 6 && e.hour <= 18);
    if (key !== todayKey && !hasDaytime) continue;

    const temps = bucket.entries
      .map(e => e.entry.data.instant.details.air_temperature)
      .filter((t): t is number => typeof t === 'number');
    if (temps.length === 0) continue;

    // Representativ tidpunkt: närmast kl. 12 lokal tid.
    const midday = bucket.entries.reduce((best, e) =>
      Math.abs(e.hour - 12) < Math.abs(best.hour - 12) ? e : best
    );
    const d = midday.entry.data;
    const symbol =
      d.next_6_hours?.summary?.symbol_code ||
      d.next_1_hours?.summary?.symbol_code ||
      d.next_12_hours?.summary?.symbol_code ||
      '';

    // Datum vid lokal middag för visning (ger rätt veckodag oavsett besökarens tidszon).
    const labelDate = new Date(`${key}T12:00:00Z`);

    forecasts.push({
      date: key,
      dateLabel: labelDate.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }),
      shortDay: labelDate.toLocaleDateString('sv-SE', { weekday: 'short', timeZone: 'UTC' }),
      symbol,
      description: describeSymbol(symbol).desc,
      maxTemp: Math.max(...temps),
      minTemp: Math.min(...temps),
      windSpeed: d.instant.details.wind_speed ?? 0,
      humidity: d.instant.details.relative_humidity ?? 0,
      precipitation: Math.round(bucket.precipitation * 10) / 10,
    });
  }

  return forecasts;
};

const CHART_WIDTH = 600;
const CHART_HEIGHT = 200;
const CHART_PAD_X = 28;

const generateTempCurve = (data: ForecastData[], width: number, height: number) => {
  if (data.length === 0) return { path: '', fillPath: '', points: [] as { x: number; y: number }[] };

  const temps = data.map(d => d.maxTemp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempRange = maxTemp - minTemp || 1;
  const innerWidth = width - CHART_PAD_X * 2;

  const points = data.map((d, i) => {
    const x = CHART_PAD_X + (data.length > 1 ? (i / (data.length - 1)) * innerWidth : innerWidth / 2);
    const y = 30 + (1 - (d.maxTemp - minTemp) / tempRange) * (height - 90);
    return { x, y };
  });

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cp1x = prev.x + (curr.x - prev.x) / 3;
    const cp2x = curr.x - (curr.x - prev.x) / 3;
    path += ` C ${cp1x} ${prev.y}, ${cp2x} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  const last = points[points.length - 1];
  const fillPath = path + ` L ${last.x} ${height} L ${points[0].x} ${height} Z`;

  return { path, fillPath, points };
};

const normalize = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-');

const findLocationIndex = (cityParam: string | null) => {
  if (!cityParam) return -1;
  const wanted = normalize(cityParam);
  return locations.findIndex(loc => loc.slug === wanted || normalize(loc.name) === wanted);
};

const formatMm = (mm: number) => `${mm.toLocaleString('sv-SE', { maximumFractionDigits: 1 })} mm`;

export default function WeatherForecast() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get('stad');
  const [activeTab, setActiveTab] = useState(() => Math.max(0, findLocationIndex(cityParam)));
  // Synka vald ort när ?stad= ändras (justering under rendering i stället för i en effekt).
  const [prevCityParam, setPrevCityParam] = useState(cityParam);
  if (cityParam !== prevCityParam) {
    setPrevCityParam(cityParam);
    const index = findLocationIndex(cityParam);
    if (index !== -1) setActiveTab(index);
  }
  const [weatherData, setWeatherData] = useState<{ [key: string]: ForecastData[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadAllWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.allSettled(
          locations.map(loc => fetchWeather(loc.lat, loc.lon))
        );
        const data: { [key: string]: ForecastData[] } = {};
        let anySuccess = false;
        locations.forEach((loc, index) => {
          const result = results[index];
          if (result.status === 'fulfilled' && result.value.length > 0) {
            data[loc.name] = result.value;
            anySuccess = true;
          }
        });
        if (!anySuccess) {
          setError('Kunde inte hämta väderprognosen just nu. Försök igen om en stund.');
        }
        setWeatherData(data);
      } catch {
        setError('Kunde inte hämta väderprognosen just nu. Försök igen om en stund.');
      } finally {
        setLoading(false);
      }
    };
    loadAllWeather();
  }, [retryCount]);

  const currentLocation = locations[activeTab];
  const currentData = weatherData[currentLocation.name];
  const dayIndex = currentData ? Math.min(selectedDay, currentData.length - 1) : 0;
  const currentDay = currentData ? currentData[dayIndex] : null;

  const { path, fillPath, points } = currentData
    ? generateTempCurve(currentData, CHART_WIDTH, CHART_HEIGHT)
    : { path: '', fillPath: '', points: [] as { x: number; y: number }[] };

  return (
    <>
      <div className={styles.tabs} role="group" aria-label="Välj ort">
        {locations.map((loc, index) => (
          <button
            key={loc.name}
            type="button"
            className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
            aria-pressed={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            {loc.name}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner} aria-hidden="true"></div>
            <p>Hämtar prognos...</p>
          </div>
        )}
        {error && (
          <div className={styles.error}>
            <p>{error}</p>
            <p className={styles.errorHint}>
              Under tiden kan du läsa om väder och badtemperatur månad för månad i{' '}
              <Link href="/guide/basta-tid-resa-mallorca">guiden till bästa tiden att resa</Link>.
            </p>
            <button type="button" className={styles.retryButton} onClick={() => setRetryCount(c => c + 1)}>
              Försök igen
            </button>
          </div>
        )}
        {!loading && !error && !currentData && (
          <div className={styles.empty}>
            <p>Prognos saknas för {currentLocation.name} just nu.</p>
            <button type="button" className={styles.retryButton} onClick={() => setRetryCount(c => c + 1)}>
              Försök igen
            </button>
          </div>
        )}
      </div>
      {!loading && !error && currentData && currentDay && (
        <div className={styles.weatherWidget}>
          <div className={styles.currentWeather}>
            <div className={styles.locationDate}>
              <h2>{currentLocation.name}</h2>
              <p className={styles.fact}>{currentLocation.fact}</p>
              <p>{currentDay.dateLabel}</p>
            </div>
            <div className={styles.tempIcon}>
              <span className={styles.currentTemp}>{Math.round(currentDay.maxTemp)}°</span>
              <span className={styles.currentIcon} aria-hidden="true">{describeSymbol(currentDay.symbol).emoji}</span>
            </div>
            <p className={styles.description}>{currentDay.description}</p>
            <p className={styles.minMax}>
              Högst {Math.round(currentDay.maxTemp)}° · Lägst {Math.round(currentDay.minTemp)}°
            </p>
            <div className={styles.details}>
              <span>Nederbörd: {formatMm(currentDay.precipitation)}</span>
              <span>Luftfuktighet: {Math.round(currentDay.humidity)} %</span>
              <span>Vind: {Math.round(currentDay.windSpeed)} m/s</span>
            </div>
          </div>
          <div className={styles.tempChart}>
            <svg
              viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
              preserveAspectRatio="xMidYMid meet"
              className={styles.chartSvg}
              style={{ width: '100%', height: 'auto' }}
              role="img"
              aria-label={`Högsta temperatur per dag i ${currentLocation.name}: ${currentData
                .map(d => `${d.shortDay} ${Math.round(d.maxTemp)}°`)
                .join(', ')}`}
            >
              <defs>
                <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#993335" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#993335" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={fillPath} fill="url(#tempGradient)" />
              <path d={path} fill="none" stroke="#993335" strokeWidth="3" />
              {points.map((point, i) => (
                <g key={i}>
                  <circle cx={point.x} cy={point.y} r="4" fill="#993335" />
                  <text x={point.x} y={point.y - 10} textAnchor="middle" className={styles.tempLabel}>
                    {Math.round(currentData[i].maxTemp)}°
                  </text>
                  <text x={point.x} y={point.y + 25} textAnchor="middle" className={styles.dayLabel}>
                    {currentData[i].shortDay}
                  </text>
                  <text x={point.x} y={point.y + 45} textAnchor="middle" className={styles.emojiLabel}>
                    {describeSymbol(currentData[i].symbol).emoji}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div className={styles.dayCards} role="group" aria-label="Välj dag">
            {currentData.map((day, index) => (
              <button
                key={day.date}
                type="button"
                className={`${styles.dayCard} ${dayIndex === index ? styles.selected : ''}`}
                aria-pressed={dayIndex === index}
                aria-label={`${day.dateLabel}: ${day.description}, högst ${Math.round(day.maxTemp)}°, lägst ${Math.round(day.minTemp)}°, nederbörd ${formatMm(day.precipitation)}`}
                onClick={() => setSelectedDay(index)}
              >
                <span className={styles.dayName}>{day.shortDay}</span>
                <span className={styles.dayIcon} aria-hidden="true">{describeSymbol(day.symbol).emoji}</span>
                <span className={styles.dayTemp}>{Math.round(day.maxTemp)}°</span>
                <span className={styles.dayMin}>{Math.round(day.minTemp)}°</span>
              </button>
            ))}
          </div>
          <p className={styles.source}>
            Prognos från Meteorologisk institutt (met.no), licens CC BY 4.0. Uppdateras löpande.
          </p>
        </div>
      )}
    </>
  );
}
