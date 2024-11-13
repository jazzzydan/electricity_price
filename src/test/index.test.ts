import {beforeEach, describe, expect, it, vi} from "vitest";
import {navigatorLang} from "../i18n/";

describe('index', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return navigator.language if it is present in languages list', () =>{
        // Arrange
        vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US')
        // Act
        const result = navigatorLang()
        // Assert
        expect(result).toEqual('en')
    })

    it('should return default language if navigator.language is not present in languages list', () =>{
        // Arrange
        vi.spyOn(navigator, 'language', 'get').mockReturnValue('fr-FR')
        // Act
        const result = navigatorLang()
        // Assert
        expect(result).toEqual('en')
    })

})