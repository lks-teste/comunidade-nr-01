import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Compass, Users, User, Shield, Settings, Search,
  Menu, X, Sun, Moon, MessageSquare
} from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { currentUser } from '@/data/mockData';
import { UserAvatar } from '../feed/UserAvatar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: Home, label: 'Feed', path: '/' },
  { icon: Compass, label: 'Explorar', path: '/explorar' },
  { icon: Users, label: 'Comunidades', path: '/comunidades' },
  { icon: MessageSquare, label: 'Mensagens', path: '/mensagens' },
  { icon: User, label: 'Perfil', path: '/perfil' },
  { icon: Shield, label: 'Moderação', path: '/moderacao' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">NR</span>
              </div>
              <span className="font-bold text-foreground hidden sm:block">Comunidade NR-01</span>
            </Link>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar posts, pessoas, comunidades..."
                className="w-full bg-muted rounded-xl pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <NotificationDropdown />
            <Link to="/perfil" className="ml-2">
              <UserAvatar user={currentUser} size="sm" />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-60 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto scrollbar-thin py-4 pr-4">
          <nav className="space-y-1">
            {navItems.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User card */}
          <div className="mt-6 bg-card rounded-xl shadow-card border border-border/50 p-4">
            <div className="flex items-center gap-3 mb-3">
              <UserAvatar user={currentUser} size="md" />
              <div>
                <p className="text-sm font-semibold text-card-foreground">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.role}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-sm font-bold text-card-foreground">{currentUser.postsCount}</p>
                <p className="text-[10px] text-muted-foreground">Posts</p>
              </div>
              <div>
                <p className="text-sm font-bold text-card-foreground">{currentUser.followers.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">Seguidores</p>
              </div>
              <div>
                <p className="text-sm font-bold text-card-foreground">{currentUser.communities}</p>
                <p className="text-[10px] text-muted-foreground">Comunidades</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-4 z-50 animate-slide-in">
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-foreground">Menu</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-muted">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <nav className="space-y-1">
                {navItems.map(item => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 px-4 py-4">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/50 z-30 lg:hidden">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 5).map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg ${
                  active ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
