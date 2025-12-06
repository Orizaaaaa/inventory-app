/**
 * Contoh penggunaan Date Picker Component
 * 
 * Komponen ini menggunakan react-datepicker dengan style yang sudah disesuaikan.
 */

import { DatePickerComponent } from "./date-picker";
import { useState } from "react";

export function DatePickerExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(null);
  const [selectedDate3, setSelectedDate3] = useState<Date | null>(null);

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Date Picker Examples</h2>
      
      {/* Basic Usage */}
      <DatePickerComponent
        label="Tanggal"
        value={selectedDate}
        onChange={setSelectedDate}
        placeholder="Pilih tanggal"
      />

      {/* With Required Indicator */}
      <DatePickerComponent
        label="Tanggal Wajib"
        value={selectedDate2}
        onChange={setSelectedDate2}
        required
        placeholder="Pilih tanggal"
      />

      {/* Disable Past Dates */}
      <DatePickerComponent
        label="Tanggal (Tidak Boleh Masa Lalu)"
        value={selectedDate3}
        onChange={setSelectedDate3}
        minDate={new Date()}
        placeholder="Pilih tanggal"
      />

      {/* With Date Range */}
      <DatePickerComponent
        label="Tanggal dengan Range"
        value={selectedDate}
        onChange={setSelectedDate}
        minDate={new Date()}
        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        placeholder="Pilih tanggal"
      />

      {/* With Error State */}
      <DatePickerComponent
        label="Tanggal dengan Error"
        value={selectedDate}
        onChange={setSelectedDate}
        error="Tanggal tidak valid"
        placeholder="Pilih tanggal"
      />

      {/* Disabled State */}
      <DatePickerComponent
        label="Tanggal Disabled"
        value={selectedDate}
        onChange={setSelectedDate}
        disabled
        placeholder="Pilih tanggal"
      />

      {/* With Year and Month Dropdown */}
      <DatePickerComponent
        label="Tanggal dengan Dropdown Tahun & Bulan"
        value={selectedDate}
        onChange={setSelectedDate}
        showYearDropdown
        showMonthDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        placeholder="Pilih tanggal"
      />

      {/* With Time Selection */}
      <DatePickerComponent
        label="Tanggal & Waktu"
        value={selectedDate}
        onChange={setSelectedDate}
        showTimeSelect
        dateFormat="dd/MM/yyyy HH:mm"
        timeFormat="HH:mm"
        placeholder="Pilih tanggal dan waktu"
      />
    </div>
  );
}

