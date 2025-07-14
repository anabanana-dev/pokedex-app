import { POKEMON_TYPE_COLORS } from "../constants";

type PokemonType = keyof typeof POKEMON_TYPE_COLORS;

const getColorByPokemonType = (type: string) =>
  POKEMON_TYPE_COLORS[type.toLowerCase() as PokemonType];

export default getColorByPokemonType;