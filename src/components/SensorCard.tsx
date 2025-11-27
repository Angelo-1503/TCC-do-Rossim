export function SensorCard({ title, value, unit }: any) {
  return (
    <div className="bg-muted border border-border p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-xl font-bold">
        {value}{" "}
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </p>
    </div>
  );
}
