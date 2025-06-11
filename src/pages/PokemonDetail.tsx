import CommonOverviewPage from "./commonPage/CommonOverviewPage";
import LoadingUI from "../components/LoadingUI";
import { useRouteData } from '../hooks/useRouteData';
import { usePokemonData } from "../hooks/usePokemonData";

const PokemonDetail = () => {

    // 커스텀 훅으로 가져오기
    const { pokemonId } = useRouteData();

    // 커스텀 훅으로 가져오기
    const { pokemon, error } = usePokemonData(pokemonId);

    // pokemon 못옴(error)
    if (error)
        return <div className="page-container text-red-500">{error.message}</div>;

    // species 오는 중(loading)
    if (!pokemon) return <LoadingUI />;

    return (
        <CommonOverviewPage
            loading={!pokemon}
            title={pokemon.name}
            data={pokemon}
            content={
                <>
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="w-40 h-40 mb-4"
                    />
                    <ul className="text-lg space-y-2">
                        <li>ID: {pokemon.id}</li>
                        <li>Height: {pokemon.height}</li>
                        <li>Weight: {pokemon.weight}</li>
                        <li>
                            Types:{" "}
                            {pokemon.types.map((t) => t.type.name).join(", ")}
                        </li>
                    </ul>
                </>
            }
        />
    );
};

export default PokemonDetail;