import { AppLayout } from '@/components/layout/AppLayout';
import { currentUser, posts, badges } from '@/data/mockData';
import { PostCard } from '@/components/feed/PostCard';
import { UserAvatar } from '@/components/feed/UserAvatar';
import { MapPin, Calendar, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Perfil() {
  const user = currentUser;
  const userPosts = posts.filter(p => p.author.id === user.id);

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto pb-20 lg:pb-4">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden mb-4"
        >
          {/* Banner */}
          <div className="h-32 gradient-hero" />

          <div className="px-5 pb-5">
            <div className="flex items-end gap-4 -mt-10 mb-4">
              <div className="ring-4 ring-card rounded-full">
                <UserAvatar user={user} size="xl" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-card-foreground">{user.name}</h1>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
              </div>
              <button className="px-4 py-1.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Editar perfil
              </button>
            </div>

            <p className="text-sm text-card-foreground mb-3">{user.bio}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{user.company}</span>
              <span className="flex items-center gap-1"><LinkIcon className="h-3 w-3" />{user.role}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Membro desde {user.joinedAt}</span>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mb-4">
              {[
                { label: 'Posts', value: user.postsCount },
                { label: 'Curtidas', value: user.likesReceived.toLocaleString() },
                { label: 'Seguidores', value: user.followers.toLocaleString() },
                { label: 'Seguindo', value: user.following },
                { label: 'Comunidades', value: user.communities },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-sm font-bold text-card-foreground">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {user.badges.map(badge => (
                <span key={badge.id} className={`text-xs px-2.5 py-1 rounded-full font-medium ${badge.color}/10 text-foreground flex items-center gap-1`}>
                  {badge.icon} {badge.name}
                </span>
              ))}
            </div>

            {/* Interests */}
            <div className="flex flex-wrap gap-1.5">
              {user.interests.map(interest => (
                <span key={interest} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Posts */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Publicações</h2>
          {userPosts.length > 0 ? (
            userPosts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="bg-card rounded-xl border border-border/50 p-8 text-center">
              <p className="text-2xl mb-2">✍️</p>
              <p className="text-sm text-muted-foreground">Nenhuma publicação ainda</p>
            </div>
          )}
          {/* Show some other posts as demo */}
          {userPosts.length === 0 && posts.slice(0, 3).map(post => (
            <PostCard key={post.id} post={{...post, author: user}} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
