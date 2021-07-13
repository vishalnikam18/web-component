/**
 *
 * This is AddCandidateDetailComponent Component.
 *
 * Use below selector to use web component in your application
 * @selector
 *
 * ```html
 * <amadeus-hos-res-wc-add-candidate></amadeus-hos-res-wc-add-candidate>
 * ```
 * @packageDocumentation
 * @module AddCandidateDetailComponent
 * @preferred
 */
import { LitElement, html, customElement, unsafeCSS, css, property, internalProperty } from 'lit-element';
import { ICandidate } from '../../interfaces';
import { RegPhonePattern, RegExpNamePattern, RegExpEmailPattern } from '../../constants/text-constants';
import { until } from 'lit-html/directives/until.js';
import { ApiService } from '../../services/ApiService';
import { IRecruiter } from '../../recruiter.interface';
import { ISkill } from '../../shared/skill';


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
const addCandidateDetailStyle = require('../add-candidate-detail/add-candidate-detail.component.scss');
/**
 * @ignore
 */
// declare const TCCommonService;
/**
 * @ignore
 */
// const eventService = TCCommonService.EventService;
@customElement('amadeus-hos-res-wc-add-candidate')
export class AddCandidateDetailComponent extends LitElement {
  /**
   * Property  of AddCandidateDetail Component
   *
   * Define attribute in Host as below
   * ```html
   * <amadeus-hos-res-wc-add-candidate formDetails="add-candidate-detail"></amadeus-hos-res-wc-add-candidate>
   * ```
   * or define attribute as
   * ```typescript
   * element.setAttribute('formDetails','add-candidate-detail');
   * ```
   * @required
   */
  @property({ type: Object }) formDetails: any = [];
  /**
  * Property  of CandidateListComponent
  *
  * Define attribute in Host as below
  * ```html
  * <amadeus-hos-res-wc-add-candidate templateId='candidateList' name='John'></amadeus-hos-res-wc-add-candidate>
  * ```
  * or define attribute as
  * ```typescript
  * element.setAttribute('name','John');
  * ```
  * @required
  */
  @property({ type: String }) name: string;
  /**
* Property  of CandidateListComponent
*
* Define attribute in Host as below
* ```html
* <amadeus-hos-res-wc-add-candidate templateId='candidateList' email='someone@xyz.com'></amadeus-hos-res-wc-add-candidate>
* ```
* or define attribute as
* ```typescript
* element.setAttribute('email','someone@xyz.com');
* ```
* @required
*/
  @property({ type: String }) email: string;
  /**
* Property  of CandidateListComponent
*
* Define attribute in Host as below
* ```html
* <amadeus-hos-res-wc-add-candidate templateId='candidateList' role='admin/interviewer'></amadeus-hos-res-wc-add-candidate>
* ```
* or define attribute as
* ```typescript
* element.setAttribute('role','admin/interviewer');
* ```
* @required
*/
  @property({ type: String }) role: string;
  /**
* Property  of recruiter-list-component
*
* Hold recruiter List
* @optional
*/
  @property({ type: Array }) recruiterList: IRecruiter[] = [];
  /**
* Property  of add-candidate-list
*
* Hold skills list
* @optional
*/
  @property({ type: Array }) skills: any;
  /**
    * internal property of AddCandidateDetail Component
    * Hold boolean value for form popup
    * @optional
    */
  @internalProperty() popUpForm: boolean;
  /**
  * internal property of AddCandidateDetail Component
  * Hold value 1 or 0 used to push or pop the selected skills
  * @optional
  */
  @internalProperty() flagValue: number;
  /**
    * internal property of AddCandidateDetail Component
    * Hold selected skills value
    * @optional
    */
  @internalProperty() selectedSkills: ISkill[];
  /**
* Property  of Add Candidate Detail component
*
* Define attribute in Host as below
* ```html
* <amadeus-hos-res-wc-add-candidate templateId='add-candidate'></amadeus-hos-res-wc-add-candidate>
* ```
* or define attribute as
* ```typescript
* element.setAttribute('templateId','add-candidate');
* ```
* @required
*/
  @property({ type: String }) templateId: string;
  /**
    * internal property of AddCandidateDetail Component
    * Hold boolean value for button disabled
    * @optional
    */
  @property({ type: Boolean }) formEnable: boolean;


  /**email
    * Gets styles
    */
  static get styles() {
    return [
      css`
            ${unsafeCSS(bootstrapCSS)}
          `,
      css`
            ${unsafeCSS(addCandidateDetailStyle)}
          `,
    ];
  }
  constructor() {
    super();
    this.popUpForm = false;
    this.selectedSkills = [];
    this.formEnable = false;
    this.getRecruiterList();
    this.getSkills();
    this.flagValue = 0;
  }

