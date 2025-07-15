import { Dimensions } from 'react-native';
import About from './About';
import BaseStats from './BaseStats';
import Evolution from './Evolution';

import { PokemonEntity } from '../../services/pokemons/types';

const { width } = Dimensions.get('window');
export const TAB_BUTTON_WIDTH = (width - 48) / 4;

// Tipagem direta aqui 👇
export const tabs: { name: string; slide: React.FC<{ pokemon: PokemonEntity }> }[] = [
  { name: 'About', slide: About },
  { name: 'Base Stats', slide: BaseStats },
  { name: 'Evolution', slide: Evolution },
];
