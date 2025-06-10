import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Variety {
    pokemon: {
        name: string;
        url: string;
    };
}

interface SpeciesResponse {
    name: string;
    varieties: Variety[];
}

const PokemonList = () => {
    const { speciesId } = useParams();
    const [varieties, setVarieties] = useState<Variety[]>([]);
    const [speciesName, setSpeciesName] = useState("");

    useEffect(() => {
        const fetchVarieties = async () => {
            try {
                const res = await axios.get<SpeciesResponse>(
                    `https://pokeapi.co/api/v2/pokemon-species/${speciesId}`
                );
                setVarieties(res.data.varieties);
                setSpeciesName(res.data.name);
            } catch (error) {
                console.error("Error fetching species data", error);
            }
        };

        if (speciesId) fetchVarieties();
    }, [speciesId]);

    return (
        <div className="page-container">
            <h1 className="text-3xl font-bold mb-6">
                {speciesName} - Pokémon Variants
            </h1>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {varieties.map((v) => {
                    const id = v.pokemon.url.split("/").filter(Boolean).pop(); // Extract ID from URL
                    return (
                        <li key={id}>
                            <Link
                                to={`/species/${speciesId}/pokemons/${id}`}
                                className="block p-4 border rounded hover:bg-gray-100 text-center"
                            >
                                {v.pokemon.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PokemonList;
