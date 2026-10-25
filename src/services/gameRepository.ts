import type { Game } from '../types/game';
import type { GameFilters } from '../types/filters';

export interface GameRepository {
  /**
   * Returns the count of games that match the active filters.
   */
  getEligibleCount(filters: GameFilters): Promise<number>;

  /**
   * Returns all games that match the active filters.
   */
  getEligibleGames(filters: GameFilters): Promise<Game[]>;

  /**
   * Picks a random game matching the filters, prioritizing a new game if possible.
   */
  pickRandomGame(filters: GameFilters, previousGameId?: string): Promise<Game | null>;
}
