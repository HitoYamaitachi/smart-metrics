
import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, BarChart, PieChart, List, Pin, PinOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type MetricType = 'number' | 'text' | 'checkbox' | 'radio' | 'datetime' | 'textarea';
export type ChartType = 'line' | 'bar' | 'pie' | 'list' | 'none';
export type MetricStatus = 'active' | 'inactive' | 'fixed';
export type FrequencyType = 'daily' | 'custom' | 'on-demand';

export interface MetricCardProps {
  id: string;
  name: string;
  description?: string;
  type: MetricType;
  chartType: ChartType;
  status: MetricStatus;
  frequency: FrequencyType;
  value?: string | number | boolean;
  unit?: {
    prefix?: string;
    suffix?: string;
  };
  lastUpdated?: Date;
  onClick?: () => void;
  onPin?: () => void;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  id,
  name,
  description,
  type,
  chartType,
  status,
  frequency,
  value,
  unit,
  lastUpdated,
  onClick,
  onPin,
  className,
}) => {
  const ChartIcon = {
    line: LineChart,
    bar: BarChart,
    pie: PieChart,
    list: List,
    none: List,
  }[chartType];

  const formattedValue = value !== undefined 
    ? `${unit?.prefix || ''}${value}${unit?.suffix || ''}` 
    : 'No data';

  return (
    <Card 
      className={cn(
        "overflow-hidden card-hover", 
        status === 'fixed' ? "border-primary/30" : "",
        className
      )}
    >
      <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold">{name}</CardTitle>
            {status === 'fixed' ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 rounded-full text-primary"
                onClick={onPin}
              >
                <Pin className="h-3.5 w-3.5" />
              </Button>
            ) : status === 'active' ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 rounded-full text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={onPin}
              >
                <PinOff className="h-3.5 w-3.5" />
              </Button>
            ) : null}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground h-7 w-7 flex items-center justify-center rounded-full bg-secondary">
            <ChartIcon className="h-3.5 w-3.5" />
          </div>
        </div>
      </CardHeader>
      <CardContent 
        className="p-4 pt-3 cursor-pointer group" 
        onClick={onClick}
      >
        <div className="flex flex-col">
          <div className="text-2xl font-semibold">{formattedValue}</div>
          {lastUpdated && (
            <div className="text-xs text-muted-foreground mt-1">
              Last updated: {lastUpdated.toLocaleDateString()}
            </div>
          )}
        </div>
        <div className="h-12 mt-2 opacity-60">
          {/* Placeholder for mini chart or preview */}
          {chartType !== 'none' && (
            <div className="w-full h-full bg-secondary/50 rounded flex items-center justify-center">
              <ChartIcon className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between items-center border-t border-border/50">
        <div className="flex items-center gap-1">
          <div className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
            {frequency}
          </div>
        </div>
        <Link 
          to={`/metrics/${id}`} 
          className="text-xs text-primary hover:underline link-underline"
        >
          Details
        </Link>
      </CardFooter>
    </Card>
  );
};
