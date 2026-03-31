import { useState } from 'react';
import type { Poll } from '@/data/mockData';
import { motion } from 'framer-motion';

interface PollCardProps {
  poll: Poll;
}

export function PollCard({ poll }: PollCardProps) {
  const [voted, setVoted] = useState<number | undefined>(poll.voted);

  const handleVote = (optionId: number) => {
    if (voted !== undefined) return;
    setVoted(optionId);
  };

  return (
    <div className="mb-3 rounded-lg border border-border bg-muted/30 p-3">
      <p className="font-semibold text-sm text-card-foreground mb-3">{poll.question}</p>
      <div className="space-y-2">
        {poll.options.map(option => (
          <button
            key={option.id}
            onClick={() => handleVote(option.id)}
            className={`w-full text-left rounded-lg p-2.5 text-sm relative overflow-hidden transition-all ${
              voted !== undefined
                ? 'cursor-default'
                : 'hover:bg-primary/5 cursor-pointer border border-border'
            }`}
          >
            {voted !== undefined && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${option.percentage}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`absolute inset-y-0 left-0 rounded-lg ${
                  voted === option.id ? 'bg-primary/15' : 'bg-muted'
                }`}
              />
            )}
            <div className="relative flex justify-between items-center">
              <span className={`${voted === option.id ? 'font-semibold text-primary' : 'text-card-foreground'}`}>
                {option.text}
              </span>
              {voted !== undefined && (
                <span className="text-xs font-medium text-muted-foreground">{option.percentage}%</span>
              )}
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">{poll.totalVotes} votos</p>
    </div>
  );
}
