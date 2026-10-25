import type { Game } from '../types/game';
import type { GameFilters } from '../types/filters';

export const REFERENCE_YEAR = 2024;

export function matchesFilters(game: Game, filters: GameFilters): boolean {
  // 1. Review count bounds
  if (game.reviewCount < filters.minReviews || game.reviewCount > filters.maxReviews) {
    return false;
  }

  // 2. Rating category
  if (filters.rating === 'positive') {
    const isPositive =
      game.ratingCategory === 'Overwhelmingly Positive' ||
      game.ratingCategory === 'Very Positive' ||
      game.ratingCategory === 'Mostly Positive' ||
      game.ratingPercentage >= 70;
    if (!isPositive) return false;
  } else if (filters.rating === 'negative') {
    const isNegativeOrMixed =
      game.ratingCategory === 'Mostly Negative' ||
      game.ratingCategory === 'Very Negative' ||
      game.ratingCategory === 'Mixed' ||
      game.ratingPercentage < 70;
    if (!isNegativeOrMixed) return false;
  }

  // 3. Max game age (in years)
  if (filters.maxAgeYears !== null) {
    const gameAge = REFERENCE_YEAR - game.releaseYear;
    if (gameAge > filters.maxAgeYears) {
      return false;
    }
  }

  // 4. Price range
  if (game.priceUsd < filters.minPrice || game.priceUsd > filters.maxPrice) {
    return false;
  }

  return true;
}

export function filterGames(games: Game[], filters: GameFilters): Game[] {
  return games.filter((game) => matchesFilters(game, filters));
}
