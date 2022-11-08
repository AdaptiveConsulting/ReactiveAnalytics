import { FXHistory } from '@/containers/history'
import React from 'react'
import { IApolloContainerProps } from '@/common/IApolloContainerProps'
import { MainGridArea } from '@/common/StyledComponents'

const Currencies: React.FunctionComponent<IApolloContainerProps> = ({ id }) => {
  return (
    <>
      <MainGridArea>
        <FXHistory id={id} />
      </MainGridArea>
    </>
  )
}

export default Currencies
