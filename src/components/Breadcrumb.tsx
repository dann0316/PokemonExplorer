import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Breadcrumb = () => {
// useLocation으로 url 경로 얻기
const location = useLocation();

// useParams로 speicesID, pokemonId 추출
const { speciesId, pokemonId } = useParams();

// 포켓몬 종 state
const [speciesName, setSpeciesName] = useState("");

// 포켓몬 이름 state
const [pokemonName, setPokemonName] = useState("");

// 포켓몬 종, 이름 비동기 요청 / dependency arr -> 종, 이름 state
useEffect(() => {
    // 종
    const fetchSpeciesName = async () => {
    try {
        const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${speciesId}`
        );
        setSpeciesName(res.data.name);
    } catch {
        setSpeciesName("Unknown Species");
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
        setPokemonName("Unknown Pokemon");
    }
    };

    // 각각 url에 있으면 요청
    if (speciesId) fetchSpeciesName();
    if (pokemonId) fetchPokemonName();
}, [speciesId, pokemonId]);

// url 경로 분석 true인 것만 남긴 pathnames 배열
const pathnames = location.pathname.split("/").filter(Boolean);

// breadcrumbs 빈 배열
const breadcrumbs = [];

if (pathnames.length === 0) {
    //  pathnames 배열 아무것도 없으면 home만 push
    breadcrumbs.push({ name: "Home", path: "/" });
} else {
    // 있으면 home push하고 다음 뒤로 계속 push
    breadcrumbs.push({ name: "Home", path: "/" });

    if (pathnames[0] === "species") {
    // pathnames 배열 첫 요소 종 일 때

    // breadcrumbs 배열에 species push
    breadcrumbs.push({ name: "Species List", path: "/species" });
    console.log(breadcrumbs);

    // speciesId 까지 있으면
    if (speciesId) {

        // species 뒤로 speciesId push
        breadcrumbs.push({
        name: speciesName || `Species #${speciesId}`,
        path: `/species/${speciesId}`,
        });

        //
        if (pathnames.includes("pokemons")) {
        breadcrumbs.push({
            name: "Pokemon List",
            path: `/species/${speciesId}/pokemons`,
        });

        if (pokemonId) {
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
    <nav className="bg-[white] justify-center items-center border- flex w-full overflow-hidden rounded text-white text-sm font-medium">
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
