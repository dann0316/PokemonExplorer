export interface SpeciesType {
    name: string;
    url: string;
}

export interface SpeciesOverviewType {
    names: {
        name: string;
        language: {
            name: string;
        };
    }[];
    id: number;
    color: {
        name: string;
    };
    shape: {
        name: string;
    };
    base_happiness: number;
    hatch_counter: number;
    is_legendary: boolean;
    varieties: { 
        is_default: boolean;
        pokemon: {
            [key: string]: any
        };
    }[];
}

export interface Variety {
    pokemon: {
        name: string;
        url: string;
    };
}

export interface SpeciesResponse {
    name: string;
    varieties: Variety[];
}