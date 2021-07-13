/**
 *
 * This is Hello World Component for boilerplate
 *
 * Use below selector to use web component in your application
 * @selector
 *
 * ```html
 * <candidate-evaluation-list></candidate-evaluation-list>
 * ```
 * @packageDocumentation
 * @module Candidate-list-Component
 * @preferred
 */
import { LitElement, customElement, html, property, unsafeCSS, css, internalProperty } from 'lit-element';
import { ICandidate, IFilter } from './interfaces';
import { ApiService } from './services/ApiService';
import { until } from 'lit-html/directives/until.js';
import { IRecruiter } from './recruiter.interface';
import { ISkill } from './shared/skill';
/**
 * @ignore
 */
declare const TCStyleService;
/**
 * @ignore
 */
const bootstrapCSS = TCStyleService.CssService.getBootstrapCss();
const templateCss = require('./candidate-list-component.scss');

@customElement('candidate-evaluation-list')
export class CandidateListComponent extends LitElement {
    /**
    * Property  of CandidateListComponent
    *
    * Define attribute in Host as below
    * ```html
    * <candidate-evaluation-list templateId='candidateList'></candidate-evaluation-list>
    * ```
    * or define attribute as
    * ```typescript
    * element.setAttribute('templateId','candidateList');
    * ```
    * @required
    */
    @property({ type: String }) templateId: string;
    /**
    * Property  of CandidateListComponent
    *
    * Define attribute in Host as below
    * ```html
    * <candidate-evaluation-list templateId='candidateList' name='John'></candidate-evaluation-list>
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
* <candidate-evaluation-list templateId='candidateList' email='someone@xyz.com'></candidate-evaluation-list>
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
* <candidate-evaluation-list templateId='candidateList' role='admin/interviewer'></candidate-evaluation-list>
* ```
* or define attribute as
* ```typescript
* element.setAttribute('role','admin/interviewer');
* ```
* @required
*/
    @property({ type: String }) role: string;

    /**
 * Property  of candidate-list-component
 *
 * Hold candidate details
 * @optional
 */
    @property({ type: Array }) candidateList: ICandidate[] = [];
    /**
     * internal property  of candidate-list-component
     *
     * Hold copy of candidate details
     * @optional
     */
    @internalProperty() copyCandidateList: ICandidate[] = [];
    /**
     * internal property  of candidate-list-component
     *
     * Hold copy of candidate details
     * @optional
     */
    @internalProperty() list: ICandidate[] = [];
    /**
     * internal property  of candidate-list-component
     *
     * Hold copy of candidate details
     * @optional
     */
    @internalProperty() cpyCandidateList: ICandidate[] = [];
    /**
    * Holds boolean value for each item in candidate list
    *
    * To make fields editable
    * @optional
    */
    @internalProperty() editArray: any = [];
    /**
    * internal property  of candidate-list-component
    *
    * Handles show and hide of month view
    * @optional
    */
    @internalProperty() displayMonthHandler = 0;
    /**
     * internal property  of candidate-list-component
     *
     * Hold current page number
     * @optional
     */
    @internalProperty() currentPage = 1;
    /**
     * internal property  of candidate-list-component
     *
     * Hold current page number
     * @optional
     */
    @internalProperty() displayList = 1;
    /**
     * internal property  of candidate-list-component
     *
     * define number of items to display per page
     * @optional
     */
    @property() itemsPerPage;
    /**
     * internal property  of candidate-list-component
     *
     * Indicates total number of pages
     * @optional
     */
    @internalProperty() totalPages: number;
    /**
  * internal property  of candidate-list-component
  *
  * Indicates updated array after saving the changes
  * @optional
  */
    @internalProperty() updatedArray: ICandidate[] = [];
    /**
     * internal property  of candidate-list-component
     *
     * Contains copy of candidate list used for interview summary
     * @required
     */
    @internalProperty() changeTrackingArray: any = [];
    /**
     * internal property  of candidate-list-component
     *
     * Contains copy of candidate list used for interview summary
     * @required
     */
    @internalProperty() candidateListSummary: ICandidate[];
    /**
   * internal property of candidate-list-component
   *
   * Hold boolean value for form popup
   * @optional
   */
    @internalProperty() popUp: boolean;
    /**
   * internal property of candidate-list-component
   *
   * Hold boolean value for enabling/disabling save button
   * @optional
   */
    @internalProperty() enableSave: boolean;
    /**
   * internal property of candidate-list-component
   *
   * Hold the values selected to filter the list
   * @optional
   */
    @internalProperty() filterOptionList: IFilter;
    /**
     * Property  of recruiter-list-component
     *
     * Hold recruiter details
     * @optional
     */
    @property({ type: Array }) recruiterList: IRecruiter[] = [];

