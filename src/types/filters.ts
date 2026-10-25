export type RatingFilter = 'all' | 'positive' | 'negative';
export type AgeFilter = 1 | 3 | 5 | 10 | null;

export interface GameFilters {
  minReviews: number;
  maxReviews: number;
  rating: RatingFilter;
  maxAgeYears: AgeFilter;
  minPrice: number;
  maxPrice: number;
}

export type AppStage = 'landing' | 'filters' | 'vault';

export type RevealPhase =
  | 'idle'
  | 'anticipating'
  | 'opening'
  | 'burst'
  | 'revealing'
  | 'complete';
