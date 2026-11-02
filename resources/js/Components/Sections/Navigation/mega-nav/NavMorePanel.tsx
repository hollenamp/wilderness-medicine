import { Link, usePage } from '@inertiajs/react';

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/Components/UI/NavigationMenu';
import type { NavItem } from '@/Pages/Public/navigation';
import { cx } from '@/lib/utils';

type NavMorePanelProps = {
  items: NavItem[];
  className?: string;
};

export default function NavMorePanel({ items, className }: NavMorePanelProps) {
  const pathname = usePage().url.split(/[?#]/)[0];
  const isActive = items.some((item) => pathname === item.href);

  return (
    <NavigationMenuItem className={cx('relative -mb-px shrink-0', className)}>
      <NavigationMenuTrigger
        className={cx(
          'text-white/90 hover:text-white',
          'data-[state=open]:text-white',
          isActive && 'text-white'
        )}
      >
        More
      </NavigationMenuTrigger>
      <NavigationMenuContent variant="dropdown">
        <ul className="flex flex-col gap-1 p-2">
          {items.map((item) => {
            const Icon = item.icon;
            const itemIsActive = pathname === item.href;

            return (
              <li key={item.href}>
                <NavigationMenuLink
                  asChild
                  active={itemIsActive}
                  className="h-auto px-4 py-3 hover:border-transparent"
                >
                  <Link
                    href={item.href}
                    className="flex h-auto w-full items-center gap-3 rounded-lg border-none text-charcoal-brown-950 transition-colors hover:bg-forest-green-50 hover:text-forest-green-700"
                  >
                    {Icon ? <Icon className="h-5 w-5 shrink-0 text-forest-green-600" aria-hidden /> : null}
                    <span className="whitespace-nowrap text-sm font-semibold">{item.label}</span>
                  </Link>
                </NavigationMenuLink>
              </li>
            );
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
