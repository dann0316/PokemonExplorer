import CommonListPage from "./commonPage/CommonListPage";
import LoadingUI from "../components/LoadingUI";
import { useSpeicesListData } from "../hooks/useSpeciesListData";
import Breadcrumb from "../components/Breadcrumb";

const SpeciesList = () => {
    const { isLoading, speciesList, setOffset, error } = useSpeicesListData();

    // breadcrumb 내부로
    const breadcrumbs = [
        { name: "Home", path: "/" },
        { name: "Species List", path: "/species" },
    ];

    // speciesList 못옴(error)
    if (error)
        return (
            <div className="container text-red-500">
                <div
                    aria-label="breadcrumb"
                    className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-[#183168] w-[60%]"
                >
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
                {error.message}
            </div>
        );

    // speciesList 오는 중(loading)
    if (!speciesList)
        return (
            <div className="container">
                <div
                    aria-label="breadcrumb"
                    className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-[#183168] w-[60%]"
                >
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
                <LoadingUI />
            </div>
        );

    return (
        <div className="container">
            <div
                aria-label="breadcrumb"
                className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-[#183168] w-[60%]"
            >
                <Breadcrumb breadcrumbs={breadcrumbs} />
            </div>

            <CommonListPage
                title="포켓몬 종을 골라보아요 :)"
                items={speciesList}
                generateLink={(id) => `/species/${id}`}
                showLoadMore={true}
                onLoadMore={() => setOffset((prev) => prev + 20)}
                isLoading={isLoading}
            />
        </div>
    );
};

export default SpeciesList;