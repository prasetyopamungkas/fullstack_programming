<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    public function index()
    {
    return Mahasiswa::all();
    }
    public function store(Request $request)
    {
     $request->validate([
    'nim' => 'required|unique:mahasiswa',
    'nama' => 'required',
    'alamat' => 'required',
    'tanggal_lahir' => 'required|date',
    'fakultas' => 'required',
    'prodi' => 'required',
    ]);
    return Mahasiswa::create($request->all());
    }
    public function show($id)
    {
    return Mahasiswa::find($id);
    }
    public function update(Request $request, $id)
    {
    $mahasiswa = Mahasiswa::findOrFail($id);
    $mahasiswa->update($request->all());
    return $mahasiswa;
    }
    public function destroy($id)
    {
    Mahasiswa::destroy($id);
    return response()->json(['message' => 'Data berhasil dihapus']);
    }
   }