import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function Userlayout() {
    return (
        <div className="pagecontainer d-flex flex-column min-vh-100">
            <Header />
            <div className="content flex-fill container py-4">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Userlayout
