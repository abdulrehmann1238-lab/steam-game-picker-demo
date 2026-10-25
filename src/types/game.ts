export type RatingCategory =
  | 'Overwhelmingly Positive'
  | 'Very Positive'
  | 'Mostly Positive'
  | 'Mixed'
  | 'Mostly Negative'
  | 'Very Negative';

export interface Game {
  id: string;
  name: string;
  appId: number;
  releaseDate: string; // YYYY-MM-DD format
  releaseYear: number;
  reviewCount: number;
  ratingCategory: RatingCategory;
  ratingPercentage: number; // 0-100
  priceUsd: number;
  headerImage: string;
  heroImage?: string;
  trailerUrl?: string;
  trailerThumbnail?: string;
  steamUrl: string;
  genres: string[];
  developer?: string;
  publisher?: string;
  shortDescription?: string;
  tags?: string[];
}
