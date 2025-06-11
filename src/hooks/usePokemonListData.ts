import { useEffect, useState } from "react";
import type { VarietyType, SpeciesResponseType } from "../types/pokemon.type";
import axios from "axios";

export const usePokemonListData = ( speciesId: string) => {
    
    // varietiesList state
    const [varietiesList, setVarietiesList] = useState<VarietyType[]>([]);

    // speciesName state
    const [speciesName, setSpeciesName] = useState("");

    // error state
    const [error, setError] = useState<Error | null>(null);

    // varieties 요청 함수
    const fetchVarieties = async () => {
            try {
                const res = await axios.get<SpeciesResponseType>(
                    `https://pokeapi.co/api/v2/pokemon-species/${speciesId}`
                );
                setVarietiesList(res.data.varieties);
                setSpeciesName(res.data.name);
            } catch (err) {
                console.error("Error: ", err);

                setError(err as Error);
            }
        };

    useEffect(() => {
        if (speciesId) fetchVarieties();
    }, [speciesId]);

    return { varietiesList, speciesName, error };
};