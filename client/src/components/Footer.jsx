import Logo from '../assets/header-img/LOGO-for-DARK-background.png'
import '../css/footer.css'



const Footer = () => {
  return (
      <>
          <footer className="footer-container">
              <div className="footer-logo-container">
                  <img
                      className="footer-logoImg"
                      src={Logo}
                      alt="Theatre-App Logo"
                  />
                  <div className="footer-networks-container">
                      {/*  instagram  */}
                      <i className="fa fa-instagram"></i>
                      {/* <!-- youtube --> */}
                      <i className="fa fa-youtube-play"></i>
                      {/* <!-- email --> */}
                      <i className="fa fa-envelope"></i>
                  </div>
              </div>
          </footer>
      </>
  );
}

export default Footer