import type { Game } from '../types/game';
import type { GameFilters } from '../types/filters';
import type { GameRepository } from './gameRepository';
import { MOCK_GAMES } from '../data/games';
import { filterGames } from '../utils/filterGames';
import { pickRandomGame } from '../utils/pickRandomGame';

export class MockGameRepository implements GameRepository {
  private games: Game[];

  constructor(customGames?: Game[]) {
    this.games = customGames || MOCK_GAMES;
  }

  async getEligibleCount(filters: GameFilters): Promise<number> {
    return filterGames(this.games, filters).length;
  }

  async getEligibleGames(filters: GameFilters): Promise<Game[]> {
    return filterGames(this.games, filters);
  }

  async pickRandomGame(filters: GameFilters, previousGameId?: string): Promise<Game | null> {
    return pickRandomGame(this.games, filters, previousGameId);
  }
}

export const defaultGameRepository = new MockGameRepository();
