import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            className="group bg-[#ffde00] h-14 w-20 md:h-20 md:w-28 lg:h-28 lg:w-44 flex items-center justify-center border-4 border-[#ffde00] hover:bg-white hover-apply"
            style={{
                clipPath:
                    "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 40%)",
            }}
            onClick={() => navigate(-1)}
            aria-label="이전 페이지로 돌아가기"
        >
            <div className="w-4/6 border-2 md:border-4 text-[#183168] border-[#183168] rounded-full text-xs md:text-base lg:text-xl font-extrabold group-hover:border-[#ffde00] group-hover:text-[#ffde00] hover-apply">
                Go Back
            </div>

        </button>
    );
};

export default BackButton;
