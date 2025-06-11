import axios from "axios";
import { useEffect, useState } from "react";
import type { SpeciesOverviewType } from "../types/pokemon.type";

export const useSpeciesOverviewData = ( speciesId:string) => {
    
    // error state
    const [error, setError] = useState<Error | null>(null);

    // species state
    const [species, setSpecies] = useState<SpeciesOverviewType | null>(null);

    // speciesOverview 요청
    const fetchSpeciesOverview = async () => {
        try {
            const res = await axios.get(
                `https://pokeapi.co/api/v2/pokemon-species/${speciesId}`
            );

            setSpecies(res.data);
        } catch (err) {
            console.error("Error :", err);
            
            setError(err as Error);
        }
    };

    useEffect(() => {
        fetchSpeciesOverview();
    }, [speciesId]);
    
    return { species, error };
};