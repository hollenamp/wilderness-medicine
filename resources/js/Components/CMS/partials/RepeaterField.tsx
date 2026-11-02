import { RiAddLine, RiArrowDownLine, RiArrowUpLine, RiDeleteBinLine } from '@remixicon/react';
import { Button } from '@/Components/UI/Button';
import { Label } from '@/Components/Inputs/Label';
import { FormRenderer } from '../FormRenderer';
import { mergeDefaults } from '../mergeDefaults';
import type { RepeaterField as RepeaterFieldConfig } from '../types';

interface RepeaterFieldProps {
    path: string;
    field: RepeaterFieldConfig;
    items: Record<string, unknown>[];
    errors: Record<string, string>;
    onChange: (path: string, value: unknown) => void;
}

export function RepeaterField({ path, field, items, errors, onChange }: RepeaterFieldProps) {
    const setItems = (next: Record<string, unknown>[]) => onChange(path, next);

    const addRow = () => {
        const defaults = mergeDefaults(field.itemSchema, {});
        setItems([...items, { ...defaults, _uiKey: crypto.randomUUID() }]);
    };

    const removeRow = (uiKey: string) => {
        setItems(items.filter((item) => item._uiKey !== uiKey));
    };

    const moveRow = (index: number, direction: -1 | 1) => {
        const target = index + direction;
        if (target < 0 || target >= items.length) return;

        const next = [...items];
        [next[index], next[target]] = [next[target], next[index]];
        setItems(next);
    };

    return (
        <div>
            <Label>{field.label}</Label>
            {field.helpText && <p className="mt-1 text-xs text-muted-foreground">{field.helpText}</p>}

            <div className="mt-2 space-y-4">
                {items.map((item, index) => {
                    const uiKey = (item._uiKey as string) ?? String(index);

                    return (
                        <div key={uiKey} className="rounded-md border border-border p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground">Row {index + 1}</span>
                                <div className="flex items-center gap-1">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="p-1.5"
                                        disabled={index === 0}
                                        onClick={() => moveRow(index, -1)}
                                    >
                                        <RiArrowUpLine className="size-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="p-1.5"
                                        disabled={index === items.length - 1}
                                        onClick={() => moveRow(index, 1)}
                                    >
                                        <RiArrowDownLine className="size-4" />
                                    </Button>
                                    <Button type="button" variant="ghost" className="p-1.5" onClick={() => removeRow(uiKey)}>
                                        <RiDeleteBinLine className="size-4" />
                                    </Button>
                                </div>
                            </div>
                            <FormRenderer
                                schema={field.itemSchema}
                                data={item}
                                errors={errors}
                                onChange={(itemPath, value) => {
                                    const next = [...items];
                                    next[index] = applyAtItemPath(item, itemPath, value);
                                    setItems(next);
                                }}
                                basePath=""
                            />
                        </div>
                    );
                })}
            </div>

            <Button type="button" variant="secondary" className="mt-3" onClick={addRow}>
                <RiAddLine className="mr-1 size-4" />
                Add row
            </Button>
        </div>
    );
}

function applyAtItemPath(item: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
    const segments = path.split('.');
    const [head, ...rest] = segments;

    if (rest.length === 0) {
        return { ...item, [head]: value };
    }

    return {
        ...item,
        [head]: applyAtItemPath((item[head] as Record<string, unknown>) ?? {}, rest.join('.'), value),
    };
}