  skillArray(selectedSkill: ISkill) {
    this.flagValue = 0;

    if (this.selectedSkills.length === 0) {
      this.selectedSkills.push(selectedSkill);
    } else {
      this.selectedSkills.map((s, sIndex) => {
        if (s === selectedSkill) {
          this.selectedSkills = this.selectedSkills.slice(0, sIndex).
            concat(this.selectedSkills.slice(sIndex + 1, this.selectedSkills.length));
          this.flagValue = 1;


          return 0;
        }
        if (sIndex === this.selectedSkills.length - 1 && this.flagValue === 0) {
          this.selectedSkills.push(selectedSkill);
          return 0;
        }
      });
    }
  }

  /**
       * These functions fetch particular HTML element from shadow root
       */
  private get _spanType(): HTMLInputElement {
    return this.shadowRoot?.getElementById('selected') as HTMLInputElement;
  }
  private get _spanName(): HTMLInputElement {
    return this.shadowRoot?.getElementById('candidateName1') as HTMLInputElement;
  }
  private get _spanCandidate(): HTMLInputElement {
    return this.shadowRoot?.getElementById('candidateName2') as HTMLInputElement;
  }
  private get _spanProject(): HTMLInputElement {
    return this.shadowRoot?.getElementById('project1') as HTMLInputElement;
  }
  private get _spanRecruiter(): HTMLInputElement {
    return this.shadowRoot?.getElementById('recruiterName1') as HTMLInputElement;
  }
  private get _spanRecruiter1(): HTMLInputElement {
    return this.shadowRoot?.getElementById('recruiterName2') as HTMLInputElement;
  }
  private get _spanDate(): HTMLInputElement {
    return this.shadowRoot?.getElementById('date') as HTMLInputElement;
  }
  private get _spanRound(): HTMLInputElement {
    return this.shadowRoot?.getElementById('round') as HTMLInputElement;
  }
  private get _spanMode(): HTMLInputElement {
    return this.shadowRoot?.getElementById('mode') as HTMLInputElement;
  }
  private get _spanInterviewer(): HTMLInputElement {
    return this.shadowRoot?.getElementById('interviewer1') as HTMLInputElement;
  }
  private get _spanInterviewer1(): HTMLInputElement {
    return this.shadowRoot?.getElementById('interviewer2') as HTMLInputElement;
  }
  private get _spanEmail(): HTMLInputElement {
    return this.shadowRoot?.getElementById('email1') as HTMLInputElement;
  }
  private get _spanValidEmail(): HTMLInputElement {
    return this.shadowRoot?.getElementById('email2') as HTMLInputElement;
  }
  private get _spanStatus(): HTMLInputElement {
    return this.shadowRoot?.getElementById('status1') as HTMLInputElement;
  }
  private get _spanDesignation(): HTMLInputElement {
    return this.shadowRoot?.getElementById('designation1') as HTMLInputElement;
  }
  private get _spanExp(): HTMLInputElement {
    return this.shadowRoot?.getElementById('exp1') as HTMLInputElement;
  }
  private get _spanPhoneNumber(): HTMLInputElement {
    return this.shadowRoot?.getElementById('phoneNumber1') as HTMLInputElement;
  }
  private get _spanPhoneNumberPattern(): HTMLInputElement {
    return this.shadowRoot?.getElementById('phoneNumber2') as HTMLInputElement;
  }
  private get _spanJoiningStatus(): HTMLInputElement {
    return this.shadowRoot?.getElementById('joiningStatus1') as HTMLInputElement;
  }
  private get _spanDuplicateData(): HTMLInputElement {
    return this.shadowRoot?.getElementById('duplicateEntry') as HTMLInputElement;
  }


