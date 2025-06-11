import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import type { SpeciesType } from "../types/pokemon.type";
import bg from "../assets/bg.png";

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
        <main className="page-container">

            <div className="w-full p-5 border-2 border-[#183168] rounded-xl flex flex-col justify-center items-center gap-7">

                <div className="w-full flex justify-center items-center">
                    <h1 className="text-2xl font-bold mb-4">
                        포켓몬 종을 골라보아요 :)
                    </h1>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {speciesList.map((species, i) => {
                        const id = species.url.split("/").filter(Boolean).pop();

                        return (
                            <Link
                                key={i}
                                to={`/species/${id}`}
                                className="link"
                            >
                                <div className="text-base font-medium">
                                    No.{id}
                                </div>
                                <div>{species.name}</div>
                            </Link>
                        );
                    })}
                </div>

                <button
                    onClick={() => setOffset((prev) => prev + 20)}
                    disabled={isLoading}
                    className="bg-[#183168] border-2 border-[#183168] text-white p-8 rounded hover:bg-[white] hover:text-[#183168] hover-apply"
                >
                    {isLoading ? (
                        <img
                            src={bg}
                            alt="bg"
                            className="w-20 h-auto animate-spin"
                        />
                    ) : (
                        "더 보기"
                    )}
                </button>
            
            </div>

        </main>
    );
};

export default SpeciesList;
