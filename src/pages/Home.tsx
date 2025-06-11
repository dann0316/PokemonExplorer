import { Link } from "react-router-dom";
import bg from "../assets/bg.png";

const Home = () => {
    return (
        <main className="page-container lg:!py-52">
            
            {/* img section */}
            <div className="w-full flex justify-center items-center">
                <img
                    src={bg}
                    alt="bg"
                    className="w-80 md:w-[30rem] lg:w-[40rem] drop-shadow-xl md:drop-shadow-2xl animate-bounce"
                />
            </div>

            {/* title section */}
            <div>
                <h2 className="text-[#183168] text-base md:text-xl lg:text-2xl font-extrabold">
                    {`포켓몬들을 찾아보아요 :)`}
                </h2>
            </div>

            <Link to={`/species`} className="link">
                찾아보기
            </Link>
        </main>
    );
};

export default Home;
