import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
const ScrollToAnchor = () => {
    const pathname = usePage().url.split('?')[0];

    useEffect(() => {
        const handleClick = (e: Event) => {
            const target = e.currentTarget as HTMLAnchorElement;
            const href = target.href;
            const targetId = href.replace(/.*\/#/, "");
            if (href.endsWith(`/#${targetId}`)) {
                e.preventDefault();
            }
            const elem = document.getElementById(targetId);
            elem?.scrollIntoView({ behavior: "smooth" });
        };

        const allLinks = document.querySelectorAll('a');
        allLinks.forEach((link) => link.addEventListener('click', handleClick));
        return () => allLinks.forEach((link) => link.removeEventListener('click', handleClick));
    }, [pathname]);

    return null;
}

export default ScrollToAnchor