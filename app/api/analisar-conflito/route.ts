import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

const ConflictInputSchema = z.object({
  pessoa1: z.string().min(1, "Nome da primeira pessoa é obrigatório"),
  pessoa2: z.string().min(1, "Nome da segunda pessoa é obrigatório"),
  conflito: z
    .string()
    .min(10, "Descrição do conflito deve ter pelo menos 10 caracteres"),
  pontovista1: z
    .string()
    .min(
      10,
      "Ponto de vista da primeira pessoa deve ter pelo menos 10 caracteres"
    ),
  pontovista2: z
    .string()
    .min(
      10,
      "Ponto de vista da segunda pessoa deve ter pelo menos 10 caracteres"
    ),
});

const ConflictAnalysisSchema = z.object({
  resumo: z.string().describe("Resumo conciso do conflito em 2-3 frases"),
  causasPrincipais: z
    .array(z.string())
    .describe("Lista de 2-4 causas principais do conflito"),
  pontosComuns: z
    .array(z.string())
    .describe("Pontos em comum entre as partes (2-3 itens)"),
  recomendacoes: z
    .array(
      z.object({
        titulo: z.string().describe("Título da recomendação"),
        descricao: z.string().describe("Descrição detalhada da recomendação"),
        prioridade: z
          .enum(["alta", "media", "baixa"])
          .describe("Nível de prioridade"),
      })
    )
    .describe("Lista de 3-5 recomendações práticas"),
  proximosPassos: z
    .array(z.string())
    .describe("Passos específicos e práticos para resolução (3-4 itens)"),
  riscos: z
    .array(z.string())
    .describe("Possíveis riscos se o conflito não for resolvido (2-3 itens)"),
  empatia: z
    .object({
      mensagemPara1: z
        .string()
        .describe("Mensagem empática direcionada à primeira pessoa"),
      mensagemPara2: z
        .string()
        .describe("Mensagem empática direcionada à segunda pessoa"),
    })
    .describe("Mensagens empáticas personalizadas"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedInput = ConflictInputSchema.parse(body);

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Configuração da API não encontrada" },
        { status: 500 }
      );
    }

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      temperature: 0.7,
      apiKey: apiKey,
    });

    const outputParser = StructuredOutputParser.fromZodSchema(
      ConflictAnalysisSchema
    );

    const promptTemplate = PromptTemplate.fromTemplate(`
Você é um mediador de conflitos experiente e empático, especializado em resolução pacífica de disputas interpessoais. 
Sua função é analisar conflitos e fornecer soluções práticas, equilibradas e compassivas.

DADOS DO CONFLITO:
- Primeira pessoa: {pessoa1}
- Segunda pessoa: {pessoa2}
- Situação: {conflito}
- Perspectiva de {pessoa1}: {pontovista1}
- Perspectiva de {pessoa2}: {pontovista2}

INSTRUÇÕES PARA ANÁLISE:
1. Seja imparcial e não tome partido de nenhuma das pessoas
2. Identifique as necessidades e sentimentos subjacentes de ambas as partes
3. Foque em soluções práticas e realizáveis
4. Use linguagem empática e não-violenta
5. Considere o contexto emocional e relacional
6. Proponha estratégias de comunicação construtiva
7. Seja específico e prático nas recomendações

CONTEXTO ADICIONAL:
- Este é um conflito entre pessoas que têm algum tipo de relacionamento (familiar, romântico, amizade, etc.)
- O objetivo é a reconciliação e o fortalecimento do relacionamento
- Ambas as partes presumivelmente desejam resolver o conflito
- Foque em "ganha-ganha" ao invés de "certo vs errado"

{format_instructions}

Forneça uma análise completa e estruturada que ajude ambas as partes a entenderem melhor a situação e caminhos para a resolução.
`);

    const formatInstructions = outputParser.getFormatInstructions();

    const formattedPrompt = await promptTemplate.format({
      pessoa1: validatedInput.pessoa1,
      pessoa2: validatedInput.pessoa2,
      conflito: validatedInput.conflito,
      pontovista1: validatedInput.pontovista1,
      pontovista2: validatedInput.pontovista2,
      format_instructions: formatInstructions,
    });

    const response = await model.invoke(formattedPrompt);

    const parsedResponse = await outputParser.parse(response.content as string);

    return NextResponse.json({
      success: true,
      analise: parsedResponse,
      metadata: {
        timestamp: new Date().toISOString(),
        modelo: "gemini-2.5-flash",
        versao: "1.0.0",
      },
    });
  } catch (error) {
    console.error("Erro na análise do conflito:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Dados de entrada inválidos",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Erro interno do servidor. Tente novamente em alguns instantes.",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ativa",
    service: "ConcilIA - Análise de Conflitos",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      POST: "/api/analisar-conflito - Análise de conflitos com IA",
    },
  });
}
