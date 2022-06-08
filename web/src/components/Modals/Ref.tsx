import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as _ from 'lodash'

//import EDFusion from '../../apis/1EDFusion'
import System from '../../apis/System'
import ISystem from '../../interfaces/ISystem'
import ModalProps from './interfaces/ModalProps'

const Ref: FC<ModalProps> = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch()
  const refSystem = useSelector((state: any) => state.refSystem.system)
  const [systems, setSystems] = useState<ISystem[]>([])
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0)
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')

  const fetchSystems = _.memoize(async (query: string) => {
    const res = await System.find(query)
    setSystems(res)
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const onKeyDown = (e: React.KeyboardEvent<any>) => {
    let index = 0
    if (e.key === 'ArrowDown') {
      if (activeSuggestionIndex >= systems.length - 1) {
        index = 0
      } else {
        index = activeSuggestionIndex + 1
      }
    }

    if (e.key === 'ArrowUp') {
      if (activeSuggestionIndex <= 0) {
        index = systems.length - 1
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
      const system = systems.filter(
        (system) => system.name === systems[activeSuggestionIndex].name
      )[0]
      setShowSuggestions(false)
      setInput(system.name)
      dispatch({ type: 'refSystem/set', payload: { system: system.name } })
      closeModal()
    }
  }

  const onClick = (e: React.MouseEvent<any>) => {
    const target = e.target as HTMLLIElement
    const system = systems.filter((system) => system.name === target.outerText)[0]
    setInput(system.name)
    dispatch({ type: 'refSystem/set', payload: { system: system.name } })
    setShowSuggestions(false)
    closeModal()
  }

  useEffect(() => {
    if (input.length >= 2) {
      fetchSystems(input)
    } else {
      setSystems([])
    }
  }, [input])

  return (
    <>
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full h-32 p-2 bg-gray-800 border border-gray-700 rounded-lg shadow-md overflow md:p-6 md:w-1/2"
        >
          <div className="autocomplete">
            <div>
              <label htmlFor="system" className="block mb-2 text-sm font-medium text-gray-300">
                Set your current system
              </label>
              <input
                type="text"
                id="system"
                className={`auto-input ${showSuggestions && input ? 'rounded-t-lg' : 'rounded-lg'}`}
                placeholder="Sol"
                onChange={(e) => onChange(e)}
                onFocus={() => setShowSuggestions(true)}
                value={input}
                onKeyDown={onKeyDown}
              />
              {systems.length > 0 && showSuggestions && (
                <ul className="suggestions">
                  {systems.map((system, index) => {
                    let className = 'cursor-pointer'
                    // Flag the active suggestion with a class
                    if (index === activeSuggestionIndex) {
                      className = 'cursor-pointer suggestion-active'
                    }
                    return (
                      <li
                        id={`suggestion-${system.id}`}
                        className={className}
                        key={system.id}
                        onClick={onClick}
                      >
                        {system.name}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Ref
