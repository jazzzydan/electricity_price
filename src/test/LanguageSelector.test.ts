import {describe, expect, it, vi} from "vitest"
import {fireEvent, render} from "@testing-library/svelte";
import LanguageSelector from "../components/LanguageSelector.svelte";
import {changeLang, t} from "../i18n";
import langs from '../i18n/langs.json'
import {tick} from "svelte";

describe('LanguageSelector', () => {
    it('language selector renders the option to choose language', () => {
        //Arrange  //Act
        const {getAllByRole} = render(LanguageSelector)
        const languages = getAllByRole('option') as HTMLOptionElement[]
        //Assert
        expect(languages).toHaveLength(Object.keys(t.languages).length)
    })

    it('language selector is present and has default language', () => {
        //Arrange//Act
        const {container} = render(LanguageSelector)
        const select = container.querySelector('select')
        //Assert
        expect(select).toBeInTheDocument()
        expect(select!.value).toEqual('en')
    })

    it('language selector activates language change', async () => {
        vi.mock('../i18n', async () => {
            const actual = await vi.importActual('../i18n')
            return {...actual, changeLang: vi.fn()}
        });
        const {getByRole} = render(LanguageSelector)
        const select = getByRole('combobox') as HTMLSelectElement

        select.selectedIndex = 1
        await fireEvent.change(select)
        await tick()

        expect(select.value).toEqual(langs[1])
        expect(changeLang).toBeCalledWith(langs[1])
    })
})