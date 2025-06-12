import CommonListPage from "./commonPage/CommonListPage";
import { useRouteData } from "../hooks/useRouteData";
import { usePokemonListData } from "../hooks/usePokemonListData";
import LoadingUI from "../components/LoadingUI";
import Breadcrumb from "../components/Breadcrumb";

const PokemonList = () => {
    const { speciesId } = useRouteData();

    const { varietiesList, speciesName, error } = usePokemonListData(speciesId);

    // breadcrumb 내부로
    const breadcrumbs = [
        { name: "Home", path: "/" },
        { name: "Species List", path: "/species" },
        {
            name: speciesName || `Species #${speciesId}`,
            path: `/species/${speciesId}`,
        },
        {
            name: "Pokemon List",
            path: `/species/${speciesId}/pokemons`,
        },
    ];

    // varietiesList 못옴(error)
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

    // varietiesList 오는 중(loading)
    if (!varietiesList)
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

    return (
        <div className="container">
            <div
                aria-label="breadcrumb"
                className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-[#183168] w-[60%]"
            >
                <Breadcrumb breadcrumbs={breadcrumbs} />
            </div>

            <CommonListPage
                title={`${speciesName} 중 포켓몬을 골라보아요 :)`}
                items={varietiesList.map((v) => v.pokemon)}
                generateLink={(id) => `/species/${speciesId}/pokemons/${id}`}
            />
        </div>
    );
};

export default PokemonList;
