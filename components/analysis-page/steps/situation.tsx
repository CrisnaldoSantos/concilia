import { Textarea } from "@/components/ui/textarea";
import { useAnalysisContext } from "@/contexts/use-analysis.context";
import { MessageSquare } from "lucide-react";

export default function Situation() {
  const { data, setData } = useAnalysisContext();

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
        <label className="text-sm font-medium">Situação do conflito</label>
        <Textarea
          placeholder="Descreva a situação que gerou o conflito..."
          value={data.conflito}
          onChange={(e) => setData({ ...data, conflito: e.target.value })}
          className="mt-1 min-h-[120px]"
        />
      </div>
    </div>
  );
}
