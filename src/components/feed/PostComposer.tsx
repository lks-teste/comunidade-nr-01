import { useState } from 'react';
import { Image, Video, Hash, Send, Globe, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { currentUser } from '@/data/mockData';
import { UserAvatar } from './UserAvatar';

interface PostComposerProps {
  onPost?: (content: string) => void;
}

export function PostComposer({ onPost }: PostComposerProps) {
  const [content, setContent] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [selectedType, setSelectedType] = useState('dica');

  const types = [
    { value: 'dica', label: '💡 Dica' },
    { value: 'relato', label: '📖 Relato' },
    { value: 'pergunta', label: '❓ Pergunta' },
    { value: 'educativo', label: '🎓 Educativo' },
    { value: 'enquete', label: '📊 Enquete' },
  ];

  const handleSubmit = () => {
    if (content.trim()) {
      onPost?.(content);
      setContent('');
      setExpanded(false);
    }
  };

  return (
    <motion.div
      layout
      className="bg-card rounded-xl shadow-card border border-border/50 p-4"
    >
      <div className="flex gap-3">
        <UserAvatar user={currentUser} size="md" />
        <div className="flex-1">
          <textarea
            placeholder="Publique algo com a comunidade..."
            value={content}
            onChange={e => setContent(e.target.value)}
            onFocus={() => setExpanded(true)}
            rows={expanded ? 4 : 1}
            className="w-full bg-transparent text-sm text-card-foreground placeholder:text-muted-foreground resize-none focus:outline-none"
          />

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
            >
              {/* Type selector */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {types.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setSelectedType(t.value)}
                    className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                      selectedType === t.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Actions bar */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                    <Image className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                    <Video className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                    <Hash className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors" title="Publicar como anônimo">
                    <EyeOff className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Globe className="h-3 w-3" />
                    <span>Público</span>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                    className="gradient-primary text-primary-foreground px-4 py-1.5 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex items-center gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Publicar
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
