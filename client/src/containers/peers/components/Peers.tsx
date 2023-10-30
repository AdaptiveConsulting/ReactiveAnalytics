import React from "react"

import { DataCard, Text } from "../../../common/StyledComponents"
import PeerItem from "./PeerItem"
import { PeersCard, PeersWrapper } from "./Peers.styles"

const Peers: React.FunctionComponent<{ peers: string[]; id: string }> = ({
  peers,
  id,
}) => (
  <PeersCard>
    <DataCard title="Top Peers" instrument={id}>
      <PeersWrapper>
        {peers.length > 0 ? (
          peers.map((peer) => <PeerItem key={peer} symbol={peer} />)
        ) : (
          <Text>No peers</Text>
        )}
      </PeersWrapper>
    </DataCard>
  </PeersCard>
)

export default Peers
