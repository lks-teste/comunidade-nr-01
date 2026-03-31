import { useState } from 'react';
import { Heart, Reply, MoreHorizontal } from 'lucide-react';
import type { Comment } from '@/data/mockData';
import { UserAvatar } from './UserAvatar';

interface CommentThreadProps {
  comments: Comment[];
}

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [liked, setLiked] = useState(comment.liked);
  const [likesCount, setLikesCount] = useState(comment.likes);
  const [showReply, setShowReply] = useState(false);

  return (
    <div className={`${depth > 0 ? 'ml-8 border-l-2 border-border/50 pl-4' : ''}`}>
      <div className="flex gap-2.5 py-3">
        <UserAvatar user={comment.author} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-card-foreground">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
          </div>
          <p className="text-sm text-card-foreground mt-1">{comment.content}</p>
          <div className="flex items-center gap-3 mt-1.5">
            <button
              onClick={() => { setLiked(!liked); setLikesCount(liked ? likesCount - 1 : likesCount + 1); }}
              className={`flex items-center gap-1 text-xs transition-colors ${liked ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'}`}
            >
              <Heart className={`h-3 w-3 ${liked ? 'fill-current' : ''}`} />
              {likesCount}
            </button>
            <button
              onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Reply className="h-3 w-3" />
              Responder
            </button>
            <button className="text-xs text-muted-foreground hover:text-destructive transition-colors">
              Denunciar
            </button>
          </div>
          {showReply && (
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="Escreva uma resposta..."
                className="flex-1 text-sm bg-muted rounded-lg px-3 py-1.5 text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="text-xs px-3 py-1.5 gradient-primary text-primary-foreground rounded-lg font-medium">
                Enviar
              </button>
            </div>
          )}
        </div>
      </div>
      {comment.replies?.map(reply => (
        <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
}

export function CommentThread({ comments }: CommentThreadProps) {
  return (
    <div className="divide-y divide-border/50">
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
