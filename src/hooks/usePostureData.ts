import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfDay, startOfWeek, startOfMonth, format, subDays } from "date-fns";
import { es } from "date-fns/locale";

interface PostureEvent {
  id: string;
  timestamp: string;
  created_at: string;
}

export const usePostureData = () => {
  return useQuery({
    queryKey: ['posture-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posture_events')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;
      return data as PostureEvent[];
    },
    refetchInterval: 5000, // Refresh every 5 seconds
  });
};

export const usePostureStats = () => {
  const { data: events } = usePostureData();

  const getTodayCount = () => {
    if (!events) return 0;
    const today = startOfDay(new Date());
    return events.filter(e => new Date(e.timestamp) >= today).length;
  };

  const getWeeklyData = () => {
    if (!events) return [];
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    
    const weeklyMap = new Map<string, number>();
    for (let i = 0; i < 7; i++) {
      const day = subDays(new Date(), 6 - i);
      weeklyMap.set(format(day, 'EEE', { locale: es }), 0);
    }

    events.forEach(event => {
      const eventDate = new Date(event.timestamp);
      if (eventDate >= weekStart) {
        const dayName = format(eventDate, 'EEE', { locale: es });
        weeklyMap.set(dayName, (weeklyMap.get(dayName) || 0) + 1);
      }
    });

    return Array.from(weeklyMap.entries()).map(([day, count]) => ({
      day,
      count
    }));
  };

  const getMonthlyData = () => {
    if (!events) return [];
    const monthStart = startOfMonth(new Date());
    
    const monthlyMap = new Map<string, number>();
    
    events.forEach(event => {
      const eventDate = new Date(event.timestamp);
      if (eventDate >= monthStart) {
        const dateKey = format(eventDate, 'dd/MM');
        monthlyMap.set(dateKey, (monthlyMap.get(dateKey) || 0) + 1);
      }
    });

    return Array.from(monthlyMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => {
        const [dayA, monthA] = a.date.split('/').map(Number);
        const [dayB, monthB] = b.date.split('/').map(Number);
        return dayA - dayB;
      });
  };

  const getSeverity = (count: number): 'good' | 'warning' | 'critical' => {
    if (count <= 5) return 'good';
    if (count <= 15) return 'warning';
    return 'critical';
  };

  return {
    todayCount: getTodayCount(),
    weeklyData: getWeeklyData(),
    monthlyData: getMonthlyData(),
    severity: getSeverity(getTodayCount()),
    isLoading: !events
  };
};