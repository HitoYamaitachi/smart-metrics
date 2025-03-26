
import React from 'react';
import { LineChart, BarChart, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, Legend, Bar, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChartDataPoint {
  date: string;
  value: number;
  [key: string]: any; // For additional data fields
}

interface ChartDisplayProps {
  title: string;
  data: ChartDataPoint[];
  type: 'line' | 'bar' | 'pie' | 'list';
  valueKey?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export const ChartDisplay: React.FC<ChartDisplayProps> = ({
  title,
  data,
  type,
  valueKey = 'value',
  prefix = '',
  suffix = '',
  className
}) => {
  const formatValue = (value: number) => `${prefix}${value}${suffix}`;

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
      >
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatValue}
        />
        <Tooltip 
          formatter={(value: number) => [formatValue(value), title]}
          contentStyle={{ 
            borderRadius: '0.5rem', 
            border: '1px solid #e2e8f0', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
          }}
        />
        <Line 
          type="monotone" 
          dataKey={valueKey} 
          stroke="#3B82F6" 
          strokeWidth={2} 
          dot={{ 
            r: 4, 
            strokeWidth: 2,
            fill: '#fff'
          }} 
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
      >
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatValue}
        />
        <Tooltip 
          formatter={(value: number) => [formatValue(value), title]}
          contentStyle={{ 
            borderRadius: '0.5rem', 
            border: '1px solid #e2e8f0', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
          }}
        />
        <Bar 
          dataKey={valueKey} 
          fill="#3B82F6" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey={valueKey}
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [formatValue(value), ""]}
          contentStyle={{ 
            borderRadius: '0.5rem', 
            border: '1px solid #e2e8f0', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderListView = () => (
    <div className="overflow-y-auto max-h-80">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-4">Date</th>
            <th className="text-right py-2 px-4">Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b last:border-0 hover:bg-secondary/50 transition-colors">
              <td className="py-2 px-4">{item.date}</td>
              <td className="text-right py-2 px-4">{formatValue(item[valueKey])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ChartIcon = {
    line: LineChartIcon,
    bar: BarChart3,
    pie: PieChartIcon,
    list: List
  }[type];

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center gap-2">
          <ChartIcon className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {type === 'line' && renderLineChart()}
        {type === 'bar' && renderBarChart()}
        {type === 'pie' && renderPieChart()}
        {type === 'list' && renderListView()}
      </CardContent>
    </Card>
  );
};
