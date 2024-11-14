import {describe, expect, it} from "vitest";
import {render} from "@testing-library/svelte";
import DeviceSelector from "./DeviceSelector.svelte";
import { t } from "../../i18n";

describe('DeviceSelector', () => {
    it('renders the option to choose device',()=>{
        const {container} = render(DeviceSelector)
        const select = container.querySelector('select')

        expect(select).toBeInTheDocument()
    })

    it('renders select element with list of devices', () => {
        const {getAllByRole} = render(DeviceSelector)
        const devices = getAllByRole('option') as HTMLOptionElement[]

        expect(devices).toHaveLength(Object.keys(t.devices).length)
    })
})