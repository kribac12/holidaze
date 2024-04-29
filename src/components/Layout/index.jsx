import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import Modal from '../ModalLogSignin'

function Layout() {
  return (
    <>
      <Header />
      <Modal />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
