import { CircleCheck, LayoutPanelLeft, Monitor, Moon, PanelLeft, RotateCcw, Settings, Sun } from 'lucide-react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { useTheme } from '@/Contexts/ThemeProvider';
import { type Collapsible, useLayout } from '@/Contexts/LayoutProvider';
import { Button } from '@/Components/Admin/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/Components/Admin/ui/sheet';
import { useSidebar } from '@/Components/Admin/ui/sidebar';
import { cx } from '@/lib/utils';

type OptionItem = {
    value: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
};

function SectionTitle({
    title,
    showReset = false,
    onReset,
    resetAriaLabel,
}: {
    title: string;
    showReset?: boolean;
    onReset?: () => void;
    resetAriaLabel?: string;
}) {
    return (
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-admin-muted-foreground">
            {title}
            {showReset && onReset && (
                <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className="size-4 rounded-full"
                    onClick={onReset}
                    aria-label={resetAriaLabel}
                >
                    <RotateCcw className="size-3" />
                </Button>
            )}
        </div>
    );
}

function ConfigRadioItem({ item }: { item: OptionItem }) {
    return (
        <RadioGroupPrimitive.Item
            value={item.value}
            className="group outline-none transition duration-200 ease-in"
            aria-label={`Select ${item.label.toLowerCase()}`}
        >
            <div
                className={cx(
                    'relative flex h-16 items-center justify-center rounded-admin-md border border-admin-border bg-admin-muted/30',
                    'group-data-[state=checked]:border-admin-primary group-data-[state=checked]:shadow-md',
                    'group-focus-visible:ring-2 group-focus-visible:ring-admin-ring'
                )}
            >
                <CircleCheck
                    className={cx(
                        'absolute right-0 top-0 size-5 translate-x-1/2 -translate-y-1/2 fill-admin-primary stroke-white',
                        'group-data-[state=unchecked]:hidden'
                    )}
                    aria-hidden="true"
                />
                <item.icon
                    className={cx(
                        'size-6 text-admin-muted-foreground',
                        'group-data-[state=checked]:text-admin-primary'
                    )}
                    aria-hidden="true"
                />
            </div>
            <div className="mt-1 text-center text-xs">{item.label}</div>
        </RadioGroupPrimitive.Item>
    );
}

function ThemeConfig() {
    const { defaultTheme, theme, setTheme } = useTheme();

    const options: OptionItem[] = [
        { value: 'system', label: 'System', icon: Monitor },
        { value: 'light', label: 'Light', icon: Sun },
        { value: 'dark', label: 'Dark', icon: Moon },
    ];

    return (
        <div>
            <SectionTitle
                title="Theme"
                showReset={theme !== defaultTheme}
                onReset={() => setTheme(defaultTheme)}
                resetAriaLabel="Reset theme preference to default"
            />
            <RadioGroupPrimitive.Root
                value={theme}
                onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
                className="grid w-full grid-cols-3 gap-4"
                aria-label="Select theme preference"
            >
                {options.map((item) => (
                    <ConfigRadioItem key={item.value} item={item} />
                ))}
            </RadioGroupPrimitive.Root>
        </div>
    );
}

function SidebarVariantConfig() {
    const { defaultVariant, variant, setVariant } = useLayout();

    const options: OptionItem[] = [
        { value: 'inset', label: 'Inset', icon: LayoutPanelLeft },
        { value: 'floating', label: 'Floating', icon: PanelLeft },
        { value: 'sidebar', label: 'Sidebar', icon: PanelLeft },
    ];

    return (
        <div className="max-md:hidden">
            <SectionTitle
                title="Sidebar"
                showReset={defaultVariant !== variant}
                onReset={() => setVariant(defaultVariant)}
                resetAriaLabel="Reset sidebar style to default"
            />
            <RadioGroupPrimitive.Root
                value={variant}
                onValueChange={(value) => setVariant(value as 'inset' | 'sidebar' | 'floating')}
                className="grid w-full grid-cols-3 gap-4"
                aria-label="Select sidebar style"
            >
                {options.map((item) => (
                    <ConfigRadioItem key={item.value} item={item} />
                ))}
            </RadioGroupPrimitive.Root>
        </div>
    );
}

function LayoutConfig() {
    const { open, setOpen } = useSidebar();
    const { defaultCollapsible, collapsible, setCollapsible } = useLayout();

    const radioState = open ? 'default' : collapsible;

    const options: OptionItem[] = [
        { value: 'default', label: 'Default', icon: PanelLeft },
        { value: 'icon', label: 'Compact', icon: LayoutPanelLeft },
        { value: 'offcanvas', label: 'Full layout', icon: PanelLeft },
    ];

    return (
        <div className="max-md:hidden">
            <SectionTitle
                title="Layout"
                showReset={radioState !== 'default'}
                onReset={() => {
                    setOpen(true);
                    setCollapsible(defaultCollapsible);
                }}
                resetAriaLabel="Reset layout options to default"
            />
            <RadioGroupPrimitive.Root
                value={radioState}
                onValueChange={(value) => {
                    if (value === 'default') {
                        setOpen(true);
                        return;
                    }
                    setOpen(false);
                    setCollapsible(value as Collapsible);
                }}
                className="grid w-full grid-cols-3 gap-4"
                aria-label="Select layout style"
            >
                {options.map((item) => (
                    <ConfigRadioItem key={item.value} item={item} />
                ))}
            </RadioGroupPrimitive.Root>
        </div>
    );
}

export function ConfigDrawer() {
    const { setOpen } = useSidebar();
    const { resetTheme } = useTheme();
    const { resetLayout } = useLayout();

    const handleReset = () => {
        setOpen(true);
        resetTheme();
        resetLayout();
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Open theme settings"
                    className="rounded-full"
                >
                    <Settings aria-hidden="true" className="size-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col bg-background text-foreground">
                <SheetHeader className="pb-0 text-left">
                    <SheetTitle>Theme Settings</SheetTitle>
                    <SheetDescription>
                        Adjust the appearance and layout to suit your preferences.
                    </SheetDescription>
                </SheetHeader>
                <div className="space-y-6 overflow-y-auto px-4 py-4">
                    <ThemeConfig />
                    <SidebarVariantConfig />
                    <LayoutConfig />
                </div>
                <SheetFooter className="gap-2">
                    <Button
                        variant="destructive"
                        onClick={handleReset}
                        aria-label="Reset all settings to default values"
                    >
                        Reset
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
