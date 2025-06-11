import { useScrollTop } from "../hooks/useScrollTop";

export default function ScrollToTop() {

    const { isVisible, scrollToTop } = useScrollTop();

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 z-50 link !rounded-full"
                    aria-label="페이지 맨 위로 이동"
                >
                    ↑
                </button>
            )}
        </>
    );
}
