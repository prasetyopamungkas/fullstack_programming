import React, { useState } from 'react';
import axios from 'axios';

const MahasiswaForm = () => {
    const [nim, setNim] = useState('');
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [tanggalLahir, setTanggalLahir] = useState('');
    const [fakultas, setFakultas] = useState('');
    const [prodi, setProdi] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const mahasiswa = { 
            nim, 
            nama, 
            alamat, 
            tanggal_lahir: tanggalLahir, 
            fakultas, 
            prodi 
        };

        console.log('Data yang akan dikirim:', mahasiswa); // Debugging

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/mahasiswas', mahasiswa, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response:', response.data); // Debugging
            alert('Mahasiswa berhasil ditambahkan!');

            // Reset form fields
            setNim('');
            setNama('');
            setAlamat('');
            setTanggalLahir('');
            setFakultas('');
            setProdi('');
        } catch (error) {
            console.error('Error:', error.response || error.message); // Debugging
            alert('Terjadi kesalahan saat menambahkan mahasiswa. Periksa koneksi atau format data.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="NIM"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                required
            />
            <input
                type="date"
                value={tanggalLahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Fakultas"
                value={fakultas}
                onChange={(e) => setFakultas(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Prodi"
                value={prodi}
                onChange={(e) => setProdi(e.target.value)}
                required
            />
            <button type="submit">Tambah Mahasiswa</button>
        </form>
    );
};

export default MahasiswaForm;
