import { Input } from "@/components/ui/input";
import { useAnalysisContext } from "@/contexts/use-analysis.context";
import { Users } from "lucide-react";

export default function Involveds() {
  const { data, setData } = useAnalysisContext();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Users className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold">Quem está envolvido?</h2>
        <p className="text-muted-foreground">
          Vamos começar identificando as duas pessoas envolvidas no conflito
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Primeira pessoa</label>
          <Input
            placeholder="Ex: João, Maria, eu..."
            value={data.pessoa1}
            onChange={(e) => setData({ ...data, pessoa1: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Segunda pessoa</label>
          <Input
            placeholder="Ex: Pedro, Ana, minha mãe..."
            value={data.pessoa2}
            onChange={(e) => setData({ ...data, pessoa2: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}
