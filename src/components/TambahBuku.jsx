import React, { useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

function TambahBuku(props) {
    const [data, setData] = useState({
        nama: '',
        rak: '',
        stok: ''
    })
    const [loading, setLoading] = useState(false)

    const saveBuku = (e) => {
        e.preventDefault()
        setLoading(true)
        Axios.post('http://localhost:3333/buku', {
            nama: data.nama,
            rak: data.rak,
            stok: data.stok
        }).then(res => {
            props.history.push('/buku')
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
            <h4>Tambah Buku</h4>
            <Link to="/buku" className="btn btn-warning mb-3">Kembali</Link>
            <br />

            <form onSubmit={saveBuku}>
                <div className="form-group">
                    <label>Nama Buku</label>
                    <input type="text" className="form-control" value={data.nama} onChange={(e) => handleChange('nama', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Rak</label>
                    <input type="text" className="form-control" value={data.rak} onChange={(e) => handleChange('rak', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Stok</label>
                    <input type="text" className="form-control" value={data.stok} onChange={(e) => handleChange('stok', e.target.value)} />
                </div>
                <button className="btn btn-success" type="submit" disabled={loading}>Simpan</button>
            </form>

        </div>
    )
}

export default TambahBuku
