import Header from './Header'
import Footer from './Footer'
import '../css/layout.css'

const Layout = ({ children }) => {
  return (
    <>
      <div className="app-container">
        <Header />
        <main className="main-container">
          <div >
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout