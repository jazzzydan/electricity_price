import {describe, expect, it} from "vitest";
import {render} from "@testing-library/svelte";
import CalculatedOutput from "./CalculatedOutput.svelte";

describe('CalculatedOutput', () => {
    it('renders output if device is selected', () => {
        const {container} = render(CalculatedOutput)
        const span = container.querySelector('span')

        expect(span).toBeInTheDocument()
    })

    it('outputs selected device usage price', () => {
        const {container} = render(CalculatedOutput, {totalPrice: 0.5})
        const span = container.querySelector('span')

        expect(span).toHaveTextContent('0.50€')
    })
})