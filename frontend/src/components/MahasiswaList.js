import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MahasiswaList = () => {
    const [mahasiswa, setMahasiswa] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedData, setEditedData] = useState({});

    // Ambil data mahasiswa dari API
    useEffect(() => {
        fetchMahasiswa();
    }, []);

    const fetchMahasiswa = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/mahasiswas');
            setMahasiswa(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/mahasiswas/${id}`);
            alert('Mahasiswa berhasil dihapus!');
            fetchMahasiswa(); // Refresh data setelah penghapusan
        } catch (error) {
            console.error('Error deleting data:', error);
            alert('Terjadi kesalahan saat menghapus data.');
        }
    };

    const handleEdit = (id) => {
        const mahasiswaToEdit = mahasiswa.find((m) => m.id === id);
        setEditingId(id);
        setEditedData(mahasiswaToEdit);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/mahasiswas/${editingId}`, editedData);
            alert('Data mahasiswa berhasil diperbarui!');
            setEditingId(null);
            fetchMahasiswa();
        } catch (error) {
            console.error('Error updating data:', error);
            alert('Terjadi kesalahan saat memperbarui data.');
        }
    };

    return (
        <div className="mahasiswa-list">
            <h2>Daftar Mahasiswa</h2>
            {editingId ? (
                <form onSubmit={handleEditSubmit}>
                    <input
                        type="text"
                        name="nim"
                        value={editedData.nim}
                        onChange={handleEditChange}
                        required
                    />
                    <input
                        type="text"
                        name="nama"
                        value={editedData.nama}
                        onChange={handleEditChange}
                        required
                    />
                    <input
                        type="text"
                        name="alamat"
                        value={editedData.alamat}
                        onChange={handleEditChange}
                        required
                    />
                    <input
                        type="date"
                        name="tanggal_lahir"
                        value={editedData.tanggal_lahir}
                        onChange={handleEditChange}
                        required
                    />
                    <input
                        type="text"
                        name="fakultas"
                        value={editedData.fakultas}
                        onChange={handleEditChange}
                        required
                    />
                    <input
                        type="text"
                        name="prodi"
                        value={editedData.prodi}
                        onChange={handleEditChange}
                        required
                    />
                    <button type="submit">Simpan</button>
                    <button type="button" onClick={() => setEditingId(null)}>
                        Batal
                    </button>
                </form>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>NIM</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Tanggal Lahir</th>
                            <th>Fakultas</th>
                            <th>Prodi</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mahasiswa.map((m) => (
                            <tr key={m.id}>
                                <td>{m.nim}</td>
                                <td>{m.nama}</td>
                                <td>{m.alamat}</td>
                                <td>{m.tanggal_lahir}</td>
                                <td>{m.fakultas}</td>
                                <td>{m.prodi}</td>
                                <td>
                                    <button onClick={() => handleEdit(m.id)}>Edit</button>
                                    <button onClick={() => handleDelete(m.id)}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MahasiswaList;
