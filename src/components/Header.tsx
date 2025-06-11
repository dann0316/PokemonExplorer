import { Link } from "react-router-dom";
import bg from "../assets/bg.png";
import BackButton from "./BackButton";
import Breadcrumb from "./Breadcrumb";
import { useIsMobile } from "../hooks/useIsMobile";

const Header = () => {
    
    const isMobile = useIsMobile();

    return (
        <header className="fixed top-0 left-0 w-full h-auto z-50 shadow-md flex flex-col justify-center items-center bg-white">
            {isMobile ? (
                // 모바일, 태블릿 헤더
                <div className="flex flex-col items-center justify-center w-full h-auto">

                    {/* breadcrumb */}
                    <div aria-label="breadcrumb" className="overflow-x-auto w-full">                    
                        <Breadcrumb />
                    </div>

                    {/* logo, backButton */}
                    <div className="w-full h-auto pl-7 flex felx-row justify-between items-center">
                        
                        <Link to="/">
                            <img loading="lazy" src={bg} alt="bg" className="min-w-20 w-20 md:w-32 h-auto" />
                        </Link>

                        <BackButton />
                        
                    </div>

                </div>
            ) : (

                // 데스크탑 Header
                <div className="w-full pl-7 h-auto flex flex-row justify-between items-center gap-3">

                    {/* logo */}
                    <Link to="/">
                        <img
                            loading="lazy"
                            src={bg}
                            alt="bg"
                            className="w-40 h-auto"
                        />
                    </Link>

                    {/* breadcrumb */}
                    <div aria-label="breadcrumb">
                        <Breadcrumb />
                    </div>

                    {/* backButton */}
                    <BackButton />
                    
                </div>
            )}
        </header>
    );
};

export default Header;
