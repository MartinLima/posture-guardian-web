import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  highlight?: boolean;
}

export const DashboardCard = ({ 
  title, 
  description, 
  children, 
  className,
  highlight = false 
}: DashboardCardProps) => {
  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-lg",
      highlight && "border-primary/50 shadow-[var(--shadow-glow)]",
      className
    )}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};