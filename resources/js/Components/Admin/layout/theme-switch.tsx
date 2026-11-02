import { Check, Moon, Sun } from 'lucide-react';
import { cx } from '@/lib/utils';
import { useTheme } from '@/Contexts/ThemeProvider';
import { Button } from '@/Components/Admin/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/Admin/ui/dropdown-menu';

export function ThemeSwitch() {
    const { theme, resolvedTheme, setTheme } = useTheme();

    const handleThemeChange = (nextTheme: 'light' | 'dark' | 'system') => {
        setTheme(nextTheme);

        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            const color =
                nextTheme === 'dark' || (nextTheme === 'system' && resolvedTheme === 'dark')
                    ? '#020817'
                    : '#ffffff';
            metaThemeColor.setAttribute('content', color);
        }
    };

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative scale-95 rounded-full">
                    <Sun
                        className={cx(
                            'size-[1.2rem] transition-all',
                            resolvedTheme === 'dark' && 'scale-0 -rotate-90',
                            resolvedTheme === 'light' && 'scale-100 rotate-0'
                        )}
                    />
                    <Moon
                        className={cx(
                            'absolute size-[1.2rem] transition-all',
                            resolvedTheme === 'dark' && 'scale-100 rotate-0',
                            resolvedTheme === 'light' && 'scale-0 rotate-90'
                        )}
                    />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => handleThemeChange('light')}>
                    Light
                    <Check size={14} className={cx('ml-auto', theme !== 'light' && 'hidden')} />
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleThemeChange('dark')}>
                    Dark
                    <Check size={14} className={cx('ml-auto', theme !== 'dark' && 'hidden')} />
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleThemeChange('system')}>
                    System
                    <Check size={14} className={cx('ml-auto', theme !== 'system' && 'hidden')} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
