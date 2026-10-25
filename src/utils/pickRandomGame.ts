import type { Game } from '../types/game';
import type { GameFilters } from '../types/filters';
import { filterGames } from './filterGames';

export function pickRandomGame(
  games: Game[],
  filters: GameFilters,
  previousGameId?: string
): Game | null {
  const eligible = filterGames(games, filters);

  if (eligible.length === 0) {
    return null;
  }

  if (eligible.length === 1) {
    return eligible[0];
  }

  // Avoid picking the exact same game consecutively if there are multiple candidates
  const candidates = previousGameId
    ? eligible.filter((game) => game.id !== previousGameId)
    : eligible;

  const pool = candidates.length > 0 ? candidates : eligible;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}
