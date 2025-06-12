import { useEffect, useState } from "react";
import axios from "axios";

export const useName = (
    speciesId?: string,
    pokemonId?: string
) => {
    const [speciesName, setSpeciesName] = useState("");
    const [pokemonName, setPokemonName] = useState("");

    useEffect(() => {
        const fetchSpeciesName = async () => {
            try {
                const res = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon-species/${speciesId}`
                );
                setSpeciesName(res.data.name);
            } catch {
                setSpeciesName("Which Species?");
            }
        };

        const fetchPokemonName = async () => {
            try {
                const res = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
                );
                setPokemonName(res.data.name);
            } catch {
                setPokemonName("Which Pokemon?");
            }
        };

        if (speciesId) fetchSpeciesName();
        if (pokemonId) fetchPokemonName();
    }, [speciesId, pokemonId]);

    return { speciesName, pokemonName };
};