    /**
* Property  of    candidate-evaluation-system
*
* Hold skills list
* @optional
*/
    @property({ type: Array }) skills: ISkill[];
    /**
     * internal property  of candidate-list-component
     *
     * Contains the list of selected skills of candidate in array format
     * @required
     */
    @internalProperty() skillArray: any = [];
    /**
     * internal property  of candidate-list-component
     *
     * Contains the flag value 0 or 1 used to decide whether to push or pop from skillArray
     * @required
     */
    @internalProperty() flagValue: number;
    /**
      * internal property of AddCandidateDetail Component
      * Hold selected skills value
      * @optional
      */
    @internalProperty() selectedSkills: ISkill[];
    /**
* internal property of candidate-list-component
*
* Hold boolean value for interview status
* @optional
*/
    @internalProperty() interviewStatus: boolean;

    /**
* internal property  of interview-status
*
* Hold list of interviewers
* @optional
*/
    @property() interviewers: any;

    /**
* internal property  of candidate-list
*
* Hold list of interviewers
* @optional
*/
    @property() interviewerList: any = [];
        /**
* property  of candidate-list
*
* Hold flag for pagination
* @optional
*/
@property() paginationFlag: boolean;


    constructor() {

        super();
        this.popUp = false;
        this.enableSave = false;
        this.interviewStatus = false;
        this.paginationFlag = false;
        this.getCandidateList();
        this.getInterviewerList();
        this.updatedArray = [];
        this.getRecruiterList();
        this.getSkills();
        this.selectedSkills = [];
        this.flagValue = 0;
        this.interviewers = [];
        this.filterOptionList = {
            flag: false,
            interviewMode: '',
            interviewType: '',
            status: '',
            joiningStatus: '',
            interviewer: '',
            condition: ''
        };
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
            ${unsafeCSS(templateCss)}
        `,
        ];
    }

    editSkillArray(selectedSkill: ISkill, index: number) {
        this.flagValue = 0;
        if (this.selectedSkills.length === 0) {
            this.selectedSkills.push(selectedSkill);
            this.updateCandidateSkill(this.selectedSkills, index);
        } else {
            this.selectedSkills.map((s, sIndex) => {
                if (s === selectedSkill) {
                    this.selectedSkills = this.selectedSkills.slice(0, sIndex).
                        concat(this.selectedSkills.slice(sIndex + 1, this.selectedSkills.length));
                    this.flagValue = 1;
                    this.updateCandidateSkill(this.selectedSkills, index);
                    return 0;
                }
                if (sIndex === this.selectedSkills.length - 1 && this.flagValue === 0) {
                    this.selectedSkills.push(selectedSkill);
                    this.updateCandidateSkill(this.selectedSkills, index);
                    return 0;
                }
            });
        }
    }


    /**
    * This function open the form
    */
    openForm() {
        this.popUp = !this.popUp;
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
   * This function get form details
   * @param event
   * @returns
   */
    async getFormDetails(event) {
        const obj = {
            no: this.candidateList.length + 1,
            flag: event.detail.flag,
            interviewType: event.detail.interviewType,
            candidateName: event.detail.candidateName,
            project: event.detail.project,
            recruiterName: event.detail.recruiterName,
            interviewDate: event.detail.interviewDate,
            interviewRound: event.detail.interviewRound,
            interviewMode: event.detail.interviewMode,
            interviewer: this.role !== 'Admin' ? this.name : event.detail.interviewer,
            status: event.detail.status,
            designation: event.detail.designation,
            exp: Math.trunc(event.detail.exp),
            phoneNumber: event.detail.phoneNumber,
            joiningStatus: event.detail.joiningStatus,
            profileSummery: event.detail.profileSummery,
            feedback: event.detail.feedback,
            email: event.detail.email,
            skill_name: event.detail.skill_name
        };
        let duplicate = false;
        this.candidateList.forEach((candidate) => {
            if (candidate.candidateName === obj.candidateName) {
                duplicate = true;
                alert('Duplicate candidate name. Please enter again.');
            }
        });
        if (duplicate === false) {
            this.candidateList.push(obj);
            this.copyCandidateList = [...this.copyCandidateList, obj];
            this.editArray.push({ 'rowIndex': this.editArray.length, 'editable': false });
            // this.candidateList = [];
            alert('Data saved.');
            await ApiService.setNewCandidate(obj);
            this.getCandidateList();
        }

        this.requestUpdate();
    }
    /**
     * This function load records to be displayed for current page
     * @param direction (previous/next)
     * @returns
     */
    filterDataForPagination(direction: any) {
        this.totalPages = Math.ceil(this.candidateList.length / this.itemsPerPage);
        this.currentPage = direction === 'previous' ?
            Math.max(this.currentPage - 1, 1)
            : Math.min(this.currentPage + 1, this.totalPages);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = this.currentPage * this.itemsPerPage;
        this.copyCandidateList = this.candidateList.slice(startIndex, endIndex);
    }

    /**
    * This function fetch candidate list from API
    */
    async getCandidateList() {
        const res: Response = await ApiService.getList();
        this.candidateList = await res.json();
        this.totalPages = Math.ceil(this.candidateList.length / this.itemsPerPage);
        this.getListPerPage();
        for (let i = 0; i < this.copyCandidateList.length; i++) {
            this.editArray.push({ 'rowIndex': i, 'editable': false });
        }
        this.requestUpdate();
    }

    getListPerPage() {
        if (this.paginationFlag) {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = this.currentPage * this.itemsPerPage;
            this.copyCandidateList = this.candidateList.slice(startIndex, endIndex);
            this.paginationFlag = false;
        } else {
            this.copyCandidateList = this.candidateList.slice(0, this.itemsPerPage);
        }
    }
    /**
     * Click handler for edit
     * @param rowIndex
     */
    editFields(rowIndex) {
        this.enableSave = true;
        this.editArray.map((val) => {
            if (val.rowIndex === rowIndex) {
                return val.editable = true;
            }
        });
        this.requestUpdate();
    }
    /**
     * Click handler for export
     */
    exportToExcel() {
        const tableId = this.shadowRoot.getElementById('myTable').id;
        this.htmlTableToExcel(tableId, '');
    }
    /**
     * To convert HTML table to excel sheet
     * @param tableId
     * @param fileName
     */
    htmlTableToExcel(tableId, fileName = '') {
        const date = new Date();
        const todaysDate = date.getUTCDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        const excelFileName = 'evaluation_data_' + todaysDate;
        const tableDataType = 'application/vnd.ms-excel';
        const selectTable = this.shadowRoot.getElementById(tableId);
        const htmlTable = selectTable.outerHTML.replace(/ /g, '%20');
        fileName = fileName ? fileName + '.xls' : excelFileName + '.xls';
        const excelFileURL = document.createElement('a');
        document.body.appendChild(excelFileURL);
        if (navigator.msSaveOrOpenBlob) {
            const blob = new Blob(['\ufeff', htmlTable], {
                type: tableDataType
            });
            navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
            excelFileURL.href = 'data:' + tableDataType + ', ' + htmlTable;
            excelFileURL.download = fileName;
            excelFileURL.click();
        }
    }
    /**
     * Click handler for cancel
     * @param rowIndex
     * @returns editArray
     */
    async cancelEdit(rowIndex) {
        // const res: Response = await ApiService.getList();
        // const candidateArray = await res.json();
        this.editArray.map((val) => {
            if (val.rowIndex === rowIndex) {
                // this.copyCandidateList[rowIndex] = candidateArray[rowIndex];
                this.updatedArray.splice(0, rowIndex);
                return val.editable = false;

            }
            this.enableSave = false;
            for (let index = 0; index < this.editArray.length; index++) {
                if (this.editArray[index].editable) {
                    this.enableSave = true;
                }
            }
        });
        this.paginationFlag = true;
        this.getCandidateList();
        this.requestUpdate();
    }
    /**
     * Click handler to save the updated data
     */
    saveData() {
        this.enableSave = false;
        for (let i = 0; i < this.copyCandidateList.length; i++) {
            if (this.editArray[i].editable) {
                this.editArray[i].editable = false;
            }
        }
        const event = new CustomEvent('updatedData', {
            detail: this.updatedArray,
        });
        this.copyCandidateList.forEach(async (data: ICandidate) => {
            if (data.flag === true) {
                data.flag = false;
                await ApiService.updateCandidateList(data);
            }
        });
        this.selectedSkills = [];
        this.dispatchEvent(event);
        this.paginationFlag = true;
        this.getCandidateList();
        this.requestUpdate();
    }

    updateCandidateSkill(editedSkills: ISkill[], candidateListId: number) {
        this.changeTrackingArray.push({ 'index': candidateListId, 'prop': 'skill_name', 'value': editedSkills });
        this.changeTrackingArray.map((val) => {
            const id = val.index;
            const prop1 = val.prop;

            this.copyCandidateList[id][prop1] = val.value;

            this.copyCandidateList[id].flag = true;
            if (this.updatedArray.indexOf(this.copyCandidateList[id]) !== -1) {
                this.updatedArray[id] = { ...this.copyCandidateList[id] };
            } else {
                if (this.updatedArray.length) {
                    this.updatedArray.pop();
                }
                this.updatedArray.push({ ...this.copyCandidateList[id] });
                this.copyCandidateList.indexOf[id] = this.updatedArray[0];
            }
        });
    }

    /**
     * This function keep track of updated values
     * @param event
     */
    updateCandidateList(event) {
        if (event.target.id.includes('+')) {
            const id = event.target.id.split('+');
            const info: any = (this.shadowRoot.getElementById(event.target.id) as HTMLOptionElement).value;

            if (id[0] === 'skill_name') {
                return 0;
            } else if (id[0] === 'exp') {
                this.changeTrackingArray.push({ 'index': id[1], 'prop': id[0], 'value': Math.trunc(info) });
            } else {
                this.changeTrackingArray.push({ 'index': id[1], 'prop': id[0], 'value': info });
            }
        }
        if (event.target.id.includes('*')) {
            const id = event.target.id.split('*');
            const info = (this.shadowRoot.getElementById(event.target.id) as HTMLOptionElement).innerHTML;
            this.changeTrackingArray.push({ 'index': id[1], 'prop': id[0], 'value': info });
        }
        this.changeTrackingArray.map((val) => {
            const id = val.index;
            const prop1 = val.prop;
            this.copyCandidateList[id][prop1] = val.value;
            this.copyCandidateList[id].flag = true;
            if (this.updatedArray.indexOf(this.copyCandidateList[id]) !== -1) {
                this.updatedArray[id] = { ...this.copyCandidateList[id] };
            } else {
                if (this.updatedArray.length) {
                    this.updatedArray.pop();
                }
                this.updatedArray.push({ ...this.copyCandidateList[id] });
                this.copyCandidateList.indexOf[id] = this.updatedArray[0];
            }
        });
    }

    /**
    * This function controls display
    */
    handleDisplay() {
        if (!this.candidateList) {
            this.displayList = 0;
        } else {
            this.displayList = 1;
        }
    }

    async loadVariation(templateId) {
        let variation;
        switch (templateId) {
            default:
                variation = await import('./candidate-list-component.template');
                variation = variation.candidateListTemplate.bind(this)();
                break;
        }
        return variation;
    }


    /**
    * This function show/hide filter options in header
    * @param id
    */
    showOptions(id) {
        if (id === 'interviewType') {
            const checkbox = (this.shadowRoot.querySelector('.dropdown-menu.interviewType') as HTMLInputElement);
            if (checkbox.style.display === '') {
                checkbox.style.display = 'block';
            } else {
                checkbox.style.display = '';
            }
        }
    }
    /**
     * This function filters list on interview type selected
     * @param id
     */

    async filterDropDown(id) {
        if (id === 'interviewTypeOptions') {
            this.filterOptionList.interviewType = (this.shadowRoot.getElementById('interviewTypeOptions') as HTMLOptionElement).value;
            if (this.filterOptionList.interviewType === 'Select All List') {
                this.setSelectFields();
            }
            if (this.filterOptionList.interviewType === 'Select all Options') {
                (this.shadowRoot.getElementById('interviewTypeOptions') as HTMLSelectElement).selectedIndex = 0;
                this.filterOptionList.interviewType = '';
            }
        } else if (id === 'interviewModeOptions') {
            this.filterOptionList.interviewMode = (this.shadowRoot.getElementById('interviewModeOptions') as HTMLOptionElement).value;
            if (this.filterOptionList.interviewMode === 'Select All List') {
                this.setSelectFields();
            }
            if (this.filterOptionList.interviewMode === 'Select all Options') {
                (this.shadowRoot.getElementById('interviewModeOptions') as HTMLSelectElement).selectedIndex = 0;
                this.filterOptionList.interviewMode = '';
            }
        } else if (id === 'statusOptions') {
            this.filterOptionList.status = (this.shadowRoot.getElementById('statusOptions') as HTMLOptionElement).value;
            if (this.filterOptionList.status === 'Select All List') {
                this.setSelectFields();
            }
            if (this.filterOptionList.status === 'Select all Options') {
                (this.shadowRoot.getElementById('statusOptions') as HTMLSelectElement).selectedIndex = 0;
                this.filterOptionList.status = '';
            }
        } else if (id === 'joiningStatusOptions') {
            this.filterOptionList.joiningStatus = (this.shadowRoot.getElementById('joiningStatusOptions') as HTMLOptionElement).value;
            if (this.filterOptionList.joiningStatus === 'Select All List') {
                this.setSelectFields();
            }
            if (this.filterOptionList.joiningStatus === 'Select all Options') {
                (this.shadowRoot.getElementById('joiningStatusOptions') as HTMLSelectElement).selectedIndex = 0;
                this.filterOptionList.joiningStatus = '';
            }
        } else if (id = 'interviewerOptions') {
            this.filterOptionList.interviewer = ((this.shadowRoot.getElementById('interviewerOptions')) as HTMLOptionElement).value;
            if (this.filterOptionList.interviewer === 'Select All List') {
                this.setSelectFields();
            }
            if (this.filterOptionList.interviewer === 'Select all Options') {
                (this.shadowRoot.getElementById('interviewerOptions') as HTMLSelectElement).selectedIndex = 0;
                this.filterOptionList.interviewer = '';
            }
        }
        const res: Response = await ApiService.getListBasedOnFilter(
            this.filterOptionList
        );
        this.candidateList = await res.json();
        this.copyCandidateList = [...this.candidateList];
        this.totalPages = Math.ceil(
            this.copyCandidateList.length / this.itemsPerPage
        );
        this.copyCandidateList = [
            ...this.copyCandidateList.slice(0, this.itemsPerPage),
        ];
        this.filterOptionList.flag = false;
        this.editArray = [];
        for (let i = 0; i < this.copyCandidateList.length; i++) {
            this.editArray.push({ rowIndex: i, editable: false });
        }
        this.requestUpdate();

    }



    setSelectFields() {
        this.filterOptionList.flag = true;
        this.filterOptionList.interviewType = '';
        this.filterOptionList.interviewMode = '';
        this.filterOptionList.interviewer = '';
        this.filterOptionList.joiningStatus = '';
        this.filterOptionList.status = '';
        this.filterOptionList.condition = '';
        (this.shadowRoot.getElementById('interviewTypeOptions') as HTMLSelectElement).selectedIndex = 0;
        (this.shadowRoot.getElementById('interviewModeOptions') as HTMLSelectElement).selectedIndex = 0;
        (this.shadowRoot.getElementById('joiningStatusOptions') as HTMLSelectElement).selectedIndex = 0;
        (this.shadowRoot.getElementById('statusOptions') as HTMLSelectElement).selectedIndex = 0;
        (this.shadowRoot.getElementById('interviewerOptions') as HTMLSelectElement).selectedIndex = 0;
    }

    /**
     * This function filter candidate list based on date
     */
    async getListBasedOnMonthYear() {
        const res: Response = await ApiService.getList();
        this.list = await res.json();
        const duration = (this.shadowRoot.getElementById('month') as HTMLOptionElement).value;
        const yearCompare = duration.slice(0, 4);
        const monthCompare = duration.slice(5, 7);
        this.getRefilteredListBasedOnDate(yearCompare, monthCompare);
        this.candidateList = [];
        this.candidateList = this.cpyCandidateList;
        this.getListPerPage();
        this.requestUpdate();
    }

    /**
     * This function gives list of candidates appeared for interview in last week
     */
    async getLastWeekData() {
        const res: Response = await ApiService.getList();
        this.list = await res.json();
        const yearCompare = (new Date().getFullYear()).toString();
        const monthCompare = (new Date().getMonth() + 1).toString();
        const dateCompare = new Date().getDate();
        const dateRange = dateCompare - 7;
        const previousMonth = Number(monthCompare) - 1;
        if (dateCompare >= 7) {
            this.getRefilteredListBasedOnDate(yearCompare, monthCompare);
            this.cpyCandidateList.forEach((data) => {
                const date = Number(data.interviewDate.slice(8, 10));
                if (date <= dateCompare && date >= dateRange) {
                    this.copyCandidateList.push(data);
                }
            });
        } else {
            this.copyCandidateList = [];
            this.candidateList.forEach((data) => {
                const year = data.interviewDate.slice(0, 7);
                const month = data.interviewDate.slice(5, 7);
                const date = Number(data.interviewDate.slice(8, 10));
                if (year.includes(yearCompare)
                    && (month.includes(monthCompare) || month.includes(previousMonth.toString()))
                    && (date >= 26 || date <= 6)) {
                    this.copyCandidateList.push(data);
                }
            });
        }
        this.candidateList = [];
        this.candidateList = this.copyCandidateList;
        this.getListPerPage();
        this.requestUpdate();
    }

    /**
     * Helper function for filtering list of candidates based on date
     * @param year (year value)
     * @param month (month value)
     */
    getRefilteredListBasedOnDate(year, month) {
        this.copyCandidateList = [];
        this.cpyCandidateList = [];
        this.list.forEach((data) => {
            const yearCompare = data.interviewDate.slice(0, 7);
            const monthCompare = data.interviewDate.slice(5, 7);
            if (yearCompare.includes(year) && monthCompare.includes(month)) {
                this.cpyCandidateList.push(data);
            }
        });
    }

    /**
     *Below function is used for filtering list of candidates
     */
    selectOptions() {
        const option = (this.shadowRoot.getElementById('selectOption') as HTMLOptionElement).value;
        this.currentPage = 1;
        if (option === '1') {
            this.displayMonthHandler = 1;
        } else if (option === '2') {
            this.displayMonthHandler = 0;
            this.getLastWeekData();
        } else {
            this.displayMonthHandler = 0;
            this.getCandidateList();
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
   * This function fetch recruiter list from API
   */
    async getInterviewerList() {
        const res: Response = await ApiService.getInterviewer();
        this.interviewers = Object.values(await res.json());
        this.requestUpdate();
    }
/**
 * Function to show the Interview Status button
 */
    showInterviewStatus() {
        this.interviewStatus = true;
        this.requestUpdate();
    }
    /**
 * Function to hide the Interview Status button
 */
    hideInterviewStatus() {
        this.interviewStatus = false;
        this.requestUpdate();
    }
    /**
     * Lifecycle of Lit-element
     * Renders candidate list component
     * @category LifeCycle
     * @returns
     */
    render() {
        return html`
                <head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                </head>
                <body>
                    ${this.templateId
                ? html`
                    <!-- Second parameter of until is optional -->
                    <div class="amadeus-hos-res-cn-hello-world-wrapper">
                        ${until(this.loadVariation(this.templateId))}
                    </div>
                    `
                : html``}
                    <amadeus-hos-res-wc-add-candidate .popUpForm='${this.popUp}' templateId='variation-1' .email='${this.email}'
                        .name='${this.name}' .role='${this.role}' @closeForm="${this.openForm}"
                        @newCandidateDetails="${this.getFormDetails}"> </amadeus-hos-res-wc-add-candidate>

        `;
    }
}

