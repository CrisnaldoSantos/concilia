import { useAnalysisContext } from "@/contexts/use-analysis.context";
import FirstPersonPerspective from "./first-person-perspective";
import GettingAnalysis from "./getting-analysis";
import Involveds from "./involveds";
import Result from "./result";
import SecondPersonPerspective from "./second-person-perspective";
import Situation from "./situation";

export default function FormSteps() {
  const { currentStep } = useAnalysisContext();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Involveds />;

      case 2:
        return <Situation />;

      case 3:
        return <FirstPersonPerspective />;

      case 4:
        return <SecondPersonPerspective />;

      case 5:
        return <GettingAnalysis />;

      case 6:
        return <Result />;

      default:
        return null;
    }
  };
  return <div>{renderStepContent()}</div>;
}
