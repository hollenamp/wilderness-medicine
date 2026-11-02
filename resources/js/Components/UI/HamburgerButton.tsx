import { cx } from '@/lib/utils';

interface HamburgerButtonProps {
  isOpen?: boolean;
  onClick?: () => void;
  title?: string;
  className?: string;
}

const lineBase =
  'fill-none [transition:stroke-dasharray_400ms,stroke-dashoffset_400ms] [stroke-width:5.5] [stroke-linecap:round]';

export function HamburgerButton({
  isOpen = false,
  onClick,
  title = 'Navigation',
  className,
}: HamburgerButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={title}
      className={cx(
        isOpen ? 'text-zinc-100' : 'text-white',
        'focus:outline-none transition duration-150 ease-in-out',
        'flex items-center justify-center',
        className
      )}
    >
      <svg
        className={cx(
          'h-10 w-10 transition-transform duration-150 ease-in-out',
          isOpen && 'rotate-45'
        )}
        stroke="currentColor"
        fill="none"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <path
          className={cx(
            lineBase,
            '[stroke-dasharray:40_139]',
            isOpen && '[stroke-dashoffset:-98px]'
          )}
          d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
        />
        <path
          className={lineBase}
          d="m 30,50 h 40"
        />
        <path
          className={cx(
            lineBase,
            '[stroke-dasharray:40_180]',
            isOpen && '[stroke-dashoffset:-138px]'
          )}
          d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
        />
      </svg>
    </button>
  );
}
