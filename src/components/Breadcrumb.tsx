import { Link } from "react-router-dom";

interface Crumb {
    name: string;
    path: string;
}

const Breadcrumb = ({ breadcrumbs }: { breadcrumbs: Crumb[] }) => {

    return (
        <div aria-label="breadcrumb" className="overflow-x-auto">
            <nav className="w-full flex flex-row justify-start items-center text-white text-sm md:text-base lg:text-lg font-semibold gap-1">

                {/* breadcrumbs UI */}
                {breadcrumbs.map((a, i) => {
                    
                    const indexBoolean = i === breadcrumbs.length - 1;

                    return (
                        // breadcrumbs 요소
                        <div
                            key={i}
                            className={`rounded-lg flex justify-center items-center gap-1 lg:gap-2 p-3 lg:p-5 whitespace-nowrap bg-[#183168] ${
                                indexBoolean ? "opacity-100" : "opacity-80"
                            }`}
                        >
                            {/* 체크 아이콘 */}
                            <span
                                className={`w-5 lg:w-7 h-5 lg:h-7 rounded-full flex items-center justify-center text-xs font-extrabold bg-[#ffca00] text-white`}
                            >
                                ✓
                            </span>

                            {indexBoolean ? (
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
        </div>
    );
};

export default Breadcrumb;
