import {describe, expect, test} from "vitest";
import {render} from "@testing-library/svelte";
import Line from "./Line.svelte";

describe('Line.svelte',() => {
    test('line tag is rendered',()=>{

        // Act (väljakutse)
        const {container} = render(Line, {yAxisValue: 123})

        // Assert (tulemuste kontrollimine)
        expect(container.querySelector('.y-axis-value')?.textContent).to.eq('123 c/kWh')

    })
    test('line is rendered',()=>{

        //Act
        const {container} = render(Line, {yAxisValue: 1})
        const dashedLine = container.querySelector('.dashed-line')
        //Assert
        expect(dashedLine).toBeInTheDocument()

    })

})