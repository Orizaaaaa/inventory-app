export function calculateHonor({
  positionId: _positionId,
  dayTypeId: _dayTypeId,
  durationId: _durationId,
  selectedZoneId: _selectedZoneId,
  tripType,
  isStaff,
  honorNarasumberData,
  honorZoneData,
}: {
  positionId: string;
  dayTypeId: string;
  durationId?: string;
  selectedZoneId: string;
  tripType: "Reguler" | "Training" | "";
  isStaff: boolean;
  honorNarasumberData?: { honoriumNarasumber: number };
  honorZoneData?: { regularPocketMoney: number; trainingPocketMoney: number };
}) {
  const honorNarasumber = isStaff ? 0 : honorNarasumberData?.honoriumNarasumber ?? 0;
  const honorZone =
    tripType === "Reguler"
      ? honorZoneData?.regularPocketMoney ?? 0
      : honorZoneData?.trainingPocketMoney ?? 0;

  return { honorNarasumber, honorZone };
}
