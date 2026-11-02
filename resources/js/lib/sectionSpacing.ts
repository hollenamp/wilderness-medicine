/**
 * Vertical section rhythm from `.cursor/rules/site-design.mdc`.
 *
 * Sections own their vertical padding; horizontal padding stays on the inner
 * `max-w-7xl` container. Use `first` / `middle` / `last` when neighbouring
 * sections share the same background so the seam between them collapses to
 * half spacing.
 */
export type SectionSpacing = 'standard' | 'first' | 'middle' | 'last';

const spacingClasses: Record<SectionSpacing, string> = {
    standard: 'py-8 md:py-16 lg:py-24',
    first: 'pt-8 pb-4 md:pt-16 md:pb-8 lg:pt-24 lg:pb-16',
    middle: 'py-4 md:py-8 lg:py-16',
    last: 'pb-8 pt-4 md:pb-16 md:pt-8 lg:pb-24 lg:pt-16',
};

export function sectionSpacing(spacing: SectionSpacing = 'standard'): string {
    return spacingClasses[spacing];
}
