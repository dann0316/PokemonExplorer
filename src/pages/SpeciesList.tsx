import { useEffect, useState } from "react";
import axios from "axios";
import type { SpeciesType } from "../types/pokemon.type";
import bg from "../assets/bg.png";
import CommonListPage from "./CommonListPage";
import LoadingUI from "../components/LoadingUI";

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

    if(!speciesList) return <LoadingUI />;

    return (
        <CommonListPage
            title="포켓몬 종을 골라보아요 :)"
            items={speciesList}
            generateLink={(id) => `/species/${id}`}
            showLoadMore={true}
            onLoadMore={() => setOffset((prev) => prev + 20)}
            isLoading={isLoading}
        />
    );
};

export default SpeciesList;