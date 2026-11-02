export interface BaseFieldConfig<TValue> {
    type: string;
    label: string;
    default: TValue;
    helpText?: string;
    visibleWhen?: (siblingValues: Record<string, unknown>) => boolean;
}

export interface TextField extends BaseFieldConfig<string> {
    type: 'text';
    placeholder?: string;
    maxLength?: number;
}

export interface TextareaField extends BaseFieldConfig<string> {
    type: 'textarea';
    placeholder?: string;
    maxLength?: number;
}

export interface BooleanField extends BaseFieldConfig<boolean> {
    type: 'boolean';
}

export interface SelectOption<TOption extends string = string> {
    label: string;
    value: TOption;
}

export interface SelectField<TOption extends string = string> extends BaseFieldConfig<TOption> {
    type: 'select';
    options: SelectOption<TOption>[];
}

export interface ImageField extends BaseFieldConfig<string> {
    type: 'image';
}

export interface ColorField extends BaseFieldConfig<string> {
    type: 'color';
}

export interface IconField extends BaseFieldConfig<string> {
    type: 'icon';
}

export interface RepeaterField<TItemSchema extends SchemaShape = SchemaShape>
    extends BaseFieldConfig<Record<string, unknown>[]> {
    type: 'repeater';
    itemSchema: TItemSchema;
    minRows?: number;
}

export type FieldConfig =
    | TextField
    | TextareaField
    | BooleanField
    | SelectField
    | ImageField
    | ColorField
    | IconField
    | RepeaterField;

export interface GroupNode {
    __group: true;
    label?: string;
    fields: SchemaShape;
}

export type SchemaNode = FieldConfig | GroupNode | { [key: string]: SchemaNode };

export type SchemaShape = { [key: string]: SchemaNode };

export function isFieldConfig(node: unknown): node is FieldConfig {
    return typeof node === 'object' && node !== null && typeof (node as { type?: unknown }).type === 'string';
}

export function isRepeaterField(node: unknown): node is RepeaterField {
    return isFieldConfig(node) && node.type === 'repeater';
}

export function isGroupNode(node: unknown): node is GroupNode {
    return typeof node === 'object' && node !== null && (node as { __group?: unknown }).__group === true;
}

type InferFieldValue<F> = F extends RepeaterField<infer Item>
    ? InferContent<Item>[]
    : F extends BaseFieldConfig<infer V>
      ? V
      : never;

export type InferContent<S> = S extends RepeaterField<infer Item>
    ? InferContent<Item>[]
    : S extends BaseFieldConfig<infer V>
      ? V
      : S extends GroupNode
        ? InferContent<S['fields']>
        : S extends Record<string, unknown>
          ? { [K in keyof S]: InferContent<S[K]> }
          : never;

export type { InferFieldValue };
