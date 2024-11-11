import {expect, test, vi} from "vitest";
import Line from "../components/Line.svelte";
import {fireEvent, render} from "@testing-library/svelte";

test('test function', () => {
    // Arrange (sisendi või keskkonna ettevalmistus)
    vi.spyOn(window, 'alert').mockReturnValue()

    // Act (väljakutse)
    handleError('Kaboom!')

    // Assert (tulemuste kontrollimine)
    expect(alert).toHaveBeenCalledWith('Error: Kaboom!')
})

test('test component', () => {
    // Act (väljakutse)
    const {container} = render(Line, {yAxisValue: 123})

    console.log(container.innerHTML)

    // Assert (tulemuste kontrollimine)
    expect(container.querySelector('.y-axis-value')?.textContent).to.eq('123 c/kWh')
})

test('test component with user actions', async () => {
    // Arrange
    const {container} = render(Line, {yAxisValue: 123})

    // Act
    await fireEvent.click(container.querySelector('.y-axis-value')!)

    // Assert
    expect('Mingi element on muutunud')
})

// jsdom (browser emulator based on node)


function handleError(reason: string) {
    alert('Error: ' + reason)
}

// import {beforeEach, describe, expect, it, vi} from "vitest";
// import Layout from "../components/Layout.svelte";
// import {act, render} from "@testing-library/svelte";
// import {tick} from "svelte";
//
// // Act (väljakutse)
// describe('ElectricityPrices', async () => {
//     beforeEach(() => {
//         vi.clearAllMocks()
//     })
//
// //TODO: use types
//     const testResponseData = {
//         success: true,
//         data: {
//             'ee': [
//                 {timestamp: 1730890800, price: 74.8300},
//                 {timestamp: 1730894400, price: 89.2300},
//             ],
//             'lv': [
//                 {timestamp: 1730890800, price: 74.8300},
//                 {timestamp: 1730894400, price: 89.2300},
//             ]
//         }
//     }
//
//     it('should fetch data from external API and pass it as a prop to the component', async () => {
//         const fetchSpy = vi.spyOn(window, 'fetch').mockReturnValue(Promise.resolve({
//             json: () => Promise.resolve(testResponseData)
//         } as Response))
//
//         const date = '2024-11-06';
//         const countryCode = 'ee';
//
//         // Act (state 1)
//         const {container} = render(Layout, {date, countryCode});
//
//         expect(fetchSpy).toHaveBeenCalledWith(
//             '/api/nps/price?start=2024-11-05T22:00:00.000Z&end=2024-11-06T21:59:00.000Z'
//         );
//
//         await act(() => fetchSpy)
//         await tick()
//
//         // assert that data was received/rendered
//         expect(container.querySelectorAll('.bar')).to.have.length(2)
//     });
// });