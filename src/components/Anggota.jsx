import React, { useState, useEffect, Fragment } from 'react'
import './style.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Anggota() {
    const [anggotas, setAnggotas] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getAnggotas()
    }, [])

    const getAnggotas = () => {
        setLoading(true)
        Axios.get('http://localhost:3333/anggota')
            .then(res => {
                setAnggotas(res.data)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const handleDelete = (id) => {
        setLoading(true)
        Axios.delete(`http://localhost:3333/anggota/${id}`) //pake bactrik kalo mau ngirim parameter
            .then(res => {
                setLoading(false)
                getAnggotas()

            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <div className="container-fluid mt-3 api">
            <h4>Anggota</h4>
            <Link className="btn btn-primary mb-4" to="/anggota/tambah">Tambah Anggota</Link>
            <table className="table">
                <thead className="thead-dark">
                    <tr className="">
                        {/* 'nama', 'jk', 'ttl', 'alamat', 'no_telpon', 'no_ktp' */}
                        <th scope="col" className=" text-center" >Nama</th>
                        <th scope="col" className=" text-center" >Jenis Kelamin</th>
                        <th scope="col" className=" text-center" >Tempat Tanggal Lahir</th>
                        <th scope="col" className=" text-center" >Alamat</th>
                        <th scope="col" className=" text-center" >No Telpon</th>
                        <th scope="col" className=" text-center" >No KTP</th>
                        <th scope="col" className=" text-center" >Opsi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? ( // "?" if yang memiliki elsenya
                            <tr>
                                <td colSpan="3">Loading....</td>
                            </tr>
                        ) : anggotas && anggotas.map(anggota => { //":" else dari if "?" || "&&" adalah if yang tidak memiliki else
                            return (
                                <tr key={anggota.id}>
                                    <td className=" text-center">{anggota.nama}</td>
                                    <td className=" text-center">{anggota.jk}</td>
                                    <td className=" text-center">{anggota.ttl}</td>
                                    <td className=" text-center">{anggota.alamat}</td>
                                    <td className=" text-center">{anggota.no_telpon}</td>
                                    <td className=" text-center">{anggota.no_ktp}</td>
                                    <td className="text-center">
                                        <Fragment>
                                            <Link to={`/anggota/ubah/${anggota.id}`}><button className="btn btn-success btn-sm">Ubah</button></Link>
                                            <button className="btn btn-danger ml-1 btn-sm" onClick={() => handleDelete(anggota.id)}>Hapus</button>
                                        </Fragment>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

        </div>
    )
}

export default Anggota
