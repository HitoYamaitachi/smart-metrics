import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, Bell, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  MetricCard, 
  MetricType, 
  ChartType, 
  MetricStatus,
  FrequencyType
} from '@/components/ui/MetricCard';
import { StaggeredChildren } from '@/components/ui/animations';

// Mock data
interface Metric {
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
  order: number;
}

const mockMetrics: Metric[] = [
  {
    id: '1',
    name: 'Weight',
    description: 'Morning weight',
    type: 'number',
    chartType: 'line',
    status: 'fixed',
    frequency: 'daily',
    value: 74.5,
    unit: { suffix: ' kg' },
    lastUpdated: new Date(2023, 10, 15),
    order: 1
  },
  {
    id: '2',
    name: 'Push-ups',
    type: 'number',
    chartType: 'bar',
    status: 'fixed',
    frequency: 'on-demand',
    value: 25,
    unit: { suffix: ' reps' },
    lastUpdated: new Date(2023, 10, 14),
    order: 2
  },
  {
    id: '3',
    name: 'Mood Rating',
    description: 'Evening mood check',
    type: 'radio',
    chartType: 'line',
    status: 'active',
    frequency: 'daily',
    value: 4,
    unit: { suffix: '/5' },
    lastUpdated: new Date(2023, 10, 15),
    order: 3
  },
  {
    id: '4',
    name: 'Blood Pressure (Morning)',
    description: 'Measure upon waking',
    type: 'number',
    chartType: 'line',
    status: 'active',
    frequency: 'daily',
    value: '120/80',
    lastUpdated: new Date(2023, 10, 15),
    order: 4
  },
  {
    id: '5',
    name: 'Blood Pressure (Evening)',
    description: 'Measure before bed',
    type: 'number',
    chartType: 'line',
    status: 'active',
    frequency: 'daily',
    value: '118/76',
    lastUpdated: new Date(2023, 10, 14),
    order: 5
  },
  {
    id: '6',
    name: 'Steps',
    type: 'number',
    chartType: 'bar',
    status: 'active',
    frequency: 'daily',
    value: 8742,
    unit: { suffix: ' steps' },
    lastUpdated: new Date(2023, 10, 15),
    order: 6
  }
];

const recentEntries = [
  {
    id: '1',
    metricName: 'Weight',
    value: '74.5 kg',
    timestamp: new Date(2023, 10, 15, 7, 30)
  },
  {
    id: '2',
    metricName: 'Push-ups',
    value: '25 reps',
    timestamp: new Date(2023, 10, 14, 18, 15)
  },
  {
    id: '3',
    metricName: 'Mood Rating',
    value: '4/5',
    timestamp: new Date(2023, 10, 15, 22, 0)
  }
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const fixedMetrics = mockMetrics.filter(
    m => m.status === 'fixed' && m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const activeMetrics = mockMetrics.filter(
    m => m.status === 'active' && m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Search and actions */}
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
        <Button variant="outline" size="icon" aria-label="Filter">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
      </div>

      {/* Fixed metrics section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Pinned Metrics</h2>
          <Button asChild variant="ghost" size="sm" className="gap-1 text-primary">
            <Link to="/add-metric">
              <PlusCircle className="h-4 w-4" />
              <span>Add</span>
            </Link>
          </Button>
        </div>
        
        <StaggeredChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fixedMetrics.length > 0 ? (
            fixedMetrics.map(metric => (
              <MetricCard
                key={metric.id}
                id={metric.id}
                name={metric.name}
                description={metric.description}
                type={metric.type}
                chartType={metric.chartType}
                status={metric.status}
                frequency={metric.frequency}
                value={metric.value}
                unit={metric.unit}
                lastUpdated={metric.lastUpdated}
                onClick={() => console.log(`Add value for ${metric.name}`)}
                onPin={() => console.log(`Unpin ${metric.name}`)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">No pinned metrics yet</p>
              <Button asChild variant="link" className="mt-2">
                <Link to="/add-metric">Add a metric</Link>
              </Button>
            </div>
          )}
        </StaggeredChildren>
      </section>

      {/* Recent entries section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Recent Entries</h2>
          <Button asChild variant="link" size="sm">
            <Link to="/metrics">View All</Link>
          </Button>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm">
          {recentEntries.map((entry, index) => (
            <React.Fragment key={entry.id}>
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-medium">{entry.metricName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {entry.timestamp.toLocaleString()}
                  </p>
                </div>
                <div className="text-lg font-semibold">{entry.value}</div>
              </div>
              {index < recentEntries.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Other active metrics */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">All Metrics</h2>
        </div>
        
        <StaggeredChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeMetrics.length > 0 ? (
            activeMetrics.map(metric => (
              <MetricCard
                key={metric.id}
                id={metric.id}
                name={metric.name}
                description={metric.description}
                type={metric.type}
                chartType={metric.chartType}
                status={metric.status}
                frequency={metric.frequency}
                value={metric.value}
                unit={metric.unit}
                lastUpdated={metric.lastUpdated}
                onClick={() => console.log(`Add value for ${metric.name}`)}
                onPin={() => console.log(`Pin ${metric.name}`)}
              />
            ))
          ) : (
            searchTerm ? (
              <div className="col-span-full text-center py-8 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">No metrics match your search</p>
              </div>
            ) : null
          )}
        </StaggeredChildren>
      </section>
    </div>
  );
};

export default Dashboard;
