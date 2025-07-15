import { useAnalysisContext } from "@/contexts/use-analysis.context";
import { Progress } from "../ui/progress";

export default function ProgressBar() {
  const { steps, currentStep, progress } = useAnalysisContext();

  return (
    <>
      <Progress value={progress} className="h-2 mb-4" />

      <div className="flex items-center justify-between">
        {steps.map((step) => {
          const Icon = step.icon as React.ElementType;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div key={step.id} className="flex flex-col items-center space-y-1">
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
    </>
  );
}
