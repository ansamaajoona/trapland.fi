'use client';

import { useEffect, useState } from 'react';

const OULU = { lat: 65.0121, lon: 25.4651, tz: 'Europe/Helsinki' };

export type Precip = 'none' | 'snow' | 'rain';
export type Phase = 'day' | 'twilight' | 'night';

export interface OuluSky {
  temp: number; // °C
  windSpeed: number; // m/s
  windFrom: number; // degrees the wind blows from
  cloud: number; // 0..100 %
  precip: Precip;
  fog: boolean;
  condition: string;
  phase: Phase;
  sunrise: string | null; // HH:MM, Oulu time
  sunset: string | null;
  kp: number | null; // planetary K index, 0..9
  aurora: number; // 0..1 how visible the aurora would be right now
}

declare global {
  interface Window {
    __ouluSky?: OuluSky;
  }
}

function conditionFor(code: number) {
  if (code === 0) return 'Clear';
  if (code <= 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Fog';
  if (code <= 57) return 'Drizzle';
  if (code <= 67) return 'Rain';
  if (code <= 77) return 'Snow';
  if (code <= 82) return 'Showers';
  if (code <= 86) return 'Snow showers';
  return 'Thunderstorm';
}

function precipFor(code: number): Precip {
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95) return 'rain';
  return 'none';
}

const minutes = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));

function phaseFor(now: string, isDay: boolean, sunrise: string | null, sunset: string | null): Phase {
  const m = minutes(now);
  const near = (t: string | null) => t !== null && Math.abs(m - minutes(t)) <= 50;
  if (near(sunrise) || near(sunset)) return 'twilight';
  return isDay ? 'day' : 'night';
}

// Aurora at Oulu's latitude is plausible from about Kp 3, but only in the dark and under a clear-ish sky.
function auroraFor(kp: number | null, phase: Phase, cloud: number) {
  if (kp === null || phase === 'day') return 0;
  const strength = Math.min(1, Math.max(0, (kp - 2.5) / 3.5));
  const sky = phase === 'night' ? 1 : 0.4;
  const visible = strength * sky * Math.max(0, 1 - cloud / 90);
  return visible < 0.15 ? 0 : visible;
}

// ?sky=snow|rain|fog|aurora previews a state without waiting for the weather.
function preview(sky: OuluSky): OuluSky {
  const mode = new URLSearchParams(window.location.search).get('sky');
  switch (mode) {
    case 'snow':
      return { ...sky, precip: 'snow', condition: 'Snow', temp: Math.min(sky.temp, -8), cloud: 90 };
    case 'rain':
      return { ...sky, precip: 'rain', condition: 'Rain', cloud: 95 };
    case 'fog':
      return { ...sky, fog: true, condition: 'Fog' };
    case 'aurora':
      return { ...sky, phase: 'night', cloud: 10, kp: Math.max(sky.kp ?? 0, 5.7), aurora: 0.9, condition: 'Clear' };
    default:
      return sky;
  }
}

export function ouluTime(now = new Date()) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: OULU.tz,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(now);
}

export const ouluHour = (now = new Date()) => Number(ouluTime(now).slice(0, 2));

async function latestKp() {
  try {
    const r = await fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json');
    const rows: unknown[] = await r.json();
    const last = rows[rows.length - 1];
    const kp = Array.isArray(last) ? Number(last[1]) : Number((last as { Kp?: number }).Kp);
    return Number.isFinite(kp) ? kp : null;
  } catch {
    return null;
  }
}

let request: Promise<OuluSky | null> | null = null;

export function loadOuluSky(): Promise<OuluSky | null> {
  if (request) return request;
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${OULU.lat}&longitude=${OULU.lon}` +
    '&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,is_day,cloud_cover' +
    '&daily=sunrise,sunset&forecast_days=1&wind_speed_unit=ms&timezone=Europe%2FHelsinki';
  request = Promise.all([fetch(url).then((r) => (r.ok ? r.json() : null)), latestKp()])
    .then(([data, kp]) => {
      const c = data?.current;
      if (!c) return null;
      const sunrise: string | null = data.daily?.sunrise?.[0]?.slice(11, 16) ?? null;
      const sunset: string | null = data.daily?.sunset?.[0]?.slice(11, 16) ?? null;
      const phase = phaseFor(ouluTime(), c.is_day === 1, sunrise, sunset);
      const sky = preview({
        temp: c.temperature_2m,
        windSpeed: c.wind_speed_10m,
        windFrom: c.wind_direction_10m,
        cloud: c.cloud_cover,
        precip: precipFor(c.weather_code),
        fog: c.weather_code === 45 || c.weather_code === 48,
        condition: conditionFor(c.weather_code),
        phase,
        sunrise,
        sunset,
        kp,
        aurora: auroraFor(kp, phase, c.cloud_cover),
      });
      window.__ouluSky = sky;
      window.dispatchEvent(new Event('oulu-sky'));
      return sky;
    })
    .catch(() => null);
  return request;
}

const COMPASS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
export const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];

export function moodFor(hour: number) {
  if (hour < 6) return 'Probably asleep. Or debugging.';
  if (hour < 9) return 'Coffee in progress.';
  if (hour < 12) return 'Peak focus hours.';
  if (hour < 13) return 'Lunch. Back soon.';
  if (hour < 17) return 'Probably writing TypeScript.';
  if (hour < 20) return 'Off the clock. Mostly.';
  return 'Gaming, probably.';
}

export function useOulu() {
  const [now, setNow] = useState<Date | null>(null);
  const [sky, setSky] = useState<OuluSky | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 20_000);
    loadOuluSky().then(setSky);
    return () => window.clearInterval(id);
  }, []);

  return { now, sky };
}
