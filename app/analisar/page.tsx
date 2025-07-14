"use client";

import { useState, useRef } from "react";
import Header from "@/components/structure/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  MessageSquare,
  Eye,
  Brain,
  CheckCircle,
} from "lucide-react";
import { AnalysisResult, ConflictData, Recomendacao } from "./types";
import { openPrintDialog } from "@/utils/open-print-dialog";

const steps = [
  {
    id: 1,
    title: "Envolvidos",
    description: "Quem está no conflito?",
    icon: Users,
  },
  {
    id: 2,
    title: "Situação",
    description: "Descreva o conflito",
    icon: MessageSquare,
  },
  { id: 3, title: "Perspectiva 1", description: "Ponto de vista", icon: Eye },
  {
    id: 4,
    title: "Perspectiva 2",
    description: "Outro ponto de vista",
    icon: Eye,
  },
  { id: 5, title: "Análise", description: "Processando...", icon: Brain },
  {
    id: 6,
    title: "Resultado",
    description: "Solução encontrada",
    icon: CheckCircle,
  },
];

export default function AnalisarPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ConflictData>({
    pessoa1: "",
    pessoa2: "",
    conflito: "",
    pontovista1: "",
    pontovista2: "",
  });
  const resultRef = useRef<HTMLDivElement>(null);

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const analyzeConflict = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analisar-conflito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao analisar o conflito");
      }

      const result = await response.json();
      setAnalysisResult(result.analise);
      setCurrentStep(6);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      setCurrentStep(4); // Volta para a última etapa
    } finally {
      setIsLoading(false);
    }
  };
  const handleNext = () => {
    if (currentStep === 4) {
      // Inicia análise com a API
      setCurrentStep(5);
      analyzeConflict();
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1 && currentStep !== 5) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.pessoa1.trim() && data.pessoa2.trim();
      case 2:
        return data.conflito.trim();
      case 3:
        return data.pontovista1.trim();
      case 4:
        return data.pontovista2.trim();
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Users className="w-12 h-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Quem está envolvido?</h2>
              <p className="text-muted-foreground">
                Vamos começar identificando as duas pessoas envolvidas no
                conflito
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Primeira pessoa</label>
                <Input
                  placeholder="Ex: João, Maria, eu..."
                  value={data.pessoa1}
                  onChange={(e) =>
                    setData({ ...data, pessoa1: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Segunda pessoa</label>
                <Input
                  placeholder="Ex: Pedro, Ana, minha mãe..."
                  value={data.pessoa2}
                  onChange={(e) =>
                    setData({ ...data, pessoa2: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <MessageSquare className="w-12 h-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Descreva o conflito</h2>
              <p className="text-muted-foreground">
                Conte-nos o que aconteceu de forma clara e objetiva
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">
                Situação do conflito
              </label>
              <Textarea
                placeholder="Descreva a situação que gerou o conflito..."
                value={data.conflito}
                onChange={(e) => setData({ ...data, conflito: e.target.value })}
                className="mt-1 min-h-[120px]"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Eye className="w-12 h-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">
                Perspectiva de {data.pessoa1}
              </h2>
              <p className="text-muted-foreground">
                Como {data.pessoa1} vê a situação? Qual é o ponto de vista dessa
                pessoa?
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">
                Ponto de vista de {data.pessoa1}
              </label>
              <Textarea
                placeholder={`Como ${data.pessoa1} enxerga o conflito? Quais são seus sentimentos e argumentos?`}
                value={data.pontovista1}
                onChange={(e) =>
                  setData({ ...data, pontovista1: e.target.value })
                }
                className="mt-1 min-h-[120px]"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Eye className="w-12 h-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">
                Perspectiva de {data.pessoa2}
              </h2>
              <p className="text-muted-foreground">
                Como {data.pessoa2} vê a situação? Qual é o ponto de vista dessa
                pessoa?
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">
                Ponto de vista de {data.pessoa2}
              </label>
              <Textarea
                placeholder={`Como ${data.pessoa2} enxerga o conflito? Quais são seus sentimentos e argumentos?`}
                value={data.pontovista2}
                onChange={(e) =>
                  setData({ ...data, pontovista2: e.target.value })
                }
                className="mt-1 min-h-[120px]"
              />
            </div>
          </div>
        );

      case 5:
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
                    Nossa IA está processando as informações e gerando uma
                    solução personalizada para o conflito entre {data.pessoa1} e{" "}
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

      case 6:
        if (!analysisResult) {
          return (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">
                Nenhum resultado disponível
              </h2>
              <Button onClick={() => setCurrentStep(1)}>
                Iniciar Nova Análise
              </Button>
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
                  Baseado na análise do conflito entre {data.pessoa1} e{" "}
                  {data.pessoa2}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Resumo */}
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                    RESUMO DO CONFLITO
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {analysisResult.resumo}
                  </p>
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
                                <h5 className="font-medium text-sm">
                                  {rec.titulo}
                                </h5>
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold concilia-logo">
                Análise de Conflito
              </h1>
              <span className="text-sm text-muted-foreground">
                {currentStep}/{steps.length}
              </span>
            </div>

            <Progress value={progress} className="h-2 mb-4" />

            <div className="flex items-center justify-between">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center space-y-1"
                  >
                    <div
                      className={`
                      w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors
                      ${
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : isCompleted
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-muted-foreground/30 text-muted-foreground"
                      }
                    `}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-xs font-medium hidden sm:block ${
                        isActive || isCompleted
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              {renderStepContent()}

              {currentStep !== 5 && currentStep !== 6 && (
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="flex items-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex items-center space-x-2"
                  >
                    <span>{currentStep === 4 ? "Analisar" : "Próximo"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
