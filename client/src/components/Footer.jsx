import Logo from '../assets/footer-img/LOGO - Fusion Five horizontal.png'
import '../css/footer.css'



const Footer = () => {
  return (
    <>
      <footer>
        <div className='css-footer-div'>
          <img className="css-footer-img" src={Logo} />
        </div>
      </footer>
    </>
  )
}

export default Footer