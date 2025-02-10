import {atom} from "recoil";

export const userAtom = atom({
    key:"userState",
    default: JSON.parse(localStorage.getItem("user")) || null
})