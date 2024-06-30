import { urls } from '../constants/urls'
import fetch from 'cross-fetch'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'

export function GraphClient(url: string) {
  return new ApolloClient({
    link: new HttpLink({
      uri: url,
      fetch,
    }),
    cache: new InMemoryCache({ resultCaching: false }),
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
      },
    },
  })
}

const apiKey = '7c28cdfa6115be9264c80038fa8154e2'; // Replace with your actual API key
const SYNTHETIX_GRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${apiKey}/subgraphs/id/82hQpNuzNB5i5xcFKhk6ZiKcacTWvPeovAkxrKsm8dfM`;

export const SynthetixGraphClient = GraphClient(SYNTHETIX_GRAPH_URL)
export const KwentGraphClient = GraphClient(urls.KWENTA_GRAPH_URL)