import { Client } from "discord.js";

export async function SetUpDiscord(discordClient: Client) {
  discordClient.on("ready", async (client) => {
    console.debug(`Discord bot is online!`);
  });
}
