import fetch from 'cross-fetch'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
import { urls } from '../constants/urls'

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

export const SynthetixGraphClient = GraphClient(urls.SYNTHETIX_GRAPH_URL)
export const KwentGraphClient = GraphClient(urls.KWENTA_GRAPH_URL)
