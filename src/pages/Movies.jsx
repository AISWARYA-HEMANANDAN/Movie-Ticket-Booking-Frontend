import React from 'react'
import Moviecard from '../components/Moviecard'

function Movies() {
    return (
        <div className="row g-2">
            <div className="col-md-4"><Moviecard /></div>
            <div className="col-md-4"><Moviecard /></div>
            <div className="col-md-4"><Moviecard /></div>
            <div className="col-md-4"><Moviecard /></div>
        </div>
    )
}

export default Movies
