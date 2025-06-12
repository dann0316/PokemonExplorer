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
            <div className="page-container text-red-500">
                <Breadcrumb breadcrumbs={breadcrumbs} />
                {error.message}
            </div>
        );

    // speciesList 오는 중(loading)
    if (!speciesList)
        return (
            <>
                <Breadcrumb breadcrumbs={breadcrumbs}/>
                <LoadingUI />
            </>
        );

    return (
        <div className="container">

            <Breadcrumb breadcrumbs={breadcrumbs}/>

            <CommonListPage
                title="포켓몬 종을 골라보아요 :)"
                items={speciesList}
                generateLink={(id) => `/species/${id}`}
                showLoadMore={true}
                onLoadMore={() => setOffset((prev) => prev + 20)}
                isLoading={isLoading}/>

        </div>
    );
};

export default SpeciesList;
