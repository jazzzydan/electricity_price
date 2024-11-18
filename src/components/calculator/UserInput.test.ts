import {describe, expect, it} from "vitest";
import {render} from "@testing-library/svelte";
import UserInput from "./UserInput.svelte";

describe('UserInput', () => {
    it('displays selected devices power in watts and allows to change power', () => {
        const {container} = render(UserInput, {value: 4, maxValue: 100, unit: ''})
        const inputElement = container.querySelector('input')

        expect(inputElement?.value).toBe('4')
    })
})