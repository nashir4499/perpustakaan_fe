import React, { useState, useEffect, Fragment } from 'react'
import './style.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';


function Pinjam() {
    const [pinjams, setPinjams] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getPinjams()
    }, [])

    const getPinjams = () => {
        setLoading(true)
        Axios.get('http://localhost:3333/pinjam')
            .then(res => {
                setPinjams(res.data)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const toDay = () => {
        const today = new Date();
        // const time = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDay();
        var month = '' + (today.getMonth() + 1),
            day = '' + today.getDate(),
            year = today.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const handleDelete = (id) => {
        setLoading(true)
        Axios.delete(`http://localhost:3333/pinjam/${id}`) //pake bactrik kalo mau ngirim parameter
            .then(res => {
                setLoading(false)
                getPinjams()

            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <div className="container-fluid mt-3 api">
            <h4>Daftar Buku Yang Di Pinjam</h4>
            <Link className="btn btn-primary mb-4" to="/pinjam/tambah">Tambah Peminjam</Link>
            <table className="table">
                <thead className="thead-dark">
                    <tr className="">
                        <th scope="col" className="text-center" >Tanggal Pinjam</th>
                        <th scope="col" className="text-center">Tanggal Kembali</th>
                        <th scope="col" className="text-center" >Buku Yang Dipinjam</th>
                        <th scope="col" className="text-center" >Peminjam</th>
                        <th scope="col" className="text-center" >Opsi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? ( // "?" if yang memiliki elsenya
                            <tr>
                                <td colSpan="3">Loading....</td>
                            </tr>
                        ) : pinjams && pinjams.map(pinjam => { //":" else dari if "?" || "&&" adalah if yang tidak memiliki els
                            return (
                                <tr key={pinjam.id}>
                                    <td className="text-center">{pinjam.tgl_pinjam}</td>
                                    <td className="text-center" style={toDay() > pinjam.tgl_kembali ? { color: "red" } : { color: "blue" }} >{pinjam.tgl_kembali}</td>
                                    <td className="text-center">{pinjam.buku.nama}</td>
                                    <td className="text-center">{pinjam.anggota.nama}</td>
                                    <td className="text-center">
                                        <Fragment>
                                            <Link to={`/pinjam/ubah/${pinjam.id}`}><button className="btn btn-success">Ubah</button></Link>
                                            <button className="btn btn-danger ml-1" onClick={() => handleDelete(pinjam.id)}>Hapus</button>
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

export default Pinjam
