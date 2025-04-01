import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function Userlayout() {
    return (
        <div className="pagecontainer">
            <Header />
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Userlayout
