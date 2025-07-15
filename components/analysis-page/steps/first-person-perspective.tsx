import { Textarea } from "@/components/ui/textarea";
import { useAnalysisContext } from "@/contexts/use-analysis.context";
import { Eye } from "lucide-react";

export default function FirstPersonPerspective() {
  const { data, setData } = useAnalysisContext();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Eye className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold">Perspectiva de {data.pessoa1}</h2>
        <p className="text-muted-foreground">
          Como {data.pessoa1} vê a situação? Qual é o ponto de vista dessa
          pessoa?
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">
          Ponto de vista de {data.pessoa1}
        </label>
        <Textarea
          placeholder={`Como ${data.pessoa1} enxerga o conflito? Quais são seus sentimentos e argumentos?`}
          value={data.pontovista1}
          onChange={(e) => setData({ ...data, pontovista1: e.target.value })}
          className="mt-1 min-h-[120px]"
        />
      </div>
    </div>
  );
}
