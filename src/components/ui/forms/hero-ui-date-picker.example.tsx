/**
 * Contoh penggunaan HeroUI Date Picker Component
 * 
 * Komponen ini menggunakan @heroui/date-picker dengan setup yang sudah dikonfigurasi.
 */

import { HeroUIDatePickerComponent } from "./hero-ui-date-picker";
import { useState } from "react";

export function DatePickerExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">HeroUI Date Picker Examples</h2>
      
      {/* Basic Usage */}
      <HeroUIDatePickerComponent
        label="Tanggal"
        value={selectedDate}
        onChange={setSelectedDate}
        placeholder="Pilih tanggal"
      />

      {/* With Required Indicator */}
      <HeroUIDatePickerComponent
        label="Tanggal Wajib"
        value={selectedDate}
        onChange={setSelectedDate}
        showRequired
        placeholder="Pilih tanggal"
      />

      {/* Disable Past Dates */}
      <HeroUIDatePickerComponent
        label="Tanggal (Tidak Boleh Masa Lalu)"
        value={selectedDate}
        onChange={setSelectedDate}
        disablePastDates
        placeholder="Pilih tanggal"
      />

      {/* Different Sizes */}
      <div className="space-y-2">
        <HeroUIDatePickerComponent
          label="Small"
          size="sm"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        <HeroUIDatePickerComponent
          label="Medium (Default)"
          size="md"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        <HeroUIDatePickerComponent
          label="Large"
          size="lg"
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </div>

      {/* Different Variants */}
      <div className="space-y-2">
        <HeroUIDatePickerComponent
          label="Bordered"
          variant="bordered"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        <HeroUIDatePickerComponent
          label="Flat"
          variant="flat"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        <HeroUIDatePickerComponent
          label="Faded"
          variant="faded"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        <HeroUIDatePickerComponent
          label="Underlined"
          variant="underlined"
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </div>

      {/* Different Colors */}
      <div className="space-y-2">
        <HeroUIDatePickerComponent
          label="Default"
          color="default"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        <HeroUIDatePickerComponent
          label="Primary"
          color="primary"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        <HeroUIDatePickerComponent
          label="Success"
          color="success"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        <HeroUIDatePickerComponent
          label="Warning"
          color="warning"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        <HeroUIDatePickerComponent
          label="Danger"
          color="danger"
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </div>

      {/* With Error State */}
      <HeroUIDatePickerComponent
        label="Tanggal dengan Error"
        value={selectedDate}
        onChange={setSelectedDate}
        isInvalid
        errorMessage="Tanggal tidak valid"
      />

      {/* Disabled State */}
      <HeroUIDatePickerComponent
        label="Tanggal Disabled"
        value={selectedDate}
        onChange={setSelectedDate}
        disabled
      />

      {/* With Min/Max Date */}
      <HeroUIDatePickerComponent
        label="Tanggal dengan Range"
        value={selectedDate}
        onChange={setSelectedDate}
        minValue={new Date()}
        maxValue={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      />
    </div>
  );
}

