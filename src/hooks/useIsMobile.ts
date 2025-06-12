// 전역 breadcrumb 쓸 때 Header 구조 변경을 위한 훅
import { useEffect, useState } from "react"

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    useEffect(() => {
        const resize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return isMobile;
}

export {useIsMobile}