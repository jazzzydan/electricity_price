import {render} from "@testing-library/svelte";
import {describe, expect, test} from "vitest";
import Bar from "../components/Bar.svelte";

describe('Bar.svelte', () => {
    test('bar is rendered', () => {
        //Arrange + Act
        const {container} = render(Bar, {
            price: 10,
            hoverPrice: 10

        })
        const bar = container.querySelector('.bar')

        //Assert
        expect(bar).toBeInTheDocument()
    })
    test('bar price value is correct', () => {
        //Arrange + act
        const {container} = render(Bar, {
            price: -10,
            hoverPrice: 10

        })
        const bar = container.querySelector('.bar')
        const computedStyle = getComputedStyle(bar!);

        //Assert
        expect(computedStyle.transform).toBe('scaleY(-10) scaleX(1)');
    })
})
