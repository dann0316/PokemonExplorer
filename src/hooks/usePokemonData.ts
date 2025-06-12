import { useEffect, useState } from "react";
import axios from "axios";
import type { PokemonDetailDataType } from "../types/pokemon.type";

export const usePokemonData = (pokemonId?: string) => {

    // 이미지 로딩 state
    const [isLoading, setIsLoading] = useState(true);

    // pokemon data state
    const [pokemon, setPokemon] = useState<PokemonDetailDataType | null>(null);

    // error state
    const [error, setError] = useState<Error | null>(null);

    // pokemon data 요청
    useEffect(() => {
        if (!pokemonId) return;
        const fetchPokemon = async () => {
            try {
                const res = await axios.get<PokemonDetailDataType>(
                    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
                );
                setPokemon(res.data);
            } catch (err) {
                console.error("Error :", err);
            
                setError(err as Error);
            }
        };
        fetchPokemon();
    }, [pokemonId]);

    return { pokemon, error, isLoading, setIsLoading };
};