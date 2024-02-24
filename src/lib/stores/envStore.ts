import { browser } from "$app/environment";
import { readable } from "svelte/store";

const getDebugMode = (): boolean => {
    return browser && import.meta.env.VITE_PUBLIC_DEBUG === "true";
};

const isDebug = getDebugMode();

export const envStore = readable({
    debug: isDebug
});
