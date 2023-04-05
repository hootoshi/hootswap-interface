import { ChainId } from 'app/config/core-sdk'

export const SUSHIGUARD_RELAY: { [chainId in ChainId]?: string } = {
  [ChainId.ETHEREUM]: 'https://api.sushirelay.com/v1',
}
