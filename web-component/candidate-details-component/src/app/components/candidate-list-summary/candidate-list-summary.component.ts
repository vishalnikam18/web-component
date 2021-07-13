/**
 *
 * This is Summary Component for boilerplate
 *
 * Use below selector to use web component in your application
 * @selector
 *
 * ```html
 * <amadeus-hos-res-candidate-list-summary></amadeus-hos-res-candidate-list-summary>
 * ```
 * @packageDocumentation
 * @module Interview-summary-Component
 * @preferred
 */
import { LitElement, html, css, customElement, internalProperty, unsafeCSS, property, PropertyValues } from 'lit-element';
import { ICandidate } from '../../interfaces';
import { until } from 'lit-html/directives/until.js';
/**
 * @ignore
 */
declare const TCStyleService;
/**
 * @ignore
 */

const bootstrapCSS = TCStyleService.CssService.getBootstrapCss();

const candidateListSummaryStyle = require('./candidate-list-summary.component.scss');

@customElement('amadeus-hos-res-candidate-list-summary')
export class CandidateListSummaryComponent extends LitElement {
    /**
    * Property  of InterviewSummary component
    *
    * Define attribute in Host as below
    * ```html
    * <amadeus-hos-res-candidate-list-summary candidateListSummary="candidateList"></amadeus-hos-res-candidate-list-summary>
    * ```
    * or define attribute as
    * ```typescript
    * element.setAttribute('candidateListSummary','candidateList');
    * ```
    * @required
    */
    @property({ type: Array }) candidateListSummary: ICandidate[];


        /**
    * Property  of InterviewSummary component
    *
    * Define attribute in Host as below
    * ```html
    * <amadeus-hos-res-candidate-list-summary templateId='summary'></amadeus-hos-res-candidate-list-summary>
    * ```
    * or define attribute as
    * ```typescript
    * element.setAttribute('templateId','summary');
    * ```
    * @required
    */
   @property({ type: String }) templateId: string;


    /**
     * internal property  of amadeus-hos-res-candidate-list-summary
     *
     * Hold copy of candidate details
     * @optional
     */
    @internalProperty() copyCandidateListSummary: ICandidate[];

        /**
     * internal property  of amadeus-hos-res-candidate-list-summary
     *
     * Holds the count of number of candidate selected overall
     * @optional
     */
    @internalProperty() overallSelectedCount: number;
        /**
     * internal property  of amadeus-hos-res-candidate-list-summary
     *
     * Holds the count of number of candidate rejected overall
     * @optional
     */
    @internalProperty() overallRejectedCount: number;
        /**
     * internal property  of amadeus-hos-res-candidate-list-summary
     *
     * Holds the count of number of candidate selected in external interview
     * @optional
     */
    @internalProperty() externalSelectedCount: number;
        /**
     * internal property  of amadeus-hos-res-candidate-list-summary
     *
     * Holds the count of number of external interview held
     * @optional
     */
    @internalProperty() externalInterviewCount: number;
        /**
     * internal property  of amadeus-hos-res-candidate-list-summary
     *
     * Holds the count of number of candidate rejected in external interview
     * @optional
     */
    @internalProperty() externalRejectedCount: number;
        /**
     * internal property  of amadeus-hos-res-candidate-list-summary
     *
     * Holds the count of number of candidate selected in internal interview
     * @optional
     */
    @internalProperty() internalSelectedCount: number;
        /**
     * internal property  of amadeus-hos-res-candidate-list-summary
     *
     * Holds the count of number of internal interview held
     * @optional
     */
    @internalProperty() internalInterviewCount: number;
        /**
     * internal property  of amadeus-hos-res-candidate-list-summary
     *
     * Holds the count of number of candidate rejected in internal interview
     * @optional
     */
    @internalProperty() internalRejectedCount: number;

    /**
     * Creates an instance of interview summary component.
     */
    constructor() {
        super();
        this.copyCandidateListSummary = null;
        this.overallRejectedCount = 0;
        this.overallSelectedCount = 0;
        this.externalInterviewCount = 0;
        this.externalRejectedCount = 0;
        this.externalSelectedCount = 0;
        this.internalInterviewCount = 0;
        this.internalRejectedCount = 0;
        this.internalSelectedCount = 0;
    }

    /**
     * Lifecycle of Lit-element
     * @category LifeCycle
     */
    updated(changedProperties: PropertyValues) {
        if (changedProperties.has('candidateListSummary')) {
            this.externalInterviewCount = 0;
            this.externalRejectedCount = 0;
            this.externalSelectedCount = 0;
            this.internalInterviewCount = 0;
            this.internalRejectedCount  = 0;
            this.internalSelectedCount = 0;
            this.overallRejectedCount = 0;
            this.overallSelectedCount = 0;
            this.copyCandidateListSummary = this.candidateListSummary;

            this.copyCandidateListSummary.map((data) => {
                data.interviewType === 'External' ? this.externalInterviewCount++ : this.internalInterviewCount++;

                data.interviewType === 'External' && data.status === 'Selected' ?
                this.externalSelectedCount++ : this.externalRejectedCount = this.externalInterviewCount - this.externalSelectedCount;

                data.interviewType === 'Internal' && data.status === 'Selected' ?
                this.internalSelectedCount++ : this.internalRejectedCount = this.internalInterviewCount - this.internalSelectedCount;

            });
            this.overallSelectedCount = this.internalSelectedCount + this.externalSelectedCount;
            this.overallRejectedCount = this.internalRejectedCount + this.externalRejectedCount;
        }
    }

    /**
     * Gets styles
     */
    static get styles() {
        return [
        css`${unsafeCSS(candidateListSummaryStyle)}`,
        css`${unsafeCSS(bootstrapCSS)}`,
        ]
            ;
    }


        /**
     * This function loads variation
     * @param templateId
     * @returns
     */
    async loadVariation(templateId) {
        let variation;
        switch (templateId) {
            case 'variation-1':
                variation = await import('./templates/summary/candidate-list-summary.template');
                variation = variation.candidateListSummaryTemplate.bind(this)();
                break;

            default:
                variation = await import('./templates/summary/candidate-list-summary.template');
                variation = variation.candidateListSummaryTemplate.bind(this)();
        }
        return variation;
    }


    /**
     * Lifecycle of Lit-element
     * Renders ibe InterviewSummary component
     * @category LifeCycle
     * @returns TemplateResult
     */
    render() {
        return html`
            ${this.templateId
                ? html`
                      <!-- Second parameter of until is optional -->
                          ${until(this.loadVariation(this.templateId))}
                  `
                : html``}

        `;
    }
}
