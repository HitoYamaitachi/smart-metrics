
import React from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children,
  className
}) => {
  return (
    <div className={cn("animate-fade-in", className)}>
      {children}
    </div>
  );
};

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0,
  duration = 300,
  className 
}) => {
  const style = {
    animationDelay: `${delay}ms`,
    animationDuration: `${duration}ms`,
  };

  return (
    <div 
      className={cn("animate-fade-in", className)} 
      style={style}
    >
      {children}
    </div>
  );
};

interface StaggeredChildrenProps {
  children: React.ReactNode;
  staggerMs?: number;
  className?: string;
}

export const StaggeredChildren: React.FC<StaggeredChildrenProps> = ({ 
  children, 
  staggerMs = 50,
  className 
}) => {
  const childArray = React.Children.toArray(children);
  
  return (
    <div className={className}>
      {childArray.map((child, i) => (
        <FadeIn key={i} delay={i * staggerMs}>
          {child}
        </FadeIn>
      ))}
    </div>
  );
};

interface SlideUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const SlideUp: React.FC<SlideUpProps> = ({ 
  children, 
  delay = 0,
  className 
}) => {
  const style = {
    animationDelay: `${delay}ms`,
  };

  return (
    <div 
      className={cn("animate-slide-up", className)} 
      style={style}
    >
      {children}
    </div>
  );
};

interface RouteTransitionProps {
  children: React.ReactNode;
}

export const RouteTransition: React.FC<RouteTransitionProps> = ({ children }) => {
  const location = useLocation();
  
  // Using a key based on the location path causes a re-render and animation
  // when the route changes
  return (
    <PageTransition key={location.pathname}>
      {children}
    </PageTransition>
  );
};
