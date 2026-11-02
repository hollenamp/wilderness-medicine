import { FieldRenderer } from './FieldRenderer';
import { RepeaterField as RepeaterFieldUI } from './partials/RepeaterField';
import { isFieldConfig, isGroupNode, isRepeaterField, type SchemaShape } from './types';

interface FormRendererProps {
    schema: SchemaShape;
    data: Record<string, unknown>;
    errors: Record<string, string>;
    onChange: (path: string, value: unknown) => void;
    basePath?: string;
}

export function FormRenderer({ schema, data, errors, onChange, basePath = '' }: FormRendererProps) {
    return (
        <div className="space-y-6">
            {Object.entries(schema).map(([key, node]) => {
                const path = basePath ? `${basePath}.${key}` : key;
                const value = data?.[key];

                if (isRepeaterField(node)) {
                    return (
                        <RepeaterFieldUI
                            key={path}
                            path={path}
                            field={node}
                            items={Array.isArray(value) ? value : []}
                            errors={errors}
                            onChange={onChange}
                        />
                    );
                }

                if (isFieldConfig(node)) {
                    const siblingValues = data ?? {};
                    if (node.visibleWhen && !node.visibleWhen(siblingValues)) {
                        return null;
                    }

                    return (
                        <FieldRenderer
                            key={path}
                            path={path}
                            field={node}
                            value={value}
                            error={errors[path]}
                            onChange={onChange}
                        />
                    );
                }

                const nestedSchema = isGroupNode(node) ? node.fields : (node as SchemaShape);
                const label = isGroupNode(node) ? node.label : undefined;

                return (
                    <fieldset key={path} className="space-y-4 rounded-md border border-border p-4">
                        {label ? (
                            <legend className="px-1 text-sm font-medium text-foreground">{label}</legend>
                        ) : (
                            <legend className="px-1 text-sm font-medium capitalize text-foreground">
                                {key.replace(/[-_]/g, ' ')}
                            </legend>
                        )}
                        <FormRenderer
                            schema={nestedSchema}
                            data={(value as Record<string, unknown>) ?? {}}
                            errors={errors}
                            onChange={onChange}
                            basePath={path}
                        />
                    </fieldset>
                );
            })}
        </div>
    );
}
