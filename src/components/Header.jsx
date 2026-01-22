import {Link} from 'react-router-dom';
import '../assets/css/Header.css';

const Header = () => {
    return(
        <header className="header">
            <div className="container-header">
                <Link to="/" id="logo" className="site-title">
                    <span className="white">Cyber</span>
                    <span className="learn">learn</span>
                </Link>
            </div>
        </header>
    );
}
export default Header;
