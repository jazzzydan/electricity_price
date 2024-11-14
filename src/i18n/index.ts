import langs from './langs.json';
import type en from './en.json'

export type Lang = typeof langs[number]

function navigatorLang(): Lang {
    const language = navigator.language.split('-')[0]
    if (langs.indexOf(language) < 0) return langs[0]
    return language as typeof langs[number]
}

export function detectLang() {
    // TODO: ensure stored lang is also supported
    return localStorage['lang'] ?? navigatorLang() ?? langs[0]
}

export const lang = detectLang()

export function changeLang(lang: Lang) {
    localStorage['lang'] = lang
    location.reload()
}

export let t: typeof en = (await import('./' + lang + '.json')).default
