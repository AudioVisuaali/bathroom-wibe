import { ConfigHUE, createConfigHUE } from "./configHUE";

export type Config = {
  hue: ConfigHUE;
};

export function createConfig(): Config {
  return {
    hue: createConfigHUE(),
  };
}
