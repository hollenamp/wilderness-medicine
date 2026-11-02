// MultiStepProgressBar

import React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cx } from "@/lib/utils"

interface MultiStepProgressBarProps extends React.ComponentPropsWithoutRef<"div"> {
    asChild?: boolean;
    stepPos:number;
    steps:{id:number, title:string, route:string}[];
}
const MultiStepProgressBar = React.forwardRef<HTMLDivElement, MultiStepProgressBarProps>(
    ({ className, asChild, stepPos, steps, ...props }, forwardedRef) => {
        const Component = asChild ? Slot:"div" 

        // const handleStepChange = (e:React.MouseEvent<HTMLAnchorElement>, stepNum:number) => {
        //     e.preventDefault();
        //     onStepChange && onStepChange(stepNum)
        // }

        return (
            <Component
                ref={forwardedRef}
                className={cx(
                    // base
                    "flex justify-center items-center pb-4",
                    className,
                )}
                {...props}
                >
                <div className='flex-grow'></div>
                { steps.map((step)=>(
                    <React.Fragment key={step.id}>
                        <div className={cx(
                            'flex-none flex h-8 w-8 rounded-full relative', 
                            stepPos >= step.id ? "bg-primary-500 text-primary-foreground":"bg-primary-500/20 text-white/30"
                        )}>
                            <a href={step.route} className='absolute inset-0 flex items-center justify-center font-semibold'><span>{step.title}</span></a>
                        </div>
                        { step.id !== steps.at(-1)?.id ?
                            <div className={cx(
                                'flex-grow h-1',
                                stepPos > step.id ? "bg-primary-500":"bg-primary-500/20"
                            )}></div>
                        : null }
                    </React.Fragment>
                ))}
                <div className='flex-grow'></div>
            </Component>
        )
    },
  )

MultiStepProgressBar.displayName = "Multi-Step Progress Bar"

export { MultiStepProgressBar }