import {expect, test, vi } from "vitest";
import { fetchData } from "./apiClient";



test('fetches Elering price data and returns json data', async () => {
    const mockResponse = {
        data: {
            key: 'value',
        },
    };
    vi.spyOn(window, 'fetch').mockResolvedValue({ok: true, json: async () => mockResponse} as Response)

    const date = '2024-11-06'
    const result = await fetchData(date)

    expect(fetch).toHaveBeenCalledWith('/api/nps/price?start=2024-11-05T22:00:00.000Z&end=2024-11-06T21:59:00.000Z')
    expect(result).toEqual(mockResponse.data)
})