import axios from 'axios';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
}

export const getTopHeadlines = async (category?: string): Promise<NewsResponse> => {
  const response = await axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      country: 'us',
      category,
    },
    headers: {
      'X-Api-Key': NEWS_API_KEY,
    },
  });
  return response.data;
}; 