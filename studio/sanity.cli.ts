import { defineCliConfig } from "sanity/cli"

export default defineCliConfig({
  api: {
    projectId: "m06tm06z",
    dataset: "production",
  },

  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity
     */
    autoUpdates: true,

    appId: "u1wl893oo0elc1huynws5ozp",
  },
})