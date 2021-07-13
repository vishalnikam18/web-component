import { LitElement, html, css, customElement, internalProperty, unsafeCSS, property, PropertyValues } from 'lit-element';
import { ICandidate } from '../../interfaces';
import { IStatus } from './interview-status';

/**
 * @ignore
 */
declare const TCStyleService;
/**
 * @ignore
 */
const bootstrapCSS = TCStyleService.CssService.getBootstrapCss();
const interviewStyle = require('../interview-status/interview-status.scss');



@customElement('interview-status')
export class InterviewStatus extends LitElement {
  /**
  * Property  of InterviewStatus component
  *
  * Define attribute in Host as below
  * ```html
  * <interview-status .interviewStatus="candidateList"></interview-status>
  * ```
  * or define attribute as
  * ```typescript
  * element.setAttribute('interviewStatus','candidateList');
  * ```
  * @required
  */
  @property({ type: Array }) interviewStatusList: ICandidate[];
  /**
* Property  of InterviewStatus component
*
* Define attribute in Host as below
* ```html
* <interview-status .interviewer="interviewerList"></interview-status>
* ```
* or define attribute as
* ```typescript
* element.setAttribute('interviewer','interviewerList');
* ```
* @required
*/
  @property({ type: Array }) interviewerList: any[];
  /**
* Property  of InterviewStatus component
*
* Define attribute in Host as below
* ```html
* <interview-status .interviewStatusValue="true/false"></interview-status>
* ```
* or define attribute as
* ```typescript
* element.setAttribute('interviewStatusValue','true/false');
* ```
* @required
*/
  @property({ type: Boolean }) interviewStatusValue: boolean;

  /**
 * internal property  of interview-status
 *
 * Creates a object which contain interviewer Name, total Interview and selected number
 * @optional
 */
  @internalProperty() interviewStatusObject: IStatus;
  /**
* internal property  of interview-status
*
* Hold the interviewStatusObject
* @optional
*/
  @internalProperty() interviewStatusArray: IStatus[];
  /**
   * internal property of interview-status
   * Hold the values of selected candidates
   * @optional
   */
  @internalProperty() selectedValues: number;
  /**
 * internal property of interview-status
 * Hold the values of total candidates interview conducted
 * @optional
 */
  @internalProperty() totalValues: number;
  constructor() {
    super();
    this.totalValues = 0;
    this.selectedValues = 0;
    this.interviewStatusArray = [];

    this.interviewerList = [];
  }


  /**
* Gets styles
*/
  static get styles() {
    return [
      css`
          ${unsafeCSS(bootstrapCSS)}
          `,
      css`${unsafeCSS(interviewStyle)}`
    ];
  }
  /**
 * Lifecycle of Lit-element
 * @category LifeCycle
 */
  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('interviewStatusList')) {
      for (let i = 0; i < this.interviewerList.length; i++) {
        for (let index = 0; index < this.interviewStatusList.length; index++) {
          if (this.interviewerList[i] === this.interviewStatusList[index].interviewer) {
            this.totalValues++;
            if (this.interviewStatusList[index].status === 'Selected') {
              this.selectedValues++;
            }
          }
        }

        this.interviewStatusObject = {
          Interviewer: this.interviewerList[i],
          TotalInterviewCompleted: this.totalValues,
          TotalSelected: this.selectedValues
        };


        this.interviewStatusArray.push(this.interviewStatusObject);
        this.totalValues = 0;
        this.selectedValues = 0;
      }
    }
  }
  closeForm() {
    const closeModal = new CustomEvent('closeInterviewStatusModal', {
      detail: 'from child component',
    });
    this.dispatchEvent(closeModal);
  }


  render() {
    return html`
    <div class="modal-outer-div">
      <div class="modal-inner-div">
        <div class="modal-header tc-modal-header">
          <h4 class="modal-title">Interview Status</h4>
          <button type="button" class="close text-white" @click=${this.closeForm} data-dismiss="modal">&times;</button>
        </div>
        ${this.interviewerList.length === 0 ?  html `<div class="p-4"><table class="table table-bordered">
          <tr>
            <td colspan="4">No Data Found</td>
          </tr>
        </table></div>` : html`
        <div class="p-4">
          <table class="w-100 table table-bordered">
            ${this.interviewStatusArray.map((data: IStatus, index) => {
      return html`
            <tr>
            <th>${index + 1}.</th>
              <td class="text-capitalize"> ${data.Interviewer}
              </td>
              <td>${data.TotalSelected}/${data.TotalInterviewCompleted}
              </td>
            </tr>
            `;
    })}
          </table>
        </div>`}
             </div>
    </div>
`;
  }
}
