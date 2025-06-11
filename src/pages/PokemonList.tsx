import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommonListPage from "./CommonListPage";

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
        <CommonListPage
            title={`${speciesName} 중 포켓몬을 골라보아요 :)`}
            items={varieties.map((v) => v.pokemon)}
            generateLink={(id) => `/species/${speciesId}/pokemons/${id}`}
        />
    );
};

export default PokemonList;
