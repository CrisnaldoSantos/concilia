export interface ConflictData {
  pessoa1: string;
  pessoa2: string;
  conflito: string;
  pontovista1: string;
  pontovista2: string;
}

export interface Recomendacao {
  titulo: string;
  descricao: string;
  prioridade: "alta" | "media" | "baixa";
}

export interface AnalysisResult {
  resumo: string;
  causasPrincipais: string[];
  pontosComuns: string[];
  recomendacoes: Recomendacao[];
  proximosPassos: string[];
  riscos: string[];
  empatia: {
    mensagemPara1: string;
    mensagemPara2: string;
  };
}
