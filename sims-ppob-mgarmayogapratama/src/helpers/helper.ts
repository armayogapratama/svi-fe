export const formatDateString = (date: string) => {
  const bulanIndonesia = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const tanggal = new Date(date);

  const hari = tanggal.getDate();
  const bulan = bulanIndonesia[tanggal.getMonth()];
  const tahun = tanggal.getFullYear();

  return `${hari} ${bulan} ${tahun}`;
};

export function formatToWIB(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    console.log("Invalid date string");
  }

  const wibOffset = 7 * 60 * 60 * 1000;

  const wibTime = new Date(date.getTime() + wibOffset);

  const hours = wibTime.getUTCHours().toString().padStart(2, "0");
  const minutes = wibTime.getUTCMinutes().toString().padStart(2, "0");

  return `${hours}.${minutes} WIB`;
}

export function formatRupiah(angka: number) {
  let rupiah = angka.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

  rupiah = rupiah.replace(".", ",");

  return `Rp. ${rupiah}`;
}

export function formatBalance(angka: number) {
  let rupiah = angka.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

  rupiah = rupiah.replace(".", ",");

  return `${rupiah}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}${month}${day}`;
}

export const formatDateToMonthYear = (dateString: string) => {
  const date = new Date(dateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${monthNames[date.getMonth()]}`;
};
