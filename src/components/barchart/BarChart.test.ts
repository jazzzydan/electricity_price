import {describe, expect, it} from "vitest";
import type {ApiResponse, PricePair} from "../../utilities/apiClient";
import {render} from "@testing-library/svelte";
import BarChart from "./BarChart.svelte";
import {getPriceDataForCountry} from "../../utilities/dataMapper";

describe('BarChart', () => {
    let testResponseData = {
        success: true,
        data: {
            'ee': [] as PricePair[]
        }
    } as ApiResponse

    for (let i = 0; i < 25; i++) {
        testResponseData.data.ee.push({
            timestamp: i + 1730890800,
            price: i + 74.8300
        } as PricePair)
    }

    it('should render the chart with 25 bars on the night of time switch form summer to winter time', async () => {
        const priceDataForCountry = getPriceDataForCountry(testResponseData, 'ee')
        const isToday = false

        const {container} = render(BarChart, {priceDataForCountry, isToday})

        expect(container.querySelectorAll('.bar')).to.have.length(25)
    })
})