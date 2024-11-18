import {describe, expect, test} from "vitest";
import {render} from "@testing-library/svelte";
import Line from "./Line.svelte";

describe('Line.svelte',() => {
    test('line tag is rendered',()=>{
        const {container} = render(Line, {yAxisValue: 123})

        expect(container.querySelector('.y-axis-value')?.textContent).to.eq('123.0 c/kWh')
    })
    test('line is rendered',()=>{
        const {container} = render(Line, {yAxisValue: 1})
        const dashedLine = container.querySelector('.dashed-line')

        expect(dashedLine).toBeInTheDocument()

    })

})