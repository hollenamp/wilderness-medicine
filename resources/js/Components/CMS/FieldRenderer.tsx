import axios from 'axios';
import { useState } from 'react';
import { Checkbox } from '@/Components/Inputs/Checkbox';
import { Input } from '@/Components/Inputs/Input';
import { Label } from '@/Components/Inputs/Label';
import { SelectNative } from '@/Components/Inputs/SelectNative';
import { Textarea } from '@/Components/Inputs/TextArea';
import InputError from '@/Components/InputError';
import { toast } from '@/lib/useToast';
import { iconAllowlist } from './fields/iconAllowlist';
import type { FieldConfig } from './types';

interface FieldRendererProps {
    path: string;
    field: FieldConfig;
    value: unknown;
    error?: string;
    onChange: (path: string, value: unknown) => void;
}

export function FieldRenderer({ path, field, value, error, onChange }: FieldRendererProps) {
    const inputId = path.replace(/\./g, '-');

    return (
        <div>
            <Label htmlFor={inputId}>{field.label}</Label>

            {field.type === 'text' && (
                <Input
                    id={inputId}
                    type="text"
                    value={(value as string) ?? ''}
                    placeholder={field.placeholder}
                    maxLength={field.maxLength}
                    hasError={!!error}
                    className="mt-1"
                    onChange={(e) => onChange(path, e.target.value)}
                />
            )}

            {field.type === 'textarea' && (
                <Textarea
                    id={inputId}
                    value={(value as string) ?? ''}
                    placeholder={field.placeholder}
                    maxLength={field.maxLength}
                    hasError={!!error}
                    rows={3}
                    className="mt-1"
                    onChange={(e) => onChange(path, e.target.value)}
                />
            )}

            {field.type === 'boolean' && (
                <div className="mt-1">
                    <Checkbox
                        id={inputId}
                        checked={(value as boolean) ?? false}
                        onCheckedChange={(checked) => onChange(path, checked === true)}
                    />
                </div>
            )}

            {field.type === 'select' && (
                <SelectNative
                    id={inputId}
                    value={(value as string) ?? ''}
                    hasError={!!error}
                    className="mt-1"
                    onChange={(e) => onChange(path, e.target.value)}
                >
                    {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </SelectNative>
            )}

            {field.type === 'icon' && (
                <SelectNative
                    id={inputId}
                    value={(value as string) ?? ''}
                    hasError={!!error}
                    className="mt-1"
                    onChange={(e) => onChange(path, e.target.value)}
                >
                    {iconAllowlist.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </SelectNative>
            )}

            {field.type === 'color' && (
                <Input
                    id={inputId}
                    type="color"
                    value={(value as string) ?? '#000000'}
                    hasError={!!error}
                    className="mt-1 w-24"
                    onChange={(e) => onChange(path, e.target.value)}
                />
            )}

            {field.type === 'image' && (
                <ImageFieldInput inputId={inputId} path={path} value={value as string} onChange={onChange} />
            )}

            {field.helpText && <p className="mt-1 text-xs text-muted-foreground">{field.helpText}</p>}
            <InputError className="mt-2" message={error} />
        </div>
    );
}

function ImageFieldInput({
    inputId,
    path,
    value,
    onChange,
}: {
    inputId: string;
    path: string;
    value: string;
    onChange: (path: string, value: unknown) => void;
}) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (input: HTMLInputElement, file: File) => {
        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            // window.axios sends the X-XSRF-TOKEN header from the cookie; a raw fetch() gets a 419.
            const res = await window.axios.post<{ url: string }>(route('admin.cms.uploads.store'), formData);
            onChange(path, res.data.url);
        } catch (err: unknown) {
            toast({ title: uploadErrorMessage(err), variant: 'error' });
        } finally {
            input.value = '';
            setUploading(false);
        }
    };

    return (
        <div className="mt-1 space-y-2">
            {value && <img src={value} alt="" className="h-24 w-auto rounded border border-border object-cover" />}
            <Input
                id={inputId}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                disabled={uploading}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleUpload(e.target, file);
                }}
            />
            {uploading && <p className="text-xs text-muted-foreground">Uploading…</p>}
        </div>
    );
}

function uploadErrorMessage(err: unknown): string {
    if (!axios.isAxiosError<{ message?: string; errors?: Record<string, string[]> }>(err) || !err.response) {
        return 'Upload failed. Check your connection and try again.';
    }

    const { status, data } = err.response;

    if (status === 419) {
        return 'Your session has expired. Refresh the page and try again.';
    }

    return Object.values(data?.errors ?? {}).flat()[0] ?? data?.message ?? 'Upload failed';
}
