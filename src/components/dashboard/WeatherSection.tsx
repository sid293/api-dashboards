'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getWeatherByCity, WeatherData } from '@/services/weather';
import { debounce } from '@/utils/helpers';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { 
  SunIcon, 
  CloudIcon, 
  BoltIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const getWeatherIcon = (weatherCode: string) => {
  const weather = weatherCode.toLowerCase();
  if (weather.includes('clear')) return <SunIcon className="w-16 h-16 text-yellow-500 animate-pulse" />;
  if (weather.includes('cloud')) return <CloudIcon className="w-16 h-16 text-gray-500 animate-bounce" />;
  if (weather.includes('rain')) return <CloudIcon className="w-16 h-16 text-blue-500 animate-bounce" />;
  if (weather.includes('thunder')) return <BoltIcon className="w-16 h-16 text-yellow-500 animate-pulse" />;
  if (weather.includes('snow')) return <ArrowPathIcon className="w-16 h-16 text-blue-300 animate-spin" />;
  return <SunIcon className="w-16 h-16 text-yellow-500" />;
};

export default function WeatherSection() {
  const [search, setSearch] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // Use reverse geocoding to get city name
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
            );
            const data = await response.json();
            if (data && data[0]) {
              setSearch(data[0].name);
            }
          } catch (error) {
            console.error('Error getting location:', error);
            setSearch('London'); 
          } finally {
            setIsDetectingLocation(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setSearch('London'); 
          setIsDetectingLocation(false);
        }
      );
    } else {
      setSearch('London'); 
      setIsDetectingLocation(false);
    }
  }, []);

  const handleSearch = debounce((value: string) => {
    setDebouncedSearch(value);
  }, 500);

  const { data, isLoading, error } = useQuery<WeatherData>({
    queryKey: ['weather', search],
    queryFn: () => getWeatherByCity(search),
    enabled: search !== '' && !isDetectingLocation, 
  });

  useEffect(() => {
    if (data && data.main) {
      console.log("Weather data: ",data.main);
    }
  }, [data]);

  useEffect(()=>{
    handleSearch(search);
  },[search])

  // useEffect(()=>{
  //   console.log("Debounced search: ",debouncedSearch);
  // },[debouncedSearch])

  const chartData = data ? [
    { name: 'Temp', value: data.main.temp },
    { name: 'Feels Like', value: data.main.feels_like },
    { name: 'Humidity', value: data.main.humidity },
    { name: 'Wind', value: data.wind.speed },
  ] : [];

  const tempData = data ? [
    { name: 'Min', value: data.main.temp - 5 },
    { name: 'Current', value: data.main.temp },
    { name: 'Max', value: data.main.temp + 5 },
  ] : [];

  const humidityData = data ? [
    { name: 'Humidity', value: data.main.humidity },
    { name: 'Remaining', value: 100 - data.main.humidity },
  ] : [];

  const windData = data ? [
    { name: 'Wind Speed', value: data.wind.speed },
  ] : [];

  const pressureData = data ? [
    { name: 'Pressure', value: data.main.pressure },
  ] : [];

  const COLORS = ['#3B82F6', '#10B981', '#6366F1', '#F59E0B'];

  if (isDetectingLocation) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3">Detecting your location...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6">Weather Information</h1>
      
      <div className="mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter city name..."
          className="w-full max-w-md px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading && (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500">
          Error loading weather data. Please try again.
        </div>
      )}

      {data && (
        <div className="space-y-8">
          <div className="flex items-center justify-center space-x-4">
            {getWeatherIcon(data.weather[0].main)}
            <div className="text-center">
              <h2 className="text-3xl font-bold">{data.name}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {data.weather[0].description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-lg font-semibold mb-4 text-center">Temperature</h3>
              <div className="h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={tempData}>
                    <defs>
                      <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      fillOpacity={1} 
                      fill="url(#tempGradient)"
                      animationDuration={2000}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}°C`, 'Temperature']}
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-3xl font-bold text-white-500">{data.main.temp}°C</span>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Current</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-lg font-semibold mb-4 text-center">Humidity</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={humidityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#10B981"
                      paddingAngle={5}
                      dataKey="value"
                      animationDuration={2000}
                    >
                      {humidityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#10B981' : '#E5E7EB'} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Value']}
                    />
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-2xl font-bold"
                      fill="currentColor"
                    >
                      {data.main.humidity}%
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-lg font-semibold mb-4 text-center">Wind Speed</h3>
              <div className="h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={windData}>
                    <Bar 
                      dataKey="value" 
                      fill="#6366F1"
                      animationDuration={2000}
                    >
                      <Cell fill="#6366F1" />
                    </Bar>
                    <Tooltip 
                      formatter={(value) => [`${value} m/s`, 'Wind Speed']}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-3xl font-bold text-white-500">{data.wind.speed} m/s</span>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Current</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-lg font-semibold mb-4 text-center">Pressure</h3>
              <div className="h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pressureData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      animationDuration={2000}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} hPa`, 'Pressure']}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-3xl font-bold text-amber-500">{data.main.pressure} hPa</span>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Current</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Weather Metrics Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    animationDuration={2000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 