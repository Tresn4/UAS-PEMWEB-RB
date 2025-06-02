import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Halaman Tidak Ditemukan</h2>
      <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
      <Link to="/" className="btn-home">Kembali ke Beranda</Link>
    </div>
  );
}

export default NotFoundPage;