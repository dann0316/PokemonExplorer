import { Link } from "react-router-dom";
import { useRouteData } from "../hooks/useRouteData";
import { useName } from "../hooks/useName";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";

const Breadcrumb = () => {
    // 커스텀 훅으로 가져오기
    const { pathnames, speciesId, pokemonId } = useRouteData();

    // useParams가 pokemonId랑 speciesId 제도 못잡음 route 파일로 경로 써서 그런 걸로 추정
    // App.tsx 파일에서 다시 Rotues-Route로 수정 방향

    // 커스텀 훅으로 가져오기
    const { speciesName, pokemonName } = useName(speciesId, pokemonId);

    const breadcrumbs = useBreadcrumbs( pathnames, speciesId, pokemonId, speciesName, pokemonName );

    return (
        <nav className="w-max flex flex-row justify-start items-center border text-white text-sm md:text-base lg:text-lg font-semibold gap-1 py-1 md:py-2">

            {/* breadcrumbs UI */}
            {breadcrumbs.map((a, i) => {

                //
                const isLast = i === breadcrumbs.length - 1;

                const isCurrent = i === breadcrumbs.length - 1;

                return (
                    // breadcrumbs 요소
                    <div
                        key={i}
                        className={`rounded-lg flex justify-center items-center gap-1 lg:gap-2 p-3 lg:p-5 whitespace-nowrap bg-[#183168] ${
                            isCurrent ? "opacity-100" : "opacity-80"
                        }`}
                    >
                        {/* 체크 아이콘 */}
                        <span
                            className={`w-5 lg:w-7 h-5 lg:h-7 rounded-full flex items-center justify-center text-xs font-extrabold bg-[#ffca00] text-white`}
                        >
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