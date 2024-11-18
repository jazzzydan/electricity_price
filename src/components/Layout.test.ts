import {beforeEach, describe, expect, it, vi} from "vitest";
import Layout from "./Layout.svelte";
import {act, render} from "@testing-library/svelte";
import {tick} from "svelte";

describe('ElectricityPrices', async () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    const testResponseData = {
        success: true,
        data: {
            'ee': [
                {timestamp: 1730890800, price: 74.8300},
                {timestamp: 1730894400, price: 89.2300},
            ],
            'lv': [
                {timestamp: 1730890800, price: 74.8300},
                {timestamp: 1730894400, price: 89.2300},
            ]
        }
    }

    it('should fetch data from external API and pass it as a prop to the component', async () => {
        const fetchSpy = vi.spyOn(window, 'fetch').mockReturnValue(Promise.resolve({
            json: () => Promise.resolve(testResponseData)
        } as Response))
        const date = '2024-11-06';
        const countryCode = 'ee';

        const {container} = render(Layout, {date, countryCode});
        await act(() => fetchSpy)
        await tick()
        await tick()

        expect(container.querySelectorAll('.bar')).to.have.length(2)
    });
});