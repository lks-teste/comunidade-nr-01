import { AppLayout } from '@/components/layout/AppLayout';
import { MessageSquare } from 'lucide-react';

export default function Mensagens() {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto pb-20 lg:pb-4">
        <h1 className="text-2xl font-bold text-foreground mb-6">Mensagens</h1>
        <div className="bg-card rounded-xl border border-border/50 p-12 text-center">
          <div className="h-16 w-16 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-8 w-8 text-accent-foreground" />
          </div>
          <p className="text-sm font-medium text-card-foreground mb-1">Mensagens em breve</p>
          <p className="text-xs text-muted-foreground">A funcionalidade de mensagens privadas está sendo desenvolvida. Em breve você poderá interagir diretamente com outros membros.</p>
        </div>
      </div>
    </AppLayout>
  );
}
