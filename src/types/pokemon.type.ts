// useSpeicesListData Type
export interface SpeciesType {
    name: string;
    url: string;
}

// useSpeciesOverviewData Type
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

// usePokemonListData Types
export interface VarietyType {
    is_default: boolean;
    pokemon: {
        name: string;
        url: string;
    };
}

export interface SpeciesResponseType {
    name: string;
    varieties: VarietyType[];
}
// usePokemonListData Types 여기까지

// usePokemonData Type
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
// usePokemonData Type 여기까지


// CommonListPage Type
export interface CommonListPagePropsType {
    title: string;
    items: { name: string; url: string }[];
    generateLink: (id: string) => string;
    showLoadMore?: boolean;
    onLoadMore?: () => void;
    isLoading?: boolean;
}

// CommonOverviewPage Type
export interface CommonOverviewPagePropsType {
    loading: boolean;
    title: string | undefined;
    subtitle?: string;
    data?: any;
    content: React.ReactNode;
    bottomLink?: { to: string; label: string };
}

// SpeciesOvervew Type
export interface StringInfo {
    label: "색" | "타입" | "전설 여부";
    value: string;
}

export interface NumberInfo {
    label: "행복도";
    value: number;
}

export interface VarietyInfo {
    label: "포켓몬";
    value: VarietyType[] | any[];
}

export type SpeciesOverviewInfoType = StringInfo | NumberInfo | VarietyInfo;
// SpeciesOverviewInfo Type 여기까지

// useBreadcrumbs, Breadcrumb Type
export interface BreadcrumbType {
    name: string;
    path: string;
}