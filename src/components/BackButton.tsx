import { useNavigate } from "react-router-dom"
import backButton from '../assets/backButton.png'

const BackButton = () => {
    
    const navigate = useNavigate();

    return (
        <img src={backButton} alt="backButton" className="w-10 cursor-pointer" onClick={() => navigate(-1)}/>
    )
}

export default BackButton;