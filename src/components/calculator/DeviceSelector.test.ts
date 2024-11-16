import {describe, expect, it} from "vitest";
import {render} from "@testing-library/svelte";
import DeviceSelector from "./DeviceSelector.svelte";
import { t } from "../../i18n";

describe('DeviceSelector', () => {
    it('chooses the first device by default',() => {
        const {container} = render(DeviceSelector)
        const select = container.querySelector('select')

        expect(select).toBeInTheDocument()
        expect(select!.value).to.eq(Object.keys(t.devices)[0])
        expect(select!.options).toHaveLength(Object.keys(t.devices).length)
    })
})