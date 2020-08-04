import React from 'react'
import './style.css';

function Layout(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="judul" >Perpustakaan</h1>
                    {
                        props.children
                    }
                </div>
            </div>
        </div>
    )
}

export default Layout
