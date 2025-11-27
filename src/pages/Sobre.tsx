export default function Sobre() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Sobre o Projeto</h1>

      <p className="text-lg leading-relaxed">
        Este dashboard faz parte do TCC, monitorando qualidade do ar com sensores MQ-7 e ENS160 usando ESP32.
      </p>

      <div className="p-4 bg-card rounded-md border">
        <h2 className="text-xl font-semibold mb-2">Autores</h2>
        <p>João Lucas Rossim</p>
        <p>Deividi Felipe Zaions</p>
      </div>
    </div>
  );
}
