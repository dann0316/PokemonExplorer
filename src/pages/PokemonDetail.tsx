import CommonOverviewPage from "./commonPage/CommonOverviewPage";
import LoadingUI from "../components/LoadingUI";
import { useRouteData } from '../hooks/useRouteData';
import { usePokemonData } from "../hooks/usePokemonData";

const PokemonDetail = () => {

    const { pokemonId } = useRouteData();

    const { pokemon, error } = usePokemonData(pokemonId);

    // 단위 맞추기
    const pokemonHeight = pokemon?.height ? (pokemon.height / 10) : undefined;
    const pokemonWeight = pokemon?.weight ? (pokemon.weight / 10) : undefined;

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
                        loading="lazy"
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="w-40 h-40 mb-4"
                    />
                    <ul className="text-lg space-y-2">
                        <li>키: {pokemonHeight} m</li>
                        <li>몸무게: {pokemonWeight} kg</li>
                        <li>
                            타입:{" "}
                            {pokemon.types.map((t) => t.type.name).join(", ")}
                        </li>
                    </ul>
                </>
            }
        />
    );
};

export default PokemonDetail;