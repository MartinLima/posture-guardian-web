import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  severity?: 'good' | 'warning' | 'critical';
  subtitle?: string;
}

export const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  severity = 'good',
  subtitle 
}: MetricCardProps) => {
  const severityStyles = {
    good: "from-success/20 to-success/5 border-success/30",
    warning: "from-warning/20 to-warning/5 border-warning/30",
    critical: "from-destructive/20 to-destructive/5 border-destructive/30"
  };

  const iconStyles = {
    good: "text-success",
    warning: "text-warning",
    critical: "text-destructive"
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:scale-105",
      "bg-gradient-to-br border-2",
      severityStyles[severity]
    )}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className={cn(
            "rounded-full p-3 bg-background/50 mb-4",
            iconStyles[severity]
          )}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            <p className="text-4xl font-bold tabular-nums">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};