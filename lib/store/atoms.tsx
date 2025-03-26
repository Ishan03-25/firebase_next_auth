"use client"

import { atom } from "recoil";

export const IsLoginDialogActiveAtom = atom<boolean>({
    key: "IsLoginDialogState",
    default: true
});

