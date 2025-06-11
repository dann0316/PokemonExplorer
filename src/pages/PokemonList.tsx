import CommonListPage from "./commonPage/CommonListPage";
import { useRouteData } from "../hooks/useRouteData";
import { usePokemonListData } from "../hooks/usePokemonListData";
import LoadingUI from "../components/LoadingUI";

const PokemonList = () => {

    const { speciesId } = useRouteData();

    const { varietiesList, speciesName, error } = usePokemonListData( speciesId );

    // varietiesList 못옴(error)
    if (error)
        return <div className="page-container text-red-500">{error.message}</div>;

    // varietiesList 오는 중(loading)
    if (!varietiesList) return <LoadingUI />;

    return (
        <CommonListPage
            title={`${speciesName} 중 포켓몬을 골라보아요 :)`}
            items={varietiesList.map((v) => v.pokemon)}
            generateLink={(id) => `/species/${speciesId}/pokemons/${id}`}
        />
    );
};

export default PokemonList;
