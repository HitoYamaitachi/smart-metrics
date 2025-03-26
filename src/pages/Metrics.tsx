
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Filter, 
  SlidersHorizontal, 
  Calendar, 
  LineChart, 
  BarChart, 
  PieChart, 
  List, 
  ChevronDown,
  X,
  Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ChartDisplay } from '@/components/ui/ChartDisplay';
import { StaggeredChildren } from '@/components/ui/animations';

// Fix for the prefix property not existing error
const mockMetricsList = [
  {
    id: '1',
    name: 'Weight',
    entries: [
      { date: '2023-11-01', value: 75.2 },
      { date: '2023-11-02', value: 74.9 },
      { date: '2023-11-03', value: 74.7 },
      { date: '2023-11-04', value: 74.5 },
      { date: '2023-11-05', value: 74.8 },
      { date: '2023-11-06', value: 74.6 },
      { date: '2023-11-07', value: 74.4 },
    ],
    unit: { suffix: ' kg', prefix: '' },
    chartType: 'line'
  },
  {
    id: '2',
    name: 'Push-ups',
    entries: [
      { date: '2023-11-01', value: 20 },
      { date: '2023-11-03', value: 22 },
      { date: '2023-11-05', value: 25 },
      { date: '2023-11-07', value: 23 },
    ],
    unit: { suffix: ' reps', prefix: '' },
    chartType: 'bar'
  },
  {
    id: '3',
    name: 'Mood Rating',
    entries: [
      { date: '2023-11-01', value: 3 },
      { date: '2023-11-02', value: 4 },
      { date: '2023-11-03', value: 4 },
      { date: '2023-11-04', value: 5 },
      { date: '2023-11-05', value: 4 },
      { date: '2023-11-06', value: 3 },
      { date: '2023-11-07', value: 4 },
    ],
    unit: { suffix: '/5', prefix: '' },
    chartType: 'line'
  },
  {
    id: '4',
    name: 'Steps',
    entries: [
      { date: '2023-11-01', value: 8245 },
      { date: '2023-11-02', value: 7854 },
      { date: '2023-11-03', value: 9123 },
      { date: '2023-11-04', value: 6542 },
      { date: '2023-11-05', value: 8742 },
      { date: '2023-11-06', value: 7652 },
      { date: '2023-11-07', value: 9331 },
    ],
    unit: { suffix: ' steps', prefix: '' },
    chartType: 'bar'
  },
  {
    id: '5',
    name: 'Sleep Duration',
    entries: [
      { date: '2023-11-01', value: 7.5 },
      { date: '2023-11-02', value: 8 },
      { date: '2023-11-03', value: 7 },
      { date: '2023-11-04', value: 7.5 },
      { date: '2023-11-05', value: 8.5 },
      { date: '2023-11-06', value: 7.5 },
      { date: '2023-11-07', value: 8 },
    ],
    unit: { suffix: ' hours', prefix: '' },
    chartType: 'line'
  },
  {
    id: '6',
    name: 'Water Intake',
    entries: [
      { date: '2023-11-01', value: 2.1 },
      { date: '2023-11-02', value: 2.4 },
      { date: '2023-11-03', value: 1.8 },
      { date: '2023-11-04', value: 2.0 },
      { date: '2023-11-05', value: 2.2 },
      { date: '2023-11-06', value: 2.5 },
      { date: '2023-11-07', value: 2.3 },
    ],
    unit: { suffix: ' liters', prefix: '' },
    chartType: 'bar'
  },
];

type TimeRange = '7days' | '30days' | '90days' | 'year' | 'all';
type ChartTypeOption = 'line' | 'bar' | 'pie' | 'list';

const Metrics = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState<TimeRange>('7days');
  const [chartType, setChartType] = useState<ChartTypeOption>('line');
  const [filters, setFilters] = useState<string[]>([]);
  
  const filteredMetrics = mockMetricsList.filter(
    metric => metric.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setFilters(filters.filter(f => f !== filter));
  };

  const timeRangeLabel = {
    '7days': 'Last 7 days',
    '30days': 'Last 30 days',
    '90days': 'Last 90 days',
    'year': 'Last year',
    'all': 'All time'
  }[timeRange];
  
  return (
    <div className="flex flex-col gap-6">
      {/* Header with search and filters */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Metrics</h1>
          <Button onClick={() => navigate('/add-metric')} size="sm" className="btn-hover">
            <Plus className="mr-2 h-4 w-4" />
            New Metric
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search metrics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Filter">
                <Filter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" align="end">
              <div className="space-y-4">
                <h3 className="font-medium">Filter Metrics</h3>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Type</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="justify-start" 
                      onClick={() => addFilter('number')}
                    >
                      Number
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="justify-start" 
                      onClick={() => addFilter('text')}
                    >
                      Text
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="justify-start" 
                      onClick={() => addFilter('checkbox')}
                    >
                      Checkbox
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="justify-start" 
                      onClick={() => addFilter('date')}
                    >
                      Date
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Frequency</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="justify-start" 
                      onClick={() => addFilter('daily')}
                    >
                      Daily
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="justify-start" 
                      onClick={() => addFilter('custom')}
                    >
                      Custom
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="justify-start" 
                      onClick={() => addFilter('on-demand')}
                    >
                      On Demand
                    </Button>
                  </div>
                </div>
                <div className="pt-2">
                  <Button variant="default" size="sm" className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" aria-label="More Options">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-4" align="end">
              <div className="space-y-4">
                <h3 className="font-medium">Display Options</h3>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Chart Type</h4>
                  <Select
                    value={chartType}
                    onValueChange={(value) => setChartType(value as ChartTypeOption)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                      <SelectItem value="list">List View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Time Range</h4>
                  <Select
                    value={timeRange}
                    onValueChange={(value) => setTimeRange(value as TimeRange)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="year">Last year</SelectItem>
                      <SelectItem value="all">All time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Active filters */}
        {filters.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            <div className="flex items-center h-8">
              <span className="text-sm text-muted-foreground mr-2">Filters:</span>
            </div>
            {filters.map(filter => (
              <Badge 
                key={filter} 
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                {filter}
                <X 
                  className="h-3 w-3 cursor-pointer ml-1" 
                  onClick={() => removeFilter(filter)}
                />
              </Badge>
            ))}
            {filters.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-xs"
                onClick={() => setFilters([])}
              >
                Clear all
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* Time range indicator */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>{timeRangeLabel}</span>
      </div>
      
      {/* Metrics charts grid */}
      <StaggeredChildren className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMetrics.length > 0 ? (
          filteredMetrics.map(metric => (
            <ChartDisplay
              key={metric.id}
              title={metric.name}
              data={metric.entries}
              type={chartType !== 'pie' ? (chartType || metric.chartType as ChartTypeOption) : 'line'}
              prefix={metric.unit?.prefix}
              suffix={metric.unit?.suffix}
              className="card-hover"
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground mb-4">No metrics match your search</p>
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              Clear search
            </Button>
          </div>
        )}
      </StaggeredChildren>
    </div>
  );
};

export default Metrics;
