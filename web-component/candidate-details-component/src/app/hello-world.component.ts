/**
 *
 * This is Hello World Component for boilerplate
 *
 * Use below selector to use web component in your application
 * @selector
 *
 * ```html
 * <amadeus-hos-res-wc-hello-world></amadeus-hos-res-wc-hello-world>
 * ```
 * @packageDocumentation
 * @module Hello-World-Component
 * @preferred
 */

import { LitElement, html, customElement, unsafeCSS, css, property, PropertyValues } from 'lit-element';
import { until } from 'lit-html/directives/until.js';
import { AppConstants } from '../app/constants/constants';
import { HelloWorldService } from './services/hello-world/hello-world.service';

/**
 * @ignore
 */
declare const TCStyleService;
/**
 * @ignore
 */
const bootstrapCSS = TCStyleService.CssService.getBootstrapCss();
/**
 * @ignore
 */
const helloWorldStyle = require('./hello-world.component.scss');
/**
 * @ignore
 */
const stockTemplateStyle = require('./templates/stock/stock.template.scss');
/**
 * @ignore
 */
declare const TCCommonService;
/**
 * @ignore
 */
const eventService = TCCommonService.EventService;

/**
 * This is how you can link other classes and services
 * This Component uses [[HelloWorld]] as service class.
 */
@customElement('amadeus-hos-res-wc-hello-world')
export class HelloWorldComponent extends LitElement {
    /**
     * Property  of HelloWorld component
     *
     * Define attribute in Host as below
     * ```html
     * <amadeus-hos-res-wc-hello-world templateId="variation-1"></amadeus-hos-res-wc-hello-world>
     * ```
     * or define attribute as
     * ```typescript
     * element.setAttribute('templateId','variation-1');
     * ```
     * @required
     */
    @property({ type: String }) templateId: string;

    /**
     * Property  of hello world component
     * @optional
     */
    @property({ type: String }) bookNowText: string;

    /**
     * Creates an instance of hello world component.
     */
    constructor() {
        super();
        this.bookNowText = 'Book';
    }

    /**
     * Lifecycle of Lit-element
     * @category LifeCycle
     */
    firstUpdated(changedProperties: PropertyValues) {
        if (changedProperties.has('templateId')) {
            console.log('property "templateId" updated in firstUpdated lifecycle with value ::', this.templateId);
        }
        this.getHotelData();
    }

    /**
     * Lifecycle of Lit-element
     * @category LifeCycle
     */
    updated(changedProperties: PropertyValues) {
        if (changedProperties.has('bookNowText')) {
            console.log('property "bookNowText" updated in updated lifecycle with value ::', this.bookNowText);
            console.log('This lifecycle executes every time property updates');
        }
    }
    async getHotelData() {
        const data = await HelloWorldService.getJsonData();
        console.log('Valid Data ? ' + data);
    }

    /**
     * Gets styles
     */
    static get styles() {
        return [
            css`
                ${unsafeCSS(bootstrapCSS)}
            `,
            css`
                ${unsafeCSS(helloWorldStyle)}
            `,
            css`
                ${unsafeCSS(stockTemplateStyle)}
            `,
        ];
    }

    /**
     * This function loads variation
     * @param templateId
     * @returns
     */
    async loadVariation(templateId) {
        let variation;
        switch (templateId) {
            case 'template-1':
                variation = await import('./templates/stock/stock.template');
                variation = variation.stockTemplate.bind(this)();
                break;
            case 'template-2':
                variation = await import('./templates/styled/styled.template');
                variation = variation.styledTemplate.bind(this)();
                break;
            default:
                variation = await import('./templates/stock/stock.template');
                variation = variation.stockTemplate.bind(this)();
        }
        return variation;
    }


    /**
     * Clicks handler for column One
     */
    clickHandlerForColumn() {
        console.log('tab One clicked');
    }

    /**
     * Clicks handler for book now button
     * fires 'EVT_BOOK_NOW_CLICK' event on click of Book Now button
     * @event EVT_BOOK_NOW_CLICK
     */
    clickHandler() {
        const data = {
            msg: 'Book Now button clicked',
        };
        // you can also pass channel and identifier in 4th and 5th parameter respectively
        eventService.broadcast(this, AppConstants.events.EVT_BOOK_NOW_CLICK, data);
    }

    /**
     * Lifecycle of Lit-element
     * Renders ibe HelloWorld component
     * @category LifeCycle
     * @returns TemplateResult
     */
    render() {
        return html`
            ${this.templateId
                ? html`
                      <!-- Second parameter of until is optional -->
                      <div class="amadeus-hos-res-cn-hello-world-wrapper">
                          ${until(this.loadVariation(this.templateId))}
                      </div>
                  `
                : html``}
        `;
    }
}
