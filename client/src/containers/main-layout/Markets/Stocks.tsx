import React from 'react'
import { Company, History, News, Peers, Stats } from '../../index'
import { IApolloContainerProps } from '../../../common/IApolloContainerProps'
import { MainContent, MainInnerContent, ScrollableArea } from '../../../common/StyledComponents'

const Stocks: React.FunctionComponent<IApolloContainerProps> = ({ id }) => {
  return (
    <ScrollableArea>
      <MainContent>
        <MainInnerContent>
          <History id={id} />
          <Stats id={id} />
        </MainInnerContent>
        <MainInnerContent>
          <News id={id} />
          <Company id={id} />
          <Peers id={id} />
        </MainInnerContent>
      </MainContent>
    </ScrollableArea>
  )
}

export default Stocks
