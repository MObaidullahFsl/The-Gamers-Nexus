import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const Layout = ({content}) => {
  return (
    <>
    <Header></Header>
    <main className='main-content'>
    {content}
    </main>
    <Footer></Footer>
    </>
  )
}

export default Layout