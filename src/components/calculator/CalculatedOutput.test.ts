import {describe, expect, it} from "vitest";
import {render} from "@testing-library/svelte";
import CalculatedOutput from "./CalculatedOutput.svelte";
import {t} from "../../i18n";

describe('CalculatedOutput', () => {
    it('renders output if device is selected', () => {
        const {container} = render(CalculatedOutput)
        const span = container.querySelector('span')

        expect(span).toBeInTheDocument()
    })

    it('outputs selected device id',()=>{
        const {container}= render(CalculatedOutput)
        const span = container.querySelector('span')

        expect(span).toHaveTextContent('Rock Hammer')



    })
})