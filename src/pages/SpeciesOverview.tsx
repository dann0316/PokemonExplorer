import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import type { SpeciesOverviewType, OverviewInfoType } from "../types/pokemon.type";
import LoadingUI from "../components/LoadingUI";
import CommonOverviewPage from "./CommonOverviewPage";

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

    // error UI error 가 나올 구멍이 없는데?
    // speceis 가 없을 때 -> 못옴(error), 오는 중(이건 어떡함)
    if (error)
        return <div className="page-container text-red-500">{error}</div>;

    // species 없을 때 로딩 UI
    if (!species) return <LoadingUI />;

    // 있으면 렌더링
    // 왜 여기에 해야 species가 있는거지? else 도없는데?

    // names.name 한국어
    const koreanName =
        species.names.find((n) => n.language.name === "ko")?.name ??
        species.names.find((n) => n.language.name === "en")?.name;

    // overview info 배열
    const info: OverviewInfoType[] = [
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
        <CommonOverviewPage
            loading={!species}
            title={koreanName}
            data={species}
            content={
                <>
                    {info.map((item, i) => (
                        <div key={i} className="text-base md:text-lg font-bold">
                            {item.label}:{" "}
                            {item.label !== "포켓몬" ? (
                                <span className="font-medium">
                                    {item.value}
                                </span>
                            ) : (
                                <ul>
                                    {item.value.map((v, j) => (
                                        <li className="font-medium" key={j}>
                                            {v.pokemon.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </>
            }
            bottomLink={{
                to: `/species/${speciesId}/pokemons`,
                label: "이 종의 포켓몬 보기",
            }}
        />
    );
}
