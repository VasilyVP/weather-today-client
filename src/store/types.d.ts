import { initialState } from "../common/consts";

export type rootStateT = {
    authentication: {
        //auth: boolean,
        userName: null | string
    },
    options: initialState.options;
}
