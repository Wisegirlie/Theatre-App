import Header from './Header'
import Footer from './Footer'
import '../css/layout.css'

const LaypoutSigned = ({children}) => {
  return (
    <>
    <div className="css-app">
      <Header />
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