import bg from '../assets/bg.png'

const LoadingUI = () => {
    return (
        <main className="page-container">
                <div role="status" aria-label="포켓몬 정보 로딩 중">
                    <img
                        loading="lazy"
                        src={bg}
                        alt="로딩 중"
                        className="w-[10rem] drop-shadow-2xl animate-spin"
                    />
                    <span className="sr-only">
                        포켓몬 정보를 불러오는 중입니다...
                    </span>
                </div>
            </main>
    )
}

export default LoadingUI;