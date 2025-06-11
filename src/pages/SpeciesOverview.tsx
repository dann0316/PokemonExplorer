import type { SpeciesOverviewInfoType } from "../types/pokemon.type";
import LoadingUI from "../components/LoadingUI";
import CommonOverviewPage from "./commonPage/CommonOverviewPage";
import { useRouteData } from '../hooks/useRouteData'
import { useSpeciesOverviewData } from "../hooks/useSpeciesOverviewData";

const SpeciesOverview = () => {
    
    const { speciesId } = useRouteData();

    const { species, error } = useSpeciesOverviewData( speciesId );

    // speceis 못옴(error)
    if (error)
        return <div className="page-container text-red-500">{error.message}</div>;

    // species 오는 중(loading)
    if (!species) return <LoadingUI />;

    // 있으면 렌더링
    // 왜 여기에 해야 species가 있는거지? else 도없는데?
    
    // pokeonDetail이랑 이 부분도 너무 똑같음 이것도 commonpage에 빼기 커스텀 훅 위치랑 구조도 너무 비슷한데;
    // 커스텀 훅에 중복된 state도 좀 있는데 error 같은거 

    // names.name 한국어로
    const koreanName =
        species.names.find((n) => n.language.name === "ko")?.name ??
        species.names.find((n) => n.language.name === "en")?.name;

    // overview info 배열
    const info: SpeciesOverviewInfoType[] = [
        { label: "색", value: species.color.name },
        { label: "타입", value: species.shape.name },
        { label: "행복도", value: species.base_happiness },
        {
            label: "전설 여부",
            value: species.is_legendary ? "전설 포켓몬" : "일반 포켓몬",
        },
        { label: "포켓몬", value: species.varieties },
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

export default SpeciesOverview;