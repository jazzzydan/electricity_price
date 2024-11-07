import { render } from "@testing-library/svelte";
import {describe, test} from "vitest";
import Bar from "../components/Bar.svelte";

describe('Bar.svelte', () => {
    test('sets the correct height based on price', async () => {
        const {container} = render(Bar, {
            props: {

            }
        })
    }
})