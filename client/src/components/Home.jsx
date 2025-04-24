import '../css/home.css';
import TheatrePic from '../assets/variety-images/variety-24.jpg';
import Events from './Events';
import Hero from './misc/Hero';

const Home = () => {
    return (
        <div className="home-container">
            <Hero
                picture={TheatrePic}
                title={"All in one place"}
                buttonText={"Explore what’s on"}
                scrollId={"events"}
            />
            <Events title="Upcoming Events" />
        </div>
    );
};

export default Home