  validator() {

    let err = false;
    const info: any = this.shadowRoot.querySelectorAll('input');
    const info1: any = this.shadowRoot.querySelectorAll('select');
    const namePattern: RegExp = RegExpNamePattern;
    const phonePattern: RegExp = RegPhonePattern;
    const emailPattern: RegExp = RegExpEmailPattern;
    if (info[0].value !== '') {
      if (info[0].value.match(namePattern)) {
        this._spanName.hidden = true;
        this._spanCandidate.hidden = true;
      } else {
        this._spanCandidate.hidden = false;
        err = true;
      }
    }
    if (info[4].value !== '') {
      if (info[4].value.match(phonePattern)) {
        this._spanPhoneNumber.hidden = true;
        this._spanPhoneNumberPattern.hidden = true;
      } else {
        this._spanPhoneNumberPattern.hidden = false;
        err = true;
      }
    }
    if (this.role === 'Admin' && info[5].value !== '') {
      if (info[5].value.match(namePattern)) {
        this._spanInterviewer.hidden = true;
        this._spanInterviewer1.hidden = true;
      } else {
        this._spanInterviewer1.hidden = false;
        err = true;
      }
    }
    if (this.role === 'Admin' && info[6].value !== '') {
      if (info[6].value.match(emailPattern)) {
        this._spanEmail.hidden = true;
        this._spanValidEmail.hidden = true;
      } else {
        this._spanValidEmail.hidden = false;
        err = true;
      }
    }
    if (info1[0].value === '') {
      this._spanType.hidden = false;
      err = true;
    } else {
      this._spanType.hidden = true;
    }
    if (info1[4].value === '') {
      this._spanStatus.hidden = false;
      err = true;
    } else {
      this._spanStatus.hidden = true;
    }
    if (info[0].value === '') {
      this._spanName.hidden = false;
      err = true;
    } else {
      this._spanName.hidden = true;
    }
    if (info[1].value === '') {
      this._spanProject.hidden = false;
      err = true;
    } else {
      this._spanProject.hidden = true;
    }
    if (info1[1].value === '') {
      this._spanRecruiter.hidden = false;
      err = true;
    } else {
      this._spanRecruiter.hidden = true;
    }
    if (info[2].value === '') {
      this._spanDate.hidden = false;
      err = true;
    } else {
      this._spanDate.hidden = true;
    }
    if (info1[2].value === '') {
      this._spanRound.hidden = false;
      err = true;
    } else {
      this._spanRound.hidden = true;
    }
    if (info1[3].value === '') {
      this._spanMode.hidden = false;
      err = true;
    } else {
      this._spanMode.hidden = true;
    }
    if (info1[5].value === '') {
      this._spanDesignation.hidden = false;
      err = true;
    } else {
      this._spanDesignation.hidden = true;
    }
    if (info[3].value === '') {
      this._spanExp.hidden = false;
      err = true;
    } else {
      this._spanExp.hidden = true;
    }
    if (info[4].value === '') {
      this._spanPhoneNumber.hidden = false;
      err = true;
    } else {
      this._spanPhoneNumber.hidden = true;
    }
    if (info1[6].value === '') {
      this._spanJoiningStatus.hidden = false;
      err = true;
    } else {
      this._spanJoiningStatus.hidden = true;
    }
    if (this.role === 'Admin' && info[5].value === '') {
      this._spanInterviewer.hidden = false;
      err = true;
    } else if (this.role === 'Interviewer') {
      console.log('');
    } else {
      this._spanInterviewer.hidden = true;
    }
    if (this.role === 'Admin' && info[6].value === '') {
      this._spanEmail.hidden = false;
      err = true;
    } else if (this.role === 'Interviewer') {
      console.log('');
    } else {
      this._spanEmail.hidden = true;
    }
    if (err === false) {
      this._spanType.hidden = true;
      this._spanStatus.hidden = true;
      this._spanName.hidden = true;
      this._spanProject.hidden = true;
      this._spanRecruiter.hidden = true;
      this._spanDate.hidden = true;
      this._spanRound.hidden = true;
      this._spanMode.hidden = true;
      this._spanDesignation.hidden = true;
      this._spanExp.hidden = true;
      this._spanJoiningStatus.hidden = true;
      this._spanCandidate.hidden = true;
      this._spanRecruiter1.hidden = true;
      this._spanPhoneNumber.hidden = true;
      this._spanPhoneNumberPattern.hidden = true;
      if (this.role === 'Admin') {
        this._spanEmail.hidden = true;
        this._spanValidEmail.hidden = true;
      }
      if (this.role === 'Admin') {
        this._spanInterviewer.hidden = true;
        this._spanInterviewer1.hidden = true;
      }
      this.formEnable = true;
      this.requestUpdate();
    } else {
      this.formEnable = false;
      this.requestUpdate();
    }
  }
  /**
     * This function submit candidate form data
     * fires 'EVT_SET_FORM_DATA' event on click of Save button
     * @event EVT_SET_FORM_DATA
     * @param event
     * @returns
     */
  saveCandidateDetails(event) {
    event.preventDefault();
    const info: any = this.shadowRoot.querySelectorAll('input');
    const info1: any = this.shadowRoot.querySelectorAll('select');
    const info2: any = this.shadowRoot.querySelectorAll('textarea');
    const iObject: ICandidate = {

      flag: false,
      interviewType: info1[0].value,
      candidateName: info[0].value,
      project: info[1].value,
      recruiterName: info1[1].value,
      interviewDate: info[2].value,
      interviewRound: info1[2].value,
      interviewMode: info1[3].value,
      interviewer: this.role !== 'Admin' ? this.name : info[5].value.charAt(0).toUpperCase() + info[5].value.slice(1),
      status: info1[4].value,
      designation: info1[5].value,
      exp: Math.trunc(info[3].value),
      phoneNumber: info[4].value,
      joiningStatus: info1[6].value,
      profileSummery: info2[0].value,
      feedback: info2[1].value,
      email: this.role !== 'Admin' ? this.email : info[6].value,
      skill_name: this.selectedSkills
    };
    this.formDetails = iObject;
    const evtSubmitFormData = new CustomEvent('newCandidateDetails', {
      detail: this.formDetails,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(evtSubmitFormData);
    this.selectedSkills = [];
    this.formEnable = false;
    this.requestUpdate();
  }




  /**
    * This function submit the candidate form data and close the form
    * @param event
    * @returns
    */
  saveForm(event) {
    this.saveCandidateDetails(event);
    this.closeForm();
    this.requestUpdate();
  }


  /**
    * This function submit the candidate form data also reset candidate form data to add new candidate information.
    * @param event
    * @returns
    */
  saveAndAddAnotherCandidate(event) {
    this.saveCandidateDetails(event);
    this.resetData(event);
    this.requestUpdate();
  }
  /**
     * This function reset candidate form data
     * @param event
     * @returns
     */
  resetData(event) {
    event.preventDefault();
    this.clearForm();
  }

  /**
     * close button to close form popup
     * fires 'evtClosePopup' event on click of close button
     * @event evtClosePopup
     */
  closeForm() {
    this.clearForm();
    const evtClosePopup = new CustomEvent('closeForm', {
      detail: 'from child component',
    });
    this.dispatchEvent(evtClosePopup);
    this.formEnable = false;
    this.requestUpdate();
  }

  /**
    * This function reset form fields
    */
  clearForm() {
    // this._spanInterviewer.hidden = true;
    // +
    if (this.role === 'Admin') {
      this._spanInterviewer.hidden = true;
      this._spanInterviewer1.hidden = true;
    }
    if (this.role === 'Admin') {
      this._spanEmail.hidden = true;
      this._spanValidEmail.hidden = true;
    }
    this._spanType.hidden = true;
    this._spanStatus.hidden = true;
    this._spanName.hidden = true;
    this._spanProject.hidden = true;
    this._spanRecruiter.hidden = true;
    this._spanDate.hidden = true;
    this._spanRound.hidden = true;
    this._spanMode.hidden = true;
    this._spanDesignation.hidden = true;
    this._spanExp.hidden = true;
    this._spanJoiningStatus.hidden = true;
    this._spanCandidate.hidden = true;
    this._spanRecruiter1.hidden = true;
    this._spanPhoneNumber.hidden = true;
    this._spanPhoneNumberPattern.hidden = true;
    const infoInput: any = this.shadowRoot.querySelectorAll('input');
    for (let index = 0; index < infoInput.length; index++) {
      if (infoInput[index].id === 'skills') {
        infoInput[index].checked = false;
      }
      infoInput[index].value = '';

    }
    const infoSelect: any = this.shadowRoot.querySelectorAll('select');
    for (let index = 0; index < infoSelect.length; index++) {
      infoSelect[index].value = '';
    }
    const infoText: any = this.shadowRoot.querySelectorAll('textarea');
    for (let index = 0; index < infoText.length; index++) {
      infoText[index].value = '';
    }
  }


  /**
    * This function fetch recruiter list from API
    */
  async getRecruiterList() {
    const res: Response = await ApiService.getRecruiters();
    this.recruiterList = await res.json();
    this.requestUpdate();
  }
  /**
  * This function fetch skills list from Database
  */
  async getSkills() {

    const res: Response = await ApiService.getSkills();
    this.skills = await res.json();
    this.requestUpdate();
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
        variation = await import('./templates/add-candidate-detail.template');
        variation = variation.addCandidateDetailTemplate.bind(this)();
        break;

      default:
        variation = await import('./templates/add-candidate-detail.template');
        variation = variation.addCandidateDetailTemplate.bind(this)();
    }
    return variation;
  }

  /**
     * LifeCycle of Lit-element
     * Renders add-candidate-detail component
     * @category LifeCycle
     * @returns TemplateResult
     */
  render() {
    return html`
    ${this.templateId
        ? html`
              <!-- Second parameter of until is optional -->
              <div class="amadeus-hos-res-wc-add-candidate">
                  ${until(this.loadVariation(this.templateId))}
              </div>
          `
        : html``}

    `;
  }
}
