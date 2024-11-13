import langs from './langs.json';
import type en from './en.json'

const navigatorLang = navigator.language.split('-')[0]

export const lang = localStorage['lang'] ?? navigatorLang ?? langs[0]

export function changeLang(lang: typeof langs[number]){
    localStorage['lang'] = lang
    location.reload()
}
export let t: typeof en = await import('./' + lang + '.json')
