'use client';

import { compass, moodFor, ouluHour, ouluTime, useOulu } from '@/app/lib/oulu';

const minus = (n: number) => String(Math.round(n)).replace('-', '−');

export function OuluNow() {
  const { now, sky } = useOulu();
  const time = now ? ouluTime(now) : '--:--';

  return (
    <div>
      <p className='label'>Oulu, Finland</p>
      <p className='mt-1.5 text-small font-medium text-ivory tabular-nums'>
        <time aria-label={`Local time in Oulu: ${time}`}>{time}</time>
        {sky && (
          <span className='text-haze'>
            {' '}
            · {minus(sky.temp)}°C · {sky.condition}
          </span>
        )}
      </p>
      <p className='mt-0.5 min-h-[1.55em] text-small text-frost' aria-live='polite'>
        {now ? moodFor(ouluHour(now)) : ''}
      </p>
      {sky && (
        <p className='mt-2 text-small text-frost tabular-nums'>
          {sky.sunrise && sky.sunset && `Sun ${sky.sunrise}–${sky.sunset}`}
          {sky.aurora > 0 && sky.kp !== null && (
            <span className='text-ivory'> · Aurora possible (Kp {sky.kp.toFixed(1)})</span>
          )}
        </p>
      )}
    </div>
  );
}

export function SkyNote() {
  const { sky } = useOulu();
  if (!sky) return null;
  return (
    <p className='label'>
      Background follows Oulu’s sky: {sky.condition.toLowerCase()}, {minus(sky.temp)}°C, wind{' '}
      {sky.windSpeed.toFixed(0)} m/s from the {compass(sky.windFrom)}
      {sky.aurora > 0 && ', aurora'}
    </p>
  );
}
