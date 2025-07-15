"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from "react";
import { Users, MessageSquare, Eye, Brain, CheckCircle } from "lucide-react";
import { AnalysisResult, ConflictData } from "@/app/analisar/types";

interface AnalysisContextType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  analysisResult: AnalysisResult | null;
  setAnalysisResult: React.Dispatch<
    React.SetStateAction<AnalysisResult | null>
  >;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  data: ConflictData;
  setData: React.Dispatch<React.SetStateAction<ConflictData>>;
  steps: Array<{
    id: number;
    title: string;
    description: string;
    icon: unknown;
  }>;
  resultRef: React.RefObject<HTMLDivElement | null>;
  progress: number;
  analyzeConflict: () => Promise<void>;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined
);

interface AnalysisProviderProps {
  children: ReactNode;
}

export function AnalysisProvider({ children }: AnalysisProviderProps) {
  const resultRef = useRef<HTMLDivElement>(null);

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

  // Definindo os passos do processo de análise
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

  // Calculando o progresso baseado no passo atual
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

  const contextValue: AnalysisContextType = {
    currentStep,
    setCurrentStep,
    isLoading,
    setIsLoading,
    analysisResult,
    setAnalysisResult,
    error,
    setError,
    data,
    setData,
    steps,
    progress,
    resultRef,
    analyzeConflict,
  };

  return (
    <AnalysisContext.Provider value={contextValue}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysisContext(): AnalysisContextType {
  const context = useContext(AnalysisContext);

  if (context === undefined) {
    throw new Error(
      "useAnalysisContext deve ser usado dentro de um AnalysisProvider"
    );
  }

  return context;
}
