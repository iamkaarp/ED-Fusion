import React, { FC, useEffect, useState } from 'react'

interface SuggestionProps {
  suggestions: any[]
  activeSuggestionIndex: number
  activeItems: any[]
  onClick: (e: any) => void
}

const Suggestions: FC<SuggestionProps> = ({
  suggestions,
  activeSuggestionIndex,
  activeItems,
  onClick,
}) => {
  return suggestions.length ? (
    <ul className="suggestions">
      {suggestions.map((suggestion, index) => {
        let className = 'cursor-pointer'
        // Flag the active suggestion with a class
        if (index === activeSuggestionIndex) {
          className = 'cursor-pointer suggestion-active'
        }
        return (
          <li
            id={`suggestion-${suggestion.id}`}
            className={className}
            key={suggestion.id}
            onClick={onClick}
          >
            {suggestion.name}
          </li>
        )
      })}
    </ul>
  ) : (
    <></>
  )
}

export default Suggestions
