/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: string;
  BigInt: string;
  Bytes: string;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type CrossMarginAccount = {
  __typename?: 'CrossMarginAccount';
  id: Scalars['ID'];
  owner: Scalars['Bytes'];
};

export type CrossMarginAccountTransfer = {
  __typename?: 'CrossMarginAccountTransfer';
  abstractAccount: Scalars['Bytes'];
  account: Scalars['Bytes'];
  id: Scalars['ID'];
  size: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  txHash: Scalars['String'];
};

export type CrossMarginAccountTransfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  abstractAccount?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_contains?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_gt?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_gte?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_in?: InputMaybe<Array<Scalars['Bytes']>>;
  abstractAccount_lt?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_lte?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_not?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_not_contains?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<CrossMarginAccountTransfer_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<CrossMarginAccountTransfer_Filter>>>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txHash?: InputMaybe<Scalars['String']>;
  txHash_contains?: InputMaybe<Scalars['String']>;
  txHash_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_ends_with?: InputMaybe<Scalars['String']>;
  txHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_gt?: InputMaybe<Scalars['String']>;
  txHash_gte?: InputMaybe<Scalars['String']>;
  txHash_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_lt?: InputMaybe<Scalars['String']>;
  txHash_lte?: InputMaybe<Scalars['String']>;
  txHash_not?: InputMaybe<Scalars['String']>;
  txHash_not_contains?: InputMaybe<Scalars['String']>;
  txHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']>;
  txHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_starts_with?: InputMaybe<Scalars['String']>;
  txHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum CrossMarginAccountTransfer_OrderBy {
  AbstractAccount = 'abstractAccount',
  Account = 'account',
  Id = 'id',
  Size = 'size',
  Timestamp = 'timestamp',
  TxHash = 'txHash'
}

export type CrossMarginAccount_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CrossMarginAccount_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<CrossMarginAccount_Filter>>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum CrossMarginAccount_OrderBy {
  Id = 'id',
  Owner = 'owner'
}

export type FundingPayment = {
  __typename?: 'FundingPayment';
  account: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  asset: Scalars['Bytes'];
  id: Scalars['ID'];
  marketKey: Scalars['Bytes'];
  positionId: Scalars['ID'];
  timestamp: Scalars['BigInt'];
};

