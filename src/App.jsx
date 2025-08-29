import React, { useState } from 'react'
import WeatherCard from './components/WeatherCard'

export default function App(){
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [weather, setWeather] = useState(null)

  const fetchWeather = async (e) => {
    e && e.preventDefault()
    if(!city.trim()) { setError('Please enter a city name.'); return; }
    setError(null); setLoading(true); setWeather(null)
    try{
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`)
      if(!geoRes.ok) throw new Error('Failed to fetch geocoding.')
      const geo = await geoRes.json()
      if(!geo.results || geo.results.length === 0) { setError('City not found. Try another name.'); setLoading(false); return; }
      const { latitude, longitude, name, country, timezone } = geo.results[0]

      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=${encodeURIComponent(timezone)}`)
      if(!weatherRes.ok) throw new Error('Failed to fetch weather.')
      const weatherData = await weatherRes.json()
      if(!weatherData.current_weather) throw new Error('No current weather data.')

      setWeather({
        location: `${name}, ${country}`,
        timezone,
        ...weatherData.current_weather
      })
    }catch(err){
      setError(err.message || 'Something went wrong.')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-2">Weather Now</h1>
        <p className="text-sm text-gray-600 mb-4">Quick current weather lookup using Open-Meteo.</p>

        <form onSubmit={fetchWeather} className="flex gap-2">
          <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Enter city (e.g., London)" className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"/>
          <button type="submit" className="bg-sky-600 text-white px-4 py-2 rounded">Search</button>
        </form>

        {loading && <p className="mt-4 text-gray-600">Loading…</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {weather && <WeatherCard data={weather} className="mt-4"/>}

        <footer className="mt-6 text-xs text-gray-500">
          Data from Open-Meteo. Built with React + Tailwind.
        </footer>
      </div>
    </div>
  )
}