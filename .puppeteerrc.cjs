// Puppeteer config for OpenWA.
//
// OpenWA statically imports whatsapp-web.js (which pulls in puppeteer) even when
// ENGINE_TYPE=baileys, so puppeteer's config resolver runs at process startup —
// before NestJS loads .env, so an env var in .env would be too late to help.
//
// Without a project-level config, puppeteer's cosmiconfig "global" search strategy
// falls through to $HOME/.config/puppeteer. When the app runs as a non-root user
// (e.g. `www`) that inherited HOME=/root, it can't stat /root/.config (mode 0700)
// and crashes at boot with: EACCES: stat '/root/.config/puppeteer'.
//
// Having this file at the project root short-circuits that search (cosmiconfig finds
// it at the cwd and never reaches the home dir). We also skip the Chromium download
// and keep any puppeteer cache inside the project tree, since the Baileys engine
// never launches a browser.
//
// NOTE: skipDownload:true means there is no bundled Chromium. Only set ENGINE_TYPE
// back to whatsapp-web.js if you also provide PUPPETEER_EXECUTABLE_PATH to a system
// Chrome/Chromium binary.
const { join } = require('path');

module.exports = {
  skipDownload: true,
  cacheDirectory: join(__dirname, 'data', '.puppeteer-cache'),
};
