import * as io from "io-ts";

const configJson = require("./config.json");

export const Config = io.type({
  billboardAddress: io.string,
});

export type Config = io.TypeOf<typeof Config>;

export default function loadConfig(): Config {
  const decodeResult = Config.decode(configJson);

  if ("left" in decodeResult) {
    throw new Error("Config decode failure");
  }

  return decodeResult.right;
}
