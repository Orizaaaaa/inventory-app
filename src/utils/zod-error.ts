export const getFirstZodError = (error: any) => {
  return (
    Object.values(error.flatten().fieldErrors)
      .flat()
      .find(Boolean)?.toString() || "Terjadi kesalahan validasi"
  );
};