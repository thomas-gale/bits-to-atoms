import { normalize } from "normalizr";
import { createFactory } from "./factories";
import { factorySchema } from "./schemas";
import { factoryReducer, setDisplayName } from "./slice";

const initialState = normalize(createFactory(), factorySchema);

describe('factory slice', () => {
    it('should return the initial state', () => {
        expect(factoryReducer(initialState, { type: {}})).toEqual(initialState)
    })

    it('can set display name', () => {
        const expectedState = {...initialState, result: {...initialState.result, id: 'test-display-name'} };
        expect(factoryReducer(initialState, setDisplayName('test-display-name'))).toEqual(expectedState)
    })
});