import { DataCard, Link, Text, DataContents } from '../../common/StyledComponents'
import React, { useMemo } from 'react'
import { search_symbols } from '../../__generated__/types'

interface IProps {
  foundSymbol?: search_symbols
  id: string
  market: string
  onClick?: Function
}

export const SearchErrorCard: React.FunctionComponent<IProps> = ({ foundSymbol, id, market, onClick }) => {
  const message = useMemo(() => {
    if (foundSymbol && onClick) {
      return (
        <>
          <Text>Perhaps you were looking for this?</Text>
          <Link onClick={() => onClick(foundSymbol)}>{foundSymbol.name}</Link>
        </>
      )
    }
    return null
  }, [foundSymbol, onClick])
  return (
    <DataCard cardType={'search'} title={id} instrument={id}>
      <DataContents>
        <Text>This {market.toLowerCase()} is not recognized.</Text>
        {message}
      </DataContents>
    </DataCard>
  )
}
