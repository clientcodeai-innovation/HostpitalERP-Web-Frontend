import React from 'react';
import { Card, CardContent } from '../../../shared/ui/Card';

export default function KpiCards({ cards = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Card
            key={idx}
            className="group relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md border border-border bg-card/60 backdrop-blur-md"
          >
            {/* Soft decorative background glow */}
            <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-primary/5 group-hover:scale-150 transition-transform duration-500 blur-xl" />
            
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{card.title}</p>
                <div className="flex items-baseline gap-1.5">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">{card.value}</h3>
                  {card.trend && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      card.trendType === 'up'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    }`}>
                      {card.trend}
                    </span>
                  )}
                </div>
                {card.description && (
                  <p className="text-[11px] text-muted-foreground font-medium">{card.description}</p>
                )}
              </div>
              {Icon && (
                <div className={`p-3 rounded-xl transition-all duration-300 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground shadow-xs shrink-0`}>
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
