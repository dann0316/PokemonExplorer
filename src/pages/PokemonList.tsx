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
        <main className="page-container">

            <div className="w-full p-5 border-2 border-[#183168] rounded-xl flex flex-col justify-center items-center gap-7">

                <div className="w-full relative flex justify-center items-center">
                    <h1 className="text-2xl font-bold mb-4">
                        {speciesName} 중 포켓몬을 골라보아요 :)
                    </h1>
                </div>

            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5">
                {varieties.map((v) => {
                    const id = v.pokemon.url.split("/").filter(Boolean).pop();
                    return (
                        <li key={id}>
                            <Link
                                to={`/species/${speciesId}/pokemons/${id}`}
                                className="link"
                            >
                                {v.pokemon.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            </div>

        </main>
    );
};

export default PokemonList;
