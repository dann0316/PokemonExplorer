import { useLocation, useParams } from "react-router-dom"

export const useRouteData = () => {

    // // url 경로 분석: true인 것만 남긴 pathnames 배열
    // const pathnames = location.pathname.split("/").filter(Boolean);

    // // useParams로 pokemonId 추출 (없으면 pathnames[3])
    // const pokemonId = useParams().pokemonId ?? pathnames[3];

    // // useParams로 speciesId를 추출 (없으면 pathnames[1])
    // const speciesId = useParams().speciesId ?? pathnames[1];

    const location  = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);

    const speciesId = useParams().speciesId ?? pathnames[1];
    const pokemonId = useParams().pokemonId ?? pathnames[3];

    return { pathnames, speciesId, pokemonId };
}