import * as actual from "iexcloud_api_wrapper"
import * as mock from "../mock-data/iex"

export default process.env.MOCK_IEX ? mock : actual
