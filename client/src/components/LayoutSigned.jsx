import HeaderSigned from './HeaderSigned'
import Footer from './Footer'
import './css/layout.css'

const LaypoutSigned = ({children}) => {
  return (
    <>
    <div className="css-app">
      <HeaderSigned />
      <main className="css-main-content">
        <div >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  </>
)
  
}

export default LaypoutSigned