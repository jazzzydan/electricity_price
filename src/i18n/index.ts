import langs from './langs.json';
import type en from './en.json'

export function navigatorLang(): typeof langs[number] {
    const language = navigator.language.split('-')[0]
    if (langs.indexOf(language) < 0) return langs[0]
    return language as typeof langs[number]
}

export const lang = localStorage['lang'] ?? navigatorLang() ?? langs[0]

export function changeLang(lang: typeof langs[number]){
    localStorage['lang'] = lang
    location.reload()
}

export let t: typeof en = await import('./' + lang + '.json')