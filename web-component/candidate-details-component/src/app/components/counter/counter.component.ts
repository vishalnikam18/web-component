/**
 * This component is specific to the main component
 * This is Hello World Component for boilerplate
 *
 * Use below selector to use web component in your application
 * @selector
 *
 * ```html
 * <amadeus-hos-res-wc-counter></amadeus-hos-res-wc-counter>
 * ```
 * @packageDocumentation
 * @module Counter-Component
 * @preferred
 */

import { LitElement, html, customElement, unsafeCSS, css, internalProperty } from 'lit-element';
import { AppConstants } from '../../constants/constants';

/**
 * @ignore
 */
declare const TCCommonService;
/**
 * @ignore
 */
declare const TCStyleService;
/**
 * @ignore
 */
const bootstrapCSS = TCStyleService.CssService.getBootstrapCss();

/**
 * This Component is used to detect boo now button click
 */
@customElement('amadeus-hos-res-wc-counter')
export class CounterComponent extends LitElement {
    @internalProperty() count: number;

    /**
     * Creates an instance of hello world component.
     */
    constructor() {
        super();
        this.count = 0;
    }

    /**
     * Lifecycle of Lit-element
     * @category LifeCycle
     */
    connectedCallback() {
        this.listenBookNowClickEvt();
        super.connectedCallback();
    }

    /**
     * Lifecycle of Lit-element
     * @category LifeCycle
     */
    disconnectedCallback() {
        TCCommonService.EventService.unsubscribe(AppConstants.events.EVT_BOOK_NOW_CLICK);
        super.disconnectedCallback();
    }

    /**
     * Listens book now click event
     */
    listenBookNowClickEvt() {
        if (TCCommonService) {
            TCCommonService.EventService.subscribe(AppConstants.events.EVT_BOOK_NOW_CLICK, () => {
                this.count++;
            });
        }
    }

    /**
     * Gets styles
     */
    static get styles() {
        return [
            css`
                ${unsafeCSS(bootstrapCSS)}
            `
        ];
    }

    /**
     * Lifecycle of Lit-element
     * Renders ibe HelloWorld component
     * @category LifeCycle
     * @returns TemplateResult
     */
    render() {
        return html`
            <div class="row">
                <div class="col">
                    <label class="count">Book Now Button Clicked : ${this.count}</label>
                </div>
            </div>
        `;
    }
}
