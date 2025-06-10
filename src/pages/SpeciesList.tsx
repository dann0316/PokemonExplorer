import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import type { SpeciesType } from "../types/pokemon.type";
import BackButton from "../components/BackButton";

const SpeciesList = () => {
    // 종 state arr
    const [speciesList, setSpeciesList] = useState<SpeciesType[]>([]);

    // offset state
    const [offset, setOffset] = useState<number>(0);

    // 데이터 로딩 state
    const [isLoading, setIsLoading] = useState(false);

    // 포켓몬 종 불러오는 함수 limit 20, offset button 클릭 시 +20
    const fetchSpecies = async () => {
        // 요청하면 loading state true
        setIsLoading(true);

        // 요청
        try {
            const res = await axios.get(
                `https://pokeapi.co/api/v2/pokemon-species?limit=20&offset=${offset}`
            );

            // speciesList state에 새 데이터 추가
            setSpeciesList((arr) => [...arr, ...res.data.results]);
        } catch (err) {
            console.error("Error", err);
        } finally {
            setIsLoading(false);
        }
    };

    // dependency - offset state
    useEffect(() => {
        fetchSpecies();
    }, [offset]);

    return (
        <div className="page-container pt-16">

            <div className="w-full relative flex justify-center items-center">

                <h1 className="text-2xl font-bold mb-4">
                    Pokemon Species List
                </h1>

                <div className="absolute right-20">
                    <BackButton />
                </div>
                
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {speciesList.map((species, i) => {
                    const id = species.url.split("/").filter(Boolean).pop();

                    return (
                        <Link key={i} to={`/species/${id}`} className="link">
                            No.{id} - {species.name}
                        </Link>
                    );
                })}
            </div>

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
};

export default SpeciesList;
