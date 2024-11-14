import {describe, expect, it, vi} from "vitest";
import {changeLang, detectLang, t} from "./index";
import en from './en.json'

describe('i18n', () => {
    it('loads detected lang dictionary', () => {
        expect(t).to.deep.eq(en)
    })

    it('uses user-preferred browser language if supported', () => {
        vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US')
        const result = detectLang()
        expect(result).toEqual('en')
    })

    it('uses default language if user-preferred one is not supported', () => {
        vi.spyOn(navigator, 'language', 'get').mockReturnValue('fr-FR')
        const result = detectLang()
        expect(result).toEqual('en')
    })

    it('remembers changed language', async () => {
        vi.stubGlobal('location', {reload: vi.fn()})

        changeLang('fr');

        expect(localStorage['lang']).toBe('fr')
        expect(location.reload).toHaveBeenCalled()
    })

    it('uses locally stored language if supported', () => {
        vi.stubGlobal('location', {reload: vi.fn()})
        changeLang('et');

        const detectedLang = detectLang()

        expect(detectedLang).toEqual('et')
    })

    it('uses default language if locally stored language is not supported', () => {
        vi.stubGlobal('location', {reload: vi.fn()})
        changeLang('fr');

        const detectedLang = detectLang()

        expect(detectedLang).toEqual('en')
    })
})