export type FundingPayment_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<FundingPayment_Filter>>>;
  asset?: InputMaybe<Scalars['Bytes']>;
  asset_contains?: InputMaybe<Scalars['Bytes']>;
  asset_gt?: InputMaybe<Scalars['Bytes']>;
  asset_gte?: InputMaybe<Scalars['Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  asset_lt?: InputMaybe<Scalars['Bytes']>;
  asset_lte?: InputMaybe<Scalars['Bytes']>;
  asset_not?: InputMaybe<Scalars['Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['Bytes']>;
  asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  marketKey?: InputMaybe<Scalars['Bytes']>;
  marketKey_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_gt?: InputMaybe<Scalars['Bytes']>;
  marketKey_gte?: InputMaybe<Scalars['Bytes']>;
  marketKey_in?: InputMaybe<Array<Scalars['Bytes']>>;
  marketKey_lt?: InputMaybe<Scalars['Bytes']>;
  marketKey_lte?: InputMaybe<Scalars['Bytes']>;
  marketKey_not?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<FundingPayment_Filter>>>;
  positionId?: InputMaybe<Scalars['ID']>;
  positionId_gt?: InputMaybe<Scalars['ID']>;
  positionId_gte?: InputMaybe<Scalars['ID']>;
  positionId_in?: InputMaybe<Array<Scalars['ID']>>;
  positionId_lt?: InputMaybe<Scalars['ID']>;
  positionId_lte?: InputMaybe<Scalars['ID']>;
  positionId_not?: InputMaybe<Scalars['ID']>;
  positionId_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum FundingPayment_OrderBy {
  Account = 'account',
  Amount = 'amount',
  Asset = 'asset',
  Id = 'id',
  MarketKey = 'marketKey',
  PositionId = 'positionId',
  Timestamp = 'timestamp'
}

export type FundingRateUpdate = {
  __typename?: 'FundingRateUpdate';
  asset: Scalars['Bytes'];
  funding: Scalars['BigInt'];
  fundingRate: Scalars['BigInt'];
  id: Scalars['ID'];
  market: Scalars['Bytes'];
  marketKey: Scalars['Bytes'];
  sequenceLength: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type FundingRateUpdate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FundingRateUpdate_Filter>>>;
  asset?: InputMaybe<Scalars['Bytes']>;
  asset_contains?: InputMaybe<Scalars['Bytes']>;
  asset_gt?: InputMaybe<Scalars['Bytes']>;
  asset_gte?: InputMaybe<Scalars['Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  asset_lt?: InputMaybe<Scalars['Bytes']>;
  asset_lte?: InputMaybe<Scalars['Bytes']>;
  asset_not?: InputMaybe<Scalars['Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['Bytes']>;
  asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  funding?: InputMaybe<Scalars['BigInt']>;
  fundingRate?: InputMaybe<Scalars['BigInt']>;
  fundingRate_gt?: InputMaybe<Scalars['BigInt']>;
  fundingRate_gte?: InputMaybe<Scalars['BigInt']>;
  fundingRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingRate_lt?: InputMaybe<Scalars['BigInt']>;
  fundingRate_lte?: InputMaybe<Scalars['BigInt']>;
  fundingRate_not?: InputMaybe<Scalars['BigInt']>;
  fundingRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  funding_gt?: InputMaybe<Scalars['BigInt']>;
  funding_gte?: InputMaybe<Scalars['BigInt']>;
  funding_in?: InputMaybe<Array<Scalars['BigInt']>>;
  funding_lt?: InputMaybe<Scalars['BigInt']>;
  funding_lte?: InputMaybe<Scalars['BigInt']>;
  funding_not?: InputMaybe<Scalars['BigInt']>;
  funding_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  market?: InputMaybe<Scalars['Bytes']>;
  marketKey?: InputMaybe<Scalars['Bytes']>;
  marketKey_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_gt?: InputMaybe<Scalars['Bytes']>;
  marketKey_gte?: InputMaybe<Scalars['Bytes']>;
  marketKey_in?: InputMaybe<Array<Scalars['Bytes']>>;
  marketKey_lt?: InputMaybe<Scalars['Bytes']>;
  marketKey_lte?: InputMaybe<Scalars['Bytes']>;
  marketKey_not?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  market_contains?: InputMaybe<Scalars['Bytes']>;
  market_gt?: InputMaybe<Scalars['Bytes']>;
  market_gte?: InputMaybe<Scalars['Bytes']>;
  market_in?: InputMaybe<Array<Scalars['Bytes']>>;
  market_lt?: InputMaybe<Scalars['Bytes']>;
  market_lte?: InputMaybe<Scalars['Bytes']>;
  market_not?: InputMaybe<Scalars['Bytes']>;
  market_not_contains?: InputMaybe<Scalars['Bytes']>;
  market_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<FundingRateUpdate_Filter>>>;
  sequenceLength?: InputMaybe<Scalars['BigInt']>;
  sequenceLength_gt?: InputMaybe<Scalars['BigInt']>;
  sequenceLength_gte?: InputMaybe<Scalars['BigInt']>;
  sequenceLength_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sequenceLength_lt?: InputMaybe<Scalars['BigInt']>;
  sequenceLength_lte?: InputMaybe<Scalars['BigInt']>;
  sequenceLength_not?: InputMaybe<Scalars['BigInt']>;
  sequenceLength_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum FundingRateUpdate_OrderBy {
  Asset = 'asset',
  Funding = 'funding',
  FundingRate = 'fundingRate',
  Id = 'id',
  Market = 'market',
  MarketKey = 'marketKey',
  SequenceLength = 'sequenceLength',
  Timestamp = 'timestamp'
}

export enum FuturesAccountType {
  IsolatedMargin = 'isolated_margin',
  SmartMargin = 'smart_margin'
}

export type FuturesAggregateStat = {
  __typename?: 'FuturesAggregateStat';
  asset: Scalars['Bytes'];
  feesCrossMarginAccounts: Scalars['BigInt'];
  feesKwenta: Scalars['BigInt'];
  feesSynthetix: Scalars['BigInt'];
  id: Scalars['ID'];
  marketKey: Scalars['Bytes'];
  period: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  trades: Scalars['BigInt'];
  volume: Scalars['BigInt'];
};

export type FuturesAggregateStat_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FuturesAggregateStat_Filter>>>;
  asset?: InputMaybe<Scalars['Bytes']>;
  asset_contains?: InputMaybe<Scalars['Bytes']>;
  asset_gt?: InputMaybe<Scalars['Bytes']>;
  asset_gte?: InputMaybe<Scalars['Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  asset_lt?: InputMaybe<Scalars['Bytes']>;
  asset_lte?: InputMaybe<Scalars['Bytes']>;
  asset_not?: InputMaybe<Scalars['Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['Bytes']>;
  asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feesCrossMarginAccounts?: InputMaybe<Scalars['BigInt']>;
  feesCrossMarginAccounts_gt?: InputMaybe<Scalars['BigInt']>;
  feesCrossMarginAccounts_gte?: InputMaybe<Scalars['BigInt']>;
  feesCrossMarginAccounts_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesCrossMarginAccounts_lt?: InputMaybe<Scalars['BigInt']>;
  feesCrossMarginAccounts_lte?: InputMaybe<Scalars['BigInt']>;
  feesCrossMarginAccounts_not?: InputMaybe<Scalars['BigInt']>;
  feesCrossMarginAccounts_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesKwenta?: InputMaybe<Scalars['BigInt']>;
  feesKwenta_gt?: InputMaybe<Scalars['BigInt']>;
  feesKwenta_gte?: InputMaybe<Scalars['BigInt']>;
  feesKwenta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesKwenta_lt?: InputMaybe<Scalars['BigInt']>;
  feesKwenta_lte?: InputMaybe<Scalars['BigInt']>;
  feesKwenta_not?: InputMaybe<Scalars['BigInt']>;
  feesKwenta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesSynthetix?: InputMaybe<Scalars['BigInt']>;
  feesSynthetix_gt?: InputMaybe<Scalars['BigInt']>;
  feesSynthetix_gte?: InputMaybe<Scalars['BigInt']>;
  feesSynthetix_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesSynthetix_lt?: InputMaybe<Scalars['BigInt']>;
  feesSynthetix_lte?: InputMaybe<Scalars['BigInt']>;
  feesSynthetix_not?: InputMaybe<Scalars['BigInt']>;
  feesSynthetix_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  marketKey?: InputMaybe<Scalars['Bytes']>;
  marketKey_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_gt?: InputMaybe<Scalars['Bytes']>;
  marketKey_gte?: InputMaybe<Scalars['Bytes']>;
  marketKey_in?: InputMaybe<Array<Scalars['Bytes']>>;
  marketKey_lt?: InputMaybe<Scalars['Bytes']>;
  marketKey_lte?: InputMaybe<Scalars['Bytes']>;
  marketKey_not?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<FuturesAggregateStat_Filter>>>;
  period?: InputMaybe<Scalars['BigInt']>;
  period_gt?: InputMaybe<Scalars['BigInt']>;
  period_gte?: InputMaybe<Scalars['BigInt']>;
  period_in?: InputMaybe<Array<Scalars['BigInt']>>;
  period_lt?: InputMaybe<Scalars['BigInt']>;
  period_lte?: InputMaybe<Scalars['BigInt']>;
  period_not?: InputMaybe<Scalars['BigInt']>;
  period_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trades?: InputMaybe<Scalars['BigInt']>;
  trades_gt?: InputMaybe<Scalars['BigInt']>;
  trades_gte?: InputMaybe<Scalars['BigInt']>;
  trades_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trades_lt?: InputMaybe<Scalars['BigInt']>;
  trades_lte?: InputMaybe<Scalars['BigInt']>;
  trades_not?: InputMaybe<Scalars['BigInt']>;
  trades_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['BigInt']>;
  volume_gt?: InputMaybe<Scalars['BigInt']>;
  volume_gte?: InputMaybe<Scalars['BigInt']>;
  volume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume_lt?: InputMaybe<Scalars['BigInt']>;
  volume_lte?: InputMaybe<Scalars['BigInt']>;
  volume_not?: InputMaybe<Scalars['BigInt']>;
  volume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum FuturesAggregateStat_OrderBy {
  Asset = 'asset',
  FeesCrossMarginAccounts = 'feesCrossMarginAccounts',
  FeesKwenta = 'feesKwenta',
  FeesSynthetix = 'feesSynthetix',
  Id = 'id',
  MarketKey = 'marketKey',
  Period = 'period',
  Timestamp = 'timestamp',
  Trades = 'trades',
  Volume = 'volume'
}

export type FuturesCumulativeStat = {
  __typename?: 'FuturesCumulativeStat';
  averageTradeSize: Scalars['BigInt'];
  id: Scalars['ID'];
  totalLiquidations: Scalars['BigInt'];
  totalTraders: Scalars['BigInt'];
  totalTrades: Scalars['BigInt'];
  totalVolume: Scalars['BigInt'];
};

export type FuturesCumulativeStat_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FuturesCumulativeStat_Filter>>>;
  averageTradeSize?: InputMaybe<Scalars['BigInt']>;
  averageTradeSize_gt?: InputMaybe<Scalars['BigInt']>;
  averageTradeSize_gte?: InputMaybe<Scalars['BigInt']>;
  averageTradeSize_in?: InputMaybe<Array<Scalars['BigInt']>>;
  averageTradeSize_lt?: InputMaybe<Scalars['BigInt']>;
  averageTradeSize_lte?: InputMaybe<Scalars['BigInt']>;
  averageTradeSize_not?: InputMaybe<Scalars['BigInt']>;
  averageTradeSize_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<FuturesCumulativeStat_Filter>>>;
  totalLiquidations?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_gt?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_gte?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLiquidations_lt?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_lte?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_not?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTraders?: InputMaybe<Scalars['BigInt']>;
  totalTraders_gt?: InputMaybe<Scalars['BigInt']>;
  totalTraders_gte?: InputMaybe<Scalars['BigInt']>;
  totalTraders_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTraders_lt?: InputMaybe<Scalars['BigInt']>;
  totalTraders_lte?: InputMaybe<Scalars['BigInt']>;
  totalTraders_not?: InputMaybe<Scalars['BigInt']>;
  totalTraders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTrades?: InputMaybe<Scalars['BigInt']>;
  totalTrades_gt?: InputMaybe<Scalars['BigInt']>;
  totalTrades_gte?: InputMaybe<Scalars['BigInt']>;
  totalTrades_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTrades_lt?: InputMaybe<Scalars['BigInt']>;
  totalTrades_lte?: InputMaybe<Scalars['BigInt']>;
  totalTrades_not?: InputMaybe<Scalars['BigInt']>;
  totalTrades_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolume?: InputMaybe<Scalars['BigInt']>;
  totalVolume_gt?: InputMaybe<Scalars['BigInt']>;
  totalVolume_gte?: InputMaybe<Scalars['BigInt']>;
  totalVolume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolume_lt?: InputMaybe<Scalars['BigInt']>;
  totalVolume_lte?: InputMaybe<Scalars['BigInt']>;
  totalVolume_not?: InputMaybe<Scalars['BigInt']>;
  totalVolume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum FuturesCumulativeStat_OrderBy {
  AverageTradeSize = 'averageTradeSize',
  Id = 'id',
  TotalLiquidations = 'totalLiquidations',
  TotalTraders = 'totalTraders',
  TotalTrades = 'totalTrades',
  TotalVolume = 'totalVolume'
}

export type FuturesMarginAccount = {
  __typename?: 'FuturesMarginAccount';
  account: Scalars['Bytes'];
  asset: Scalars['Bytes'];
  deposits: Scalars['BigInt'];
  id: Scalars['ID'];
  margin: Scalars['BigInt'];
  market: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
  withdrawals: Scalars['BigInt'];
};

export type FuturesMarginAccount_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<FuturesMarginAccount_Filter>>>;
  asset?: InputMaybe<Scalars['Bytes']>;
  asset_contains?: InputMaybe<Scalars['Bytes']>;
  asset_gt?: InputMaybe<Scalars['Bytes']>;
  asset_gte?: InputMaybe<Scalars['Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  asset_lt?: InputMaybe<Scalars['Bytes']>;
  asset_lte?: InputMaybe<Scalars['Bytes']>;
  asset_not?: InputMaybe<Scalars['Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['Bytes']>;
  asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  deposits?: InputMaybe<Scalars['BigInt']>;
  deposits_gt?: InputMaybe<Scalars['BigInt']>;
  deposits_gte?: InputMaybe<Scalars['BigInt']>;
  deposits_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deposits_lt?: InputMaybe<Scalars['BigInt']>;
  deposits_lte?: InputMaybe<Scalars['BigInt']>;
  deposits_not?: InputMaybe<Scalars['BigInt']>;
  deposits_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  margin?: InputMaybe<Scalars['BigInt']>;
  margin_gt?: InputMaybe<Scalars['BigInt']>;
  margin_gte?: InputMaybe<Scalars['BigInt']>;
  margin_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin_lt?: InputMaybe<Scalars['BigInt']>;
  margin_lte?: InputMaybe<Scalars['BigInt']>;
  margin_not?: InputMaybe<Scalars['BigInt']>;
  margin_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  market?: InputMaybe<Scalars['Bytes']>;
  market_contains?: InputMaybe<Scalars['Bytes']>;
  market_gt?: InputMaybe<Scalars['Bytes']>;
  market_gte?: InputMaybe<Scalars['Bytes']>;
  market_in?: InputMaybe<Array<Scalars['Bytes']>>;
  market_lt?: InputMaybe<Scalars['Bytes']>;
  market_lte?: InputMaybe<Scalars['Bytes']>;
  market_not?: InputMaybe<Scalars['Bytes']>;
  market_not_contains?: InputMaybe<Scalars['Bytes']>;
  market_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<FuturesMarginAccount_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  withdrawals?: InputMaybe<Scalars['BigInt']>;
  withdrawals_gt?: InputMaybe<Scalars['BigInt']>;
  withdrawals_gte?: InputMaybe<Scalars['BigInt']>;
  withdrawals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  withdrawals_lt?: InputMaybe<Scalars['BigInt']>;
  withdrawals_lte?: InputMaybe<Scalars['BigInt']>;
  withdrawals_not?: InputMaybe<Scalars['BigInt']>;
  withdrawals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum FuturesMarginAccount_OrderBy {
  Account = 'account',
  Asset = 'asset',
  Deposits = 'deposits',
  Id = 'id',
  Margin = 'margin',
  Market = 'market',
  Timestamp = 'timestamp',
  Withdrawals = 'withdrawals'
}

export type FuturesMarginTransfer = {
  __typename?: 'FuturesMarginTransfer';
  account: Scalars['Bytes'];
  asset: Scalars['Bytes'];
  id: Scalars['ID'];
  market: Scalars['Bytes'];
  marketKey: Scalars['Bytes'];
  size: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  txHash: Scalars['String'];
};

export type FuturesMarginTransfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<FuturesMarginTransfer_Filter>>>;
  asset?: InputMaybe<Scalars['Bytes']>;
  asset_contains?: InputMaybe<Scalars['Bytes']>;
  asset_gt?: InputMaybe<Scalars['Bytes']>;
  asset_gte?: InputMaybe<Scalars['Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  asset_lt?: InputMaybe<Scalars['Bytes']>;
  asset_lte?: InputMaybe<Scalars['Bytes']>;
  asset_not?: InputMaybe<Scalars['Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['Bytes']>;
  asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  market?: InputMaybe<Scalars['Bytes']>;
  marketKey?: InputMaybe<Scalars['Bytes']>;
  marketKey_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_gt?: InputMaybe<Scalars['Bytes']>;
  marketKey_gte?: InputMaybe<Scalars['Bytes']>;
  marketKey_in?: InputMaybe<Array<Scalars['Bytes']>>;
  marketKey_lt?: InputMaybe<Scalars['Bytes']>;
  marketKey_lte?: InputMaybe<Scalars['Bytes']>;
  marketKey_not?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  market_contains?: InputMaybe<Scalars['Bytes']>;
  market_gt?: InputMaybe<Scalars['Bytes']>;
  market_gte?: InputMaybe<Scalars['Bytes']>;
  market_in?: InputMaybe<Array<Scalars['Bytes']>>;
  market_lt?: InputMaybe<Scalars['Bytes']>;
  market_lte?: InputMaybe<Scalars['Bytes']>;
  market_not?: InputMaybe<Scalars['Bytes']>;
  market_not_contains?: InputMaybe<Scalars['Bytes']>;
  market_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<FuturesMarginTransfer_Filter>>>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txHash?: InputMaybe<Scalars['String']>;
  txHash_contains?: InputMaybe<Scalars['String']>;
  txHash_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_ends_with?: InputMaybe<Scalars['String']>;
  txHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_gt?: InputMaybe<Scalars['String']>;
  txHash_gte?: InputMaybe<Scalars['String']>;
  txHash_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_lt?: InputMaybe<Scalars['String']>;
  txHash_lte?: InputMaybe<Scalars['String']>;
  txHash_not?: InputMaybe<Scalars['String']>;
  txHash_not_contains?: InputMaybe<Scalars['String']>;
  txHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']>;
  txHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_starts_with?: InputMaybe<Scalars['String']>;
  txHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum FuturesMarginTransfer_OrderBy {
  Account = 'account',
  Asset = 'asset',
  Id = 'id',
  Market = 'market',
  MarketKey = 'marketKey',
  Size = 'size',
  Timestamp = 'timestamp',
  TxHash = 'txHash'
}

export type FuturesMarket = {
  __typename?: 'FuturesMarket';
  asset: Scalars['Bytes'];
  id: Scalars['ID'];
  marketKey: Scalars['Bytes'];
  marketStats: FuturesCumulativeStat;
};

export type FuturesMarket_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FuturesMarket_Filter>>>;
  asset?: InputMaybe<Scalars['Bytes']>;
  asset_contains?: InputMaybe<Scalars['Bytes']>;
  asset_gt?: InputMaybe<Scalars['Bytes']>;
  asset_gte?: InputMaybe<Scalars['Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  asset_lt?: InputMaybe<Scalars['Bytes']>;
  asset_lte?: InputMaybe<Scalars['Bytes']>;
  asset_not?: InputMaybe<Scalars['Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['Bytes']>;
  asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  marketKey?: InputMaybe<Scalars['Bytes']>;
  marketKey_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_gt?: InputMaybe<Scalars['Bytes']>;
  marketKey_gte?: InputMaybe<Scalars['Bytes']>;
  marketKey_in?: InputMaybe<Array<Scalars['Bytes']>>;
  marketKey_lt?: InputMaybe<Scalars['Bytes']>;
  marketKey_lte?: InputMaybe<Scalars['Bytes']>;
  marketKey_not?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  marketStats?: InputMaybe<Scalars['String']>;
  marketStats_?: InputMaybe<FuturesCumulativeStat_Filter>;
  marketStats_contains?: InputMaybe<Scalars['String']>;
  marketStats_contains_nocase?: InputMaybe<Scalars['String']>;
  marketStats_ends_with?: InputMaybe<Scalars['String']>;
  marketStats_ends_with_nocase?: InputMaybe<Scalars['String']>;
  marketStats_gt?: InputMaybe<Scalars['String']>;
  marketStats_gte?: InputMaybe<Scalars['String']>;
  marketStats_in?: InputMaybe<Array<Scalars['String']>>;
  marketStats_lt?: InputMaybe<Scalars['String']>;
  marketStats_lte?: InputMaybe<Scalars['String']>;
  marketStats_not?: InputMaybe<Scalars['String']>;
  marketStats_not_contains?: InputMaybe<Scalars['String']>;
  marketStats_not_contains_nocase?: InputMaybe<Scalars['String']>;
  marketStats_not_ends_with?: InputMaybe<Scalars['String']>;
  marketStats_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  marketStats_not_in?: InputMaybe<Array<Scalars['String']>>;
  marketStats_not_starts_with?: InputMaybe<Scalars['String']>;
  marketStats_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  marketStats_starts_with?: InputMaybe<Scalars['String']>;
  marketStats_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<FuturesMarket_Filter>>>;
};

export enum FuturesMarket_OrderBy {
  Asset = 'asset',
  Id = 'id',
  MarketKey = 'marketKey',
  MarketStats = 'marketStats',
  MarketStatsAverageTradeSize = 'marketStats__averageTradeSize',
  MarketStatsId = 'marketStats__id',
  MarketStatsTotalLiquidations = 'marketStats__totalLiquidations',
  MarketStatsTotalTraders = 'marketStats__totalTraders',
  MarketStatsTotalTrades = 'marketStats__totalTrades',
  MarketStatsTotalVolume = 'marketStats__totalVolume'
}

export type FuturesOrder = {
  __typename?: 'FuturesOrder';
  abstractAccount: Scalars['Bytes'];
  account: Scalars['Bytes'];
  id: Scalars['ID'];
  keeper: Scalars['Bytes'];
  marginDelta: Scalars['BigInt'];
  marketKey: Scalars['Bytes'];
  orderId: Scalars['BigInt'];
  orderType: FuturesOrderType;
  size: Scalars['BigInt'];
  status: FuturesOrderStatus;
  targetPrice: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  txnHash: Scalars['Bytes'];
};

export enum FuturesOrderStatus {
  Cancelled = 'Cancelled',
  Filled = 'Filled',
  Open = 'Open',
  Pending = 'Pending'
}

export enum FuturesOrderType {
  Delayed = 'Delayed',
  DelayedOffchain = 'DelayedOffchain',
  Limit = 'Limit',
  Liquidation = 'Liquidation',
  Market = 'Market',
  NextPrice = 'NextPrice',
  StopMarket = 'StopMarket'
}

export type FuturesOrder_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  abstractAccount?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_contains?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_gt?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_gte?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_in?: InputMaybe<Array<Scalars['Bytes']>>;
  abstractAccount_lt?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_lte?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_not?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_not_contains?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<FuturesOrder_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  keeper?: InputMaybe<Scalars['Bytes']>;
  keeper_contains?: InputMaybe<Scalars['Bytes']>;
  keeper_gt?: InputMaybe<Scalars['Bytes']>;
  keeper_gte?: InputMaybe<Scalars['Bytes']>;
  keeper_in?: InputMaybe<Array<Scalars['Bytes']>>;
  keeper_lt?: InputMaybe<Scalars['Bytes']>;
  keeper_lte?: InputMaybe<Scalars['Bytes']>;
  keeper_not?: InputMaybe<Scalars['Bytes']>;
  keeper_not_contains?: InputMaybe<Scalars['Bytes']>;
  keeper_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  marginDelta?: InputMaybe<Scalars['BigInt']>;
  marginDelta_gt?: InputMaybe<Scalars['BigInt']>;
  marginDelta_gte?: InputMaybe<Scalars['BigInt']>;
  marginDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  marginDelta_lt?: InputMaybe<Scalars['BigInt']>;
  marginDelta_lte?: InputMaybe<Scalars['BigInt']>;
  marginDelta_not?: InputMaybe<Scalars['BigInt']>;
  marginDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  marketKey?: InputMaybe<Scalars['Bytes']>;
  marketKey_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_gt?: InputMaybe<Scalars['Bytes']>;
  marketKey_gte?: InputMaybe<Scalars['Bytes']>;
  marketKey_in?: InputMaybe<Array<Scalars['Bytes']>>;
  marketKey_lt?: InputMaybe<Scalars['Bytes']>;
  marketKey_lte?: InputMaybe<Scalars['Bytes']>;
  marketKey_not?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<FuturesOrder_Filter>>>;
  orderId?: InputMaybe<Scalars['BigInt']>;
  orderId_gt?: InputMaybe<Scalars['BigInt']>;
  orderId_gte?: InputMaybe<Scalars['BigInt']>;
  orderId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  orderId_lt?: InputMaybe<Scalars['BigInt']>;
  orderId_lte?: InputMaybe<Scalars['BigInt']>;
  orderId_not?: InputMaybe<Scalars['BigInt']>;
  orderId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  orderType?: InputMaybe<FuturesOrderType>;
  orderType_in?: InputMaybe<Array<FuturesOrderType>>;
  orderType_not?: InputMaybe<FuturesOrderType>;
  orderType_not_in?: InputMaybe<Array<FuturesOrderType>>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<FuturesOrderStatus>;
  status_in?: InputMaybe<Array<FuturesOrderStatus>>;
  status_not?: InputMaybe<FuturesOrderStatus>;
  status_not_in?: InputMaybe<Array<FuturesOrderStatus>>;
  targetPrice?: InputMaybe<Scalars['BigInt']>;
  targetPrice_gt?: InputMaybe<Scalars['BigInt']>;
  targetPrice_gte?: InputMaybe<Scalars['BigInt']>;
  targetPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  targetPrice_lt?: InputMaybe<Scalars['BigInt']>;
  targetPrice_lte?: InputMaybe<Scalars['BigInt']>;
  targetPrice_not?: InputMaybe<Scalars['BigInt']>;
  targetPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txnHash?: InputMaybe<Scalars['Bytes']>;
  txnHash_contains?: InputMaybe<Scalars['Bytes']>;
  txnHash_gt?: InputMaybe<Scalars['Bytes']>;
  txnHash_gte?: InputMaybe<Scalars['Bytes']>;
  txnHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txnHash_lt?: InputMaybe<Scalars['Bytes']>;
  txnHash_lte?: InputMaybe<Scalars['Bytes']>;
  txnHash_not?: InputMaybe<Scalars['Bytes']>;
  txnHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txnHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum FuturesOrder_OrderBy {
  AbstractAccount = 'abstractAccount',
  Account = 'account',
  Id = 'id',
  Keeper = 'keeper',
  MarginDelta = 'marginDelta',
  MarketKey = 'marketKey',
  OrderId = 'orderId',
  OrderType = 'orderType',
  Size = 'size',
  Status = 'status',
  TargetPrice = 'targetPrice',
  Timestamp = 'timestamp',
  TxnHash = 'txnHash'
}

export type FuturesPosition = {
  __typename?: 'FuturesPosition';
  abstractAccount: Scalars['Bytes'];
  account: Scalars['Bytes'];
  accountType: FuturesAccountType;
  asset: Scalars['Bytes'];
  avgEntryPrice: Scalars['BigInt'];
  closeTimestamp?: Maybe<Scalars['BigInt']>;
  entryPrice: Scalars['BigInt'];
  exitPrice?: Maybe<Scalars['BigInt']>;
  feesPaid: Scalars['BigInt'];
  fundingIndex: Scalars['BigInt'];
  id: Scalars['ID'];
  initialMargin: Scalars['BigInt'];
  isLiquidated: Scalars['Boolean'];
  isOpen: Scalars['Boolean'];
  lastPrice: Scalars['BigInt'];
  lastTxHash: Scalars['Bytes'];
  margin: Scalars['BigInt'];
  market: Scalars['Bytes'];
  marketKey: Scalars['Bytes'];
  netFunding: Scalars['BigInt'];
  netTransfers: Scalars['BigInt'];
  openTimestamp: Scalars['BigInt'];
  pnl: Scalars['BigInt'];
  pnlWithFeesPaid: Scalars['BigInt'];
  size: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  totalDeposits: Scalars['BigInt'];
  totalVolume: Scalars['BigInt'];
  trades: Scalars['BigInt'];
};

export type FuturesPosition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  abstractAccount?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_contains?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_gt?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_gte?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_in?: InputMaybe<Array<Scalars['Bytes']>>;
  abstractAccount_lt?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_lte?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_not?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_not_contains?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account?: InputMaybe<Scalars['Bytes']>;
  accountType?: InputMaybe<FuturesAccountType>;
  accountType_in?: InputMaybe<Array<FuturesAccountType>>;
  accountType_not?: InputMaybe<FuturesAccountType>;
  accountType_not_in?: InputMaybe<Array<FuturesAccountType>>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<FuturesPosition_Filter>>>;
  asset?: InputMaybe<Scalars['Bytes']>;
  asset_contains?: InputMaybe<Scalars['Bytes']>;
  asset_gt?: InputMaybe<Scalars['Bytes']>;
  asset_gte?: InputMaybe<Scalars['Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  asset_lt?: InputMaybe<Scalars['Bytes']>;
  asset_lte?: InputMaybe<Scalars['Bytes']>;
  asset_not?: InputMaybe<Scalars['Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['Bytes']>;
  asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  avgEntryPrice?: InputMaybe<Scalars['BigInt']>;
  avgEntryPrice_gt?: InputMaybe<Scalars['BigInt']>;
  avgEntryPrice_gte?: InputMaybe<Scalars['BigInt']>;
  avgEntryPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  avgEntryPrice_lt?: InputMaybe<Scalars['BigInt']>;
  avgEntryPrice_lte?: InputMaybe<Scalars['BigInt']>;
  avgEntryPrice_not?: InputMaybe<Scalars['BigInt']>;
  avgEntryPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  closeTimestamp?: InputMaybe<Scalars['BigInt']>;
  closeTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  closeTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  closeTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  closeTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  closeTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  closeTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  closeTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  entryPrice?: InputMaybe<Scalars['BigInt']>;
  entryPrice_gt?: InputMaybe<Scalars['BigInt']>;
  entryPrice_gte?: InputMaybe<Scalars['BigInt']>;
  entryPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  entryPrice_lt?: InputMaybe<Scalars['BigInt']>;
  entryPrice_lte?: InputMaybe<Scalars['BigInt']>;
  entryPrice_not?: InputMaybe<Scalars['BigInt']>;
  entryPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exitPrice?: InputMaybe<Scalars['BigInt']>;
  exitPrice_gt?: InputMaybe<Scalars['BigInt']>;
  exitPrice_gte?: InputMaybe<Scalars['BigInt']>;
  exitPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exitPrice_lt?: InputMaybe<Scalars['BigInt']>;
  exitPrice_lte?: InputMaybe<Scalars['BigInt']>;
  exitPrice_not?: InputMaybe<Scalars['BigInt']>;
  exitPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesPaid?: InputMaybe<Scalars['BigInt']>;
  feesPaid_gt?: InputMaybe<Scalars['BigInt']>;
  feesPaid_gte?: InputMaybe<Scalars['BigInt']>;
  feesPaid_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesPaid_lt?: InputMaybe<Scalars['BigInt']>;
  feesPaid_lte?: InputMaybe<Scalars['BigInt']>;
  feesPaid_not?: InputMaybe<Scalars['BigInt']>;
  feesPaid_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingIndex?: InputMaybe<Scalars['BigInt']>;
  fundingIndex_gt?: InputMaybe<Scalars['BigInt']>;
  fundingIndex_gte?: InputMaybe<Scalars['BigInt']>;
  fundingIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingIndex_lt?: InputMaybe<Scalars['BigInt']>;
  fundingIndex_lte?: InputMaybe<Scalars['BigInt']>;
  fundingIndex_not?: InputMaybe<Scalars['BigInt']>;
  fundingIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  initialMargin?: InputMaybe<Scalars['BigInt']>;
  initialMargin_gt?: InputMaybe<Scalars['BigInt']>;
  initialMargin_gte?: InputMaybe<Scalars['BigInt']>;
  initialMargin_in?: InputMaybe<Array<Scalars['BigInt']>>;
  initialMargin_lt?: InputMaybe<Scalars['BigInt']>;
  initialMargin_lte?: InputMaybe<Scalars['BigInt']>;
  initialMargin_not?: InputMaybe<Scalars['BigInt']>;
  initialMargin_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  isLiquidated?: InputMaybe<Scalars['Boolean']>;
  isLiquidated_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isLiquidated_not?: InputMaybe<Scalars['Boolean']>;
  isLiquidated_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isOpen?: InputMaybe<Scalars['Boolean']>;
  isOpen_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isOpen_not?: InputMaybe<Scalars['Boolean']>;
  isOpen_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  lastPrice?: InputMaybe<Scalars['BigInt']>;
  lastPrice_gt?: InputMaybe<Scalars['BigInt']>;
  lastPrice_gte?: InputMaybe<Scalars['BigInt']>;
  lastPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastPrice_lt?: InputMaybe<Scalars['BigInt']>;
  lastPrice_lte?: InputMaybe<Scalars['BigInt']>;
  lastPrice_not?: InputMaybe<Scalars['BigInt']>;
  lastPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTxHash?: InputMaybe<Scalars['Bytes']>;
  lastTxHash_contains?: InputMaybe<Scalars['Bytes']>;
  lastTxHash_gt?: InputMaybe<Scalars['Bytes']>;
  lastTxHash_gte?: InputMaybe<Scalars['Bytes']>;
  lastTxHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lastTxHash_lt?: InputMaybe<Scalars['Bytes']>;
  lastTxHash_lte?: InputMaybe<Scalars['Bytes']>;
  lastTxHash_not?: InputMaybe<Scalars['Bytes']>;
  lastTxHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  lastTxHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  margin?: InputMaybe<Scalars['BigInt']>;
  margin_gt?: InputMaybe<Scalars['BigInt']>;
  margin_gte?: InputMaybe<Scalars['BigInt']>;
  margin_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin_lt?: InputMaybe<Scalars['BigInt']>;
  margin_lte?: InputMaybe<Scalars['BigInt']>;
  margin_not?: InputMaybe<Scalars['BigInt']>;
  margin_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  market?: InputMaybe<Scalars['Bytes']>;
  marketKey?: InputMaybe<Scalars['Bytes']>;
  marketKey_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_gt?: InputMaybe<Scalars['Bytes']>;
  marketKey_gte?: InputMaybe<Scalars['Bytes']>;
  marketKey_in?: InputMaybe<Array<Scalars['Bytes']>>;
  marketKey_lt?: InputMaybe<Scalars['Bytes']>;
  marketKey_lte?: InputMaybe<Scalars['Bytes']>;
  marketKey_not?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  market_contains?: InputMaybe<Scalars['Bytes']>;
  market_gt?: InputMaybe<Scalars['Bytes']>;
  market_gte?: InputMaybe<Scalars['Bytes']>;
  market_in?: InputMaybe<Array<Scalars['Bytes']>>;
  market_lt?: InputMaybe<Scalars['Bytes']>;
  market_lte?: InputMaybe<Scalars['Bytes']>;
  market_not?: InputMaybe<Scalars['Bytes']>;
  market_not_contains?: InputMaybe<Scalars['Bytes']>;
  market_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  netFunding?: InputMaybe<Scalars['BigInt']>;
  netFunding_gt?: InputMaybe<Scalars['BigInt']>;
  netFunding_gte?: InputMaybe<Scalars['BigInt']>;
  netFunding_in?: InputMaybe<Array<Scalars['BigInt']>>;
  netFunding_lt?: InputMaybe<Scalars['BigInt']>;
  netFunding_lte?: InputMaybe<Scalars['BigInt']>;
  netFunding_not?: InputMaybe<Scalars['BigInt']>;
  netFunding_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  netTransfers?: InputMaybe<Scalars['BigInt']>;
  netTransfers_gt?: InputMaybe<Scalars['BigInt']>;
  netTransfers_gte?: InputMaybe<Scalars['BigInt']>;
  netTransfers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  netTransfers_lt?: InputMaybe<Scalars['BigInt']>;
  netTransfers_lte?: InputMaybe<Scalars['BigInt']>;
  netTransfers_not?: InputMaybe<Scalars['BigInt']>;
  netTransfers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  openTimestamp?: InputMaybe<Scalars['BigInt']>;
  openTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  openTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  openTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  openTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  openTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  openTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  openTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<FuturesPosition_Filter>>>;
  pnl?: InputMaybe<Scalars['BigInt']>;
  pnlWithFeesPaid?: InputMaybe<Scalars['BigInt']>;
  pnlWithFeesPaid_gt?: InputMaybe<Scalars['BigInt']>;
  pnlWithFeesPaid_gte?: InputMaybe<Scalars['BigInt']>;
  pnlWithFeesPaid_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pnlWithFeesPaid_lt?: InputMaybe<Scalars['BigInt']>;
  pnlWithFeesPaid_lte?: InputMaybe<Scalars['BigInt']>;
  pnlWithFeesPaid_not?: InputMaybe<Scalars['BigInt']>;
  pnlWithFeesPaid_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pnl_gt?: InputMaybe<Scalars['BigInt']>;
  pnl_gte?: InputMaybe<Scalars['BigInt']>;
  pnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pnl_lt?: InputMaybe<Scalars['BigInt']>;
  pnl_lte?: InputMaybe<Scalars['BigInt']>;
  pnl_not?: InputMaybe<Scalars['BigInt']>;
  pnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDeposits?: InputMaybe<Scalars['BigInt']>;
  totalDeposits_gt?: InputMaybe<Scalars['BigInt']>;
  totalDeposits_gte?: InputMaybe<Scalars['BigInt']>;
  totalDeposits_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDeposits_lt?: InputMaybe<Scalars['BigInt']>;
  totalDeposits_lte?: InputMaybe<Scalars['BigInt']>;
  totalDeposits_not?: InputMaybe<Scalars['BigInt']>;
  totalDeposits_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolume?: InputMaybe<Scalars['BigInt']>;
  totalVolume_gt?: InputMaybe<Scalars['BigInt']>;
  totalVolume_gte?: InputMaybe<Scalars['BigInt']>;
  totalVolume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolume_lt?: InputMaybe<Scalars['BigInt']>;
  totalVolume_lte?: InputMaybe<Scalars['BigInt']>;
  totalVolume_not?: InputMaybe<Scalars['BigInt']>;
  totalVolume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trades?: InputMaybe<Scalars['BigInt']>;
  trades_gt?: InputMaybe<Scalars['BigInt']>;
  trades_gte?: InputMaybe<Scalars['BigInt']>;
  trades_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trades_lt?: InputMaybe<Scalars['BigInt']>;
  trades_lte?: InputMaybe<Scalars['BigInt']>;
  trades_not?: InputMaybe<Scalars['BigInt']>;
  trades_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum FuturesPosition_OrderBy {
  AbstractAccount = 'abstractAccount',
  Account = 'account',
  AccountType = 'accountType',
  Asset = 'asset',
  AvgEntryPrice = 'avgEntryPrice',
  CloseTimestamp = 'closeTimestamp',
  EntryPrice = 'entryPrice',
  ExitPrice = 'exitPrice',
  FeesPaid = 'feesPaid',
  FundingIndex = 'fundingIndex',
  Id = 'id',
  InitialMargin = 'initialMargin',
  IsLiquidated = 'isLiquidated',
  IsOpen = 'isOpen',
  LastPrice = 'lastPrice',
  LastTxHash = 'lastTxHash',
  Margin = 'margin',
  Market = 'market',
  MarketKey = 'marketKey',
  NetFunding = 'netFunding',
  NetTransfers = 'netTransfers',
  OpenTimestamp = 'openTimestamp',
  Pnl = 'pnl',
  PnlWithFeesPaid = 'pnlWithFeesPaid',
  Size = 'size',
  Timestamp = 'timestamp',
  TotalDeposits = 'totalDeposits',
  TotalVolume = 'totalVolume',
  Trades = 'trades'
}

export type FuturesStat = {
  __typename?: 'FuturesStat';
  account: Scalars['Bytes'];
  feesPaid: Scalars['BigInt'];
  id: Scalars['ID'];
  liquidations: Scalars['BigInt'];
  pnl: Scalars['BigInt'];
  pnlWithFeesPaid: Scalars['BigInt'];
  smartMarginVolume: Scalars['BigInt'];
  totalTrades: Scalars['BigInt'];
  totalVolume: Scalars['BigInt'];
};

export type FuturesStat_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<FuturesStat_Filter>>>;
  feesPaid?: InputMaybe<Scalars['BigInt']>;
  feesPaid_gt?: InputMaybe<Scalars['BigInt']>;
  feesPaid_gte?: InputMaybe<Scalars['BigInt']>;
  feesPaid_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesPaid_lt?: InputMaybe<Scalars['BigInt']>;
  feesPaid_lte?: InputMaybe<Scalars['BigInt']>;
  feesPaid_not?: InputMaybe<Scalars['BigInt']>;
  feesPaid_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidations?: InputMaybe<Scalars['BigInt']>;
  liquidations_gt?: InputMaybe<Scalars['BigInt']>;
  liquidations_gte?: InputMaybe<Scalars['BigInt']>;
  liquidations_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidations_lt?: InputMaybe<Scalars['BigInt']>;
  liquidations_lte?: InputMaybe<Scalars['BigInt']>;
  liquidations_not?: InputMaybe<Scalars['BigInt']>;
  liquidations_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<FuturesStat_Filter>>>;
  pnl?: InputMaybe<Scalars['BigInt']>;
  pnlWithFeesPaid?: InputMaybe<Scalars['BigInt']>;
  pnlWithFeesPaid_gt?: InputMaybe<Scalars['BigInt']>;
  pnlWithFeesPaid_gte?: InputMaybe<Scalars['BigInt']>;
  pnlWithFeesPaid_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pnlWithFeesPaid_lt?: InputMaybe<Scalars['BigInt']>;
  pnlWithFeesPaid_lte?: InputMaybe<Scalars['BigInt']>;
  pnlWithFeesPaid_not?: InputMaybe<Scalars['BigInt']>;
  pnlWithFeesPaid_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pnl_gt?: InputMaybe<Scalars['BigInt']>;
  pnl_gte?: InputMaybe<Scalars['BigInt']>;
  pnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pnl_lt?: InputMaybe<Scalars['BigInt']>;
  pnl_lte?: InputMaybe<Scalars['BigInt']>;
  pnl_not?: InputMaybe<Scalars['BigInt']>;
  pnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  smartMarginVolume?: InputMaybe<Scalars['BigInt']>;
  smartMarginVolume_gt?: InputMaybe<Scalars['BigInt']>;
  smartMarginVolume_gte?: InputMaybe<Scalars['BigInt']>;
  smartMarginVolume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  smartMarginVolume_lt?: InputMaybe<Scalars['BigInt']>;
  smartMarginVolume_lte?: InputMaybe<Scalars['BigInt']>;
  smartMarginVolume_not?: InputMaybe<Scalars['BigInt']>;
  smartMarginVolume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTrades?: InputMaybe<Scalars['BigInt']>;
  totalTrades_gt?: InputMaybe<Scalars['BigInt']>;
  totalTrades_gte?: InputMaybe<Scalars['BigInt']>;
  totalTrades_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTrades_lt?: InputMaybe<Scalars['BigInt']>;
  totalTrades_lte?: InputMaybe<Scalars['BigInt']>;
  totalTrades_not?: InputMaybe<Scalars['BigInt']>;
  totalTrades_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolume?: InputMaybe<Scalars['BigInt']>;
  totalVolume_gt?: InputMaybe<Scalars['BigInt']>;
  totalVolume_gte?: InputMaybe<Scalars['BigInt']>;
  totalVolume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolume_lt?: InputMaybe<Scalars['BigInt']>;
  totalVolume_lte?: InputMaybe<Scalars['BigInt']>;
  totalVolume_not?: InputMaybe<Scalars['BigInt']>;
  totalVolume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum FuturesStat_OrderBy {
  Account = 'account',
  FeesPaid = 'feesPaid',
  Id = 'id',
  Liquidations = 'liquidations',
  Pnl = 'pnl',
  PnlWithFeesPaid = 'pnlWithFeesPaid',
  SmartMarginVolume = 'smartMarginVolume',
  TotalTrades = 'totalTrades',
  TotalVolume = 'totalVolume'
}

export type FuturesTrade = {
  __typename?: 'FuturesTrade';
  abstractAccount: Scalars['Bytes'];
  account: Scalars['Bytes'];
  accountType: FuturesAccountType;
  asset: Scalars['Bytes'];
  feesPaid: Scalars['BigInt'];
  fundingAccrued: Scalars['BigInt'];
  id: Scalars['ID'];
  keeperFeesPaid: Scalars['BigInt'];
  margin: Scalars['BigInt'];
  marketKey: Scalars['Bytes'];
  orderType: FuturesOrderType;
  pnl: Scalars['BigInt'];
  positionClosed: Scalars['Boolean'];
  positionId: Scalars['ID'];
  positionSize: Scalars['BigInt'];
  price: Scalars['BigInt'];
  size: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  trackingCode: Scalars['Bytes'];
};

export type FuturesTrade_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  abstractAccount?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_contains?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_gt?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_gte?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_in?: InputMaybe<Array<Scalars['Bytes']>>;
  abstractAccount_lt?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_lte?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_not?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_not_contains?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account?: InputMaybe<Scalars['Bytes']>;
  accountType?: InputMaybe<FuturesAccountType>;
  accountType_in?: InputMaybe<Array<FuturesAccountType>>;
  accountType_not?: InputMaybe<FuturesAccountType>;
  accountType_not_in?: InputMaybe<Array<FuturesAccountType>>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<FuturesTrade_Filter>>>;
  asset?: InputMaybe<Scalars['Bytes']>;
  asset_contains?: InputMaybe<Scalars['Bytes']>;
  asset_gt?: InputMaybe<Scalars['Bytes']>;
  asset_gte?: InputMaybe<Scalars['Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  asset_lt?: InputMaybe<Scalars['Bytes']>;
  asset_lte?: InputMaybe<Scalars['Bytes']>;
  asset_not?: InputMaybe<Scalars['Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['Bytes']>;
  asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feesPaid?: InputMaybe<Scalars['BigInt']>;
  feesPaid_gt?: InputMaybe<Scalars['BigInt']>;
  feesPaid_gte?: InputMaybe<Scalars['BigInt']>;
  feesPaid_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesPaid_lt?: InputMaybe<Scalars['BigInt']>;
  feesPaid_lte?: InputMaybe<Scalars['BigInt']>;
  feesPaid_not?: InputMaybe<Scalars['BigInt']>;
  feesPaid_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingAccrued?: InputMaybe<Scalars['BigInt']>;
  fundingAccrued_gt?: InputMaybe<Scalars['BigInt']>;
  fundingAccrued_gte?: InputMaybe<Scalars['BigInt']>;
  fundingAccrued_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingAccrued_lt?: InputMaybe<Scalars['BigInt']>;
  fundingAccrued_lte?: InputMaybe<Scalars['BigInt']>;
  fundingAccrued_not?: InputMaybe<Scalars['BigInt']>;
  fundingAccrued_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  keeperFeesPaid?: InputMaybe<Scalars['BigInt']>;
  keeperFeesPaid_gt?: InputMaybe<Scalars['BigInt']>;
  keeperFeesPaid_gte?: InputMaybe<Scalars['BigInt']>;
  keeperFeesPaid_in?: InputMaybe<Array<Scalars['BigInt']>>;
  keeperFeesPaid_lt?: InputMaybe<Scalars['BigInt']>;
  keeperFeesPaid_lte?: InputMaybe<Scalars['BigInt']>;
  keeperFeesPaid_not?: InputMaybe<Scalars['BigInt']>;
  keeperFeesPaid_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin?: InputMaybe<Scalars['BigInt']>;
  margin_gt?: InputMaybe<Scalars['BigInt']>;
  margin_gte?: InputMaybe<Scalars['BigInt']>;
  margin_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin_lt?: InputMaybe<Scalars['BigInt']>;
  margin_lte?: InputMaybe<Scalars['BigInt']>;
  margin_not?: InputMaybe<Scalars['BigInt']>;
  margin_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  marketKey?: InputMaybe<Scalars['Bytes']>;
  marketKey_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_gt?: InputMaybe<Scalars['Bytes']>;
  marketKey_gte?: InputMaybe<Scalars['Bytes']>;
  marketKey_in?: InputMaybe<Array<Scalars['Bytes']>>;
  marketKey_lt?: InputMaybe<Scalars['Bytes']>;
  marketKey_lte?: InputMaybe<Scalars['Bytes']>;
  marketKey_not?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<FuturesTrade_Filter>>>;
  orderType?: InputMaybe<FuturesOrderType>;
  orderType_in?: InputMaybe<Array<FuturesOrderType>>;
  orderType_not?: InputMaybe<FuturesOrderType>;
  orderType_not_in?: InputMaybe<Array<FuturesOrderType>>;
  pnl?: InputMaybe<Scalars['BigInt']>;
  pnl_gt?: InputMaybe<Scalars['BigInt']>;
  pnl_gte?: InputMaybe<Scalars['BigInt']>;
  pnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pnl_lt?: InputMaybe<Scalars['BigInt']>;
  pnl_lte?: InputMaybe<Scalars['BigInt']>;
  pnl_not?: InputMaybe<Scalars['BigInt']>;
  pnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionClosed?: InputMaybe<Scalars['Boolean']>;
  positionClosed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  positionClosed_not?: InputMaybe<Scalars['Boolean']>;
  positionClosed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  positionId?: InputMaybe<Scalars['ID']>;
  positionId_gt?: InputMaybe<Scalars['ID']>;
  positionId_gte?: InputMaybe<Scalars['ID']>;
  positionId_in?: InputMaybe<Array<Scalars['ID']>>;
  positionId_lt?: InputMaybe<Scalars['ID']>;
  positionId_lte?: InputMaybe<Scalars['ID']>;
  positionId_not?: InputMaybe<Scalars['ID']>;
  positionId_not_in?: InputMaybe<Array<Scalars['ID']>>;
  positionSize?: InputMaybe<Scalars['BigInt']>;
  positionSize_gt?: InputMaybe<Scalars['BigInt']>;
  positionSize_gte?: InputMaybe<Scalars['BigInt']>;
  positionSize_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionSize_lt?: InputMaybe<Scalars['BigInt']>;
  positionSize_lte?: InputMaybe<Scalars['BigInt']>;
  positionSize_not?: InputMaybe<Scalars['BigInt']>;
  positionSize_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trackingCode?: InputMaybe<Scalars['Bytes']>;
  trackingCode_contains?: InputMaybe<Scalars['Bytes']>;
  trackingCode_gt?: InputMaybe<Scalars['Bytes']>;
  trackingCode_gte?: InputMaybe<Scalars['Bytes']>;
  trackingCode_in?: InputMaybe<Array<Scalars['Bytes']>>;
  trackingCode_lt?: InputMaybe<Scalars['Bytes']>;
  trackingCode_lte?: InputMaybe<Scalars['Bytes']>;
  trackingCode_not?: InputMaybe<Scalars['Bytes']>;
  trackingCode_not_contains?: InputMaybe<Scalars['Bytes']>;
  trackingCode_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum FuturesTrade_OrderBy {
  AbstractAccount = 'abstractAccount',
  Account = 'account',
  AccountType = 'accountType',
  Asset = 'asset',
  FeesPaid = 'feesPaid',
  FundingAccrued = 'fundingAccrued',
  Id = 'id',
  KeeperFeesPaid = 'keeperFeesPaid',
  Margin = 'margin',
  MarketKey = 'marketKey',
  OrderType = 'orderType',
  Pnl = 'pnl',
  PositionClosed = 'positionClosed',
  PositionId = 'positionId',
  PositionSize = 'positionSize',
  Price = 'price',
  Size = 'size',
  Timestamp = 'timestamp',
  TrackingCode = 'trackingCode'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  crossMarginAccount?: Maybe<CrossMarginAccount>;
  crossMarginAccountTransfer?: Maybe<CrossMarginAccountTransfer>;
  crossMarginAccountTransfers: Array<CrossMarginAccountTransfer>;
  crossMarginAccounts: Array<CrossMarginAccount>;
  fundingPayment?: Maybe<FundingPayment>;
  fundingPayments: Array<FundingPayment>;
  fundingRateUpdate?: Maybe<FundingRateUpdate>;
  fundingRateUpdates: Array<FundingRateUpdate>;
  futuresAggregateStat?: Maybe<FuturesAggregateStat>;
  futuresAggregateStats: Array<FuturesAggregateStat>;
  futuresCumulativeStat?: Maybe<FuturesCumulativeStat>;
  futuresCumulativeStats: Array<FuturesCumulativeStat>;
  futuresMarginAccount?: Maybe<FuturesMarginAccount>;
  futuresMarginAccounts: Array<FuturesMarginAccount>;
  futuresMarginTransfer?: Maybe<FuturesMarginTransfer>;
  futuresMarginTransfers: Array<FuturesMarginTransfer>;
  futuresMarket?: Maybe<FuturesMarket>;
  futuresMarkets: Array<FuturesMarket>;
  futuresOrder?: Maybe<FuturesOrder>;
  futuresOrders: Array<FuturesOrder>;
  futuresPosition?: Maybe<FuturesPosition>;
  futuresPositions: Array<FuturesPosition>;
  futuresStat?: Maybe<FuturesStat>;
  futuresStats: Array<FuturesStat>;
  futuresTrade?: Maybe<FuturesTrade>;
  futuresTrades: Array<FuturesTrade>;
  smartMarginAccount?: Maybe<SmartMarginAccount>;
  smartMarginAccountTransfer?: Maybe<SmartMarginAccountTransfer>;
  smartMarginAccountTransfers: Array<SmartMarginAccountTransfer>;
  smartMarginAccounts: Array<SmartMarginAccount>;
  smartMarginOrder?: Maybe<SmartMarginOrder>;
  smartMarginOrders: Array<SmartMarginOrder>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryCrossMarginAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCrossMarginAccountTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCrossMarginAccountTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CrossMarginAccountTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CrossMarginAccountTransfer_Filter>;
};


export type QueryCrossMarginAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CrossMarginAccount_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CrossMarginAccount_Filter>;
};


export type QueryFundingPaymentArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFundingPaymentsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FundingPayment_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FundingPayment_Filter>;
};


export type QueryFundingRateUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFundingRateUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FundingRateUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FundingRateUpdate_Filter>;
};


export type QueryFuturesAggregateStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFuturesAggregateStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesAggregateStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesAggregateStat_Filter>;
};


export type QueryFuturesCumulativeStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFuturesCumulativeStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesCumulativeStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesCumulativeStat_Filter>;
};


export type QueryFuturesMarginAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFuturesMarginAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesMarginAccount_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesMarginAccount_Filter>;
};


export type QueryFuturesMarginTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFuturesMarginTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesMarginTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesMarginTransfer_Filter>;
};


export type QueryFuturesMarketArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFuturesMarketsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesMarket_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesMarket_Filter>;
};


export type QueryFuturesOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFuturesOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesOrder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesOrder_Filter>;
};


export type QueryFuturesPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFuturesPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesPosition_Filter>;
};


export type QueryFuturesStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFuturesStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesStat_Filter>;
};


export type QueryFuturesTradeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFuturesTradesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesTrade_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesTrade_Filter>;
};


export type QuerySmartMarginAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySmartMarginAccountTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySmartMarginAccountTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SmartMarginAccountTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SmartMarginAccountTransfer_Filter>;
};


export type QuerySmartMarginAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SmartMarginAccount_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SmartMarginAccount_Filter>;
};


export type QuerySmartMarginOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySmartMarginOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SmartMarginOrder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SmartMarginOrder_Filter>;
};

export type SmartMarginAccount = {
  __typename?: 'SmartMarginAccount';
  id: Scalars['ID'];
  owner: Scalars['Bytes'];
  version: Scalars['Bytes'];
};

export type SmartMarginAccountTransfer = {
  __typename?: 'SmartMarginAccountTransfer';
  abstractAccount: Scalars['Bytes'];
  account: Scalars['Bytes'];
  id: Scalars['ID'];
  size: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  txHash: Scalars['String'];
};

export type SmartMarginAccountTransfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  abstractAccount?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_contains?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_gt?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_gte?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_in?: InputMaybe<Array<Scalars['Bytes']>>;
  abstractAccount_lt?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_lte?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_not?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_not_contains?: InputMaybe<Scalars['Bytes']>;
  abstractAccount_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<SmartMarginAccountTransfer_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<SmartMarginAccountTransfer_Filter>>>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txHash?: InputMaybe<Scalars['String']>;
  txHash_contains?: InputMaybe<Scalars['String']>;
  txHash_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_ends_with?: InputMaybe<Scalars['String']>;
  txHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_gt?: InputMaybe<Scalars['String']>;
  txHash_gte?: InputMaybe<Scalars['String']>;
  txHash_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_lt?: InputMaybe<Scalars['String']>;
  txHash_lte?: InputMaybe<Scalars['String']>;
  txHash_not?: InputMaybe<Scalars['String']>;
  txHash_not_contains?: InputMaybe<Scalars['String']>;
  txHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']>;
  txHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_starts_with?: InputMaybe<Scalars['String']>;
  txHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum SmartMarginAccountTransfer_OrderBy {
  AbstractAccount = 'abstractAccount',
  Account = 'account',
  Id = 'id',
  Size = 'size',
  Timestamp = 'timestamp',
  TxHash = 'txHash'
}

export type SmartMarginAccount_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SmartMarginAccount_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<SmartMarginAccount_Filter>>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  version?: InputMaybe<Scalars['Bytes']>;
  version_contains?: InputMaybe<Scalars['Bytes']>;
  version_gt?: InputMaybe<Scalars['Bytes']>;
  version_gte?: InputMaybe<Scalars['Bytes']>;
  version_in?: InputMaybe<Array<Scalars['Bytes']>>;
  version_lt?: InputMaybe<Scalars['Bytes']>;
  version_lte?: InputMaybe<Scalars['Bytes']>;
  version_not?: InputMaybe<Scalars['Bytes']>;
  version_not_contains?: InputMaybe<Scalars['Bytes']>;
  version_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum SmartMarginAccount_OrderBy {
  Id = 'id',
  Owner = 'owner',
  Version = 'version'
}

export type SmartMarginOrder = {
  __typename?: 'SmartMarginOrder';
  account: Scalars['Bytes'];
  feesPaid: Scalars['BigInt'];
  id: Scalars['ID'];
  marketKey: Scalars['Bytes'];
  orderType: FuturesOrderType;
  recordTrade: Scalars['Boolean'];
};

export type SmartMarginOrder_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<SmartMarginOrder_Filter>>>;
  feesPaid?: InputMaybe<Scalars['BigInt']>;
  feesPaid_gt?: InputMaybe<Scalars['BigInt']>;
  feesPaid_gte?: InputMaybe<Scalars['BigInt']>;
  feesPaid_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesPaid_lt?: InputMaybe<Scalars['BigInt']>;
  feesPaid_lte?: InputMaybe<Scalars['BigInt']>;
  feesPaid_not?: InputMaybe<Scalars['BigInt']>;
  feesPaid_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  marketKey?: InputMaybe<Scalars['Bytes']>;
  marketKey_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_gt?: InputMaybe<Scalars['Bytes']>;
  marketKey_gte?: InputMaybe<Scalars['Bytes']>;
  marketKey_in?: InputMaybe<Array<Scalars['Bytes']>>;
  marketKey_lt?: InputMaybe<Scalars['Bytes']>;
  marketKey_lte?: InputMaybe<Scalars['Bytes']>;
  marketKey_not?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<SmartMarginOrder_Filter>>>;
  orderType?: InputMaybe<FuturesOrderType>;
  orderType_in?: InputMaybe<Array<FuturesOrderType>>;
  orderType_not?: InputMaybe<FuturesOrderType>;
  orderType_not_in?: InputMaybe<Array<FuturesOrderType>>;
  recordTrade?: InputMaybe<Scalars['Boolean']>;
  recordTrade_in?: InputMaybe<Array<Scalars['Boolean']>>;
  recordTrade_not?: InputMaybe<Scalars['Boolean']>;
  recordTrade_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
};

