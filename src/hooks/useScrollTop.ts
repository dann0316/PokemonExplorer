import { useEffect, useState } from "react";

export const useScrollTop = () => {

    const [isVisible, setIsVisible] = useState(false);

    // 브라우저 offset 50 넘으면 isVisible true
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 50) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
        
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return { isVisible, scrollToTop }
}