import axios from "axios";
import { useEffect, useState } from "react";
import type { SpeciesType } from "../types/pokemon.type";

export const useSpeicesListData = () => {

    // 더보기 로딩 state
    const [isLoading, setIsLoading] = useState(false);

    // speciesList state arr
    const [speciesList, setSpeciesList] = useState<SpeciesType[]>([]);

    // offset state
    const [offset, setOffset] = useState<number>(0);

    const [error, setError] = useState<Error | null>(null);

    // 포켓몬 종 불러오는 함수 limit 20, offset button 클릭 시 +20
    const fetchSpecies = async () => {

        // 요청하면 loading state true
        setIsLoading(true);

        try {
            const res = await axios.get(
                `https://pokeapi.co/api/v2/pokemon-species?limit=20&offset=${offset}`
            );

            // speciesList state에 새 데이터 추가
            setSpeciesList((arr) => [...arr, ...res.data.results]);

        } catch (err) {

            console.error("Error :", err);

            setError(err as Error);
        } finally {

            setIsLoading(false);

        }
    };

    useEffect(() => {
        fetchSpecies();
    }, [offset]);

    return { isLoading, speciesList, setOffset, error }
}