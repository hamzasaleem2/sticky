'use client'

import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

type DropdownItem = {
  name: string;
  link: string;
}

type DropdownProps = {
  items: DropdownItem[];
  text: string;
  onSelect: (option: string) => void;
}

export default function Dropdown({ items, text, onSelect }: DropdownProps) {
  const [isActiveDropdown, setIsActiveDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsActiveDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleItemClick = (item: DropdownItem) => {
    onSelect(item.name);
    setIsActiveDropdown(false);
  }

  return (
    <div
      ref={dropdownRef}
      data-state={isActiveDropdown ? 'open' : 'closed'}
      className="relative group text-text"
    >
      <button
        aria-haspopup="listbox"
        aria-expanded={isActiveDropdown}
        onClick={() => setIsActiveDropdown(!isActiveDropdown)}
        className="flex w-[180px] cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main px-3 py-2 text-sm font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
      >
        <div className="mx-auto flex items-center">
          {text}
          <ChevronDown
            className={
              'ml-2 h-4 w-4 transition-transform group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0 ease-in-out'
            }
          />
        </div>
      </button>
      {isActiveDropdown && (
        <div
          role="listbox"
          className="absolute left-0 z-50 w-[140px] mt-1 overflow-hidden rounded-base border-2 border-border dark:border-darkBorder text-center font-base shadow-light dark:shadow-dark bg-main"
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              className="block w-full border-b-2 border-border dark:border-darkBorder bg-main px-3 py-2 text-sm no-underline hover:bg-mainAccent text-left"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}