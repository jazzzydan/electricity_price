import {render} from "@testing-library/svelte";
import {describe, expect, test} from "vitest";
import Bar from "./Bar.svelte";

describe('Bar.svelte', () => {
    test('bar is rendered', () => {
        const {container} = render(Bar, {
            price: 10,
            hoverPrice: 10,
            hour: 10,
            isToday: true
        })
        const bar = container.querySelector('.bar')

        expect(bar).toBeInTheDocument()
    })

    test('bar price value is correct', () => {
        const {container} = render(Bar, {
            price: -10,
            hoverPrice: -10,
            hour: 10,
            isToday: true
        })
        const bar = container.querySelector('.bar')
        const computedStyle = getComputedStyle(bar!)

        expect(computedStyle.transform).toBe('scaleY(-10) scaleX(1)')
    })
})
