import { TrendingUp, Hash } from 'lucide-react';
import { trendingTopics } from '@/data/mockData';

export function TrendingCard() {
  return (
    <div className="bg-card rounded-xl shadow-card border border-border/50 p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-4 w-4 text-accent" />
        <h3 className="font-semibold text-sm text-card-foreground">Em Alta</h3>
      </div>
      <div className="space-y-3">
        {trendingTopics.slice(0, 6).map(topic => (
          <div key={topic.tag} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-2">
              <Hash className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">
                {topic.tag.replace('#', '')}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{topic.posts} posts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
