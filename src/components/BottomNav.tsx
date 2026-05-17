import { Link, useRouterState } from "@tanstack/react-router";
import { Home, ImageIcon, Scroll, Users } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/heritage", label: "Heritage", icon: Scroll },
  { to: "/artisans", label: "Artisans", icon: Users },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 glass">
      <ul className="mx-auto grid max-w-2xl grid-cols-4">
        {items.map(({ to, label, icon: Icon }) => {
          const active =
            to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <li key={to}>
              <Link
                to={to}
                className="flex flex-col items-center justify-center gap-1 py-3 font-ui text-[10px] tracking-luxe uppercase transition-colors"
              >
                <Icon
                  className={`h-5 w-5 transition-all ${
                    active ? "text-gold" : "text-muted-foreground"
                  }`}
                  strokeWidth={active ? 2.2 : 1.5}
                />
                <span
                  className={
                    active ? "text-gold" : "text-muted-foreground"
                  }
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}