// src/pages/SpeciesList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SpeciesList = () => {

    // 종 state
    const [speciesList, setSpeciesList] = useState([]);
    
    // 
    const [offset, setOffset] = useState(0);

    //
    const [isLoading, setIsLoading] = useState(false);

// 포켓몬 종
const fetchSpecies = async () => {
    setIsLoading(true);
    try {
    const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species?limit=20&offset=${offset}`
    );
    setSpeciesList((prev) => [...prev, ...res.data.results]);
    } catch (err) {
    console.error("Failed to fetch species list:", err);
    } finally {
    setIsLoading(false);
    }
};

useEffect(() => {
    fetchSpecies();
}, [offset]);

return (
    <div className="p-4 max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">포켓몬 종 목록</h1>

    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {speciesList.map((species, i) => {
        const id = species.url.split("/").filter(Boolean).pop();
        
        return (
            <li
            key={i}
            className="border rounded-lg p-4 hover:shadow-md bg-white"
            >
            <Link
                to={`/species/${id}`}
                className="text-blue-500 hover:underline"
            >
                #{id} - {species.name}
            </Link>
            </li>
        );

        })}
    </ul>

        <div className="text-center mt-6">
            <button
            onClick={() => setOffset((prev) => prev + 20)}
            disabled={isLoading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
            {isLoading ? "로딩 중..." : "더 보기"}
            </button>
        </div>
    </div>
);
}

export default SpeciesList;