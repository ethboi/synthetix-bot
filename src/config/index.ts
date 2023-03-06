import * as dotenv from "dotenv";
import * as _ from "lodash";
import { convertToBoolean } from "../utils/utils";

dotenv.config({ path: ".env" });

export const DISCORD_ACCESS_TOKEN = _.defaultTo(
  process.env.DISCORD_ACCESS_TOKEN,
  ""
);

export const ALCHEMY_ID = _.defaultTo(process.env.ALCHEMY_ID, "");

export const TWITTER_ENABLED: boolean = _.defaultTo(
  convertToBoolean(process.env.TWITTER_ENABLED as string),
  false
) as boolean;

export const TELEGRAM_ENABLED: boolean = _.defaultTo(
  convertToBoolean(process.env.TELEGRAM_ENABLED as string),
  true
) as boolean;

export const DISCORD_ENABLED: boolean = _.defaultTo(
  convertToBoolean(process.env.DISCORD_ENABLED as string),
  true
) as boolean;
