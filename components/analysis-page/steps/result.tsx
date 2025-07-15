import { Recomendacao } from "@/app/analisar/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useAnalysisContext } from "@/contexts/use-analysis.context";
import { openPrintDialog } from "@/utils/open-print-dialog";
import { CheckCircle, Brain } from "lucide-react";

export default function Result() {
  const {
    analysisResult,
    setCurrentStep,
    data,
    resultRef,
    setData,
    setAnalysisResult,
  } = useAnalysisContext();

  if (!analysisResult) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Nenhum resultado disponível</h2>
        <Button onClick={() => setCurrentStep(1)}>Iniciar Nova Análise</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6" ref={resultRef}>
      <div className="text-center space-y-2">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold">Análise Concluída!</h2>
        <p className="text-muted-foreground">
          Aqui está nossa recomendação para resolver o conflito
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <span>Solução Recomendada</span>
          </CardTitle>
          <CardDescription>
            Baseado na análise do conflito entre {data.pessoa1} e {data.pessoa2}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Resumo */}
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
              RESUMO DO CONFLITO
            </h4>
            <p className="text-sm leading-relaxed">{analysisResult.resumo}</p>
          </div>

          {/* Causas Principais */}
          {analysisResult.causasPrincipais &&
            analysisResult.causasPrincipais.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  CAUSAS PRINCIPAIS
                </h4>
                <ul className="space-y-1">
                  {analysisResult.causasPrincipais.map(
                    (causa: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-sm"
                      >
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{causa}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

          {/* Pontos em Comum */}
          {analysisResult.pontosComuns &&
            analysisResult.pontosComuns.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  PONTOS EM COMUM
                </h4>
                <ul className="space-y-1">
                  {analysisResult.pontosComuns.map(
                    (ponto: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-sm"
                      >
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{ponto}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

          {/* Recomendações */}
          {analysisResult.recomendacoes &&
            analysisResult.recomendacoes.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  RECOMENDAÇÕES
                </h4>
                <div className="space-y-3">
                  {analysisResult.recomendacoes.map(
                    (rec: Recomendacao, index: number) => (
                      <div
                        key={index}
                        className="border-l-2 border-primary pl-3"
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <h5 className="font-medium text-sm">{rec.titulo}</h5>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              rec.prioridade === "alta"
                                ? "bg-red-100 text-red-700"
                                : rec.prioridade === "media"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {rec.prioridade}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {rec.descricao}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Próximos Passos */}
          {analysisResult.proximosPassos &&
            analysisResult.proximosPassos.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  PRÓXIMOS PASSOS
                </h4>
                <ol className="space-y-1">
                  {analysisResult.proximosPassos.map(
                    (passo: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-sm"
                      >
                        <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{passo}</span>
                      </li>
                    )
                  )}
                </ol>
              </div>
            )}

          {/* Mensagens Empáticas */}
          {analysisResult.empatia && (
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                MENSAGENS PERSONALIZADAS
              </h4>
              <div className="space-y-3">
                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                  <h5 className="font-medium text-sm text-blue-900 dark:text-blue-100 mb-1">
                    Para {data.pessoa1}:
                  </h5>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {analysisResult.empatia.mensagemPara1}
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
                  <h5 className="font-medium text-sm text-purple-900 dark:text-purple-100 mb-1">
                    Para {data.pessoa2}:
                  </h5>
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    {analysisResult.empatia.mensagemPara2}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex space-x-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {
            setCurrentStep(1);
            setAnalysisResult(null);
            setData({
              pessoa1: "",
              pessoa2: "",
              conflito: "",
              pontovista1: "",
              pontovista2: "",
            });
          }}
        >
          Nova Análise
        </Button>
        <Button
          className="flex-1"
          onClick={() => openPrintDialog(analysisResult, data)}
        >
          Imprimir Resultado
        </Button>
      </div>
    </div>
  );
}
