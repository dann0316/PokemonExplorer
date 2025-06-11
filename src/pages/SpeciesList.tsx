import CommonListPage from "./commonPage/CommonListPage";
import LoadingUI from "../components/LoadingUI";
import { useSpeicesListData } from "../hooks/useSpeciesListData";

const SpeciesList = () => {

    const { isLoading, speciesList, setOffset, error } = useSpeicesListData();

    // speciesList 못옴(error)
    if (error)
        return <div className="page-container text-red-500">{error.message}</div>;

    // speciesList 오는 중(loading)
    if (!speciesList) return <LoadingUI />;

    return (
        <CommonListPage
            title="포켓몬 종을 골라보아요 :)"
            items={speciesList}
            generateLink={(id) => `/species/${id}`}
            showLoadMore={true}
            onLoadMore={() => setOffset((prev) => prev + 20)}
            isLoading={isLoading}
        />
    );
};

export default SpeciesList;