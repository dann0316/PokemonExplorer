import { Link } from "react-router-dom";
import bg from "../assets/bg.png";
import BackButton from "./BackButton";

const Header = () => {

    return (
        <header className="fixed top-0 left-0 w-full h-auto z-50 shadow-md flex flex-col justify-center items-center bg-white">
            <div className="w-full h-auto pl-7 flex felx-row justify-between items-center">

                <Link to="/">
                    <img
                        loading="lazy"
                        src={bg}
                        alt="bg"
                        className="min-w-20 w-20 md:w-32 h-auto"
                    />
                </Link>

                <BackButton />

            </div>
        </header>
    );
};

export default Header;
