import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Breadcrumb = () => {
    // useLocation으로 url 경로 얻기
    const location = useLocation();

    // url 경로 분석 true인 것만 남긴 pathnames 배열
    const pathnames = location.pathname.split("/").filter(Boolean);

    // useParams로 speicesID, pokemonId 추출
    const pokemonId = useParams().pokemonId ?? pathnames[3];

    // useParams가 speciesId를 제대로 못잡아서 따로 추출, pathnames[1]까지
    const speciesId = useParams().speciesId ?? pathnames[1];

    // 포켓몬 종 state
    const [speciesName, setSpeciesName] = useState("");

    // 포켓몬 이름 state
    const [pokemonName, setPokemonName] = useState("");

    // Species랑 Pokemon name을 breadcrumb에 넣기 위한 요청
    useEffect(() => {
        // 종
        const fetchSpeciesName = async () => {
            try {
                const res = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon-species/${speciesId}`
                );
                setSpeciesName(res.data.name);
            } catch {
                setSpeciesName("Which Species?");
            }
        };

        // 이름
        const fetchPokemonName = async () => {
            try {
                const res = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
                );
                setPokemonName(res.data.name);
            } catch {
                setPokemonName("Which Pokemon?");
            }
        };

        // 각각 url에 있으면 요청
        if (speciesId) fetchSpeciesName();
        if (pokemonId) fetchPokemonName();
    }, [speciesId, pokemonId]);


    // breadcrumbs 빈 배열
    const breadcrumbs = [];

    if (pathnames.length === 0) {
        //  pathnames 배열 아무것도 없으면 home만 push
        breadcrumbs.push({ name: "Home", path: "/" });
    } else {
        // 있으면 home push하고 다음 뒤로 계속 push
        breadcrumbs.push({ name: "Home", path: "/" });

        // pathnames 배열 첫 요소 species면
        if (pathnames[0] === "species") {

            // breadcrumbs 배열에 species push
            breadcrumbs.push({ name: "Species List", path: "/species" });

            // speciesId 까지 있으면
            // if(speciesId) {}
            if (!isNaN(Number(pathnames[1]))) {
                
                //
                // breadcrumbs.push({
                //     name: speciesName || `Species #${pathnames[1]}`,
                //     path: `/species/:${speciesId}`,
                // });

                breadcrumbs.push({
                    name: speciesName || `${speciesId}`,
                    path: `/species/${speciesId}`
                })

                // includes 흠
                if (pathnames.includes("pokemons")) {
                    breadcrumbs.push({
                        name: "Pokemon List",
                        path: `/species/${speciesId}/pokemons`,
                    });

                    // 또 못잡음 useParams가 
                    // if (pokemonId) {
                    if(!isNaN(Number(pathnames[3]))) {
                        breadcrumbs.push({
                            name: pokemonName || `Pokemon #${pokemonId}`,
                            path: location.pathname,
                        });
                    }
                }
            }
        }
    }

    return (
        <nav className="justify-center items-center border- flex w-full overflow-hidden rounded text-white text-sm font-medium">
            {breadcrumbs.map((crumb, index) => {


                const isLast = index === breadcrumbs.length - 1;
                const isCompleted = index < breadcrumbs.length - 1; // 이전 단계
                const isCurrent = index === breadcrumbs.length - 1;

                return (
                    <div
                        key={index}
                        className={`relative rounded-lg flex items-center gap-2 px-6 py-3 bg-[#938cf6] ${
                            !isLast ? "mr-[1px]" : ""
                        } ${isCurrent ? "opacity-60" : "opacity-100"}
        ${
            !isLast
                ? "after:absolute after:right-0 after:top-0 after:h-full after:w-4 after:bg-[#938cf6] after:clip-path-arrow"
                : ""
        }
        `}
                    >
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                                isCompleted || isCurrent
                                    ? "bg-green-300 text-white"
                                    : "bg-gray-300"
                            }`}
                        >
                            ✓
                        </div>
                        {isLast ? (
                            <span>{crumb.name}</span>
                        ) : (
                            <Link
                                to={crumb.path}
                                className="hover:text-[#3a3498] transition duration-300"
                            >
                                {crumb.name}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
