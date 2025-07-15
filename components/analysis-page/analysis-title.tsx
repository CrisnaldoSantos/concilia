import { useAnalysisContext } from "@/contexts/use-analysis.context";

export default function AnalysisTitle() {
  const { currentStep, steps } = useAnalysisContext();
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-3xl font-bold concilia-logo">Análise de Conflito</h1>
      <span className="text-sm text-muted-foreground">
        {currentStep}/{steps.length}
      </span>
    </div>
  );
}
