// import Logo from '../assets/home-img/LOGO-for-LIGHT-background.png'
import '../css/home.css'
import { Link } from 'react-router-dom';
import TheatrePic from '../assets/variety-images/variety-24.png';

const Home = () => {
    return (
        <>
            <div className="home-container">
                {/* Hero */}
                <section className="home-hero">
                    <img
                        className="home-hero-img"
                        alt="Image of people acting on stage"
                        loading="lazy"
                        src={TheatrePic}
                    />
                    <div className="home-hero-text">
                        <h2 className="home-hero-title">
                            Nothing like it
                        </h2>
                        <Link className="home-hero-button" to="#events">
                            Explore what’s on
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home