export enum SmartMarginOrder_OrderBy {
  Account = 'account',
  FeesPaid = 'feesPaid',
  Id = 'id',
  MarketKey = 'marketKey',
  OrderType = 'orderType',
  RecordTrade = 'recordTrade'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  crossMarginAccount?: Maybe<CrossMarginAccount>;
  crossMarginAccountTransfer?: Maybe<CrossMarginAccountTransfer>;
  crossMarginAccountTransfers: Array<CrossMarginAccountTransfer>;
  crossMarginAccounts: Array<CrossMarginAccount>;
  fundingPayment?: Maybe<FundingPayment>;
  fundingPayments: Array<FundingPayment>;
  fundingRateUpdate?: Maybe<FundingRateUpdate>;
  fundingRateUpdates: Array<FundingRateUpdate>;
  futuresAggregateStat?: Maybe<FuturesAggregateStat>;
  futuresAggregateStats: Array<FuturesAggregateStat>;
  futuresCumulativeStat?: Maybe<FuturesCumulativeStat>;
  futuresCumulativeStats: Array<FuturesCumulativeStat>;
  futuresMarginAccount?: Maybe<FuturesMarginAccount>;
  futuresMarginAccounts: Array<FuturesMarginAccount>;
  futuresMarginTransfer?: Maybe<FuturesMarginTransfer>;
  futuresMarginTransfers: Array<FuturesMarginTransfer>;
  futuresMarket?: Maybe<FuturesMarket>;
  futuresMarkets: Array<FuturesMarket>;
  futuresOrder?: Maybe<FuturesOrder>;
  futuresOrders: Array<FuturesOrder>;
  futuresPosition?: Maybe<FuturesPosition>;
  futuresPositions: Array<FuturesPosition>;
  futuresStat?: Maybe<FuturesStat>;
  futuresStats: Array<FuturesStat>;
  futuresTrade?: Maybe<FuturesTrade>;
  futuresTrades: Array<FuturesTrade>;
  smartMarginAccount?: Maybe<SmartMarginAccount>;
  smartMarginAccountTransfer?: Maybe<SmartMarginAccountTransfer>;
  smartMarginAccountTransfers: Array<SmartMarginAccountTransfer>;
  smartMarginAccounts: Array<SmartMarginAccount>;
  smartMarginOrder?: Maybe<SmartMarginOrder>;
  smartMarginOrders: Array<SmartMarginOrder>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionCrossMarginAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCrossMarginAccountTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCrossMarginAccountTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CrossMarginAccountTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CrossMarginAccountTransfer_Filter>;
};


export type SubscriptionCrossMarginAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CrossMarginAccount_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CrossMarginAccount_Filter>;
};


export type SubscriptionFundingPaymentArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFundingPaymentsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FundingPayment_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FundingPayment_Filter>;
};


export type SubscriptionFundingRateUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFundingRateUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FundingRateUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FundingRateUpdate_Filter>;
};


export type SubscriptionFuturesAggregateStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFuturesAggregateStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesAggregateStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesAggregateStat_Filter>;
};


export type SubscriptionFuturesCumulativeStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFuturesCumulativeStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesCumulativeStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesCumulativeStat_Filter>;
};


export type SubscriptionFuturesMarginAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFuturesMarginAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesMarginAccount_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesMarginAccount_Filter>;
};


export type SubscriptionFuturesMarginTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFuturesMarginTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesMarginTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesMarginTransfer_Filter>;
};


export type SubscriptionFuturesMarketArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFuturesMarketsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesMarket_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesMarket_Filter>;
};


export type SubscriptionFuturesOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFuturesOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesOrder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesOrder_Filter>;
};


export type SubscriptionFuturesPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFuturesPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesPosition_Filter>;
};


export type SubscriptionFuturesStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFuturesStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesStat_Filter>;
};


export type SubscriptionFuturesTradeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFuturesTradesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesTrade_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesTrade_Filter>;
};


export type SubscriptionSmartMarginAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSmartMarginAccountTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSmartMarginAccountTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SmartMarginAccountTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SmartMarginAccountTransfer_Filter>;
};


export type SubscriptionSmartMarginAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SmartMarginAccount_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SmartMarginAccount_Filter>;
};


export type SubscriptionSmartMarginOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSmartMarginOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SmartMarginOrder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SmartMarginOrder_Filter>;
};

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}
