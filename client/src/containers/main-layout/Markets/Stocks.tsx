import React from 'react'
import { IApolloContainerProps } from '../../../common/IApolloContainerProps'
import { MainGridArea, NewsGridArea } from '../../../common/StyledComponents'
import { Company, History, News, Peers, Stats } from '../../index'

const Stocks: React.FunctionComponent<IApolloContainerProps> = ({ id }) => {
  return (
    <>
      <MainGridArea>
        <History id={id} />
        <Stats id={id} />
      </MainGridArea>
      <NewsGridArea>
        <Company id={id} />
        <Peers id={id} />
        <News id={id} />
      </NewsGridArea>
    </>
  )
}

export default Stocks
