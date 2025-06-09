// src/pages/Home.jsx
import { Link } from "react-router-dom";
// import pikachu from "../assets/pikachu.png"; // 있으면 이미지 추가
import bg from "../assets/bg.png";

const Home = () => {

    const links = ["species", "pokemon"];

    return (
        <div className="flex flex-col items-center text-center py-16 px-4">
            <img
                src={bg}
                alt="bg"
                className="w-[40rem] drop-shadow-2xl animate-bounce"
            />
            <p className="text-gray-700 text-lg font-extrabold max-w-md mb-8">
                포켓몬 종을 탐색하고 진화, 형태, 색상, 서식지까지 다양한 정보를
                확인해보세요!
            </p>
            <div className="flex flex-row gap-5 border border-[#938cf6] p-10 rounded-2xl">
            {
                links.map((a) => {
                    return (
                        <Link to={`/${a}`}
                        className="link"
                        key={a}
                        >
                        {a}
                        </Link>
                    )
                })
            }
            </div>
        </div>
    );
};

export default Home;
