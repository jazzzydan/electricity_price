import {fireEvent, render} from "@testing-library/svelte";
import CountrySelector from "./CountrySelector.svelte";
import {expect, test} from "vitest";


test('renders no countries when listOfCountries is empty', () => {
    const {container} = render(CountrySelector)
    const radioButtons = container.querySelectorAll('input[type="radio"]')
    expect(radioButtons.length).toBe(0)
})

test('initial country is ee when listOfCountries is populated', () => {
    const {container} = render(CountrySelector, {
        listOfCountries: ['ee', 'lv', 'lt', 'fi'],
        countryCode: 'ee'
    });
    expect(container.querySelector('input')!.value).toEqual('ee')
});

test('selected country value is correct', async () => {
    const {container} = render(CountrySelector, {
        listOfCountries: ['ee', 'lv', 'lt', 'fi'],
        countryCode: 'ee'
    });
    const inputs = container.querySelectorAll('input')
    await fireEvent.click(inputs[1])
    expect(inputs[1].checked).toBe(true)
    const selectedRadioButton = container.querySelector('input[type="radio"]:checked') as HTMLInputElement;
    expect(selectedRadioButton.value).toEqual('lv');
});

