import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Brain, Zap, History, Download, Send, BarChart3 } from 'lucide-react';

const history = [
  { id: 'AI-50', prompt: 'Suggest remedies for recurrent bronchitis in 3-year-old', tokens: 1240, model: 'GPT-4o', time: '14 Jul, 10:30 AM' },
  { id: 'AI-49', prompt: 'Differential diagnosis: persistent dry cough with mild fever', tokens: 890, model: 'GPT-4o', time: '13 Jul, 03:15 PM' },
  { id: 'AI-48', prompt: 'Summarize case history for patient P-1001', tokens: 650, model: 'GPT-4o-mini', time: '12 Jul, 11:00 AM' },
];

export default function AIWorkbenchPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="AI Workbench" description="AI-powered case assistance, prompt builder, token usage, and analytics." breadcrumbs={[{ label: 'Admin' }, { label: 'Platform' }, { label: 'AI Workbench' }]} />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ label: 'Total Prompts', value: '248', icon: Brain },{ label: 'Tokens Used', value: '124.5K', icon: Zap },{ label: 'Avg Tokens/Query', value: '502', icon: BarChart3 },{ label: 'Exports', value: '34', icon: Download }].map((k,i)=>(
          <Card key={i}><CardContent className="p-4 flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><k.icon className="w-5 h-5 text-primary" /></div><div><p className="text-xl font-bold">{k.value}</p><p className="text-xs text-muted-foreground">{k.label}</p></div></CardContent></Card>
        ))}
      </div>

      {/* Prompt Builder */}
      <Card className="border-primary/30">
        <CardHeader><CardTitle>Prompt Builder</CardTitle><CardDescription>Enter a clinical query for AI-assisted case support.</CardDescription></CardHeader>
        <CardContent>
          <textarea rows={4} className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring mb-3" placeholder="E.g., Suggest treatment plan for recurrent AURI in a 2-year-old with history of allergies..." />
          <div className="flex items-center justify-between">
            <Badge variant="outline">Model: GPT-4o</Badge>
            <Button className="gap-1.5"><Send className="w-4 h-4" />Submit Query</Button>
          </div>
        </CardContent>
      </Card>

      {/* History */}
      <Card><CardHeader><CardTitle className="text-base">Query History</CardTitle></CardHeader><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/30"><th className="h-10 px-4 text-left font-medium text-muted-foreground">ID</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Prompt</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Model</th><th className="h-10 px-4 text-right font-medium text-muted-foreground">Tokens</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Time</th></tr></thead><tbody>
        {history.map((h)=>(<tr key={h.id} className="border-b hover:bg-muted/30"><td className="p-4 font-mono text-xs">{h.id}</td><td className="p-4 max-w-md truncate">{h.prompt}</td><td className="p-4"><Badge variant="outline">{h.model}</Badge></td><td className="p-4 text-right font-mono">{h.tokens}</td><td className="p-4 text-xs text-muted-foreground">{h.time}</td></tr>))}
      </tbody></table></div></CardContent></Card>
    </div>
  );
}
