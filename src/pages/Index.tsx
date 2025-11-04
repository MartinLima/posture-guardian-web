import { Activity, TrendingUp, Calendar } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { WeeklyChart } from "@/components/WeeklyChart";
import { MonthlyChart } from "@/components/MonthlyChart";
import { usePostureStats } from "@/hooks/usePostureData";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const { todayCount, weeklyData, monthlyData, severity, isLoading } = usePostureStats();

  const simulateEvent = async () => {
    const { error } = await supabase
      .from('posture_events')
      .insert({ timestamp: new Date().toISOString() });

    if (error) {
      toast.error("Error al simular evento");
      console.error(error);
    } else {
      toast.success("Evento simulado correctamente");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Activity className="w-12 h-12 animate-pulse mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Monitor de Postura</h1>
                <p className="text-sm text-muted-foreground">Dashboard en tiempo real</p>
              </div>
            </div>
            <Button 
              onClick={simulateEvent}
              variant="outline"
              className="border-primary/50 hover:bg-primary/10"
            >
              Simular Evento ESP32
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Today's Metric */}
        <div className="mb-8">
          <MetricCard
            title="Eventos de Hoy"
            value={todayCount}
            icon={Activity}
            severity={severity}
            subtitle={
              severity === 'good' 
                ? '¡Excelente postura!' 
                : severity === 'warning'
                ? 'Intenta mejorar tu postura'
                : 'Alerta: muchos eventos hoy'
            }
          />
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <WeeklyChart data={weeklyData} />
          <MonthlyChart data={monthlyData} />
        </div>

        {/* Info Section */}
        <div className="mt-8 p-6 rounded-lg bg-card border border-border">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Información del Sistema
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Endpoint API</p>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                POST /posture-increment
              </code>
            </div>
            <div>
              <p className="text-muted-foreground">Actualización</p>
              <p className="font-mono">Cada 5 segundos</p>
            </div>
            <div>
              <p className="text-muted-foreground">Estado</p>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                Conectado
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
