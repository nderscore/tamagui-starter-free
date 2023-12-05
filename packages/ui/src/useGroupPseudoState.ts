import { ComponentContext, GroupNames } from 'tamagui'
import { useContext, useEffect, useRef, useState } from 'react'

type PseudoFields = 'hover' | 'press' | 'focus'

type PseudoState = Record<PseudoFields, boolean>

const defaultState: PseudoState = {
  hover: false,
  press: false,
  focus: false,
}

/**
 * Hook to directly access a component "group" psuedo state.
 */
export const useGroupPseudoState = (name: GroupNames): PseudoState => {
  const { groups } = useContext(ComponentContext.context)
  const psuedo = groups.state[name]?.pseudo
  if (!psuedo) {
    throw new Error(`useGroupPsuedoState: No parent group '${name}' found.`)
  }

  const touchedFieldsRef = useRef<Set<PseudoFields> | undefined>()
  if (!touchedFieldsRef.current) {
    touchedFieldsRef.current = new Set<PseudoFields>()
  }

  const [psuedoState, setPsuedoState] = useState(() => ({
    ...defaultState,
    ...psuedo,
  }))

  useEffect(() => {
    let prevState = psuedoState
    return groups.subscribe((groupName, { pseudo: nextState }) => {
      if (groupName !== name) return
      const touchedFields = touchedFieldsRef.current
      if (!touchedFields || !nextState) return
      const didObservedFieldsChange = Array.from(touchedFields).some(
        (field) => prevState[field] !== nextState[field]
      )
      const nextStateWithDefaults = {
        ...defaultState,
        ...nextState,
      }
      if (didObservedFieldsChange) {
        setPsuedoState(nextStateWithDefaults)
      }
      prevState = nextStateWithDefaults
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  return new Proxy(psuedoState, {
    get(target, prop) {
      touchedFieldsRef.current?.add(prop as PseudoFields)
      return target[prop as PseudoFields]
    },
  })
}
