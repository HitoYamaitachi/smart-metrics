import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Edit2, 
  Trash2, 
  Clock, 
  Download, 
  Share2, 
  Plus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ChartDisplay } from '@/components/ui/ChartDisplay';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { MetricFormData, MetricForm } from '@/components/ui/MetricForm';
import { toast } from '@/lib/toast';

// Mock data for a single metric
const mockMetricData = {
  id: '1',
  name: 'Weight',
  description: 'Morning weight measurement',
  type: 'number',
  chartType: 'line',
  status: 'fixed',
  frequency: 'daily',
  prefix: '',
  suffix: ' kg',
  order: 1,
  entries: [
    { id: '1', date: '2023-11-01', value: 75.2, timestamp: '2023-11-01T07:30:00' },
    { id: '2', date: '2023-11-02', value: 74.9, timestamp: '2023-11-02T07:45:00' },
    { id: '3', date: '2023-11-03', value: 74.7, timestamp: '2023-11-03T07:20:00' },
    { id: '4', date: '2023-11-04', value: 74.5, timestamp: '2023-11-04T07:35:00' },
    { id: '5', date: '2023-11-05', value: 74.8, timestamp: '2023-11-05T07:40:00' },
    { id: '6', date: '2023-11-06', value: 74.6, timestamp: '2023-11-06T07:30:00' },
    { id: '7', date: '2023-11-07', value: 74.4, timestamp: '2023-11-07T07:25:00' },
  ],
  createdAt: '2023-10-15T12:00:00'
};

type TimeRange = '7days' | '30days' | '90days' | 'year' | 'all';

const MetricDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<TimeRange>('7days');
  const [isEditingMetric, setIsEditingMetric] = useState(false);
  
  // In a real app, we would fetch the metric data based on the ID
  const metric = mockMetricData;
  
  const chartData = metric.entries.map(entry => ({
    date: entry.date,
    value: entry.value
  }));
  
  const timeRangeLabel = {
    '7days': 'Last 7 days',
    '30days': 'Last 30 days',
    '90days': 'Last 90 days',
    'year': 'Last year',
    'all': 'All time'
  }[timeRange];
  
  const handleDeleteEntry = (entryId: string) => {
    // In a real app, we would delete the entry from the database
    toast.success('Entry deleted successfully');
  };
  
  const handleDeleteMetric = () => {
    // In a real app, we would delete the metric from the database
    navigate('/metrics');
    toast.success('Metric deleted successfully');
  };
  
  const handleEditMetric = (data: MetricFormData) => {
    // In a real app, we would update the metric in the database
    setIsEditingMetric(false);
    toast.success('Metric updated successfully');
  };
  
  if (isEditingMetric) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditingMetric(false)}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-bold">Edit Metric</h1>
        </div>
        
        <MetricForm
          onSubmit={handleEditMetric}
          onCancel={() => setIsEditingMetric(false)}
          initialData={{
            name: metric.name,
            description: metric.description || '',
            type: metric.type as any,
            chartType: metric.chartType as any,
            prefix: metric.prefix || '',
            suffix: metric.suffix || '',
            status: metric.status as any,
            frequency: metric.frequency as any,
            order: metric.order
          }}
          isEditing={true}
        />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-6">
      {/* Header with back button and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/metrics')}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{metric.name}</h1>
            {metric.description && (
              <p className="text-sm text-muted-foreground">{metric.description}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditingMetric(true)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete metric?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete "{metric.name}" and all of its recorded values.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteMetric}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      {/* Metric details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-1">
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Type</div>
          <div className="font-medium mt-1 capitalize">{metric.type}</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Frequency</div>
          <div className="font-medium mt-1 capitalize">{metric.frequency}</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Created</div>
          <div className="font-medium mt-1">
            {new Date(metric.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      
      {/* Chart section */}
      <div className="mt-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{timeRangeLabel}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Select
              value={timeRange}
              onValueChange={(value) => setTimeRange(value as TimeRange)}
            >
              <SelectTrigger className="w-[160px]">
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
            
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <ChartDisplay
          title={metric.name}
          data={chartData}
          type={metric.chartType as any}
          prefix={metric.prefix}
          suffix={metric.suffix}
          className="mb-6 card-hover glass-card"
        />
      </div>
      
      {/* Entries table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Entries</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Entry
          </Button>
        </div>
        
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metric.entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{new Date(entry.timestamp).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(entry.timestamp).toLocaleTimeString()}</TableCell>
                  <TableCell className="font-medium">
                    {metric.prefix}{entry.value}{metric.suffix}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete entry?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete this entry.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteEntry(entry.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MetricDetail;
