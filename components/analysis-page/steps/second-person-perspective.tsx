import { Textarea } from "@/components/ui/textarea";
import { useAnalysisContext } from "@/contexts/use-analysis.context";
import { Eye } from "lucide-react";

export default function SecondPersonPerspective() {
  const { data, setData } = useAnalysisContext();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Eye className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold">Perspectiva de {data.pessoa2}</h2>
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
          onChange={(e) => setData({ ...data, pontovista2: e.target.value })}
          className="mt-1 min-h-[120px]"
        />
      </div>
    </div>
  );
}
