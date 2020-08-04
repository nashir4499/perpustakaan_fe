import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import './style.css';
// import Modal from './TambahData';

function Buku() {
    const [bukus, setBukus] = useState([]);
    // const [pinjams, setPinjams] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // getPinjam()
        getBukus()

    }, [])

    const getBukus = () => {
        setLoading(true)
        axios.get('http://localhost:3333/buku')
            .then(res => {
                setBukus(res.data)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    //sebelum pake yang ka yuli. Yang bawah juga berhasil
    // const getPinjam = () => {
    //     setLoading(true)
    //     axios.get('http://localhost:3333/coba')
    //         .then(res => {
    //             setPinjams(res.data)
    //             // console.log(setPinjams)
    //             setLoading(false)
    //         }).catch(err => {
    //             console.log(err)
    //             setLoading(false)
    //         })
    // }

    const handleDelete = (id) => {
        setLoading(true)
        axios.delete(`http://localhost:3333/buku/${id}`) //pake bactrik kalo mau ngirim parameter
            .then(res => {
                setLoading(false)
                getBukus()

            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <div className="container-fluid mt-3 api">
            <h4>Buku</h4>
            <Link className="btn btn-primary mb-4" to="/buku/tambah">Tambah Buku</Link>
            <table className="table">
                <thead className="thead-dark">
                    <tr className="">
                        <th scope="col" className="nama" >Nama</th>
                        <th scope="col" className="rak">Rak</th>
                        <th scope="col" className="stok text-center" >Stok</th>
                        <th scope="col" className="stokS text-center" >Stok Sekarang</th>
                        <th scope="col" className="dipinjam text-center" >Dipinjam</th>
                        <th scope="col" className="opsi text-center" >Opsi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? ( // "?" if yang memiliki elsenya
                            <tr>
                                <td colSpan="3">Loading....</td>
                            </tr>
                        ) : bukus && bukus.map(buku => { //":" else dari if "?" || "&&" adalah if yang tidak memiliki else
                            // Yang Bawah Ori Nashir
                            // const cekStok = pinjams.filter(pinjams => pinjams.buku_id === buku.id);
                            return (
                                <tr key={buku.id} /*on={() => getPinjamBy(buku.id)}*/>
                                    <td>{buku.nama}</td>
                                    <td>{buku.rak}</td>
                                    <td>{buku.stok}</td>
                                    {/* Yang bawah ori nashir */}
                                    {/* <td className="text-center">{
                                        cekStok != null ? (buku.stok - cekStok.length) : buku.stok
                                    }</td> */}
                                    <td className="text-center">{
                                        buku.pinjam != null ? (buku.stok - buku.pinjam.length) : buku.stok
                                    }</td>
                                    <td className="text-center">
                                        {buku.pinjam != null && (buku.pinjam.length)}
                                    </td>
                                    <td className="text-center">
                                        <Fragment>
                                            <Link to={`/buku/ubah/${buku.id}`}><button className="btn btn-success">Ubah</button></Link>
                                            <button className="btn btn-danger ml-1" onClick={() => handleDelete(buku.id)}>Hapus</button>
                                        </Fragment>
                                    </td>
                                </tr>
                            )
                        })

                    }

                </tbody>
            </table>

            {/* <Fragment>
                <input type="text" value={pinjamsBy.map((pinjam) => (pinjam.buku_id))} onChange={() => getPinjamBy(1)} />
                <input type="text" value={pinjamsBy.length} onChange={() => getPinjamBy(1)} />
                <input type="text" value={pinjams.map((pinjam) => (pinjam.buku_id))} />
                <input type="text" value={pinjams.filter(pinjams => pinjams.buku_id === 1)} />
                <input type="text" value={pinjams.length} />
                
            </Fragment> */}
            {/* {pinjams.map(pinjam => {
                return (
                    <div key={pinjam.id}>

                        <p>{pinjam.buku_id}</p>

                    </div>
                )
                // return pinjam.buku_id;

            })} */}
        </div>
    )
}

export default Buku
