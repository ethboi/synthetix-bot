/* eslint-disable no-var */

declare global {
  var MARKET_SETTINGS: { [key: string]: MarketSettings } = {}
  var ENS: { [key: string]: string } = {}
}

declare module '*.json' {
  const value: any
  export default value
}

export {}
