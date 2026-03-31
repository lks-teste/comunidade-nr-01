import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { notifications } from '@/data/mockData';
import { UserAvatar } from '@/components/feed/UserAvatar';
import { Heart, MessageCircle, UserPlus, Repeat2, Megaphone, Star, Shield, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, any> = {
  like: Heart, comment: MessageCircle, follow: UserPlus, mention: MessageCircle,
  repost: Repeat2, community: Megaphone, highlight: Star, moderation: Shield,
};
const colorMap: Record<string, string> = {
  like: 'text-destructive bg-destructive/10', comment: 'text-primary bg-primary/10',
  follow: 'text-accent bg-accent/10', mention: 'text-warning bg-warning/10',
  repost: 'text-accent bg-accent/10', community: 'text-primary bg-primary/10',
  highlight: 'text-warning bg-warning/10', moderation: 'text-destructive bg-destructive/10',
};

export default function Notificacoes() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? notifications : notifications.filter(n => !n.read);

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto pb-20 lg:pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Notificações</h1>
            <p className="text-sm text-muted-foreground">{notifications.filter(n => !n.read).length} não lidas</p>
          </div>
          <div className="flex gap-1 bg-card rounded-xl p-1 border border-border/50">
            <button
              onClick={() => setFilter('all')}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${filter === 'unread' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            >
              Não lidas
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {filtered.map((notif, i) => {
            const Icon = iconMap[notif.type];
            const colors = colorMap[notif.type];
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`bg-card rounded-xl border border-border/50 p-4 flex items-start gap-3 hover:shadow-card-hover transition-shadow cursor-pointer ${!notif.read ? 'ring-1 ring-primary/20' : ''}`}
              >
                <UserAvatar user={notif.actor} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-card-foreground">
                    <span className="font-semibold">{notif.actor.name}</span>{' '}{notif.content}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full ${colors}`}>
                      <Icon className="h-3 w-3" />
                    </span>
                    <span className="text-xs text-muted-foreground">{notif.createdAt}</span>
                  </div>
                </div>
                {!notif.read && <div className="h-2.5 w-2.5 rounded-full bg-primary mt-2 shrink-0" />}
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔔</p>
            <p className="text-sm font-medium text-foreground">Nenhuma notificação nova</p>
            <p className="text-xs text-muted-foreground mt-1">Você está em dia!</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
