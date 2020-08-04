import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

function UbahAnggota(props) {
    const [data, setData] = useState({
        nama: '',
        jk: '',
        ttl: '',
        alamat: '',
        no_telpon: '',
        no_ktp: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getAnggotas()
    }, [])

    const saveAnggota = (e) => {
        e.preventDefault()
        setLoading(true)
        Axios.post(`http://localhost:3333/anggota/${props.match.params.id}`, {
            nama: data.nama,
            jk: data.jk,
            ttl: data.ttl,
            alamat: data.alamat,
            no_telpon: data.no_telpon,
            no_ktp: data.no_ktp,
        }).then(res => {
            props.history.push('/anggota')
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    const getAnggotas = () => {
        setLoading(true)
        Axios.get(`http://localhost:3333/anggota/${props.match.params.id}`)
            .then(res => {
                setData(res.data)
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
            <h4>Tambah Anggota</h4>
            <Link to="/anggota" className="btn btn-warning mb-3">Kembali</Link>
            <br />

            <form onSubmit={saveAnggota}>
                <div className="form-group">
                    <label>Nama Anggota</label>
                    <input type="text" className="form-control" value={data.nama} onChange={(e) => handleChange('nama', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Jenis Kelamin</label>
                    <div className="form-check">
                        {/* {data.nama === 'Laki-Laki' ? (true) : (false)} */}
                        <input className="form-check-input" type="radio" name="gender" value="Laki-Laki" onChange={(e) => handleChange('jk', e.target.value)} />
                        <label className="form-check-label" >Laki-Laki</label> <br />
                        <input className="form-check-input" type="radio" name="gender" value="Perempuan" onChange={(e) => handleChange('jk', e.target.value)} />
                        <label className="form-check-label" >Perempuan</label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Tempat Tanggal Lahir</label>
                    <input type="text" className="form-control" value={data.ttl} onChange={(e) => handleChange('ttl', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Alamat</label>
                    <input type="text" className="form-control" value={data.alamat} onChange={(e) => handleChange('alamat', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>No Telpon</label>
                    <input type="text" className="form-control" value={data.no_telpon} onChange={(e) => handleChange('no_telpon', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>No KTP</label>
                    <input type="text" className="form-control" value={data.no_ktp} onChange={(e) => handleChange('no_ktp', e.target.value)} />
                </div>
                <button className="btn btn-success" type="submit" disabled={loading}>Simpan</button>
            </form>

        </div>
    )
}

export default UbahAnggota
