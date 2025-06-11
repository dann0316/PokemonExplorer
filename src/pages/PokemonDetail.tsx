import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bg from "../assets/bg.png";
import axios from "axios";

interface PokemonType {
    type: {
        name: string;
    };
}

interface PokemonDetailData {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
    types: PokemonType[];
}

const PokemonDetail = () => {
    const { pokemonId } = useParams();
    const [pokemon, setPokemon] = useState<PokemonDetailData | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const res = await axios.get<PokemonDetailData>(
                    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
                );
                setPokemon(res.data);
            } catch (error) {
                console.error("Error fetching pokemon detail", error);
            }
        };

        if (pokemonId) fetchPokemon();
    }, [pokemonId]);

    if (!pokemon) return (
            <main className="page-container">
                <div role="status" aria-label="포켓몬 정보 로딩 중">
                    <img
                        src={bg}
                        alt="로딩 중"
                        className="w-[10rem] drop-shadow-2xl animate-bounce"
                    />
                    <span className="sr-only">
                        포켓몬 정보를 불러오는 중입니다...
                    </span>
                </div>
            </main>
        );

    return (
        <div className="page-container">
            <h1 className="text-4xl font-bold mb-4 capitalize">
                {pokemon.name}
            </h1>
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
                    Types: {pokemon.types.map((t) => t.type.name).join(", ")}
                </li>
            </ul>
        </div>
    );
};

export default PokemonDetail;
