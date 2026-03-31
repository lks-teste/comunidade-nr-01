import { useState } from 'react';
import { Users } from 'lucide-react';
import type { Community } from '@/data/mockData';

interface CommunityCardProps {
  community: Community;
  compact?: boolean;
}

export function CommunityCard({ community, compact = false }: CommunityCardProps) {
  const [joined, setJoined] = useState(community.joined);

  if (compact) {
    return (
      <div className="flex items-center justify-between py-2 group cursor-pointer">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">{community.icon}</span>
          <div>
            <p className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">{community.name}</p>
            <p className="text-xs text-muted-foreground">{community.members.toLocaleString()} membros</p>
          </div>
        </div>
        <button
          onClick={() => setJoined(!joined)}
          className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
            joined
              ? 'bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
              : 'gradient-primary text-primary-foreground'
          }`}
        >
          {joined ? 'Seguindo' : 'Entrar'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-card border border-border/50 p-5 hover:shadow-card-hover transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`h-12 w-12 rounded-xl ${community.color} flex items-center justify-center text-2xl`}>
            {community.icon}
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{community.name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{community.members.toLocaleString()} membros</span>
              <span>·</span>
              <span>{community.postsThisWeek} posts esta semana</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{community.description}</p>
      {community.highlight && (
        <div className="bg-muted/50 rounded-lg px-3 py-2 mb-3">
          <p className="text-xs font-medium text-primary">📌 {community.highlight}</p>
        </div>
      )}
      <button
        onClick={() => setJoined(!joined)}
        className={`w-full text-sm py-2 rounded-lg font-medium transition-all ${
          joined
            ? 'bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
            : 'gradient-primary text-primary-foreground hover:opacity-90'
        }`}
      >
        {joined ? 'Seguindo' : 'Entrar na comunidade'}
      </button>
    </div>
  );
}
