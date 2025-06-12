import type { SpeciesOverviewInfoType } from "../types/pokemon.type";
import LoadingUI from "../components/LoadingUI";
import CommonOverviewPage from "./commonPage/CommonOverviewPage";
import { useRouteData } from "../hooks/useRouteData";
import { useSpeciesOverviewData } from "../hooks/useSpeciesOverviewData";
import Breadcrumb from "../components/Breadcrumb";
import { useName } from "../hooks/useName";

const SpeciesOverview = () => {
    const { speciesId } = useRouteData();

    const { species, error } = useSpeciesOverviewData(speciesId);

    const { speciesName } = useName(speciesId);

    // breadcrumb 내부로
    const breadcrumbs = [
        { name: "Home", path: "/" },
        { name: "Species List", path: "/species" },
        {
            // validation용 fallback 표시
            name: speciesName || `Species #${speciesId}`,
            path: `/species/${speciesId}`,
        },
    ];

    // speceis 못옴(error)
    if (error)
        return (
            <div className="container text-red-500">
                <div
                    aria-label="breadcrumb"
                    className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-[#183168] w-[60%]"
                >
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
                {error.message}
            </div>
        );

    // species 오는 중(loading)
    if (!species)
        return (
            <div className="container">
                <div
                    aria-label="breadcrumb"
                    className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-[#183168] w-[60%]"
                >
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
                <LoadingUI />
            </div>
        );

    // names.name 한국어로
    const koreanName =
        species.names.find((n) => n.language.name === "ko")?.name ??
        species.names.find((n) => n.language.name === "en")?.name;

    // overview info arr
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
        <div className="container">
            <div
                aria-label="breadcrumb"
                className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-[#183168] w-[60%]"
            >
                <Breadcrumb breadcrumbs={breadcrumbs} />
            </div>

            <CommonOverviewPage
                loading={!species}
                title={koreanName}
                data={species}
                content={
                    <>
                        {info.map((item, i) => (
                            <div
                                key={i}
                                className="text-base md:text-lg font-bold"
                            >
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
        </div>
    );
};

export default SpeciesOverview;
