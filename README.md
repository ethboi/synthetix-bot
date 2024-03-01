# SYNTHETIX FUTURES Bot 🤖

A bot providing real time futures market info via discord. :> :0

Run locally:

```
yarn install
yarn dev
```

PROD Build:

```
yarn install
yarn build
yarn start
```

### Environment Variables !

- `TESTNET` - true/false (if true prints to console, doesn't post)
- `ALCHEMY_ID` - Alchemy RPC Optimism.
- `FRONTEND` - set theming synthetix/kwenta

### Integrations

#### Discord

- `DISCORD_ENABLED` - enable/disable posting to discord
- `DISCORD_ACCESS_TOKEN` - bot access token.
- `DISCORD_CHANNEL` - channel name the bot should post to
