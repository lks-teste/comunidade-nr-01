import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { trendingTopics, posts, communities, users } from '@/data/mockData';
import { PostCard } from '@/components/feed/PostCard';
import { CommunityCard } from '@/components/feed/CommunityCard';
import { UserAvatar } from '@/components/feed/UserAvatar';
import { TrendingUp, Hash, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const themes = [
  'Todos', 'Liderança', 'Bem-estar', 'NR-01', 'SST', 'Burnout',
  'Comunicação', 'Clima', 'Cultura', 'Produtividade',
];

export default function Explorar() {
  const [activeTheme, setActiveTheme] = useState('Todos');
  const [tab, setTab] = useState<'trending' | 'posts' | 'people' | 'communities'>('trending');

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto pb-20 lg:pb-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">Explorar</h1>
          <p className="text-sm text-muted-foreground">Descubra tópicos, pessoas e comunidades</p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por autor, tema, comunidade..."
            className="w-full bg-card rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Theme filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-2 mb-4">
          {themes.map(theme => (
            <button
              key={theme}
              onClick={() => setActiveTheme(theme)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                activeTheme === theme
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted border border-border/50'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-card rounded-xl p-1 border border-border/50 mb-6">
          {[
            { key: 'trending', label: 'Em Alta' },
            { key: 'posts', label: 'Posts' },
            { key: 'people', label: 'Pessoas' },
            { key: 'communities', label: 'Comunidades' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as any)}
              className={`flex-1 text-sm py-2 rounded-lg font-medium transition-colors ${
                tab === t.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 'trending' && (
          <div className="space-y-3">
            {trendingTopics.map((topic, i) => (
              <motion.div
                key={topic.tag}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border border-border/50 p-4 flex items-center justify-between hover:shadow-card-hover transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Hash className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-card-foreground">{topic.tag}</p>
                    <p className="text-xs text-muted-foreground">{topic.posts.toLocaleString()} publicações</p>
                  </div>
                </div>
                {topic.trending && (
                  <span className="flex items-center gap-1 text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded-full">
                    <TrendingUp className="h-3 w-3" />
                    Em alta
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'posts' && (
          <div className="space-y-4">
            {posts.slice(0, 5).map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {tab === 'people' && (
          <div className="space-y-3">
            {users.map(user => (
              <div key={user.id} className="bg-card rounded-xl border border-border/50 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserAvatar user={user} size="lg" />
                  <div>
                    <p className="font-semibold text-sm text-card-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role} · {user.company}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{user.followers} seguidores</p>
                  </div>
                </div>
                <button className="text-xs px-4 py-1.5 rounded-full font-medium gradient-primary text-primary-foreground">
                  Seguir
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'communities' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {communities.map(c => (
              <CommunityCard key={c.id} community={c} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
