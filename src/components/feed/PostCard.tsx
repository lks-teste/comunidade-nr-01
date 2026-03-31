import { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Bookmark, MoreHorizontal, Pin, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Post } from '@/data/mockData';
import { postTypeLabels } from '@/data/mockData';
import { UserAvatar } from './UserAvatar';
import { PollCard } from './PollCard';

interface PostCardProps {
  post: Post;
  onOpenComments?: (postId: string) => void;
  onOpenProfile?: (userId: string) => void;
}

export function PostCard({ post, onOpenComments, onOpenProfile }: PostCardProps) {
  const [liked, setLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [saved, setSaved] = useState(post.saved);
  const [reposted, setReposted] = useState(post.reposted);
  const [repostsCount, setRepostsCount] = useState(post.reposts);
  const [showMenu, setShowMenu] = useState(false);

  const typeInfo = postTypeLabels[post.type];

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const handleRepost = () => {
    setReposted(!reposted);
    setRepostsCount(reposted ? repostsCount - 1 : repostsCount + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-border/50"
    >
      {post.pinned && (
        <div className="flex items-center gap-1.5 px-4 pt-3 text-xs text-muted-foreground">
          <Pin className="h-3 w-3" />
          <span>Publicação fixada</span>
        </div>
      )}

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onOpenProfile?.(post.author.id)}>
            <UserAvatar user={post.author} size="md" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-card-foreground text-sm">{post.author.name}</span>
                {typeInfo && (
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${typeInfo.color}`}>
                    {typeInfo.label}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>{post.author.role}</span>
                <span>·</span>
                <span>{post.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 top-8 bg-popover border border-border rounded-lg shadow-elevated py-1 w-44 z-10"
              >
                <button className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors text-popover-foreground">Fixar post</button>
                <button className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors text-popover-foreground">Compartilhar link</button>
                <button className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors text-popover-foreground">Silenciar autor</button>
                <button className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors text-destructive">Denunciar</button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Content */}
        <p className="text-card-foreground text-sm leading-relaxed mb-3 whitespace-pre-wrap">{post.content}</p>

        {/* Poll */}
        {post.poll && <PollCard poll={post.poll} />}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs text-primary font-medium hover:underline cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              liked ? 'text-destructive bg-destructive/10' : 'text-muted-foreground hover:text-destructive hover:bg-destructive/5'
            }`}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            <span>{likesCount}</span>
          </button>

          <button
            onClick={() => onOpenComments?.(post.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </button>

          <button
            onClick={handleRepost}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              reposted ? 'text-accent bg-accent/10' : 'text-muted-foreground hover:text-accent hover:bg-accent/5'
            }`}
          >
            <Repeat2 className="h-4 w-4" />
            <span>{repostsCount}</span>
          </button>

          <button
            onClick={() => setSaved(!saved)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              saved ? 'text-warning bg-warning/10' : 'text-muted-foreground hover:text-warning hover:bg-warning/5'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
          </button>

          <button className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
