import '../../css/hero.css';
import { Link } from 'react-router-dom';

const Hero = ( {picture, title, buttonText }) => {
    return (                    
        <section className="home-hero">
            <img
                className="home-hero-img"
                alt="Image of people acting on stage"
                loading="lazy"
                src={picture}
            />
            <div className="home-hero-text">
                <h2 className="home-hero-title">
                    {title}
                </h2>
                <Link className="home-hero-button" to="#events">
                    {buttonText}
                </Link>
            </div>
        </section>
    );
};

export default Hero