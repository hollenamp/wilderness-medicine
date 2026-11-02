import {useEffect, useState} from "react"
import { ArrowUpToLine } from "lucide-react";

const ScrollToTop = ({
    anchor ="#topOfPage",
    offset = 8,
}:{
    anchor?:string
    offset?: number
}) => {    
    const [showScrollToTop, setShowScrollToTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY; 
            if(currentScrollPos >= 100) {
                setShowScrollToTop(true)
            } else {
                setShowScrollToTop(false)
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const bottomValue = offset * 4; // Convert to pixels (Tailwind spacing scale: 1 = 0.25rem = 4px)
    const hiddenBottomValue = -(offset * 4 + 40); // Hidden position: negative offset + extra space
    
    return(
        <div 
            className={`fixed right-4 z-50 transition-all duration-500 ${(showScrollToTop)? 'opacity-100':'opacity-0'}`}
            style={{
                bottom: showScrollToTop ? `${bottomValue}px` : `${hiddenBottomValue}px`
            }}
        >
            <a href={anchor} className={`text-zinc-800 bg-white/40 block rounded-sm p-2`} title="Back to top of page">
                <ArrowUpToLine />
            </a>
        </div>
    )
}

export default ScrollToTop