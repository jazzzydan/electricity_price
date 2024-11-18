import DateSwitcher from "./DateSwitcher.svelte";
import {expect, test} from "vitest";
import {today, tomorrow} from "../../utilities/dates";
import {fireEvent, render} from "@testing-library/svelte";

test('initial date is today', () => {
    const {container} = render(DateSwitcher)

    expect(container.querySelector('input')!.value).toBe(today)
    expect(container.querySelectorAll('button')).to.have.length(2)
})

test('can switch to previous date', async () => {
    const {container} = render(DateSwitcher, {date: '2024-11-05'})
    await fireEvent.click(container.querySelector('button')!)

    expect(container.querySelector('input')!.value).toBe('2024-11-04')
})

test('can switch to previous month', async () => {
    const {container} = render(DateSwitcher, {date: '2024-11-01'})
    await fireEvent.click(container.querySelector('button')!)

    expect(container.querySelector('input')!.value).toBe('2024-10-31')
})

test('can switch to next month', async () => {
    const {container} = render(DateSwitcher, {date: '2024-10-30'})
    const buttons = container.querySelectorAll('button')

    await fireEvent.click(buttons[1])
    expect(container.querySelector('input')!.value).toBe('2024-10-31')

    await fireEvent.click(buttons[1])
    expect(container.querySelector('input')!.value).toBe('2024-11-01')
})

test('date after tomorrow is not selectable', async () => {
    const {container} = render(DateSwitcher, {date: tomorrow})
    const buttons = container.querySelectorAll('button')

    expect(buttons[1].disabled).toBe(true);
})

