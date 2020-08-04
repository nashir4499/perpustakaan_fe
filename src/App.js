import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Beranda from './components/Beranda';
import Pinjam from './components/Pinjam';
import Buku from './components/Buku';
import Anggota from './components/Anggota';
import TambahBuku from './components/TambahBuku';
import UbahBuku from './components/UbahBuku';
import TambahAnggota from './components/TambahAnggota';
import UbahAnggota from './components/UbahAnggota';
import TambahPinjaman from './components/TambahPinjaman';
import UbahPinjaman from './components/UbahPinjaman';


function App(props) {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Layout {...props}>
          <Route exact path="/">
            <Beranda />
          </Route>
          <Route exact path="/buku">
            <Buku />
          </Route>
          <Route exact path="/buku/tambah" component={(props) => <TambahBuku {...props} />} />
          <Route exact path="/buku/ubah/:id" component={(props) => <UbahBuku {...props} />} />
          <Route exact path="/pinjam">
            <Pinjam />
          </Route>
          <Route exact path="/pinjam/tambah" component={(props) => <TambahPinjaman {...props} />} />
          <Route exact path="/pinjam/ubah/:id" component={(props) => <UbahPinjaman {...props} />} />
          <Route exact path="/anggota">
            <Anggota />
          </Route>
          <Route exact path="/anggota/tambah" component={(props) => <TambahAnggota {...props} />} />
          <Route exact path="/anggota/ubah/:id" component={(props) => <UbahAnggota {...props} />} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
