'use client'

import { ClassValue } from 'clsx'
import { cn } from '../../libs/utils'

type Props = {
  className?: ClassValue
  children: React.ReactNode
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  size?: 'sm' | 'default'
}

export function Button({ className, children, onClick, size = 'default' }: Props) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-4 py-2 text-sm'
  }

  return (
    <button
      role="button"
      aria-label="Click to perform an action"
      onClick={onClick}
      className={cn(
        'flex text-text cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main font-base shadow-light dark:shadow-white transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none',
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </button>
  )
}