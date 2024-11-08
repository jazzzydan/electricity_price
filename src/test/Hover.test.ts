import {describe, expect, test} from "vitest";
import {render} from "@testing-library/svelte";
import HoverInfo from "../components/HoverInfo.svelte";



describe('HoverInfo.svelte', () => {
    test('Hover info is rendered', () => {
        //Arrange + Act
        const {container} = render(HoverInfo, {
            price: 10,
            x: 10,
            y: 10
        } )
        const div = container.querySelector('.hover-info')

        //Assert
        expect(div).toBeInTheDocument()
        expect(div).toHaveTextContent('10.00€ cent per kWh');
    })
})
