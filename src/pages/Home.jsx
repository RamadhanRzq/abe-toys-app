import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { useParams } from 'react-router-dom';

function Home() {
    const { namaToko, alamat } = useParams();
    const [tanggalSekarang, setTanggalSekarang] = useState('');
    const [pilihanMainan, setPilihanMainan] = useState('');
    const [jumlah, setJumlah] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const now = new Date();
        const optionsTanggal = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const tanggal = now.toLocaleDateString('id-ID', optionsTanggal);
        const jam = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
        setTanggalSekarang(`${tanggal}, ${jam}`);
    }, []);

    useEffect(() => {
        let harga = 0;
        if (pilihanMainan === 'Mainan 2000') {
            harga = 1500;
        } else if (pilihanMainan === 'Mainan 3000') {
            harga = 2500;
        }
        setTotal(harga * jumlah);
    }, [pilihanMainan, jumlah]);

    const handleJenis = (e) => {
        setPilihanMainan(e.target.value);
    };

    const handleJumlah = (e) => {
        const value = parseInt(e.target.value) || 0;
        setJumlah(value);
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="flex justify-center items-center opacity-30">
                <img src={logo} alt="Logo" height={300} width={300} className='mt-10' />
            </div>
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl mx-auto mt-6 px-6 py-4">
                <div className="text-black text-xl space-y-6"> 
                    <p>Tanggal Input : {tanggalSekarang}</p>
                    <p>Nama Toko : {decodeURIComponent(namaToko)}</p>
                    <p>Alamat : {decodeURIComponent(alamat)}</p>
                    
                    <div>
                        <label htmlFor="mainan" className="block mb-2 font-bold">Pilih Jenis Mainan:</label>
                        <select
                            id="mainan"
                            value={pilihanMainan}
                            onChange={handleJenis}
                            className="border rounded-md px-3 py-2 w-full text-base"
                        >
                            <option value="">-- Pilih --</option>
                            <option value="Mainan 2000">Mainan 2000</option>
                            <option value="Mainan 3000">Mainan 3000</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="jumlah" className="block mb-2 font-bold">Jumlah:</label>
                        <input
                            id="jumlah"
                            type="number"
                            min="0"
                            value={jumlah}
                            onChange={handleJumlah}
                            className="border rounded-md px-3 py-2 w-full text-base"
                        />
                    </div>

                    <p className="font-bold">Total : Rp {total.toLocaleString('id-ID')}</p>
                </div>
            </div>

            <button className="flex justify-center items-center w-full max-w-4xl bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl mx-auto mt-6 px-6 py-4">
                SIMPAN
            </button>
        </div>
    );
}

export default Home;
