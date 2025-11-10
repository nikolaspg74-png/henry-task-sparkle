import { Home, ListChecks, Gift, Settings } from 'lucide-react';
import { NavLink } from './NavLink';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const links = [
    { to: '/', icon: Home, label: 'Início' },
    { to: '/tarefas', icon: ListChecks, label: 'Tarefas' },
    { to: '/recompensas', icon: Gift, label: 'Prêmios' },
    { to: '/admin', icon: Settings, label: 'Admin' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border shadow-elevated z-40">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="flex justify-around items-center h-20">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all hover:bg-muted"
              activeClassName="bg-gradient-primary text-primary-foreground hover:bg-gradient-primary"
            >
              {({ isActive }) => (
                <>
                  <Icon className={cn('w-6 h-6', isActive && 'animate-bounce-in')} />
                  <span className="text-xs font-semibold">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
