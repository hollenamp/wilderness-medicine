import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <div className='space-y-1'>
            <svg  {...props} className='block h-9 w-auto fill-zinc-700 dark:fill-zinc-50 text-zinc-700 dark:text-zinc-200' version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                viewBox="0 0 735 200">
                <g id="Layer_3">
                    <path className=" dark:fill-inherit fill-inherit" d="M656.7,0H545c-7.2,0-13,5.8-13,13v174c0,7.2,5.8,13,13,13h31c7.2,0,13-5.8,13-13v-28h75c39,0,71-32,71-71V71
                        C735,24.2,695.4,0,656.7,0z M677.5,90.6c0,10.5-8.5,19-19,19h-69.3V46h54.2c21.1,0,34.1,11.1,34.1,26.3V90.6z"/>
                    <path className=" dark:fill-inherit fill-inherit" d="M499.5,13v174c0,7.2-5.8,13-13,13h-31.1c-7.2,0-13-5.8-13-13V70.9l-42.2,120.4c-1.8,5.2-6.7,8.7-12.3,8.7
                        h-31.3c-5.5,0-10.4-3.5-12.3-8.7L302.1,70.9V187c0,7.2-5.8,13-13,13H258c-7.2,0-13-5.8-13-13V13c0-7.2,5.8-13,13-13h57.9
                        c8,0,15.1,5,17.7,12.6l38.6,110l38.3-109.1C413.4,5.4,421.1,0,429.6,0h56.9C493.7,0,499.5,5.8,499.5,13z"/>
                    <path className=" dark:fill-inherit fill-inherit" d="M200,0h-89.6C75.1,0,44.2,23.6,34.9,57.6l-34.5,126c-2.3,8.3,4,16.4,12.5,16.4h30.7c6,0,11.2-4.1,12.6-10
                        l8.4-35H156v32c0,7.2,5.8,13,13,13h31c7.2,0,13-5.8,13-13V13C213,5.8,207.2,0,200,0z M156,109.6H75.2l8.1-36.1
                        C86.9,57.4,101.2,46,117.6,46H156V109.6z"/>
                </g>
            </svg>
            <div className='text-xs text-end text-zinc-700 dark:text-zinc-200'>
                <strong className=' uppercase'>AMP CMS</strong> 1.0.0
            </div>
        </div>
    );
}
