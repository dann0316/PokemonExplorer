import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { PokemonDetailDataType } from "../types/pokemon.type";
import CommonOverviewPage from "./CommonOverviewPage";
import LoadingUI from "../components/LoadingUI";

const PokemonDetail = () => {
    const { pokemonId } = useParams();
    const [pokemon, setPokemon] = useState<PokemonDetailDataType | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const res = await axios.get<PokemonDetailDataType>(
                    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
                );
                setPokemon(res.data);
            } catch (error) {
                console.error("Error fetching pokemon detail", error);
            }
        };

        if (pokemonId) fetchPokemon();
    }, [pokemonId]);

    if (!pokemon)
        return (
            <LoadingUI />
        );

    return (
        <CommonOverviewPage
            loading={!pokemon}
            title={pokemon.name}
            data={pokemon}
            content={
                <>
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="w-40 h-40 mb-4"
                    />
                    <ul className="text-lg space-y-2">
                        <li>ID: {pokemon.id}</li>
                        <li>Height: {pokemon.height}</li>
                        <li>Weight: {pokemon.weight}</li>
                        <li>
                            Types:{" "}
                            {pokemon.types.map((t) => t.type.name).join(", ")}
                        </li>
                    </ul>
                </>
            }
        />
    );
};

export default PokemonDetail;
