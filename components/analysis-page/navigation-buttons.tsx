import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

import { useAnalysisContext } from "@/contexts/use-analysis.context";

export default function NavigationButtons() {
  const { currentStep, setCurrentStep, analyzeConflict, data } =
    useAnalysisContext();

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
  return (
    <div>
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
    </div>
  );
}
