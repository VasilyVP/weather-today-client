import { initialState } from "../common/consts";

export type rootStateT = {
    authentication: {
        //auth: boolean,
        username: null | string
    },
    options: initialState.options;
}
