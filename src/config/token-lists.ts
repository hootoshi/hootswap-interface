const BA_LIST = 'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json'
export const ARBITRUM_LIST = 'https://bridge.arbitrum.io/token-list-42161.json'
export const OPTIMISM_LIST = 'https://static.optimism.io/optimism.tokenlist.json'
// const DHEDGE_LIST = 'https://list.dhedge.eth.link'
const HOOT_LIST = 'https://raw.githubusercontent.com/hootoshi/test-interface/main/src/constants/tokenlist/tokenlist.json'


export const UNSUPPORTED_LIST_URLS: string[] = [BA_LIST]

// this is the default list of lists that are exposed to users
// lower index == higher priority for token import
const DEFAULT_LIST_OF_LISTS_TO_DISPLAY: string[] = [
  HOOT_LIST,
 
]

export const DEFAULT_LIST_OF_LISTS: string[] = [
  ...DEFAULT_LIST_OF_LISTS_TO_DISPLAY,
  ...UNSUPPORTED_LIST_URLS, // need to load dynamic unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [HOOT_LIST]
