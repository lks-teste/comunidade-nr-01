import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { User, Bell, Shield, Palette, Globe, Lock } from 'lucide-react';

export default function Configuracoes() {
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`w-10 h-5.5 rounded-full transition-colors relative ${value ? 'bg-primary' : 'bg-muted'}`}
      style={{ height: 22 }}
    >
      <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-primary-foreground shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  );

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto pb-20 lg:pb-4">
        <h1 className="text-2xl font-bold text-foreground mb-6">Configurações</h1>

        <div className="space-y-4">
          {/* Account */}
          <div className="bg-card rounded-xl border border-border/50 p-5">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-sm text-card-foreground">Conta</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Nome</label>
                <input type="text" defaultValue="Ana Beatriz Costa" className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground mt-1 focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">E-mail</label>
                <input type="email" defaultValue="ana@techcorp.com" className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground mt-1 focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Bio</label>
                <textarea defaultValue="Apaixonada por pessoas e cultura organizacional." rows={2} className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground mt-1 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-card rounded-xl border border-border/50 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-sm text-card-foreground">Notificações</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-card-foreground">Notificações por e-mail</span>
                <Toggle value={notifEmail} onChange={setNotifEmail} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-card-foreground">Notificações push</span>
                <Toggle value={notifPush} onChange={setNotifPush} />
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-card rounded-xl border border-border/50 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-sm text-card-foreground">Privacidade</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-card-foreground">Perfil privado</span>
                <p className="text-xs text-muted-foreground mt-0.5">Apenas seguidores aprovados podem ver seus posts</p>
              </div>
              <Toggle value={privateProfile} onChange={setPrivateProfile} />
            </div>
          </div>

          <button className="w-full gradient-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
            Salvar alterações
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
