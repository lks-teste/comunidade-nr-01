import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Shield, AlertTriangle, Flag, UserX, FileText, Clock } from 'lucide-react';

const reportedPosts = [
  { id: '1', author: 'Usuário Anônimo', content: 'Conteúdo potencialmente ofensivo reportado por 3 usuários.', reason: 'Linguagem inadequada', reports: 3, status: 'pending' },
  { id: '2', author: 'João Santos', content: 'Comentário com teor de assédio moral.', reason: 'Assédio', reports: 5, status: 'pending' },
  { id: '3', author: 'Maria Lima', content: 'Spam promocional repetido.', reason: 'Spam', reports: 2, status: 'reviewed' },
];

const blockedUsers = [
  { id: '1', name: 'Conta Suspensa 1', reason: 'Múltiplas violações de conduta', date: '2024-12-01' },
  { id: '2', name: 'Conta Suspensa 2', reason: 'Assédio a outros membros', date: '2024-11-15' },
];

const rules = [
  'Manter tom profissional e respeitoso',
  'Incentivar a colaboração e o respeito mútuo',
  'Evitar assédio, ataques pessoais e conteúdos inadequados',
  'Permitir discurso aberto, com moderação clara',
  'Sinalizar conteúdo sensível quando necessário',
  'Citar fontes em informações técnicas',
  'Não compartilhar dados pessoais de terceiros',
];

export default function Moderacao() {
  const [tab, setTab] = useState<'queue' | 'blocked' | 'rules' | 'logs'>('queue');

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto pb-20 lg:pb-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 gradient-primary rounded-xl flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Moderação</h1>
            <p className="text-sm text-muted-foreground">Gerencie o conteúdo e a comunidade</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { icon: Flag, label: 'Denúncias', value: '5', color: 'text-warning bg-warning/10' },
            { icon: Clock, label: 'Pendentes', value: '2', color: 'text-destructive bg-destructive/10' },
            { icon: UserX, label: 'Bloqueados', value: '2', color: 'text-muted-foreground bg-muted' },
            { icon: FileText, label: 'Ações hoje', value: '8', color: 'text-accent bg-accent/10' },
          ].map(stat => (
            <div key={stat.label} className="bg-card rounded-xl border border-border/50 p-3 flex items-center gap-3">
              <div className={`h-9 w-9 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-lg font-bold text-card-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-card rounded-xl p-1 border border-border/50 mb-6">
          {[
            { key: 'queue', label: 'Fila de aprovação' },
            { key: 'blocked', label: 'Bloqueados' },
            { key: 'rules', label: 'Regras' },
            { key: 'logs', label: 'Logs' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as any)}
              className={`flex-1 text-xs sm:text-sm py-2 rounded-lg font-medium transition-colors ${
                tab === t.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'queue' && (
          <div className="space-y-3">
            {reportedPosts.map(post => (
              <div key={post.id} className="bg-card rounded-xl border border-border/50 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.reason} · {post.reports} denúncias</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    post.status === 'pending' ? 'bg-warning/10 text-warning-foreground' : 'bg-success/10 text-success'
                  }`}>
                    {post.status === 'pending' ? 'Pendente' : 'Revisado'}
                  </span>
                </div>
                <p className="text-sm text-card-foreground mb-3">{post.content}</p>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive font-medium hover:bg-destructive/20 transition-colors">
                    Remover
                  </button>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-success/10 text-success font-medium hover:bg-success/20 transition-colors">
                    Aprovar
                  </button>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-muted text-muted-foreground font-medium hover:bg-muted/80 transition-colors">
                    Ignorar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'blocked' && (
          <div className="space-y-3">
            {blockedUsers.map(user => (
              <div key={user.id} className="bg-card rounded-xl border border-border/50 p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-card-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.reason} · Bloqueado em {user.date}</p>
                </div>
                <button className="text-xs px-3 py-1.5 rounded-lg bg-muted text-muted-foreground font-medium">
                  Desbloquear
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'rules' && (
          <div className="bg-card rounded-xl border border-border/50 p-5">
            <h3 className="font-semibold text-card-foreground mb-4">Regras da Comunidade</h3>
            <div className="space-y-3">
              {rules.map((rule, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-card-foreground">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'logs' && (
          <div className="space-y-2">
            {[
              { action: 'Post removido', mod: 'Ana Beatriz', time: '2h atrás', detail: 'Violação de conduta' },
              { action: 'Usuário advertido', mod: 'Ana Beatriz', time: '3h atrás', detail: 'Linguagem inadequada' },
              { action: 'Comentário removido', mod: 'Juliana Ferreira', time: '5h atrás', detail: 'Spam' },
              { action: 'Post aprovado', mod: 'Ana Beatriz', time: '6h atrás', detail: 'Conteúdo verificado' },
              { action: 'Usuário bloqueado', mod: 'Carlos Eduardo', time: '1d atrás', detail: 'Assédio repetido' },
            ].map((log, i) => (
              <div key={i} className="bg-card rounded-xl border border-border/50 p-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-card-foreground"><strong>{log.action}</strong> — {log.detail}</p>
                  <p className="text-xs text-muted-foreground">por {log.mod} · {log.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
