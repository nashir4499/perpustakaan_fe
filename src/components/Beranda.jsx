import React, { useState, useEffect } from 'react'
import './style.css';
import Axios from 'axios';


function Beranda() {
    const [bukus, setBukus] = useState([]);
    const [pinjams, setPinjams] = useState([]);
    const [anggotas, setAnggotas] = useState([]);
    // const [pinjamsBy, setPinjamsBy] = useState({
    //     buku_id: '',
    // });
    // const [pinjamsBy, setPinjamsBy] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getPinjam()
        getBukus()
        getAnggotas()

    }, [])


    const getBukus = () => {
        setLoading(true)
        Axios.get('http://localhost:3333/buku')
            .then(res => {
                setBukus(res.data)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const getPinjam = () => {
        setLoading(true)
        Axios.get('http://localhost:3333/pinjam')
            .then(res => {
                setPinjams(res.data)
                // console.log(setPinjams)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

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

    return (
        <div className="container-fluid mt-3 api">
            <h3 className="text-center">Beranda</h3><hr />
            <div className="container">
                <h4>Buku</h4>
                <div className="row pt-3">
                    {bukus.map(buku => {
                        const cekStok = pinjams.filter(pinjams => pinjams.buku_id === buku.id);
                        return <div key={buku.id} className="col-md-3 item">
                            <div className="bayangan">
                                <div className="img-thumb">
                                </div>
                                <div className="text-block">
                                    <p className="title" >{buku.nama}</p>
                                    <p className="rak" >{buku.rak}</p>
                                    <p className="stok" ><span>Stok Tersedia :</span><br />{cekStok != null ? (buku.stok - cekStok.length) : buku.stok}</p>
                                </div>
                            </div>
                        </div>
                    })
                    }
                </div>
            </div>
            <hr />
            <div className="container">
                <h5>Pinjaman Buku</h5>
                <table className="table">
                    <thead className="thead-dark">
                        <tr className="">
                            <th scope="col" className="text-center" >Tanggal Pinjam</th>
                            <th scope="col" className="text-center">Tanggal Kembali</th>
                            <th scope="col" className="text-center" >Buku Yang Dipinjam</th>
                            <th scope="col" className="text-center" >Peminjam</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? ( // "?" if yang memiliki elsenya
                                <tr>
                                    <td colSpan="3">Loading....</td>
                                </tr>
                            ) : pinjams && pinjams.map(pinjam => { //":" else dari if "?" || "&&" adalah if yang tidak memiliki else
                                return (
                                    <tr key={pinjam.id}>
                                        <td className="text-center">{pinjam.tgl_pinjam}</td>
                                        <td className="text-center">{pinjam.tgl_kembali}</td>
                                        <td className="text-center">{pinjam.buku.nama}</td>
                                        <td className="text-center">{pinjam.anggota.nama} </td>

                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

            </div>
            <hr />
            <div className="container">
                <h5>Anggota</h5>
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
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

            </div>
            <hr />
        </div>
    )
}

export default Beranda
