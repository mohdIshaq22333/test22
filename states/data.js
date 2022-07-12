import { atom } from "recoil";

export const dataState = atom({
    key: "listStateAtom",
    default: {},
});

export const userState = atom({
    key: "userStateAtom",
    default: {},
});