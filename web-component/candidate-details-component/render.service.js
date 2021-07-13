/**
 * Enables render
 */
export const enableRender = () => {
    window.storybookService = {
        enableRender: true,
    };
};

/**
 * Disables render
 */
export const disableRender = () => {
    window.storybookService = {
        enableRender: false,
    };
};
