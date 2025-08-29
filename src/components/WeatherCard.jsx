import React from 'react'

const weatherCodeToLabel = (code) => {
  const map = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Rime fog',
    51: 'Drizzle: Light',
    53: 'Drizzle: Moderate',
    55: 'Drizzle: Dense',
    61: 'Rain: Slight',
    63: 'Rain: Moderate',
    65: 'Rain: Heavy',
    71: 'Snow: Slight',
    73: 'Snow: Moderate',
    75: 'Snow: Heavy',
    80: 'Rain showers: Slight',
    81: 'Rain showers: Moderate',
    82: 'Rain showers: Violent'
  }
  return map[code] || 'Unknown'
}

export default function WeatherCard({ data }){
  const { temperature, windspeed, weathercode, time, location } = data
  return (
    <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-white to-sky-50 border">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Location</div>
          <div className="font-medium">{location}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Local time</div>
          <div className="font-medium">{time}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-6">
        <div>
          <div className="text-5xl font-bold">{Math.round(temperature)}°C</div>
          <div className="text-sm text-gray-600">{weatherCodeToLabel(weathercode)}</div>
        </div>
        <div className="ml-auto text-sm text-gray-700">
          <div>Wind: {windspeed} km/h</div>
        </div>
      </div>
    </div>
  )
}