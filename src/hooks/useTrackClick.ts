import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useTrackClick = () => {
    const location = useLocation();

    useEffect (() => {
        console.log(`현재 경로: ${location.pathname}`);
    },[location]);
};