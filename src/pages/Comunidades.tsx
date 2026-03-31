import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { communities } from '@/data/mockData';
import { CommunityCard } from '@/components/feed/CommunityCard';
import { Users } from 'lucide-react';

export default function Comunidades() {
  const [filter, setFilter] = useState<'all' | 'joined'>('all');
  const filtered = filter === 'joined' ? communities.filter(c => c.joined) : communities;

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto pb-20 lg:pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Comunidades</h1>
            <p className="text-sm text-muted-foreground">Encontre seu espaço na comunidade</p>
          </div>
          <div className="flex gap-1 bg-card rounded-xl p-1 border border-border/50">
            <button
              onClick={() => setFilter('all')}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filter === 'all' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('joined')}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filter === 'joined' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              Minhas
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-card rounded-xl shadow-card border border-border/50 p-4 mb-6 flex items-center gap-4">
          <div className="h-12 w-12 gradient-primary rounded-xl flex items-center justify-center">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <p className="text-lg font-bold text-card-foreground">{communities.reduce((a, c) => a + c.members, 0).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">membros em {communities.length} comunidades ativas</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map(c => (
            <CommunityCard key={c.id} community={c} />
          ))}
        </div>

        {filter === 'joined' && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🏠</p>
            <p className="text-sm font-medium text-foreground mb-1">Nenhuma comunidade ainda</p>
            <p className="text-xs text-muted-foreground">Explore e entre em comunidades do seu interesse</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
