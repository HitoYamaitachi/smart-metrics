
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { MetricType, ChartType, FrequencyType } from './MetricCard';

export interface MetricFormProps {
  onSubmit: (data: MetricFormData) => void;
  onCancel: () => void;
  initialData?: Partial<MetricFormData>;
  isEditing?: boolean;
}

export interface MetricFormData {
  name: string;
  description: string;
  type: MetricType;
  chartType: ChartType;
  prefix: string;
  suffix: string;
  status: 'active' | 'inactive' | 'fixed';
  frequency: FrequencyType;
  frequencyDays?: number;
  order: number;
  options?: string[]; // For checkbox, radio types
}

export const MetricForm: React.FC<MetricFormProps> = ({ 
  onSubmit, 
  onCancel, 
  initialData,
  isEditing = false 
}) => {
  const [formData, setFormData] = useState<MetricFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    type: initialData?.type || 'number',
    chartType: initialData?.chartType || 'line',
    prefix: initialData?.prefix || '',
    suffix: initialData?.suffix || '',
    status: initialData?.status || 'active',
    frequency: initialData?.frequency || 'daily',
    frequencyDays: initialData?.frequencyDays || 1,
    order: initialData?.order || 0,
    options: initialData?.options || ['']
  });

  const [optionsText, setOptionsText] = useState(
    initialData?.options?.join('\n') || ''
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ 
      ...prev, 
      [name]: checked ? 'fixed' : 'active' 
    }));
  };

  const handleOptionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOptionsText(e.target.value);
    const options = e.target.value.split('\n').filter(Boolean);
    setFormData((prev) => ({ ...prev, options }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const showOptionsList = formData.type === 'checkbox' || formData.type === 'radio';
  const showChartTypeSelector = formData.type !== 'textarea' && formData.type !== 'text';
  const showUnitFields = formData.type === 'number';
  const showFrequencyDays = formData.frequency === 'custom';

  return (
    <form onSubmit={handleSubmit} className="animate-scale-in">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Metric' : 'Create New Metric'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Metric Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Weight, Steps, Blood Pressure"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add details about this metric"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Field Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select field type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="textarea">Text Area</SelectItem>
                <SelectItem value="checkbox">Checkboxes</SelectItem>
                <SelectItem value="radio">Radio Buttons</SelectItem>
                <SelectItem value="datetime">Date & Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {showOptionsList && (
            <div className="space-y-2">
              <Label htmlFor="options">Options (one per line)</Label>
              <Textarea
                id="options"
                value={optionsText}
                onChange={handleOptionsChange}
                placeholder="Option 1&#10;Option 2&#10;Option 3"
                rows={3}
              />
            </div>
          )}

          {showUnitFields && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prefix">Prefix (optional)</Label>
                <Input
                  id="prefix"
                  name="prefix"
                  value={formData.prefix}
                  onChange={handleChange}
                  placeholder="e.g., $, €"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suffix">Suffix (optional)</Label>
                <Input
                  id="suffix"
                  name="suffix"
                  value={formData.suffix}
                  onChange={handleChange}
                  placeholder="e.g., kg, steps"
                />
              </div>
            </div>
          )}

          {showChartTypeSelector && (
            <div className="space-y-2">
              <Label htmlFor="chartType">Chart Type</Label>
              <Select
                value={formData.chartType}
                onValueChange={(value) => handleSelectChange('chartType', value as ChartType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select chart type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="list">List View</SelectItem>
                  <SelectItem value="none">No Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="frequency">Tracking Frequency</Label>
            <Select
              value={formData.frequency}
              onValueChange={(value) => handleSelectChange('frequency', value as FrequencyType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="custom">Every X Days</SelectItem>
                <SelectItem value="on-demand">On Demand</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {showFrequencyDays && (
            <div className="space-y-2">
              <Label htmlFor="frequencyDays">Every X Days</Label>
              <Input
                id="frequencyDays"
                name="frequencyDays"
                type="number"
                min={1}
                value={formData.frequencyDays}
                onChange={handleChange}
                placeholder="Number of days"
              />
            </div>
          )}

          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="status"
              checked={formData.status === 'fixed'}
              onCheckedChange={(checked) => handleSwitchChange('status', checked)}
            />
            <Label htmlFor="status">Pin to Dashboard</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Save Changes' : 'Create Metric'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
