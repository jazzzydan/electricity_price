import {describe, expect, test} from "vitest";
import {render} from "@testing-library/svelte";
import HoverInfo from "./HoverInfo.svelte";
import {t} from "../../i18n";

describe('HoverInfo.svelte', () => {
    test('Hover info is rendered', () => {
        const {container} = render(HoverInfo, {
            price: 10,
            x: 10,
            y: 10
        } )

        const div = container.querySelector('.hover-info')

        expect(div).toBeInTheDocument()
        expect(div).toHaveTextContent('10.00 ' + t.units.cents + '/' + t.units.kWh);
    })
})
