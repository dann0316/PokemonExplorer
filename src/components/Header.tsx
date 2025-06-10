import { Link } from 'react-router-dom'
import bg from '../assets/bg.png'
import BackButton from './BackButton'
import Breadcrumb from './Breadcrumb'

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full h-auto z-50 shadow-md flex flex-row justify-center items-center">
            <div className='w-full pl-7 h-auto flex flex-row justify-between items-center bg-white '>

                {/* logo */}
                <Link to="/">
                    <img src={bg} alt="bg" className='w-40 h-auto' />
                </Link>

                {/* breadcrumb */}
                <nav aria-label="breadcrumb" className="breadcrumb-section">
                    <Breadcrumb />
                </nav>

                {/* backButton */}

                <div>
                    <BackButton />
                </div>

            </div>
        </header>
    )
}

export default Header;