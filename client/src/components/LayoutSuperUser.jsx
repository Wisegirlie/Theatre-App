import HeaderSuperUser from './HeaderSuperUser'
import Footer from './Footer'
import './css/layout.css'

const LaypoutSuperUser = ({children}) => {
  return (
    <>
    <div className="css-app">
      <HeaderSuperUser />
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

export default LaypoutSuperUser