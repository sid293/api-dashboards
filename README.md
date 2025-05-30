# API Dashboard

A modern api dashboard built with Next.js 13+ and TypeScript, featuring real-time weather data, interactive charts, and location-based weather information.

## Features

- 🌍 Real-time weather data from OpenWeatherMap API
- 📍 Automatic location detection
- 📊 Interactive weather metrics with animated charts
  - Temperature trends
  - Humidity levels
  - Wind speed
  - Atmospheric pressure
- 🎨 Modern UI with dark mode support
- 📱 Responsive design
- 🔍 City search functionality

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- React Query for data fetching
- Redux Toolkit for state management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
   ```
   NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── layout.tsx    # Dashboard layout
│   │   ├── page.tsx      # Dashboard home
│   │   └── weather/
│   │       └── page.tsx  # Weather page
│   └── layout.tsx        # Root layout
├── components/
│   └── dashboard/
│       ├── WeatherSection.tsx
│       └── NewsSection.tsx
├── services/
│   └── weather.ts        # Weather API service
└── store/
    └── index.ts         # Redux store configuration
```

## Screenshots

![News Section](/news-section.png)

## Environment Variables

- `NEXT_PUBLIC_WEATHER_API_KEY`: Your OpenWeatherMap API key
- `NEXT_PUBLIC_NEWS_API_KEY`: Your News API key

