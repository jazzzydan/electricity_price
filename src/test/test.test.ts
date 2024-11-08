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
    expect(container.querySelector('.y-axis-value')?.textContent).to.eq('123')
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