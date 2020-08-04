import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';

function UbahPinjaman(props) {
    const [data, setData] = useState({
        tgl_pinjam: '',
        tgl_kembali: '',
        buku_id: '',
        anggota_id: '',
        buku: [],
        anggota: []
    })
    const [bukus, setBukus] = useState([]);
    const [anggotas, setAnggotas] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getBukus()
        getAnggotas()
        getPinjam()
    }, [])

    const savePinjam = (e) => {
        e.preventDefault()
        setLoading(true)
        if (data.buku_id !== "0") {
            Axios.post(`http://localhost:3333/pinjam/${props.match.params.id}`, {
                tgl_pinjam: data.tgl_pinjam,
                tgl_kembali: data.tgl_kembali,
                // kembali: data.kembali,
                buku_id: data.buku_id,
                anggota_id: data.anggota_id
            }).then(res => {
                props.history.push('/pinjam')
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
        } else {
            alert("Stok Buku Kosong")
        }
    }

    const getPinjam = () => {
        setLoading(true)
        Axios.get(`http://127.0.0.1:3333/pinjam/${props.match.params.id}`)
            .then(res => {
                setData({
                    id: res.data.id,
                    tgl_pinjam: res.data.tgl_pinjam,
                    tgl_kembali: res.data.tgl_kembali,
                    buku_id: res.data.buku_id,
                    anggota_id: res.data.anggota_id,
                    buku: res.data.buku,
                    anggota: res.data.anggota,
                })
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

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

    const handleChange = (nama, value) => {
        setData({
            ...data,
            [nama]: value
        })
    }

    return (
        <div className="container-fluid mt-3 api">
            <h4>Tambah Pinjaman</h4>
            <Link to="/pinjam" className="btn btn-warning mb-3">Kembali</Link>
            <br />

            <form onSubmit={savePinjam}>
                <div className="form-group">
                    <label htmlFor="rilis">Tanggal Pinjam</label>
                    <input type="date" className="form-control" value={data.tgl_pinjam} onChange={(e) => handleChange('tgl_pinjam', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Tanggal Kembali</label>
                    <input type="date" className="form-control" value={data.tgl_kembali} onChange={(e) => handleChange('tgl_kembali', e.target.value)} />
                </div>
                <fieldset id="group1">
                    <div className="form-group">
                        <label>Pilih Buku</label>
                        {/* <input type="text" className="form-control" value={data.stok} onChange={(e) => handleChange('stok', e.target.value)} /> */}
                        {/* <div className="form-check">
                            {
                                bukus && bukus.map(buku => {
                                    return (
                                        <Fragment key={buku.id}>
                                            <input className="form-check-input" type="radio" name="group1" value={buku.id} onChange={(e) => handleChange('buku_id', e.target.value)} checked={data.buku.id === buku.id} />
                                            <label className="form-check-label" >{buku.nama}</label> <br />
                                        </Fragment>
                                    )
                                })
                            }
                        </div> */}
                        <select className="custom-select" id="bukus" name="bukus" value={data.buku_id} onChange={(e) => handleChange('buku_id', e.target.value)}>
                            {/* <option defaultValue={data.buku_id}>{data.buku.nama}</option> */}
                            {
                                bukus && bukus.map(buku => {
                                    const cek = buku.stok - buku.pinjam.length > 0;
                                    return (
                                        // defaultValue={data.buku_id === buku.id}
                                        <option key={buku.id} value={cek ? buku.id : 0} style={cek ? { color: "black" } : { color: "red" }} >{buku.nama} | Stok: {buku.stok - buku.pinjam.length} | </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </fieldset>
                <fieldset id="group2">
                    <div>
                        <div className="form-group">
                            <label>Pilih Anggota</label>
                            {/* <div className="form-check">
                                {
                                    anggotas && anggotas.map(anggota => {
                                        return (
                                            <Fragment key={anggota.id}>
                                                <input className="form-check-input" type="radio" name="group2" value={anggota.id} onChange={(e) => handleChange('anggota_id', e.target.value)} checked={data.anggota.id === anggota.id} />
                                                <label className="form-check-label" >{anggota.nama}</label> <br />
                                            </Fragment>
                                        )
                                    })
                                }
                            </div> */}
                            <select className="custom-select" value={data.anggota_id} onChange={(e) => handleChange('anggota_id', e.target.value)}>
                                {/* <option defaultValue={data.anggota_id}>{data.anggota.nama}</option> */}
                                {
                                    anggotas && anggotas.map(anggota => {
                                        return (
                                            <option key={anggota.id} value={anggota.id} >{anggota.nama}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </fieldset>
                <button className="btn btn-success" type="submit" disabled={loading}>Simpan</button>
            </form>

        </div >
    )
}

export default UbahPinjaman
