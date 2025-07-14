import { QueryKey } from '@tanstack/react-query';

export const createPaginationKey = (offset: number): QueryKey => [
  'usePaginationList',
  offset,
];

export const createEvolutionKey = (pokemonId: string | number): QueryKey => [
  'useEvolution',
  pokemonId,
];