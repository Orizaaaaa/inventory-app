// Format startTime dan endTime ke HH:mm, jika kosong/null kirim ""
export const formatHHMM = (val: any) => {
  if (!val) return "";
  if (typeof val === "string" && /^\d{2}:\d{2}$/.test(val)) return val;
  const d = new Date(`1970-01-01T${val}`);
  if (!isNaN(d.getTime())) {
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
  return "";
};