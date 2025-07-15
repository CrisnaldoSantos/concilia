"use client";

import Header from "@/components/structure/header";
import { Card, CardContent } from "@/components/ui/card";
import { AnalysisProvider } from "@/contexts/use-analysis.context";
import NavigationButtons from "@/components/analysis-page/navigation-buttons";
import AnalysisTitle from "@/components/analysis-page/analysis-title";
import ProgressBar from "@/components/analysis-page/progress-bar";
import FormSteps from "@/components/analysis-page/steps";

export default function AnalisarPage() {
  return (
    <AnalysisProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
        <Header />

        <main className="flex-1 py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <AnalysisTitle />
              <ProgressBar />
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <FormSteps />
                <NavigationButtons />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </AnalysisProvider>
  );
}
