import { useState } from 'react';
import { posts, communities } from '@/data/mockData';
import { PostCard } from '@/components/feed/PostCard';
import { PostComposer } from '@/components/feed/PostComposer';
import { TrendingCard } from '@/components/feed/TrendingCard';
import { CommunityCard } from '@/components/feed/CommunityCard';
import { CommentThread } from '@/components/feed/CommentThread';
import { mockComments } from '@/data/mockData';
import { AppLayout } from '@/components/layout/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const sortOptions = [
  { value: 'recent', label: 'Mais recentes' },
  { value: 'popular', label: 'Em alta' },
  { value: 'comments', label: 'Mais comentados' },
  { value: 'following', label: 'Seguidos' },
];

export default function Feed() {
  const [sort, setSort] = useState('recent');
  const [commentPostId, setCommentPostId] = useState<string | null>(null);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sort === 'popular') return b.likes - a.likes;
    if (sort === 'comments') return b.comments - a.comments;
    return 0;
  });

  return (
    <AppLayout>
      <div className="flex gap-6 max-w-4xl mx-auto">
        {/* Main feed */}
        <div className="flex-1 min-w-0 space-y-4 pb-20 lg:pb-4">
          <PostComposer />

          {/* Sort bar */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1">
            {sortOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                  sort === opt.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-muted-foreground hover:bg-muted border border-border/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {sortedPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onOpenComments={setCommentPostId}
            />
          ))}
        </div>

        {/* Right sidebar */}
        <aside className="hidden xl:block w-72 shrink-0 space-y-4 sticky top-[4.5rem] h-fit">
          <TrendingCard />
          <div className="bg-card rounded-xl shadow-card border border-border/50 p-4">
            <h3 className="font-semibold text-sm text-card-foreground mb-3">Comunidades sugeridas</h3>
            <div className="space-y-1">
              {communities.filter(c => !c.joined).slice(0, 3).map(c => (
                <CommunityCard key={c.id} community={c} compact />
              ))}
            </div>
          </div>
          <div className="bg-card rounded-xl shadow-card border border-border/50 p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              📌 <strong>Publicação em destaque:</strong> A NR-01 atualizada traz novas exigências para gestão de riscos psicossociais. Participe da discussão na comunidade SST.
            </p>
          </div>
        </aside>
      </div>

      {/* Comments modal */}
      <AnimatePresence>
        {commentPostId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setCommentPostId(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-card rounded-xl shadow-elevated border border-border w-full max-w-lg max-h-[80vh] overflow-hidden z-10"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold text-card-foreground">Comentários</h3>
                <button onClick={() => setCommentPostId(null)} className="p-1 rounded-lg hover:bg-muted">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <div className="overflow-y-auto max-h-[60vh] px-4">
                <CommentThread comments={mockComments} />
              </div>
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Seja o primeiro a comentar..."
                    className="flex-1 bg-muted rounded-xl px-4 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button className="gradient-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium">
                    Enviar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
