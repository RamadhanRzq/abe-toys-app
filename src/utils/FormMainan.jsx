function FormMainan({
    pilihanMainan,
    setPilihanMainan,
    jumlah,
    setJumlah,
    inputTambahan,
    setInputTambahan,
    total
}) {
    const handleJenis = (e) => setPilihanMainan(e.target.value);
    const handleJumlah = (e) => setJumlah(parseInt(e.target.value) || 0);

    const handleTambahInput = () => {
        if (inputTambahan.length >= 1) return;
        setInputTambahan(prev => [...prev, { jenis: '', jumlah: 0 }]);
    };

    const handleHapusInput = (index) => {
        const updated = inputTambahan.filter((_, i) => i !== index);
        setInputTambahan(updated);
    };

    const handleChangeTambahan = (index, field, value) => {
        const updated = [...inputTambahan];
        updated[index][field] = field === 'jumlah' ? parseInt(value) || 0 : value;
        setInputTambahan(updated);
    };

    return (
        <div className='space-y-4'>
            <div>
                <label className="block mb-2 font-bold">Pilih Jenis Mainan:</label>
                <select value={pilihanMainan} onChange={handleJenis} className="border rounded-md px-3 py-2 w-full text-base">
                    <option value="">-- Pilih --</option>
                    <option value="Mainan 2000">Mainan 2000</option>
                    <option value="Mainan 3000">Mainan 3000</option>
                </select>
            </div>

            <div>
                <label className="block mb-2 font-bold">Jumlah:</label>
                <input
                    type="number"
                    min="0"
                    value={jumlah}
                    onChange={handleJumlah}
                    className="border rounded-md px-3 py-2 w-full text-base"
                />
            </div>

            {inputTambahan.map((item, index) => (
                <div key={index} className="space-y-4 pt-4">
                    <div className="flex justify-between items-center">
                        <label className="font-bold">Jenis Mainan Tambahan:</label>
                        <button
                            type="button"
                            onClick={() => handleHapusInput(index)}
                            className="text-red-500 hover:underline"
                        >
                            Hapus
                        </button>
                    </div>
                    <select
                        value={item.jenis}
                        onChange={(e) => handleChangeTambahan(index, 'jenis', e.target.value)}
                        className="border rounded-md px-3 py-2 w-full text-base"
                    >
                        <option value="">-- Pilih --</option>
                        <option value="Mainan 2000">Mainan 2000</option>
                        <option value="Mainan 3000">Mainan 3000</option>
                    </select>

                    <div>
                        <label className="block mb-2 font-bold">Jumlah:</label>
                        <input
                            type="number"
                            min="0"
                            value={item.jumlah}
                            onChange={(e) => handleChangeTambahan(index, 'jumlah', e.target.value)}
                            className="border rounded-md px-3 py-2 w-full text-base"
                        />
                    </div>
                </div>
            ))}

            {inputTambahan.length < 1 && (
                <div className="text-right">
                    <button
                        type="button"
                        onClick={handleTambahInput}
                        className="text-blue-500 hover:underline"
                    >
                        + Tambah Jenis Mainan...
                    </button>
                </div>
            )}

            <p className="font-bold">Total : Rp {total.toLocaleString('id-ID')}</p>
        </div>
    );
}

export default FormMainan;
