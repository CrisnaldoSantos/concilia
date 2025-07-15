import { Button } from "@/components/ui/button";
import { useAnalysisContext } from "@/contexts/use-analysis.context";
import { Brain } from "lucide-react";

export default function GettingAnalysis() {
  const { isLoading, error, data, setCurrentStep } = useAnalysisContext();
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-4">
        <Brain className="w-16 h-16 text-primary mx-auto animate-pulse" />
        <h2 className="text-2xl font-bold">
          {isLoading
            ? "Analisando o conflito..."
            : error
            ? "Erro na análise"
            : "Análise concluída!"}
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          {isLoading ? (
            <>
              Nossa IA está processando as informações e gerando uma solução
              personalizada para o conflito entre {data.pessoa1} e{" "}
              {data.pessoa2}
            </>
          ) : error ? (
            <span className="text-destructive">{error}</span>
          ) : (
            "Redirecionando para os resultados..."
          )}
        </p>
      </div>

      {isLoading && (
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          </div>
          <p className="text-sm text-muted-foreground">
            Aguarde enquanto processamos sua solicitação...
          </p>
        </div>
      )}

      {error && (
        <Button onClick={() => setCurrentStep(4)} className="mt-4">
          Tentar Novamente
        </Button>
      )}
    </div>
  );
}
