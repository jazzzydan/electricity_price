import {beforeEach, describe, expect, it, vi} from "vitest";
import ElectricityPrices from "../components/ElectricityPrices.svelte";
import {render, waitFor} from "@testing-library/svelte";

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
        const fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValueOnce({
            json: async () => testResponseData
        } as Response)

        const date = '2024-11-06';
        const countryCode = 'ee';

        // Render the component with the necessary props
        render(ElectricityPrices, { date, countryCode }); // Pass both date and countryCode to the component

        const start = new Date(date + 'T00:00');
        const end = new Date(date + 'T23:59');


        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalledWith(
                `https://dashboard.elering.ee/api/nps/price?start=${start.toISOString()}&end=${end.toISOString()}`
            );
        });

        const priceElements = screen.getAllByText(/price/i);
        expect(priceElements.length).toBeGreaterThan(0);

        const firstPriceElement = priceElements[0];
        expect(firstPriceElement).toHaveTextContent('74.83');
    });
});
