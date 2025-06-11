import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Breadcrumb = () => {

    // useLocation으로 url 경로 얻기
    const location = useLocation();

    // url 경로 분석: true인 것만 남긴 pathnames 배열
    const pathnames = location.pathname.split("/").filter(Boolean);

    // useParams로 pokemonId 추출 (없으면 pathnames[3])
    const pokemonId = useParams().pokemonId ?? pathnames[3];

    // useParams로 speciesId를 추출 (없으면 pathnames[1])
    const speciesId = useParams().speciesId ?? pathnames[1];

    // useParams가 pokemonId랑 speciesId 제도 못잡음 route 파일로 경로 써서 그런 걸로 추정
    // App.tsx 파일에서 다시 Rotues-Route로 수정 방향

    // 포켓몬 종 (번호 -> 이름) state
    const [speciesName, setSpeciesName] = useState("");

    // 포켓몬 명 (번호 -> 이름) state
    const [pokemonName, setPokemonName] = useState("");

    // 종: 번호 -> 이름 요청 함수
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

    // 명: 번호 -> 이름 요청 함수
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

    useEffect(() => {

        // 각각 있으면 요청
        if (speciesId) fetchSpeciesName();
        if (pokemonId) fetchPokemonName();

    }, [speciesId, pokemonId]);

    // breadcrumbs 처음 빈 배열
    const breadcrumbs = [];

    // pathnames 배열 아무것도 없으면
    if (pathnames.length === 0) {

        // breadcrumbs배열에 home push
        breadcrumbs.push({ name: "Home", path: "/" });

    // pathnames 배열에 뭐 있으면
    } else {

        // breadcurumbs 배열에 home push하고 다음 뒤로 계속 push
        breadcrumbs.push({ name: "Home", path: "/" });

        // pathnames 배열 첫 요소 species면
        if (pathnames[0] === "species") {

            // breadcrumbs 배열에 species push
            breadcrumbs.push({ name: "Species List", path: "/species" });

            // speciesId 까지 있으면
            // if(speciesId) {
            // useParams가 speciesId 제대로 못잡아서 'pathnames 2번째 요소가 숫자면'으로 수정
            if (!isNaN(Number(pathnames[1]))) {
            
                // breadcrumbs 배열에 종 이름 push (없으면 번호)
                breadcrumbs.push({
                    name: speciesName || `Species #${speciesId}`,
                    path: `/species/${speciesId}`
                })

                // pathnames 배열 두 번째 요소 pokemons면
                if (pathnames[2] === "pokemons") {
                    breadcrumbs.push({
                        name: "Pokemon List",
                        path: `/species/${speciesId}/pokemons`,
                    });

                    //// pokemonId 까지 있으면
                    // if(pokemonId) {
                    // useParams가 pokemonId 제대로 못잡아서 'pathnames 3번째 요소가 숫자면'으로 수정
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

        <nav className="w-max flex flex-row justify-start items-center border text-white text-sm md:text-base lg:text-lg font-semibold gap-1 py-1 md:py-2">

            {/* breadcrumbs UI */}
            {breadcrumbs.map((a, i) => {

                // 
                const isLast = i === breadcrumbs.length - 1;
                
                const isPrev = i < breadcrumbs.length - 1; // 이전 단계

                const isCurrent = i === breadcrumbs.length - 1;

                return (

                    // breadcrumbs 요소
                    <div key={i}
                        className={`rounded-lg flex justify-center items-center gap-1 lg:gap-2 p-3 lg:p-5 whitespace-nowrap bg-[#183168] ${isCurrent ? "opacity-100" : "opacity-80"}`}>
                        
                        {/* 체크 아이콘 */}
                        <span className={`w-5 lg:w-7 h-5 lg:h-7 rounded-full flex items-center justify-center text-xs font-extrabold bg-[#ffca00] text-white`}>
                            ✓
                        </span>

                        {isLast ? (
                            <span>{a.name}</span>
                        ) : (
                            <Link
                                to={a.path}
                                className="hover:text-[#ffca00] hover-apply"
                            >
                                {a.name}
                            </Link>
                        )}

                    </div>

                );
            })}

        </nav>
    );
};

export default Breadcrumb;
