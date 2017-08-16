export const SHOW_SETTINGS = 'show-settings';

export function showSettings(displayed = true) {
    return {
        type: SHOW_SETTINGS,
        displayed: displayed
    }
}