import { useQuery } from "react-query";
import axios from "axios";

export const useName = (speciesId?: string, pokemonId?: string) => {
    const {
        data: speciesData,
        isLoading: speciesLoading,
        isError: speciesError,
    } = useQuery(
        ["species", speciesId],
        async () => {
            const res = await axios.get(
                `https://pokeapi.co/api/v2/pokemon-species/${speciesId}`
            );
            return res.data;
        },
        {
            enabled: !!speciesId, // speciesId가 있을 때만 실행
            staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
            retry: 1, // 실패 시 1번만 재시도
        }
    );

    const {
        data: pokemonData,
        isLoading: pokemonLoading,
        isError: pokemonError,
    } = useQuery(
        ["pokemon", pokemonId],
        async () => {
            const res = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
            );
            return res.data;
        },
        {
            enabled: !!pokemonId,
            staleTime: 1000 * 60 * 5,
            retry: 1,
        }
    );

    return {
        speciesName:
            speciesData?.name ?? (speciesError ? "Which Species?" : ""),
        pokemonName:
            pokemonData?.name ?? (pokemonError ? "Which Pokemon?" : ""),
        isLoading: speciesLoading || pokemonLoading,
        isError: speciesError || pokemonError,
    };
};
