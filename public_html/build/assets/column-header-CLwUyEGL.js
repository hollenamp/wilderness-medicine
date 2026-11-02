import{j as e}from"./app-CX00ZCEx.js";import{c as n}from"./utils-DmPTqCWR.js";import{D as c,a as x,b as l,c as r,e as p}from"./DropdownMenu-d5qYqc76.js";import{c as m}from"./createLucideIcon-VIg_yfmc.js";import{C as g}from"./chevrons-up-down-Cf-FbVOv.js";import{E as h}from"./eye-off-DKPJbGl-.js";/**
 * @license lucide-react v0.447.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=m("ArrowDown",[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]);/**
 * @license lucide-react v0.447.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=m("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);function N({column:s,title:t,className:o}){if(!s.getCanSort())return e.jsx("div",{className:n("text-sm font-medium",o),children:t});const a=s.getIsSorted();return e.jsx("div",{className:n("flex items-center gap-2",o),children:e.jsxs(c,{children:[e.jsx(x,{asChild:!0,children:e.jsxs("button",{type:"button",className:"-ml-2 flex h-8 items-center gap-1.5 rounded-md px-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",children:[e.jsx("span",{children:t}),a==="desc"?e.jsx(i,{className:"size-3.5"}):a==="asc"?e.jsx(d,{className:"size-3.5"}):e.jsx(g,{className:"size-3.5"})]})}),e.jsxs(l,{align:"start",className:"min-w-32",children:[e.jsxs(r,{onClick:()=>s.toggleSorting(!1),children:[e.jsx(d,{className:"mr-2 size-3.5 text-muted-foreground"}),"Asc"]}),e.jsxs(r,{onClick:()=>s.toggleSorting(!0),children:[e.jsx(i,{className:"mr-2 size-3.5 text-muted-foreground"}),"Desc"]}),s.getCanHide()&&e.jsxs(e.Fragment,{children:[e.jsx(p,{}),e.jsxs(r,{onClick:()=>s.toggleVisibility(!1),children:[e.jsx(h,{className:"mr-2 size-3.5 text-muted-foreground"}),"Hide"]})]})]})]})})}export{N as D};
