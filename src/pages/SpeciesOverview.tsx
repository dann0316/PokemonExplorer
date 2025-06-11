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

    // error state
    const [error] = useState(null);

    // speciesOverview 요청
    const fetchSpeciesOverview = async () => {
        try {
            const res = await axios.get(
                `https://pokeapi.co/api/v2/pokemon-species/${speciesId}`
            );

            setSpecies(res.data);
        } catch (err) {
            console.error("Error", err);
        }
    };

    useEffect(() => {
        fetchSpeciesOverview();
    }, [speciesId]);

    // error UI
    if (error)
        return <div className="page-container text-red-500">{error}</div>;

    // species 없을 때 로딩 UI
    if (!species)
        return (
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

    // 있으면 렌더링
    // 왜 여기에 해야 species가 있는거지? else 도없는데?

    // names.name 한국어
    const koreanName =
        species.names.find((n) => n.language.name === "ko")?.name ??
        species.names.find((n) => n.language.name === "en")?.name;

    // overview info 배열
    const info = [
        { label: "색", value: species.color.name },
        { label: "형태", value: species.shape.name },
        { label: "행복도", value: species.base_happiness },
        {
            label: "전설 여부",
            value: species.is_legendary ? "전설 포켓몬" : "일반 포켓몬",
        },
        { label: "포켓몬", value: species.varieties }, // 배열
    ];

    return (
        <main className="page-container">
            <div className="w-2/3 border-2 border-[#183168] p-5 rounded-xl flex flex-col justify-center items-start gap-3">
                <div className="text-base md:text-lg font-medium">
                    No.{species.id}
                </div>
                <h1 className="text-xl md:text-3xl font-bold">{koreanName}</h1>

                {info.map((item, i) => (
                    <div key={i} className="text-base md:text-lg font-bold">
                        {item.label}:{" "}
                        {item.label !== "포켓몬" ? (
                            <span className="font-medium">{item.value}</span>
                        ) : (
                            <ul>
                                {item.value.map((v, j) => (
                                    <li className="font-medium" key={j}>{v.pokemon.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
                <Link to={`/species/${speciesId}/pokemons`} className="link mt-4 self-center">
                    이 종의 포켓몬 보기
                </Link>
            </div>
        </main>
    );
}
