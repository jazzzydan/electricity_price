import langs from './langs.json';
import type en from './en.json'

export type Lang = typeof langs[number]

function navigatorLang(): Lang {
    const language = navigator.language.split('-')[0]
    return validateAndReturnLanguage(language)
}

function localStorageLang(): Lang {
    const language = localStorage['lang']
    return validateAndReturnLanguage(language)
}

function validateAndReturnLanguage(language: Lang): Lang {
    if (langs.indexOf(language) < 0) return langs[0]
    else return language
}

export function detectLang() {
    return localStorageLang() ?? navigatorLang() ?? langs[0]
}

export const lang = detectLang()

export function changeLang(lang: Lang) {
    localStorage['lang'] = lang
    location.reload()
}

export let t: typeof en = (await import('./' + lang + '.json')).default
