
import React from 'react';
import { 
  User, 
  Mail, 
  Bell, 
  Shield, 
  Database, 
  LogOut, 
  Edit2,
  Settings,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { StaggeredChildren } from '@/components/ui/animations';

const mockUserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '', // Placeholder for avatar URL
  joinDate: new Date(2023, 5, 15),
  totalMetrics: 8,
  totalEntries: 126,
  streakDays: 14,
  plan: 'Free',
  storage: {
    used: 12,
    total: 100,
  }
};

const mockStats = [
  {
    title: 'Active Metrics',
    value: '8',
    change: '+2',
    isPositive: true,
  },
  {
    title: 'Total Entries',
    value: '126',
    change: '+24',
    isPositive: true,
  },
  {
    title: 'Current Streak',
    value: '14 days',
    change: '+5',
    isPositive: true,
  },
  {
    title: 'Tracked Since',
    value: '6 months',
    change: '',
    isPositive: true,
  },
];

const Profile = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Profile header */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={mockUserProfile.avatar} alt={mockUserProfile.name} />
              <AvatarFallback className="text-xl">
                {mockUserProfile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold">{mockUserProfile.name}</h1>
              <p className="text-muted-foreground">{mockUserProfile.email}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Member since {mockUserProfile.joinDate.toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm">
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>
      
      {/* Stats grid */}
      <StaggeredChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map(stat => (
          <Card key={stat.title} className="card-hover">
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                {stat.title}
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <div className={`text-xs mt-1 ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from last month
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </StaggeredChildren>
      
      {/* Account details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Name</div>
                  <div className="text-sm text-muted-foreground">
                    Your full name
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span>{mockUserProfile.name}</span>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">
                    Your email address
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span>{mockUserProfile.email}</span>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Manage your notification preferences
                  </div>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Password</div>
                  <div className="text-sm text-muted-foreground">
                    Change your password
                  </div>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="bg-destructive/10 p-2 rounded-full">
                  <LogOut className="h-4 w-4 text-destructive" />
                </div>
                <div>
                  <div className="font-medium">Logout</div>
                  <div className="text-sm text-muted-foreground">
                    Sign out of your account
                  </div>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm" className="text-destructive">
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Plan & Storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="text-sm font-medium">Current Plan</div>
                <div className="text-sm font-medium">{mockUserProfile.plan}</div>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">Free Plan</div>
                  <div className="text-sm text-muted-foreground">
                    Basic features, limited storage
                  </div>
                </div>
                <Button size="sm">
                  Upgrade
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="text-sm font-medium">Storage Usage</div>
                <div className="text-sm font-medium">
                  {mockUserProfile.storage.used} MB / {mockUserProfile.storage.total} MB
                </div>
              </div>
              <Progress 
                value={(mockUserProfile.storage.used / mockUserProfile.storage.total) * 100} 
                className="h-2"
              />
              <div className="text-xs text-muted-foreground text-right">
                {100 - (mockUserProfile.storage.used / mockUserProfile.storage.total) * 100}% available
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
