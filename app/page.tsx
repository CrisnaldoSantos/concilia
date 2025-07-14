import Link from "next/link";

import { Button } from "@/components/ui/button";
import Header from "@/components/structure/header";
import Footer from "@/components/structure/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Bem-vindo ao{" "}
              <span className="text-primary concilia-logo">ConcilIA</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Inteligência Artificial para Mediação e Resolução de Conflitos
              Pessoais
            </p>
          </div>

          <div className="space-y-6 py-8">
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-3 p-6 rounded-lg border bg-card">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Mediação Inteligente</h3>
                <p className="text-muted-foreground">
                  IA especializada em mediar conflitos pessoais com neutralidade
                  e empatia para encontrar soluções equilibradas.
                </p>
              </div>

              <div className="space-y-3 p-6 rounded-lg border bg-card">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Comunicação Empática</h3>
                <p className="text-muted-foreground">
                  Facilita o diálogo construtivo entre as partes, promovendo
                  entendimento mútuo e relacionamentos mais saudáveis.
                </p>
              </div>

              <div className="space-y-3 p-6 rounded-lg border bg-card">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">
                  Soluções Personalizadas
                </h3>
                <p className="text-muted-foreground">
                  Estratégias customizadas baseadas no tipo de relacionamento e
                  contexto específico do conflito apresentado.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-8">
            <p className="text-lg text-muted-foreground">
              Precisa resolver um conflito pessoal? Deixe a IA ajudar você a
              encontrar uma solução equilibrada.
            </p>

            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
              <Link href="/analisar">Analisar Agora</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
