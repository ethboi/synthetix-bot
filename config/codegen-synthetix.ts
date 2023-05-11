import { CodegenConfig } from '@graphql-codegen/cli'
import { urls } from '../src/constants/urls'

const config: CodegenConfig = {
  schema: urls.SYNTHETIX_GRAPH_URL,
  generates: {
    './src/synthetix/__generated__/': {
      preset: 'client',
      plugins: [],
      config: {
        scalars: {
          Bytes: 'string',
          BigInt: 'string',
          BigDecimal: 'string',
        },
      },
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
