import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8 } as const

export function DatabaseIcon(props: IconProps) {
  return <svg {...base} {...props}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>
}

export function ShieldIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M12 3 5 6v5c0 4.6 2.8 8.3 7 10 4.2-1.7 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>
}

export function SearchIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
}

export function LockIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
}

export function ArrowIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="m9 18 6-6-6-6"/></svg>
}

export function LogOutIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"/></svg>
}
