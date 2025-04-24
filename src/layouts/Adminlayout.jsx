import React from 'react'
import Header2 from '../components/Header2'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function Adminlayout() {
    return (
        <div className="pagecontainer d-flex flex-column min-vh-100">
            <Header2 />
            <div className="content flex-fill container py-4">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Adminlayout
