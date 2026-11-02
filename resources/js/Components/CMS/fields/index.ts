import { boolean } from './boolean';
import { color } from './color';
import { group } from './group';
import { icon } from './icon';
import { image } from './image';
import { repeater } from './repeater';
import { select } from './select';
import { text } from './text';
import { textarea } from './textarea';

export const field = {
    text,
    textarea,
    boolean,
    select,
    image,
    color,
    icon,
    repeater,
    group,
};

export { iconAllowlist, type IconName } from './iconAllowlist';
