import '../css/home.css';
import { Link } from 'react-router-dom';
import TheatrePic from '../assets/variety-images/variety-24.jpg';
import Events from './Events';
import Hero from './misc/Hero';

const Home = () => {
    return (
        <>
            <div className="home-container">                
                <Hero picture={TheatrePic} title={"All in one place"}  buttonText={"Explore what’s on"} />                
                {/*  Events */}
                <section className='home-section-container' id="events">
                    <h1 className='page-main-title'>
                        Upcoming Events
                    </h1>
                    <Events />
                </section>
            </div>
        </>
    );
};

export default Home