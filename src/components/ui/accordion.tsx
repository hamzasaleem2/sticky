'use client'

import { ClassValue } from 'clsx'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../../libs/utils'
import { useHalloween } from '../../providers/halloween-provider'

type Props = {
  className?: ClassValue
  question: string
  answer: string
}

export default function Accordion({ question, answer, className }: Props) {
  const [showContent, setShowContent] = useState(false)
  const [contentHeight, setContentHeight] = useState('0px')
  const contentRef = useRef<HTMLDivElement>(null)
  const { isHalloweenMode } = useHalloween()

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`)
    }
  }, [showContent])

  return (
    <div
      data-state={showContent ? 'open' : 'closed'}
      className={cn(
        "w-full group rounded-base overflow-x-hidden border-2 shadow-light dark:shadow-dark",
        isHalloweenMode 
          ? "border-halloween-orange/50 hover:border-halloween-orange bg-halloween-purple/20" 
          : "border-border dark:border-darkBorder"
      )}
    >
      <button
        role="button"
        aria-expanded={showContent}
        className={cn(
          'flex w-full items-center transition-[border-radius] justify-between border-b-0 group-data-[state=open]:border-b-2 p-3 sm:p-4 md:p-5 font-heading text-sm sm:text-base',
          isHalloweenMode 
            ? 'text-halloween-ghost border-b-halloween-orange/50 bg-halloween-black/50' 
            : 'text-text border-b-border dark:border-b-darkBorder bg-main',
          className,
        )}
        onClick={() => {
          setShowContent(!showContent)
        }}
      >
        {question}
        <ChevronDown className={cn(
          "ml-2 sm:ml-3 md:ml-4 min-h-[18px] min-w-[18px] sm:min-h-[24px] sm:min-w-[24px] group-data-[state=open]:rotate-180 group-data-[state=closed]:0 transition-transform ease-in-out",
          isHalloweenMode ? "text-halloween-orange" : ""
        )} />
      </button>
      <div
        ref={contentRef}
        style={{ height: showContent ? `${contentHeight}` : '0' }}
        className={cn(
          "overflow-hidden rounded-b-base font-base transition-[height] ease-in-out",
          isHalloweenMode 
            ? "bg-halloween-black/50" 
            : "bg-white dark:bg-secondaryBlack"
        )}
      >
        <p className={cn(
          "p-3 sm:p-4 md:p-5 text-xs sm:text-sm md:text-base leading-relaxed",
          isHalloweenMode ? "text-halloween-ghost/80" : ""
        )}>
          {answer}
        </p>
      </div>
    </div>
  )
}