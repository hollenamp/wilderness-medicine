import { useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar';

export function NavigationProgress() {
    const ref = useRef<LoadingBarRef>(null);

    useEffect(() => {
        const handleStart = () => ref.current?.continuousStart();
        const handleFinish = () => ref.current?.complete();

        const removeStart = router.on('start', handleStart);
        const removeFinish = router.on('finish', handleFinish);
        const removeError = router.on('error', handleFinish);

        return () => {
            removeStart();
            removeFinish();
            removeError();
        };
    }, []);

    return (
        <LoadingBar
            color="var(--muted-foreground)"
            ref={ref}
            shadow
            height={2}
        />
    );
}
