import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const roles = [
    { id: 'colaborador', label: 'Colaborador', desc: 'Participar da comunidade e compartilhar experiências' },
    { id: 'lider', label: 'Líder', desc: 'Gestão de equipes e liderança humanizada' },
    { id: 'rh', label: 'RH', desc: 'Recursos Humanos e cultura organizacional' },
    { id: 'sst', label: 'SST', desc: 'Segurança e Saúde no Trabalho' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left - Hero */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-primary-foreground/20" style={{
              width: Math.random() * 100 + 50, height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            }} />
          ))}
        </div>
        <div className="relative z-10 max-w-lg text-center">
          <div className="h-16 w-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <span className="text-primary-foreground font-bold text-2xl">NR</span>
          </div>
          <h1 className="text-4xl font-extrabold text-primary-foreground mb-4 leading-tight">
            Comunidade NR-01
          </h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Compartilhe experiências, aprenda com a comunidade e fortaleça uma cultura de trabalho mais saudável.
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden mb-8 text-center">
            <div className="h-12 w-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold text-lg">NR</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Comunidade NR-01</h1>
          </div>

          <h2 className="text-xl font-bold text-foreground mb-1">
            {mode === 'login' ? 'Entrar' : 'Criar conta'}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {mode === 'login' ? 'Bem-vindo de volta à comunidade' : 'Junte-se à comunidade'}
          </p>

          <div className="space-y-3">
            {mode === 'register' && (
              <input
                type="text"
                placeholder="Nome completo"
                className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            )}
            <input
              type="email"
              placeholder="E-mail"
              className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />

            {mode === 'register' && (
              <>
                <input
                  type="text"
                  placeholder="Empresa"
                  className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <p className="text-xs font-medium text-foreground mt-2">Seu perfil</p>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map(role => (
                    <button
                      key={role.id}
                      className="text-left p-2.5 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      <span className="text-sm font-medium text-foreground">{role.label}</span>
                      <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{role.desc}</p>
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              onClick={() => navigate('/')}
              className="w-full gradient-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {mode === 'login' ? 'Entrar' : 'Criar conta'}
            </button>
          </div>

          <div className="my-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Demo access */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground text-center">Acesso Demo</p>
            <div className="grid grid-cols-2 gap-2">
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => navigate('/')}
                  className="py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Entrar como {role.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-6">
            {mode === 'login' ? 'Não tem conta? ' : 'Já tem conta? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-primary font-medium hover:underline"
            >
              {mode === 'login' ? 'Criar conta' : 'Entrar'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
