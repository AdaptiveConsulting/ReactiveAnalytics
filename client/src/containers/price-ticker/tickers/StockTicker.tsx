import React, { useState, useEffect } from 'react'
import { IApolloContainerProps } from '@/common/IApolloContainerProps'
import { useSubscription } from '@apollo/client'
import { onStockPriceSubscription, onStockPriceSubscriptionVariables } from '../graphql/types/onStockPriceSubscription'
import StockPriceSubscription from '../graphql/StockPriceSubscription.graphql'
import AdaptiveLoader from '@/common/AdaptiveLoader'
import { StockPriceData, StockPrice } from '../components'
import { MarketDisplay } from '../components/StockPrice'

export const StockTicker: React.FC<IApolloContainerProps> = ({ id }) => {
  const [shouldResubscribe, setShouldResubscribe] = useState<boolean>(true)
  const [currentId, setCurrentId] = useState<string>(id)

  useEffect(() => {
    if (currentId && id) {
      if (currentId !== id) {
        setShouldResubscribe(true)
        setCurrentId(id)
        return
      }
    }
    setShouldResubscribe(false)
  }, [currentId, id, setShouldResubscribe, setCurrentId])

  const { data, loading } = useSubscription<onStockPriceSubscription, onStockPriceSubscriptionVariables>(
    StockPriceSubscription,
    {
      shouldResubscribe,
      variables: { markets: [currentId] },
    },
  )

  if (loading) {
    return <AdaptiveLoader size={50} speed={1.4} />
  } else if (data && data.getQuotes) {
    const stockPrice = data.getQuotes as StockPriceData
    return <StockPrice stockPrice={stockPrice} size={MarketDisplay.Large} />
  }
  return <></>
}
