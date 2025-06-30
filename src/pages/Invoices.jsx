import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

function Invoices() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const rawData = localStorage.getItem('dataMainan');
        if (rawData) {
            setData(JSON.parse(rawData));
        }
        console.log(rawData)
    }, []);

    const getHarga = (jenis) => {
        if (jenis === 'Mainan 2000') return 1500;
        if (jenis === 'Mainan 3000') return 2500;
        return 0;
    };

    const handleCetak = () => {
        window.print();
    };

    return (
        <div className='flex flex-col justify-center items-center font-mono'>
            <div className="flex justify-center items-center opacity-30 print:hidden">
                <img src={logo} alt="Logo" height={300} width={300} className='mt-6' />
            </div>

            <div className="w-full max-w-md bg-white border border-dashed border-black rounded-xl mt-4 p-4 shadow print:shadow-none">
                {data ? (
                    <div>
                        <h2 className='text-center font-bold text-lg mb-4'>INVOICES</h2>
                        <div className="grid text-sm gap-y-1 mb-4">
                            <div className="grid grid-cols-[auto_1fr]">
                                <span className="min-w-[120px]">Tanggal Input</span>
                                <span>: {data.tglInput}</span>
                            </div>
                            <div className="grid grid-cols-[auto_1fr]">
                                <span className="min-w-[120px]">Nama Toko</span>
                                <span>: {data.namaToko}</span>
                            </div>
                            <div className="grid grid-cols-[auto_1fr]">
                                <span className="min-w-[120px]">Alamat</span>
                                <span>: {data.alamat}</span>
                            </div>
                        </div>
                        <table className="w-full text-sm border-collapse border-t border-dashed border-black pb-2">
                            <thead>
                                <tr>
                                    <th className="border-b border-dashed border-black py-1 text-left">Jenis</th>
                                    <th className="border-b border-dashed border-black py-1 text-right">Jumlah</th>
                                    <th className="border-b border-dashed border-black py-1 text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-1">{data.jenisMainanUtama}</td>
                                    <td className="py-1 text-right">{data.jumlahUtama}</td>
                                    <td className="py-1 text-right">
                                        Rp {(getHarga(data.jenisMainanUtama) * data.jumlahUtama).toLocaleString('id-ID')}
                                    </td>
                                </tr>

                                {data.tambahan.map((item, index) => (
                                    <tr key={index}>
                                        <td className="py-1">{item.jenis}</td>
                                        <td className="py-1 text-right">{item.jumlah}</td>
                                        <td className="py-1 text-right">
                                            Rp {(getHarga(item.jenis) * item.jumlah).toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                ))}

                                <tr>
                                    <td colSpan={2} className="border-t border-dashed border-black font-bold py-2 text-right">TOTAL</td>
                                    <td className="border-t border-dashed border-black font-bold py-2 text-right">
                                        Rp {data.total.toLocaleString('id-ID')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-red-500 text-center mt-4">Tidak ada data invoice ditemukan.</p>
                )}
            </div>

            {/* Tombol Cetak tidak tampil saat mode print */}
            <div className="print:hidden">
                <button
                    onClick={handleCetak}
                    className="flex justify-center items-center w-full max-w-4xl bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl mx-auto mt-6 px-6 py-4"
                >
                    Cetak
                </button>
            </div>
        </div>
    );
}

export default Invoices;
