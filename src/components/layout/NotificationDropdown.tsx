import { useState } from 'react';
import { Bell, Heart, MessageCircle, UserPlus, Repeat2, Megaphone, Star, Shield } from 'lucide-react';
import { notifications } from '@/data/mockData';
import { UserAvatar } from '../feed/UserAvatar';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  mention: MessageCircle,
  repost: Repeat2,
  community: Megaphone,
  highlight: Star,
  moderation: Shield,
};

const colorMap = {
  like: 'text-destructive',
  comment: 'text-primary',
  follow: 'text-accent',
  mention: 'text-warning',
  repost: 'text-accent',
  community: 'text-primary',
  highlight: 'text-warning',
  moderation: 'text-destructive',
};

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-xl shadow-elevated z-50 overflow-hidden"
            >
              <div className="p-3 border-b border-border">
                <h3 className="font-semibold text-sm text-popover-foreground">Notificações</h3>
              </div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {notifications.map(notif => {
                  const Icon = iconMap[notif.type];
                  return (
                    <div
                      key={notif.id}
                      className={`flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                        !notif.read ? 'bg-primary/5' : ''
                      }`}
                    >
                      <UserAvatar user={notif.actor} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-popover-foreground">
                          <span className="font-semibold">{notif.actor.name}</span>{' '}
                          {notif.content}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Icon className={`h-3 w-3 ${colorMap[notif.type]}`} />
                          <span className="text-[10px] text-muted-foreground">{notif.createdAt}</span>
                        </div>
                      </div>
                      {!notif.read && (
                        <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="p-2 border-t border-border">
                <button className="w-full text-xs text-primary font-medium py-1.5 hover:bg-primary/5 rounded-lg transition-colors">
                  Ver todas as notificações
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
