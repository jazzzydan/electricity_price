import {beforeEach, describe, expect, it, vi} from "vitest";
import ElectricityPrices from "../components/ElectricityPrices.svelte";
import {act, render} from "@testing-library/svelte";
import {tick} from "svelte";


describe('ElectricityPrices', async () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

//TODO: use types
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

        // Act (state 1)
        const {container} = render(ElectricityPrices, {date, countryCode});

        expect(fetchSpy).toHaveBeenCalledWith(
            'https://dashboard.elering.ee/api/nps/price?start=2024-11-05T22:00:00.000Z&end=2024-11-06T21:59:00.000Z'
        );

        await act(() => fetchSpy) //svelte jargmine samm
        await tick()

        // assert that data was received/rendered
        expect(container.querySelectorAll('.bar')).to.have.length(2)
    });
});
