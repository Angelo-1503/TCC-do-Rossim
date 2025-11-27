interface Props {
  status: "seguro" | "alerta";
}

export function StatusCard({ status }: Props) {
  const isAlert = status === "alerta";

  return (
    <div className={`p-4 rounded-xl shadow text-white ${
      isAlert ? "bg-red-600" : "bg-green-600"
    }`}>
      <h2 className="text-xl font-bold">
        {isAlert ? "⚠ ALERTA" : "✔ Ambiente Seguro"}
      </h2>
      <p>{status}</p>
    </div>
  );
}
