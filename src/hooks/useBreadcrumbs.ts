// 전역 Breadcrumbs용 훅
import type { BreadcrumbType } from "../types/pokemon.type";

export const useBreadcrumbs = (
    pathnames: string[],
    speciesId?: string,
    pokemonId?: string,
    speciesName?: string,
    pokemonName?: string,
): BreadcrumbType[] => {

    // breadcrumbs 처음 빈 배열
    const breadcrumbs: BreadcrumbType[] = [];

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
                    if (!isNaN(Number(pathnames[3]))) {
                        breadcrumbs.push({
                            name: pokemonName || `Pokemon #${pokemonId}`,
                            path: location.pathname,
                        });
                    }
                }
            }
        }
    }

    return breadcrumbs;
}