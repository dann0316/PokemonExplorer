import { Link } from "react-router-dom";
import type { CommonListPagePropsType } from '../types/pokemon.type'

const CommonListPage = ({
    title,
    items,
    generateLink,
    showLoadMore = false,
    onLoadMore,
    isLoading,
}: CommonListPagePropsType) => {
    
    return (
        <main className="page-container">
            <div className="w-full p-5 border-2 border-[#183168] rounded-xl flex flex-col justify-center items-center gap-7">
                <div className="w-full flex justify-center items-center">
                    <h1 className="text-2xl font-bold mb-4">{title}</h1>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {items.map((item, i) => {
                        const id = item.url.split("/").filter(Boolean).pop();
                        return (
                            <Link
                                key={i}
                                to={generateLink(id!)}
                                className="link"
                            >
                                <div className="text-base font-medium">
                                    No.{id}
                                </div>
                                <div>{item.name}</div>
                            </Link>
                        );
                    })}
                </div>

                {showLoadMore && onLoadMore && (
                    <button
                        onClick={onLoadMore}
                        disabled={isLoading}
                        className="bg-[#183168] border-2 border-[#183168] text-white p-8 rounded hover:bg-white hover:text-[#183168] hover-apply"
                    >
                        {isLoading ? (
                            <img
                                src="/assets/bg.png"
                                alt="loading"
                                className="w-20 h-auto animate-spin"
                            />
                        ) : (
                            "더 보기"
                        )}
                    </button>
                )}
            </div>
        </main>
    );
};

export default CommonListPage;