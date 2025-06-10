import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import bg from "../assets/bg.png";
import type { SpeciesOverviewType } from "../types/pokemon.type";

export default function SpeciesOverview() {
    // speciesId 추출
    const { speciesId } = useParams();

    // species state
    const [species, setSpecies] = useState<SpeciesOverviewType | null>(null);

    // pokemon img state
    const [pokemonImg, setPokemonImg] = useState<string | undefined>(undefined);

    // 데이터 로딩 state
    const [isLoading, setIsLoading] = useState(false);

    // error state
    const [error] = useState(null);

    // speciesOverview 요청
    const fetchSpeciesOverview = async () => {

      setIsLoading(true);
        try {
            const res = await axios.get(
                `https://pokeapi.co/api/v2/pokemon-species/${speciesId}`
            );

            setSpecies(res.data);

        } catch (err) {
            console.error("Error", err);
        }
    };

    // pokemonImg 요청
    const fetchPokemonImg = async () => {

      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${speciesId}`
        );
      setPokemonImg(res.data.sprites.front_default);
      } catch (err) {
        console.error("Error", err);
      }
    }

    useEffect(() => {
        fetchSpeciesOverview();
        fetchPokemonImg();
    }, [speciesId]);

    // error일 때 error 띄우기
    if (error)
        return <div className="page-container text-red-500">{error}</div>;

    // 로딩 UI
    if (!species)
        return (
            <main className="page-container">
                <div role="status" aria-label="포켓몬 정보 로딩 중">
                    <img
                        src={bg}
                        alt="로딩 중"
                        className="w-[10rem] drop-shadow-2xl animate-bounce"
                    />
                    <span className="sr-only">포켓몬 정보를 불러오는 중입니다...</span>
                </div>
            </main>
        );

    // names.name 한국어
    const koreanName =
        species.names.find((n) => n.language.name === "ko")?.name ??
        species.names.find((n) => n.language.name === "en")?.name;
        
    return (
        <main className="page-container">
            <h1 className="text-3xl font-bold mb-2">
                {koreanName} (#{species.id})
                <img src={pokemonImg} alt="포켓몬 이미지" />
            </h1>
            <p className="text-gray-600 mb-4"> 색: {species.color.name}</p>
            <p className="text-gray-600 mb-4"> 형태: {species.shape.name}</p>
            <p className="text-gray-600 mb-4">
                행복도: {species.base_happiness}
            </p>
            <p className="text-gray-600 mb-4">
                전설 여부:{" "}
                {species.is_legendary ? "전설 포켓몬" : "일반 포켓몬"}
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                Forms (Varieties)
            </h2>
            <div className="grid grid-cols-2 gap-4">
                {species.varieties.map((v, i) => (
                    <div key={i} className="border rounded p-2">
                        <p className="text-blue-600">{v.pokemon.name}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <Link
                    to={`/species/${speciesId}/pokemons`}
                    className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                >
                    이 종의 포켓몬 보기 →
                </Link>
            </div>
        </main>
    );
}
