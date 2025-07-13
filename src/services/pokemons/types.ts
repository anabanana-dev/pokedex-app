export type PokemonEntity = {
    id: number;
    name: string;
    description: string;
    image: string;
    genera: string;
    pokedexNumber: string;
    baseExperience: number;
    types: Type[];
    stats: Stat[];
    height: number;
    weight: number;
    abilities: Ability[];
    genderRate: number;
    eggGroups: EggGroup[];
};
export type Type = {
    slot?: number;
    type: {
        name: string;
        url: string;
    };
};

export type Stat = {
    baseStat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
};

export type Ability = {
    ability: {
        name: string;
        url: string;
    };
    isHidden: boolean;
    slot: number;
};

export type EggGroup = {
    name: string;
    url: string;
};
