import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { useParams, useNavigate } from 'react-router-dom';
import FormMainan from '../utils/FormMainan';

function Home() {
    const navigate = useNavigate();
    const { namaToko, alamat } = useParams();
    const [tanggalSekarang, setTanggalSekarang] = useState('');

    // Form States dipindah ke sini
    const [pilihanMainan, setPilihanMainan] = useState('');
    const [jumlah, setJumlah] = useState(0);
    const [inputTambahan, setInputTambahan] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const now = new Date();
        const tanggal = now.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const jam = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
        setTanggalSekarang(`${tanggal}, ${jam}`);
    }, []);

    // Update total jika salah satu form berubah
    useEffect(() => {
        const getHarga = (jenis) => {
            if (jenis === 'Mainan 2000') return 1500;
            if (jenis === 'Mainan 3000') return 2500;
            return 0;
        };

        const totalUtama = getHarga(pilihanMainan) * jumlah;
        const totalTambahan = inputTambahan.reduce((sum, item) => {
            return sum + getHarga(item.jenis) * item.jumlah;
        }, 0);
        setTotal(totalUtama + totalTambahan);
    }, [pilihanMainan, jumlah, inputTambahan]);

    const handleSimpan = () => {
        const dataDisimpan = {
            tglInput : tanggalSekarang,
            namaToko : namaToko,
            alamat : alamat,
            jenisMainanUtama: pilihanMainan,
            jumlahUtama: jumlah,
            tambahan: inputTambahan,
            total
        };

        localStorage.setItem('dataMainan', JSON.stringify(dataDisimpan));
        navigate(`/${namaToko}/${alamat}/Invoices`);
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="flex justify-center items-center opacity-30">
                <img src={logo} alt="Logo" height={300} width={300} className='mt-10' />
            </div>
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl mx-auto mt-6 px-6 py-4">
                <div className="text-black text-xl space-y-4"> 
                    <p>Tanggal Input : {tanggalSekarang}</p>
                    <p>Nama Toko : {decodeURIComponent(namaToko)}</p>
                    <p>Alamat : {decodeURIComponent(alamat)}</p>
                    
                    <FormMainan
                        pilihanMainan={pilihanMainan}
                        setPilihanMainan={setPilihanMainan}
                        jumlah={jumlah}
                        setJumlah={setJumlah}
                        inputTambahan={inputTambahan}
                        setInputTambahan={setInputTambahan}
                        total={total}
                    />
                </div>
            </div>

            <button onClick={handleSimpan} className="flex justify-center items-center w-full max-w-4xl bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl mx-auto mt-6 px-6 py-4">
                SIMPAN
            </button>
        </div>
    );
}

export default Home;
