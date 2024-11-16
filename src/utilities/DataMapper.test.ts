import {describe, expect, it, test} from "vitest";
import {getCountries, getPriceByHour, getPriceDataForCountry} from "./dataMapper";
import type {ApiResponse, CountryCode, PricesByCountry} from "./apiClient";

describe('DataMapper', () => {
    //Arrange 1
    const testApiResponse: ApiResponse = {
        success: true,
        data: {
            ee: [
                {timestamp: 1730890800, price: 74.8300},
                {timestamp: 1730894400, price: 89.2300}
            ],
            lv: [
                {timestamp: 1730890800, price: 74.8300},
                {timestamp: 1730894400, price: 89.2300}
            ]
        } as PricesByCountry
    }

    it('getCountries() return list of countries', () => {
        //Act
        const countries = getCountries(testApiResponse)
        //Assert
        expect(countries).toEqual(['ee', 'lv'])
    })

    it('getPriceDataForCountry() returns pricePair with hour and price eur c/kWh', () => {
        //Arrange 2
        const countryCode = 'ee' as CountryCode
        //Act
        const pricePairs = getPriceDataForCountry(testApiResponse, countryCode)
        //Assert
        expect(pricePairs).toEqual([{"price": 7.48, "timestamp": 13}, {"price": 8.92, "timestamp": 14}])
    })

    it('returns price in EUR based on provided hour', () => {
        const countryCode = 'ee' as CountryCode
        const pricePairs = getPriceDataForCountry(testApiResponse, countryCode)
        const price = getPriceByHour(13, pricePairs)

        expect(price).toEqual(0.0748)
    })
})