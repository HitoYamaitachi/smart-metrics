
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, LineChart, ListChecks, BarChart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StaggeredChildren, SlideUp } from '@/components/ui/animations';

const Index = () => {
  return (
    <div className="flex flex-col gap-12 py-8">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto px-4">
        <SlideUp>
          <div className="inline-block mb-2 px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Smart Metrics Logbook
          </div>
        </SlideUp>
        
        <SlideUp delay={100}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Track what matters, see progress visually
          </h1>
        </SlideUp>
        
        <SlideUp delay={200}>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A simple, intuitive metrics tracker designed to help you monitor your daily 
            progress and visualize improvements over time.
          </p>
        </SlideUp>
        
        <SlideUp delay={300}>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <Button asChild size="lg" className="btn-hover">
              <Link to="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-hover">
              <Link to="/dashboard">View Demo</Link>
            </Button>
          </div>
        </SlideUp>
      </section>
      
      {/* Features Section */}
      <section className="px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">Designed for simplicity and efficiency</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Everything you need to track and visualize your personal metrics in one place
          </p>
        </div>
        
        <StaggeredChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard 
            icon={<ListChecks />}
            title="Custom Metrics" 
            description="Create and customize metrics for anything you want to track in your life"
          />
          <FeatureCard 
            icon={<LineChart />}
            title="Visual Progress" 
            description="See your progress with beautiful charts and visualizations"
          />
          <FeatureCard 
            icon={<Zap />}
            title="Quick Entry" 
            description="Fast, one-tap data entry designed for mobile and desktop"
          />
          <FeatureCard 
            icon={<BarChart />}
            title="Detailed Reports" 
            description="Generate reports and insights based on your collected data"
          />
          <FeatureCard 
            icon={<BarChart3 />}
            title="Multiple Formats" 
            description="Numbers, text, checkboxes, dates - track metrics in any format"
          />
          <FeatureCard 
            icon={<BarChart />}
            title="Data Groups" 
            description="Group related metrics together for better organization"
          />
        </StaggeredChildren>
      </section>
      
      {/* CTA Section */}
      <section className="px-4 py-8">
        <Card className="glass-card bg-primary/5 max-w-4xl mx-auto">
          <CardContent className="flex flex-col md:flex-row items-center gap-6 p-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Ready to start tracking?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of users who are already tracking their progress and 
                improving their lives with Smart Metrics.
              </p>
              <Button asChild size="lg" className="btn-hover">
                <Link to="/signup">Create Free Account</Link>
              </Button>
            </div>
            <div className="w-full md:w-1/3 aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center p-8">
              <BarChart className="w-full h-full text-primary/70" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card className="card-hover border border-border/60">
    <CardContent className="p-6">
      <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default Index;
