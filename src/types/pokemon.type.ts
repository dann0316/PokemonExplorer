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
    is_default: boolean;
    pokemon: {
        name: string;
        url: string;
    };
}

export interface SpeciesResponse {
    name: string;
    varieties: Variety[];
}

export interface PokemonType {
    type: {
        name: string;
    };
}

export interface PokemonDetailDataType {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
    types: PokemonType[];
}

export interface CommonListPagePropsType {
    title: string;
    items: { name: string; url: string }[];
    generateLink: (id: string) => string;
    showLoadMore?: boolean;
    onLoadMore?: () => void;
    isLoading?: boolean;
}

export interface OverviewPagePropsType {
    loading: boolean;
    title: string | undefined;
    subtitle?: string;
    data?: any;
    content: React.ReactNode;
    bottomLink?: { to: string; label: string };
}

// SpeciesOvervew type
export interface StringInfo {
    label: "색" | "형태" | "전설 여부";
    value: string;
}

export interface NumberInfo {
    label: "행복도";
    value: number;
}

export interface Variety {
    is_default: boolean;
    pokemon: {
        name: string;
        url: string;
    };
}

export interface VarietyInfo {
    label: "포켓몬";
    value: Variety[] | any[];
}

export type OverviewInfoType = StringInfo | NumberInfo | VarietyInfo;