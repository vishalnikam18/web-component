/**
 * Directive can be shared in future
 * DO NOT MAKE ANY CHANGES IN THIS FILE
 */

import { directive, EventPart } from 'lit-html';
import { KEYBOARD_CODES_ENUM } from '../../hello-world.constants';

const partStateReference = new WeakMap();

/**
 * Directive for handling accessibility focus
 * On element focus, we add class amadeus-hos-res-cn-add-accessibility-focus to show focus border
 * On element blur, we remove the class amadeus-hos-res-cn-add-accessibility-focus to remove the focus border
 * On element mousedown, we remove the class amadeus-hos-res-cn-add-accessibility-focus to remove the focus border
 * On element keydown (Enter or Space), we execute the provided callback function
 */
export const AccessibilityDirective = directive(
    (callbackFunction = null, ...params) => (part: EventPart) => {

        if (partStateReference.get(part)) {
            return;
        }

        let isClicked = false;

        if (callbackFunction) {
            part.element.addEventListener('keydown', (event: any) => {
                if (event.which === KEYBOARD_CODES_ENUM.ENTER || event.keyCode === KEYBOARD_CODES_ENUM.ENTER ||
                    event.which === KEYBOARD_CODES_ENUM.SPACE || event.keyCode === KEYBOARD_CODES_ENUM.SPACE) {
                    callbackFunction.call(part.eventContext, ...params);
                    if (event.which === KEYBOARD_CODES_ENUM.SPACE || event.keyCode === KEYBOARD_CODES_ENUM.SPACE) {
                        event.preventDefault();
                    }
                }
            });
        }

        part.element.addEventListener('focus', () => {
            setTimeout(() => {
                if (isClicked === false) {
                    part.element.classList.add('amadeus-hos-res-cn-add-accessibility-focus');
                }
                isClicked = false;
            });
        });

        part.element.addEventListener('blur', () => {
            part.element.classList.remove('amadeus-hos-res-cn-add-accessibility-focus');
            isClicked = false;
        });

        part.element.addEventListener('mousedown', () => {
            part.element.classList.remove('amadeus-hos-res-cn-add-accessibility-focus');
            isClicked = true;
        });

        partStateReference.set(part, part);
    }
);
