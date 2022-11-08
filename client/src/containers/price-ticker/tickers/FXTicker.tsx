import React, { useState, useEffect } from 'react'
import { IApolloContainerProps } from 'common/IApolloContainerProps'
import { useSubscription } from '@apollo/client'
import AdaptiveLoader from '@/common/AdaptiveLoader'
import { onFXPriceSubscription, onFXPriceSubscriptionVariables } from '../graphql/types/onFXPriceSubscription'
import FXPriceSubscription from '../graphql/FXPriceSubscription.graphql'

export const FXTicker: React.FC<IApolloContainerProps> = ({ id }) => {
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

  const { data, loading } = useSubscription<onFXPriceSubscription, onFXPriceSubscriptionVariables>(
    FXPriceSubscription,
    {
      shouldResubscribe,
      variables: { id },
    },
  )

  if (loading) {
    return <AdaptiveLoader size={50} speed={1.4} />
  } else if (data && data.getFXPriceUpdates) {
    return <>{data.getFXPriceUpdates.Mid}</>
  }
  return <></>
}
