import '../../css/hero.css';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Hero = ( {picture, title, buttonText, scrollId, size }) => {

     const scrollToEvents = () => {
        const element = document.getElementById(scrollId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };      

    return (
        <section className="home-hero"  style={size ? { height: `${size}` } : {}}>
            <img
                className="home-hero-img"
                alt="Hero General Image"                
                src={picture}
                style={size ? { 
                    objectPosition: 'center center'
                  } : {}}
            />
            <div className="home-hero-text">
                <h2 className="home-hero-title">{title}</h2>
                { buttonText && (
                    <Link
                        className="home-hero-button" to={`/#${scrollId}`}
                        onClick={(e) => {
                            e.preventDefault(); 
                            scrollToEvents(e);
                        }}
                    >
                        {buttonText}
                    </Link>
                )}
            </div>
        </section>
    );
};

export default Hero