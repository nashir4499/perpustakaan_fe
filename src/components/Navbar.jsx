import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark">
                <p className="navbar-brand" to="/">Navbar</p>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Beranda</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/buku">Daftar Buku</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pinjam">Daftar Pinjam</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/anggota">Daftar Anggota</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
