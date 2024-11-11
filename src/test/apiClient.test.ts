import {beforeEach, describe, expect, test, vi, it} from "vitest";
import {createEleringApiUrl, exportElectricityPrices} from "../utilities/apiClient";
import {act, render} from "@testing-library/svelte";
import Layout from "../components/Layout.svelte";
import {tick} from "svelte";

describe('ApiClient', async () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })
    const testApiResponse = {
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

    const date = '2024-11-06'
    const countryCode = 'ee';

    it('should create URL based on provided date', () => {
        //Arrange
        //Act
        const url = createEleringApiUrl(date)
        //Assert
        expect(url).equals('/api/nps/price?start=2024-11-05T22:00:00.000Z&end=2024-11-06T21:59:00.000Z')
    })

    it('should fetch data from external API and return ApiResponse', async () => {
        //Arrange
        const fetchSpy = vi.spyOn(window, 'fetch').mockReturnValue(Promise.resolve({
            json: () => Promise.resolve(testApiResponse)
        } as Response))
        //Act
        const result = await exportElectricityPrices(date)
        //Assert
        expect(fetchSpy).toHaveBeenCalledWith(
            '/api/nps/price?start=2024-11-05T22:00:00.000Z&end=2024-11-06T21:59:00.000Z'
        );
        expect(result).toEqual(testApiResponse)
    });
})


// test('fetches Elering price data and returns json data', async () => {
//     const mockResponse = {
//         data: {
//             key: 'value',
//         },
//     };
//     vi.spyOn(window, 'fetch').mockResolvedValue({ok: true, json: async () => mockResponse} as Response)
//
//     const date = '2024-11-06'
//     const result = await createEleringApiUrl(date)
//
//     expect(fetch).toHaveBeenCalledWith('/api/nps/price?start=2024-11-05T22:00:00.000Z&end=2024-11-06T21:59:00.000Z')
//     expect(result).toEqual(mockResponse.data)
// })

