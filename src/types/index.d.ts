/* eslint-disable no-var */

declare global {
  var MARKET_SETTINGS: { [key: string]: MarketSettings } = {}
}

declare module '*.json' {
  const value: any
  export default value
}

export {}
