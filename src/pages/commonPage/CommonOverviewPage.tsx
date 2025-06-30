import { Link } from "react-router-dom";
import type { CommonOverviewPagePropsType } from '../../types/pokemon.type'
import bg from '../../assets/bg.png'

const CommonOverviewPage = ({
    loading,
    title,
    subtitle,
    data,
    content,
    bottomLink,
}: CommonOverviewPagePropsType) => {
    if (loading || !data)
        return (
            <main className="page-container">
                <div role="status" aria-label="로딩 중">
                    <img
                        loading="lazy"
                        src={bg}
                        alt="로딩 중"
                        className="w-[10rem] drop-shadow-2xl animate-spin"
                    />
                    <span className="sr-only">불러오는 중입니다...</span>
                </div>
            </main>
        );

    return (
        <main className="page-container">
            <div className="w-full md:w-2/3 border-2 border-[#183168] p-5 rounded-xl flex flex-col justify-center items-center gap-3">
                <div className="text-base md:text-lg font-medium">
                    No.{data.id}
                </div>
                <h1 className="text-xl md:text-3xl font-bold">{title}</h1>
                {subtitle && (
                    <div className="text-sm text-gray-500">{subtitle}</div>
                )}
                {content}
                {bottomLink && (
                    <Link to={bottomLink.to} className="link mt-4 self-center">
                        {bottomLink.label}
                    </Link>
                )}
            </div>
        </main>
    );
};

export default CommonOverviewPage;
