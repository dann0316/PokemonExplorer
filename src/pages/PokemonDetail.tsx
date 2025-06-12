import CommonOverviewPage from "./commonPage/CommonOverviewPage";
import LoadingUI from "../components/LoadingUI";
import { useRouteData } from "../hooks/useRouteData";
import { usePokemonData } from "../hooks/usePokemonData";
import Breadcrumb from "../components/Breadcrumb";
import { useName } from "../hooks/useName";

const PokemonDetail = () => {
    const { speciesId, pokemonId } = useRouteData();

    const { speciesName, pokemonName } = useName(speciesId, pokemonId);

    const { pokemon, error, isLoading, setIsLoading } =
        usePokemonData(pokemonId);

    const breadcrumbs = [
        { name: "Home", path: "/" },
        { name: "Species List", path: "/species" },
        {
            // validation용 fallback 표시
            name: speciesName || `Species #${speciesId}`,
            path: `/species/${speciesId}`,
        },
        {
            name: "Pokemon List",
            // validation용 fallback 표시
            path: `/species/${speciesId}/pokemons`,
        },
        {   
            // validation용 fallback 표시
            name: pokemonName || `Pokemon #${pokemonId}`,
            path: location.pathname,
        },
    ];

    // 키, 몸무게 단위 맞추기
    const pokemonHeight = pokemon?.height ? pokemon.height / 10 : undefined;
    const pokemonWeight = pokemon?.weight ? pokemon.weight / 10 : undefined;

    // pokemon 못옴(error)
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
    if (!pokemon)
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
                            onLoad={() => setIsLoading(false)}
                            className={`w-40 h-40 transition-opacity duration-500 ${
                                isLoading ? "opacity-0" : "opacity-100"
                            }`}
                        />
                        <ul className="text-lg space-y-2">
                            <li>키: {pokemonHeight} m</li>
                            <li>몸무게: {pokemonWeight} kg</li>
                            <li>
                                타입:{" "}
                                {pokemon.types
                                    .map((t) => t.type.name)
                                    .join(", ")}
                            </li>
                        </ul>
                    </>
                }
            />
        </div>
    );
};

export default PokemonDetail;
