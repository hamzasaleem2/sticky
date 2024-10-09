'use client'

import { ClassValue } from 'clsx'
import { ChevronDown } from 'lucide-react'

import { useEffect, useRef, useState } from 'react'

import { cn } from '../../libs/utils'

type Props = {
  className?: ClassValue
  question: string
  answer: string
}

export default function Accordion({ question, answer, className }: Props) {
  const [showContent, setShowContent] = useState(false)
  const [contentHeight, setContentHeight] = useState('0px')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`)
    }
  }, [showContent])

  return (
    <div
      data-state={showContent ? 'open' : 'closed'}
      className="w-full group rounded-base overflow-x-hidden border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark"
    >
      <button
        role="button"
        aria-expanded={showContent}
        className={cn(
          'flex w-full items-center text-text transition-[border-radius] justify-between border-b-0 group-data-[state=open]:border-b-2 border-b-border dark:border-b-darkBorder bg-main p-3 sm:p-4 md:p-5 font-heading text-sm sm:text-base',
          className,
        )}
        onClick={() => {
          setShowContent(!showContent)
        }}
      >
        {question}
        <ChevronDown className="ml-2 sm:ml-3 md:ml-4 min-h-[18px] min-w-[18px] sm:min-h-[24px] sm:min-w-[24px] group-data-[state=open]:rotate-180 group-data-[state=closed]:0 transition-transform ease-in-out" />
      </button>
      <div
        ref={contentRef}
        style={{ height: showContent ? `${contentHeight}` : '0' }}
        className="overflow-hidden rounded-b-base bg-white dark:bg-secondaryBlack font-base transition-[height] ease-in-out"
      >
        <p className="p-3 sm:p-4 md:p-5 text-xs sm:text-sm md:text-base leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}