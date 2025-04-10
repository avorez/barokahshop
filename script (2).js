
let produk = JSON.parse(localStorage.getItem("produkList")) || [
  { nama: "Indomie Goreng", harga: 3000 },
  { nama: "Aqua Botol", harga: 4000 },
  { nama: "Kopi Sachet", harga: 2000 }
];

let keranjang = [];
let riwayat = JSON.parse(localStorage.getItem("riwayatTransaksi")) || [];

const daftarProduk = document.getElementById("daftarProduk");
const isiKeranjang = document.getElementById("isiKeranjang");
const cariProduk = document.getElementById("cariProduk");
const popupContainer = document.getElementById("popupContainer");
const totalHargaSpan = document.getElementById("totalHargaDisplay");

function tampilkanProduk(list = produk) {
  daftarProduk.innerHTML = "";
  list.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <span>${item.nama}<br>Rp${item.harga}</span>
      <button onclick="tambahKeKeranjang(${index})"><i class="fas fa-cart-plus"></i></button>
    `;
    daftarProduk.appendChild(div);
  });
}
tampilkanProduk();

function updateKeranjang() {
  isiKeranjang.innerHTML = "";
  let total = 0;
  keranjang.forEach((item) => {
    const subtotal = item.jumlah * item.harga;
    total += subtotal;
    isiKeranjang.innerHTML += `
      <div>
        <span>${item.nama} x ${item.jumlah}</span>
        <span>Rp${subtotal}</span>
      </div>
    `;
  });
  totalHargaSpan.textContent = `TOTAL: Rp${total}`;
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (keranjang.length === 0) return;
  const total = keranjang.reduce((sum, item) => sum + item.jumlah * item.harga, 0);
  const waktu = new Date().toLocaleString();
  const alamat = "Jl. Cempaka Raya - Samping Dr. Syaiful";

  const strukHTML = `
    <div class="popup" id="strukPopup">
      <button onclick="tutupPopup()" class="close-btn cetak-hide">&times;</button>
      <p style="font-size:48px; text-align:center; font-weight:bold; margin:0;">WARUNG BAROKAH</p>
      <p style="text-align:center;">${alamat}</p>
      <hr/>
      ${keranjang.map(p => `<p>${p.nama} ${p.jumlah} x ${p.harga} = Rp${p.jumlah * p.harga}</p>`).join("")}
      <hr/>
      <p style="font-weight:bold;">TOTAL BAYAR : Rp${total}</p>
      <hr/>
      <p style="text-align:center;">Terima Kasih<br>Simpan Struk Ini Sebagai Bukti Pembelian</p>
    </div>
  `;
  popupContainer.innerHTML = strukHTML;
  popupContainer.classList.remove("hidden");

  riwayat.push({ keranjang: [...keranjang], waktu, total });
  localStorage.setItem("riwayatTransaksi", JSON.stringify(riwayat));
  keranjang = [];
  updateKeranjang();
});
