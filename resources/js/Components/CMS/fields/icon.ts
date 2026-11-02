import type { IconField } from '../types';
import { iconAllowlist, type IconName } from './iconAllowlist';

export function icon(config: Omit<IconField, 'type' | 'label' | 'default'> & { label?: string; default: IconName }): IconField {
    return { type: 'icon', label: config.label ?? '', ...config };
}

export { iconAllowlist };
export type { IconName };
