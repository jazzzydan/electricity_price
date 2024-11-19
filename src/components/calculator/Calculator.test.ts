import {describe, expect, it} from "vitest";
import {getPriceDataForCountry} from "../../utilities/dataMapper";
import type {ApiResponse} from "../../utilities/apiClient";
import {render} from "@testing-library/svelte";
import Calculator from "./Calculator.svelte";
import {t} from "../../i18n";

describe('Calculator', () => {

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
    } as ApiResponse

    it('calculates electricity price based on price and selected time slot', () => {
        const priceDataForCountry = getPriceDataForCountry(testResponseData, 'ee')
        const startTime: number = 13
        const endTime: number = 14
        const powerKW: number = 10

        const {container} = render(Calculator, {
            priceDataForCountry,
            startTime,
            endTime,
            powerKW
        });

        expect(container.querySelector('.output')!.textContent).to.eq(t.priceForUsage + ' 0.05' + t.units.eur)
    })
})