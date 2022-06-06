import React, { FC, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { mdiCloseThick } from '@mdi/js'
import { Icon } from '@mdi/react'

import Suggestions from './Suggestions'
import './css/Autocomplete.scss'

interface AutocompleteProps {
  title: string
  placeholder: string
  items: any[]
  onItemsChange: (items: any[]) => void
}

const Autocomplete: FC<AutocompleteProps> = ({ title, placeholder, items, onItemsChange }) => {
  const id = uuidv4()

  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([])
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0)
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const [activeItems, setActiveItems] = useState<any[]>([])
  const [input, setInput] = useState<string>('')

  const onChange = (e: React.ChangeEvent<any>) => {
    const userInput = e.target.value

    const unLinked = items.filter(
      (item) => item.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    )

    const filtered = unLinked.filter((item) => {
      return activeItems.every((active) => active.name !== item.name)
    })

    setInput(e.target.value)
    setFilteredSuggestions(filtered)
    setActiveSuggestionIndex(0)
    setShowSuggestions(true)
  }

  const onClick = (e: React.MouseEvent<any>) => {
    const target = e.target as HTMLLIElement
    setFilteredSuggestions([])
    const item = items.filter((item) => item.name === target.outerText)[0]
    setInput('')
    setActiveItems([...activeItems, item])
    setShowSuggestions(false)
  }

  const removeItem = (item: any) => {
    const newItems = activeItems.filter((activeItem) => activeItem.name !== item.name)
    setActiveItems(newItems)
  }

  const onKeyDown = (e: React.KeyboardEvent<any>) => {
    let index = 0
    if (e.key === 'ArrowDown') {
      if (activeSuggestionIndex >= filteredSuggestions.length - 1) {
        index = 0
      } else {
        index = activeSuggestionIndex + 1
      }
    }

    if (e.key === 'ArrowUp') {
      if (activeSuggestionIndex <= 0) {
        index = filteredSuggestions.length - 1
      } else {
        index = activeSuggestionIndex - 1
      }
    }
    setActiveSuggestionIndex(index)
    /*if (filteredSuggestions[index]) {
      setInput(filteredSuggestions[index].name)
    }*/
    //setInput(filteredSuggestions[index].name)

    if (e.key === 'Escape') {
      setShowSuggestions(false)
    }

    if (e.key === 'Enter') {
      const item = items.filter(
        (item) => item.name === filteredSuggestions[activeSuggestionIndex].name
      )[0]
      setActiveItems([...activeItems, item])
      setShowSuggestions(false)
      setInput('')
    }
  }

  useEffect(() => {
    onItemsChange(activeItems)
  }, [activeItems])

  return (
    <div className="autocomplete">
      <div>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">
          {title}
        </label>
        <input
          type="text"
          id={id}
          className={`auto-input ${showSuggestions && input ? 'rounded-t-lg' : 'rounded-lg'}`}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          onFocus={() => setShowSuggestions(true)}
          value={input}
          onKeyDown={onKeyDown}
        />
      </div>
      {showSuggestions && input && (
        <Suggestions
          activeItems={activeItems}
          suggestions={filteredSuggestions}
          activeSuggestionIndex={activeSuggestionIndex}
          onClick={onClick}
        />
      )}
      {activeItems.length > 0 && (
        <div className="flex flex-wrap">
          {activeItems.map((item) => (
            <div
              key={item.id}
              onClick={() => removeItem(item)}
              className="flex items-center px-3 py-2 m-1 text-xs text-white bg-gray-700 rounded-full"
            >
              <Icon path={mdiCloseThick} size={0.6} className="mr-1 cursor-pointer" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Autocomplete
