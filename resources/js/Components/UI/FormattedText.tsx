import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

type FormattedTextTone = 'light' | 'dark';

type FormattedTextProps = {
    text: string;
    tone?: FormattedTextTone;
};

type InlineTokenType = 'link' | 'strong' | 'underline' | 'em';

type InlineToken = {
    type: InlineTokenType;
    index: number;
    length: number;
    inner: string;
    href?: string;
};

const tokenRank: Record<InlineTokenType, number> = {
    link: 0,
    strong: 1,
    underline: 2,
    em: 3,
};

const tokenPatterns: Array<{ type: InlineTokenType; regex: RegExp }> = [
    { type: 'link', regex: /\[([^\]]+)\]\(([^)]+)\)/ },
    { type: 'strong', regex: /\*\*(.+?)\*\*/ },
    { type: 'underline', regex: /\+\+(.+?)\+\+/ },
    { type: 'em', regex: /(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/ },
];

const isInternalHref = (href: string): boolean => href.startsWith('/') && !href.startsWith('//');

const findNextToken = (text: string): InlineToken | null => {
    let best: InlineToken | null = null;

    for (const pattern of tokenPatterns) {
        const match = pattern.regex.exec(text);

        if (!match) {
            continue;
        }

        const candidate: InlineToken = {
            type: pattern.type,
            index: match.index,
            length: match[0].length,
            inner: match[1],
            href: pattern.type === 'link' ? match[2] : undefined,
        };

        const isEarlier = !best || candidate.index < best.index;
        const isSameSpotHigherRank =
            !!best && candidate.index === best.index && tokenRank[candidate.type] < tokenRank[best.type];

        if (isEarlier || isSameSpotHigherRank) {
            best = candidate;
        }
    }

    return best;
};

const renderPlainText = (value: string, keyPrefix: string): ReactNode[] => {
    const lines = value.split('\n');

    return lines.flatMap((line, index) => {
        const nodes: ReactNode[] = [];

        if (index > 0) {
            nodes.push(<br key={`${keyPrefix}-br-${index}`} />);
        }

        if (line) {
            nodes.push(line);
        }

        return nodes;
    });
};

export function FormattedText({ text, tone = 'light' }: FormattedTextProps) {
    const linkClassName =
        tone === 'dark'
            ? 'font-medium text-tea-green-400 underline decoration-tea-green-400 underline-offset-2 transition-opacity hover:opacity-75'
            : 'font-medium text-forest-green-800 underline decoration-forest-green-800 underline-offset-2 transition-opacity hover:opacity-75';
    const strongClassName = tone === 'dark' ? 'font-semibold text-white' : 'font-semibold text-charcoal-brown-950';

    const renderNodes = (value: string, keyPrefix: string): ReactNode[] => {
        const nodes: ReactNode[] = [];
        let cursor = 0;
        let tokenIndex = 0;

        while (cursor < value.length) {
            const remaining = value.slice(cursor);
            const token = findNextToken(remaining);

            if (!token) {
                nodes.push(...renderPlainText(remaining, `${keyPrefix}-tail`));
                break;
            }

            if (token.index > 0) {
                nodes.push(...renderPlainText(remaining.slice(0, token.index), `${keyPrefix}-text-${tokenIndex}`));
            }

            const innerNodes = renderNodes(token.inner, `${keyPrefix}-${tokenIndex}`);
            const tokenKey = `${keyPrefix}-token-${tokenIndex}`;

            if (token.type === 'link' && token.href) {
                if (isInternalHref(token.href)) {
                    nodes.push(
                        <Link key={tokenKey} href={token.href} className={linkClassName}>
                            {innerNodes}
                        </Link>,
                    );
                } else {
                    nodes.push(
                        <a key={tokenKey} href={token.href} className={linkClassName}>
                            {innerNodes}
                        </a>,
                    );
                }
            } else if (token.type === 'strong') {
                nodes.push(
                    <strong key={tokenKey} className={strongClassName}>
                        {innerNodes}
                    </strong>,
                );
            } else if (token.type === 'underline') {
                nodes.push(
                    <u key={tokenKey} className="underline underline-offset-2">
                        {innerNodes}
                    </u>,
                );
            } else {
                nodes.push(
                    <em key={tokenKey} className="italic">
                        {innerNodes}
                    </em>,
                );
            }

            cursor += token.index + token.length;
            tokenIndex += 1;
        }

        return nodes;
    };

    return <>{renderNodes(text, 'cms')}</>;
}
