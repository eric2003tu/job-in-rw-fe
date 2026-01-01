"use client";
import React, { useState, useEffect } from "react";
import { Application } from "@/lib/types";
import { getMyApplications } from "@/lib/appClient";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Area,
  AreaChart
} from "recharts";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Filter, 
  Download,
  ChevronDown,
  Sparkles,
  BarChart3,
  Target,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper to aggregate applications by month/week
type TimeRange = "monthly" | "weekly";
interface MonthlyData {
  month: string;
  applications: number;
  interviews: number;
  offers: number;
  avgResponseTime: number;
}
interface WeeklyData {
  day: string;
  applications: number;
  interviews: number;
  offers: number;
}

function aggregateApplications(applications: Application[], range: TimeRange): MonthlyData[] | WeeklyData[] {
  if (range === "monthly") {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = months.map((month, i) => {
      const apps = applications.filter((app: Application) => {
        const date = new Date(app.createdAt);
        return date.getMonth() === i;
      });
      return {
        month,
        applications: apps.length,
        interviews: apps.filter((app: Application) => app.status === "INTERVIEW").length,
        offers: apps.filter((app: Application) => app.status === "ACCEPTED").length,
        avgResponseTime: 4.1 // Placeholder, can be calculated if backend provides
      };
    });
    return data;
  } else {
    // Weekly aggregation (last 7 days)
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 6);
    const data = Array(7).fill(0).map((_, i) => {
      const dayDate = new Date(weekAgo);
      dayDate.setDate(weekAgo.getDate() + i);
      const dayName = days[dayDate.getDay()];
      const apps = applications.filter((app: Application) => {
        const date = new Date(app.createdAt);
        return date.toDateString() === dayDate.toDateString();
      });
      return {
        day: dayName,
        applications: apps.length,
        interviews: apps.filter((app: Application) => app.status === "INTERVIEW").length,
        offers: apps.filter((app: Application) => app.status === "ACCEPTED").length,
      };
    });
    return data;
  }
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-xl">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium text-gray-600 capitalize">
                {entry.dataKey}
              </span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {entry.value} {entry.dataKey === "avgResponseTime" ? "days" : ""}
            </span>
          </div>
        ))}
        {payload.length > 1 && (
          <div className="mt-2 pt-2 border-t border-blue-100">
            <span className="text-xs font-medium text-blue-600">
              Total: {payload.reduce((sum, entry) => sum + entry.value, 0)}
            </span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default function ApplicationsChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly");
  const [activeMetric, setActiveMetric] = useState<string>("applications");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getMyApplications()
      .then((data) => setApplications(data))
      .catch(() => setApplications([]))
      .finally(() => setIsLoading(false));
  }, []);

  const data = aggregateApplications(applications, timeRange);

  // Calculate trends
  const totalApplications = data.reduce((sum, item) => sum + item.applications, 0);
  const avgApplications = data.length > 0 ? Math.round(totalApplications / data.length) : 0;
  const growthPercentage = data.length > 1 && data[0].applications > 0
    ? ((data[data.length - 1].applications - data[0].applications) / data[0].applications * 100).toFixed(1)
    : "0";

  const getLineColor = () => {
    switch (activeMetric) {
      case "applications": return "#3b82f6"; // Blue-500
      case "interviews": return "#8b5cf6"; // Purple-500
      case "offers": return "#10b981"; // Emerald-500
      case "avgResponseTime": return "#f59e0b"; // Yellow-500
      default: return "#3b82f6";
    }
  };

  const getGradientColor = () => {
    switch (activeMetric) {
      case "applications": return "url(#blueGradient)";
      case "interviews": return "url(#purpleGradient)";
      case "offers": return "url(#greenGradient)";
      case "avgResponseTime": return "url(#yellowGradient)";
      default: return "url(#blueGradient)";
    }
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm shadow-xl shadow-blue-200/10 hover:shadow-blue-300/20 transition-all duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl" />
      </div>

      {/* Animated Header Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500 animate-pulse" />


      <CardContent>
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { 
              label: "Total Applications", 
              value: totalApplications, 
              change: "+12%", 
              icon: Target,
              color: "bg-blue-500" 
            },
            { 
              label: "Avg. per Month", 
              value: avgApplications, 
              change: "+3", 
              icon: TrendingUp,
              color: "bg-emerald-500" 
            },
            { 
              label: "Response Time", 
              value: `${'avgResponseTime' in data[data.length - 1] ? (data[data.length - 1] as { avgResponseTime: number }).avgResponseTime : 4.1}d`, 
              change: "-0.7d", 
              icon: Zap,
              color: "bg-yellow-500" 
            },
            { 
              label: "Success Rate", 
              value: "8.2%", 
              change: "+1.5%", 
              icon: Target,
              color: "bg-purple-500" 
            },
          ].map((stat, index) => (
            <div 
              key={index}
              className="p-3 rounded-xl border-2 border-blue-100 bg-white/60 hover:border-blue-300/50 transition-all duration-300 group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.color}/10 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`h-4 w-4 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.change.startsWith('+') 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                {stat.value}
              </p>
              <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Chart Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant={activeMetric === "applications" ? "default" : "outline"}
              size="sm"
              className={`gap-2 ${activeMetric === "applications" 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
                : 'border-blue-200 hover:bg-blue-50'
              }`}
              onClick={() => setActiveMetric("applications")}
            >
              Applications
            </Button>
            <Button
              variant={activeMetric === "interviews" ? "default" : "outline"}
              size="sm"
              className={`gap-2 ${activeMetric === "interviews" 
                ? 'bg-gradient-to-r from-purple-600 to-purple-700' 
                : 'border-purple-200 hover:bg-purple-50'
              }`}
              onClick={() => setActiveMetric("interviews")}
            >
              Interviews
            </Button>
            <Button
              variant={activeMetric === "offers" ? "default" : "outline"}
              size="sm"
              className={`gap-2 ${activeMetric === "offers" 
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700' 
                : 'border-emerald-200 hover:bg-emerald-50'
              }`}
              onClick={() => setActiveMetric("offers")}
            >
              Offers
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={timeRange === "monthly" ? "default" : "outline"}
              size="sm"
              className={`gap-2 ${timeRange === "monthly" 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
                : 'border-blue-200 hover:bg-blue-50'
              }`}
              onClick={() => setTimeRange("monthly")}
            >
              <Calendar className="h-4 w-4" />
              Monthly
            </Button>
            <Button
              variant={timeRange === "weekly" ? "default" : "outline"}
              size="sm"
              className={`gap-2 ${timeRange === "weekly" 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
                : 'border-blue-200 hover:bg-blue-50'
              }`}
              onClick={() => setTimeRange("weekly")}
            >
              <Calendar className="h-4 w-4" />
              Weekly
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-blue-200 hover:bg-blue-50"
            >
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="relative h-72">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-sm text-gray-600">Loading chart data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chart Background Grid */}
              <div className="absolute inset-0 grid grid-cols-12 gap-1 opacity-10">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border-r border-blue-200" />
                ))}
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  onMouseMove={(e) => {
                    if (
                      typeof e.activeTooltipIndex === "number"
                    ) {
                      setHoveredIndex(e.activeTooltipIndex);
                    }
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="#e0f2fe" 
                    vertical={false}
                  />
                  
                  <XAxis 
                    dataKey={timeRange === "monthly" ? "month" : "day"} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    padding={{ left: 10, right: 10 }}
                  />
                  
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ 
                      stroke: '#93c5fd', 
                      strokeWidth: 1,
                      strokeDasharray: "3 3"
                    }}
                  />
                  
                  {/* Hover indicator */}
                  {hoveredIndex !== null && (
                    <rect
                      x={`${(hoveredIndex / (data.length - 1)) * 100}%`}
                      y="0"
                      width="1"
                      height="100%"
                      fill="#3b82f6"
                      opacity={0.3}
                    />
                  )}
                  
                  <Area
                    type="monotone"
                    dataKey={activeMetric}
                    stroke={getLineColor()}
                    strokeWidth={3}
                    fill={getGradientColor()}
                    activeDot={{
                      r: 6,
                      fill: getLineColor(),
                      stroke: "#ffffff",
                      strokeWidth: 2,
                    }}
                    dot={{
                      r: 4,
                      fill: "#ffffff",
                      stroke: getLineColor(),
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="absolute bottom-0 right-0 flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-blue-500 rounded-full" />
                  <span className="text-gray-600">Applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-purple-500 rounded-full" />
                  <span className="text-gray-600">Interviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-emerald-500 rounded-full" />
                  <span className="text-gray-600">Offers</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Insights */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100/30 rounded-xl border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Sparkles className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Performance Insight</h4>
              <p className="text-sm text-gray-700">
                {timeRange === "monthly" 
                  ? `Your applications increased by ${growthPercentage}% this year. Keep up the momentum!`
                  : `You're applying to ${avgApplications} jobs per week. Consider focusing on quality over quantity.`
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}