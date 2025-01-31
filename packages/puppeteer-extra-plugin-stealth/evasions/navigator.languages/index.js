'use strict'

const { PuppeteerExtraPlugin } = require('puppeteer-extra-plugin')

/**
 * Pass the Languages Test.
 *
 * @param {Object} [opts] - Options
 * @param {Array<string>} [opts.languages] - The user agent to use (default: `['en-US', 'en']`)
 */
class Plugin extends PuppeteerExtraPlugin {
  constructor(opts = {}) {
    super(opts)
  }

  get name() {
    return 'stealth/evasions/navigator.languages'
  }

  async onPageCreated(page) {
    await page.evaluateOnNewDocument(opts => {
      // Overwrite the `languages` property to use a custom getter.
      Object.defineProperty(navigator, 'languages', {
        get: () => opts.languages || ['en-US', 'en']
      })
    }, this.opts)
  }
}

module.exports = function(pluginConfig) {
  return new Plugin(pluginConfig)
}
