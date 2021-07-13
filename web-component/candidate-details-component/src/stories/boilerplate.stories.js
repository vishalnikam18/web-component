import { text, withKnobs, button, select } from '@storybook/addon-knobs';
import { withXD } from 'storybook-addon-xd-designs'
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { forceReRender } from '@storybook/html';
import { disableRender, enableRender } from '../../render.service';

export default {
    title: 'Boilerplate',
    decorators: [withKnobs, withXD, withA11y]
};

/**
 * enable renders to global variable
 * force render of stories
 */
const handler = () => {
    enableRender();
    forceReRender();
};

// EVT_BOOK_NOW_CLICK

function attachListener() {
    TCCommonService.EventService.subscribe('EVT_BOOK_NOW_CLICK', action('EVT_BOOK_NOW_CLICK'));
}
attachListener();
export const HelloWorld = () =>{
    disableRender();

    button('Submit', handler);

    const options = {
        'Template-2': 'template-2',
        'Template-1': 'template-1',
    };
    const variation = select('variation', options, 'template-1');
    return `
    <amadeus-hos-res-wc-hello-world  templateId=${variation}></amadeus-hos-res-wc-hello-world>`

}
// Add xd design
// HelloWorld.story = {
//     parameters: {
//         design: [
//             {
//                 artboardUrl:'https://xd.adobe.com/view/9584c86e-df1a-45e8-4307-b0095a9152f1-e3b5/screen/4297ad1c-1d85-4317-84cb-ca583a96b2f5/1-BED-Search-single-18/'
//             }
//         ]
//     }
// }

