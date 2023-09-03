import { price as actual } from "iexcloud_api_wrapper"

export const price: typeof actual = () => {
  return Promise.resolve(1)
}
