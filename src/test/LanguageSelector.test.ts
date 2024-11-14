import {describe, expect, test, vi} from "vitest"
import {fireEvent, render} from "@testing-library/svelte";
import LanguageSelector from "../components/LanguageSelector.svelte";
import {changeLang, t} from "../i18n";
import {tick} from "svelte";

describe('LanguageSelector.svelte', () => {
    test('language selector renders the option to choose language', () => {
        //Arrange  //Act
        const {getAllByRole} = render(LanguageSelector)
        const languages = getAllByRole('option') as HTMLOptionElement[]
        //Assert
        expect(languages).toHaveLength(Object.keys(t.languages).length)
    })


    test('language selector is present and has default language', () => {
        //Arrange//Act
        const {getByRole} = render(LanguageSelector)
        const select = (getByRole('combobox') as HTMLSelectElement)
        //Assert
        expect(select).toBeInTheDocument()
        expect(select.value).toEqual('en')
    })
    test('language selector changes page title language', async () =>{
        vi.mock('../i18n', async () => {
            const actual = await vi.importActual('../i18n')
            return {...actual, changeLang: vi.fn()}
        });
        const {getByRole} = render(LanguageSelector)
        const select = (getByRole('combobox') as HTMLSelectElement)
        const secondOption = (select.querySelector('option[value="et"]')as HTMLOptionElement)

        await fireEvent.change(select,{target:{value:secondOption.value}})
        await tick()

        expect((select as HTMLSelectElement).value).toEqual('et')
        expect(changeLang).toBeCalledWith("et")

    })





})