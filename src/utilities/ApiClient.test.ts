import {beforeEach, describe, expect, test, vi, it} from "vitest";
import {
    type ApiResponse,
    createEleringApiUrl,
    exportElectricityPrices,
    type PricesByCountry
} from "./apiClient";

describe('ApiClient', async () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })
    const testApiResponse: ApiResponse = {
        success: true,
        data: {
            ee: [
                {timestamp: 1730890800, price: 74.8300},
                {timestamp: 1730894400, price: 89.2300},
            ],
            lv: [
                {timestamp: 1730890800, price: 74.8300},
                {timestamp: 1730894400, price: 89.2300},
            ]
        } as PricesByCountry
    }
    const date = '2024-11-06'

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

