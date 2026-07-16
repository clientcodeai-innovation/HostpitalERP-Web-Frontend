import React, { useState } from 'react';
import { Bell, Trash2, AlertTriangle, AlertOctagon, Info } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import StatusBadge from '../shared/StatusBadge';

export default function NotificationsView() {
  const { notifications, setNotifications } = useInventory();

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleDismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" />
          Inventory Alert Center ({notifications.length})
        </h3>
        {notifications.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-[10px] font-bold text-destructive hover:underline flex items-center gap-1 bg-destructive/10 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-10 bg-card border border-border rounded-xl">
            <Bell className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2 animate-bounce-slow" />
            <h4 className="text-sm font-bold text-foreground">No alerts active</h4>
            <p className="text-xs text-muted-foreground">All stock parameters and batch expiries are within normal thresholds.</p>
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              className={`p-4 border rounded-xl flex gap-3.5 items-start bg-card/65 hover:bg-card transition-colors duration-150 animate-in fade-in ${
                n.type === 'danger'
                  ? 'border-rose-500/20 bg-rose-500/5 text-rose-600 dark:text-rose-400'
                  : n.type === 'warning'
                  ? 'border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400'
                  : 'border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {n.type === 'danger' ? (
                  <AlertOctagon className="w-5.5 h-5.5 animate-pulse" />
                ) : n.type === 'warning' ? (
                  <AlertTriangle className="w-5.5 h-5.5" />
                ) : (
                  <Info className="w-5.5 h-5.5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-foreground">{n.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed font-medium">{n.message}</p>
                <span className="text-[10px] text-muted-foreground/60 font-mono mt-1.5 block">
                  {new Date(n.date).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => handleDismiss(n.id)}
                className="text-[10px] font-bold text-muted-foreground hover:text-foreground hover:bg-muted px-2 py-1 rounded-md transition-colors shrink-0 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
