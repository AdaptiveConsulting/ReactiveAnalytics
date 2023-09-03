import { peers as actual } from "iexcloud_api_wrapper"

export const peers: typeof actual = () => {
  return Promise.resolve(["Peer1", "Peer2"])
}
