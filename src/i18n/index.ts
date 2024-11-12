import langs from '../i18n/langs.json';
import type en from '../i18n/en.json'

export {langs}
export const lang = Object.keys(langs)[0]
export let t: typeof en = await import('../i18n/' + lang + '.json')
