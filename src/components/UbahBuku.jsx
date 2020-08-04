import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

function UbahBuku(props) {
    const [data, setData] = useState({
        nama: '',
        rak: '',
        stok: ''
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getBuku()
    }, [])

    const saveBuku = (e) => {
        e.preventDefault()
        setLoading(true)
        Axios.post(`http://localhost:3333/buku/${props.match.params.id}`, {
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

    const getBuku = () => {
        setLoading(true)
        Axios.get(`http://127.0.0.1:3333/buku/${props.match.params.id}`)
            .then(res => {
                setData({
                    id: res.data.id,
                    nama: res.data.nama,
                    rak: res.data.rak,
                    stok: res.data.stok
                })
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
        <div className="container-fluid mt-3 api" >
            <h4>Ubah Buku</h4>
            <Link to="/buku" className="btn btn-warning mb-3" >Kembali</Link>
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

export default UbahBuku
