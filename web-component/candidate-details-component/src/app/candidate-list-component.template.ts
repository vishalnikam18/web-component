/**
 *
 * These are templates for Interview Summary Component
 *
 * @packageDocumentation
 * @module Templates
 */

import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { InterviewMode, InterviewType, JoiningStatus, Status } from './constants/text-constants';


import { ISkill } from './shared/skill';
import { IRecruiter } from './recruiter.interface';

export function candidateListTemplate() {
    return html`

        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        </head>
        <body>
            <div class="row alignTop m-0">
                <div class='col-md-2'>
                    <button type="button" class="equalSize  btn btn-primary" data-toggle="modal" data-target="#myModal" @click=${this.openForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="23" height="23" viewBox="0 0 32 32" style=" fill:#fff;"><path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 15 11 L 15 15 L 11 15 L 11 17 L 15 17 L 15 21 L 17 21 L 17 17 L 21 17 L 21 15 L 17 15 L 17 11 Z"></path></svg> Add Candidate Details
                    </button><br><br>
                    ${this.role === 'Interviewer' ? html`` : html`
                    <div>
                        <span class="equalSize themeColor"> Filter List Based On Date:</span>
                        <select class="form-select equalSize form-control" aria-label="Default select example"
                            @change='${this.selectOptions}' id='selectOption'>
                            <option value="" disabled selected hidden>Choose option</option>
                            <option value="1">Based on month & year</option>
                            <option value="2">Last week data</option>
                            <option value="3">All data</option>
                        </select>
                        ${this.displayMonthHandler === 1 ?
                html`<div class='calender'>
                            <input class="form-control" type="month" id='month' @change='${this.getListBasedOnMonthYear}'>
                        </div>` : html``}
                    </div>`}
                </div>
                <div class='col-md-8'>
                    ${this.role === 'Interviewer' ? html` ` : html`
                    <div class='summary'>
                        <amadeus-hos-res-candidate-list-summary .candidateListSummary='${this.candidateList}'
                            templateId='variation-1'></amadeus-hos-res-candidate-list-summary>
                    </div>
                    <div class='center text-center'>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" @click='${this.showInterviewStatus}'>
                         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 32 32" style=" fill:#fff;"><path d="M 9.5 4 C 7.578125 4 6 5.578125 6 7.5 C 6 9.421875 7.578125 11 9.5 11 C 11.421875 11 13 9.421875 13 7.5 C 13 5.578125 11.421875 4 9.5 4 Z M 22.5 4 C 20.578125 4 19 5.578125 19 7.5 C 19 9.421875 20.578125 11 22.5 11 C 24.421875 11 26 9.421875 26 7.5 C 26 5.578125 24.421875 4 22.5 4 Z M 9.5 6 C 10.339844 6 11 6.660156 11 7.5 C 11 8.339844 10.339844 9 9.5 9 C 8.660156 9 8 8.339844 8 7.5 C 8 6.660156 8.660156 6 9.5 6 Z M 22.5 6 C 23.339844 6 24 6.660156 24 7.5 C 24 8.339844 23.339844 9 22.5 9 C 21.660156 9 21 8.339844 21 7.5 C 21 6.660156 21.660156 6 22.5 6 Z M 9 12 C 6.792969 12 5 13.792969 5 16 L 5 21.25 L 7 22.25 L 7 28 L 9 28 L 9 21 L 7 20 L 7 16 C 7 14.898438 7.898438 14 9 14 L 10.15625 14 C 10.917969 14 11.597656 14.410156 11.9375 15.09375 L 13.21875 17.65625 L 16.28125 20.0625 L 17.71875 18.65625 L 14.78125 16.34375 L 13.71875 14.21875 C 13.035156 12.855469 11.679688 12 10.15625 12 Z M 21.84375 12 C 20.320313 12 18.964844 12.855469 18.28125 14.21875 L 17.21875 16.34375 L 16.8125 16.65625 L 18.125 17.6875 L 18.4375 17.9375 L 18.78125 17.65625 L 20.0625 15.09375 C 20.402344 14.410156 21.082031 14 21.84375 14 L 23 14 C 24.117188 14 25 14.882813 25 16 L 25 20.03125 L 23.5625 20.75 L 23 21 L 23 28 L 25 28 L 25 22.25 L 27 21.25 L 27 16 C 27 13.800781 25.199219 12 23 12 Z M 10 21 L 10 28 L 12 28 L 12 21 Z M 20 21 L 20 28 L 22 28 L 22 21 Z"></path></svg> Interview Status
                    </button>

                    </div>
                            ${this.interviewStatus ? html`<interview-status @closeInterviewStatusModal="${this.hideInterviewStatus}"
                            .interviewStatusList = '${this.candidateList}' .interviewerList = '${this.interviewers}' />` : html``}
                    `}
                </div>
                <div class='col-md-2'>
                    <button type="button" class="equalSize  btn btn-primary" @click="${this.exportToExcel.bind(this)}"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 32 32" style=" fill:#fff;"><path d="M 6 4 L 6 28 L 26 28 L 26 20 L 24 22 L 24 26 L 8 26 L 8 6 L 24 6 L 24 10 L 26 12 L 26 4 Z M 22.40625 11 L 21 12.40625 L 23.5625 15 L 13.90625 15 L 13.90625 17 L 23.5625 17 L 21 19.59375 L 22.40625 21 L 26.71875 16.71875 L 27.40625 16 L 26.71875 15.28125 Z"></path></svg> Export </button><br><br>
                    ${this.enableSave ? html`
                    <button type="button" class="equalSize btn btn-primary" @click="${this.saveData.bind(this)}"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 32 32" style=" fill:#fff;"><path d="M 5 5 L 5 27 L 27 27 L 27 9.59375 L 26.71875 9.28125 L 22.71875 5.28125 L 22.40625 5 Z M 7 7 L 10 7 L 10 13 L 22 13 L 22 7.4375 L 25 10.4375 L 25 25 L 23 25 L 23 16 L 9 16 L 9 25 L 7 25 Z M 12 7 L 16 7 L 16 9 L 18 9 L 18 7 L 20 7 L 20 11 L 12 11 Z M 11 18 L 21 18 L 21 25 L 11 25 Z"></path></svg> Save</button>
                    ` :
            html`
                    <button type="button" class="equalSize btn noCursor disableStyle" disabled @click="${this.saveData.bind(this)}"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 32 32" style=" fill:#fff;"><path d="M 5 5 L 5 27 L 27 27 L 27 9.59375 L 26.71875 9.28125 L 22.71875 5.28125 L 22.40625 5 Z M 7 7 L 10 7 L 10 13 L 22 13 L 22 7.4375 L 25 10.4375 L 25 25 L 23 25 L 23 16 L 9 16 L 9 25 L 7 25 Z M 12 7 L 16 7 L 16 9 L 18 9 L 18 7 L 20 7 L 20 11 L 12 11 Z M 11 18 L 21 18 L 21 25 L 11 25 Z"></path></svg>Save </button> `}
                </div>

                </div>
            </div>
            <div class="tableStyle" >
            <div class="tableFixHead">
            <table class="table table-striped table-bordered" id="myTable1">
                    <thead>
                        <tr>
                            <th><div class="sAction">Sr.No</div><br></th>
                            <th><div class="sAction">Action</div><br></th>
                            <th><div class="widthSame">Interview Type</div>
                                <select class="form-select dropDown" aria-label="Default select example"
                                    @change="${this.filterDropDown.bind(this, 'interviewTypeOptions')}"
                                    id="interviewTypeOptions">
                                    ${InterviewType.map((val, index) => {
                                        if (index === 0) {
                                            return html`<option .value="${val}" hidden selected>${val}</option>`;
                                        }
                                        if (index === 1) {
                                            return html`<option .value="${val}" hidden>${val}</option>`;
                                        }
                                            return html`<option .value="${val}">${val}</option>`;
                                    })}<br><br>
                            </th>
                            <th><div class="widthSame">Candidate Name</div><br></th>
                            <th><div class="widthSame">Project</div><br></th>
                            <th><div class="widthSame">Recruiter Name</div><br></th>
                            <th><div class="widthSame">Interviewer</div>
                                <select class="form-select dropDown" aria-label="Default select example" @change = "${this.filterDropDown.bind(this, 'interviewerOptions')}"
                                id='interviewerOptions'>
                                <option value = 'Select Option' hidden selected>Select Option</option>
                                <option value = 'Select All List' hidden>Select All List</option>
                                <option value = 'Select all Options'>Select all Options</option>
                                ${this.interviewers.map((val) => {
                                    return html`<option .value="${val}">${val}</option>`;
                                })}
                                </select>
                            </th>
                            <th><div class="widthSame">Interview Date</div><br></th>
                            <th><div class="widthSame">Interview Round</div><br></th>
                            <th><div class="widthSame">Interview Mode</div>
                                <select class="form-select dropDown" aria-label="Default select example"
                                    @change="${this.filterDropDown.bind(this, 'interviewModeOptions')}"
                                    id="interviewModeOptions">
                                    ${InterviewMode.map((val, index) => {
                                        if (index === 0) {
                                            return html`<option .value="${val}" hidden selected>${val}</option>`;
                                        }
                                        if (index === 1) {
                                            return html`<option .value="${val}" hidden>${val}</option>`;
                                        }
                                        return html`<option .value="${val}">${val}</option>`;
                                    })}
                                </select>
                            </th>
                            <th><div class="widthSame">Status</div>
                                <select class="form-select dropDown" aria-label="Default select example"
                                    @change="${this.filterDropDown.bind(this, 'statusOptions')}" id="statusOptions">
                                    ${Status.map((val, index) => {
                                        if (index === 0) {
                                            return html`<option .value="${val}" hidden selected>${val}</option>`;
                                        }
                                        if (index === 1) {
                                            return html`<option .value="${val}" hidden>${val}</option>`;
                                        }
                                        return html`<option .value="${val}">${val}</option>`;
                                    })}
                                </select>
                            </th>
                            <th><div class="widthSame">Designation</div><br></th>
                            <th><div class="widthSame">Experience<small> (in years)</small></div><br></th>
                            <th><div class="widthSame">Phone No</div><br></th>
                            <th><div class="widthSame">Joining status</div>
                                <select class="form-select dropDown" aria-label="Default select example"
                                    @change="${this.filterDropDown.bind(this, 'joiningStatusOptions')}"
                                    id="joiningStatusOptions">
                                    ${JoiningStatus.map((val, index) => {
                                        if (index === 0) {
                                            return html`<option .value="${val}" hidden selected>${val}</option>`;
                                        }
                                        if (index === 1) {
                                            return html`<option .value="${val}" hidden>${val}</option>`;
                                        }
                                        return html`<option .value="${val}">${val}</option>`;
                                    })}
                                </select>
                            </th>
                            <th class='colWidth'><div class="widthSame">Skills</div><br><span></span>
                            </th>
                            <th class='colWidth'><div class="widthSame">Profile Summary</div><br></th>
                            <th class='colWidth'><div class="widthSame">Feedback</div><br></th>
                        </tr>
                    </thead>
                    ${this.copyCandidateList.map((data, index) => {
                return html`
                    <tr>
                        <td class="text-center">
                            <div >
                                ${this.candidateList.map((c) => {
                                const indexObj = [];
                                if (c._id === data._id) {
                                    indexObj.push(c);
                                }
                                if ((this.candidateList.indexOf(indexObj[0]) + 1) > 0) {
                                    return (this.candidateList.indexOf(indexObj[0]) + 1);
                                }
                            })}
                            </div>
                        </td>

                        <td class="text-center">
                            ${this.email === data.email || this.role === 'Admin' ? html`
                            ${this.editArray[index].editable ? html`
                                <div class="divHeight" style="height: 150px">
                                <i class="fa fa-close Cursor" title="Cancel"style="font-size:16px; color :#FAA61F"
                                    @click="${this.cancelEdit.bind(this, index)}"></i>`
                                 : html`
                                <i class="fa fa-edit Cursor" title="Edit" style="font-size:16px; color : #1F73AA"
                                    @click="${this.editFields.bind(this, index)}"></i>`}` : html``}
                        </td>

                        <td class="text-center">${this.editArray[index].editable ? html`<div class="divHeight">
                            <select name="interviewType" id="interviewType+${index}"
                                @change="${this.updateCandidateList.bind(this)}"
                                .value="${this.copyCandidateList[index].interviewType}" class="form-control">
                                <option id="External">External</option>
                                <option id="Internal">Internal</option>
                            </select>
                        </div>` : html`${data.interviewType}`}
                        </td>

                        <td class="text-center">${this.editArray[index].editable ? html`<div class="divHeight">
                            <input type="text" id="candidateName+${index}"
                                class="form-control" value="${data.candidateName}"
                                @change="${this.updateCandidateList.bind(this)}">
                        </div>` : html`${data.candidateName}`}
                        </td>

                        <td class="text-center">${this.editArray[index].editable ? html`<div class="divHeight">
                            <input type="text" id="project+${index}"
                                class="form-control" value="${data.project}" @change="${this.updateCandidateList.bind(this)}">
                        </div>`
                        : html`${data.project}`}
                        </td>

                        <td class="text-center">${this.editArray[index].editable ? html`<div class="divHeight"><select name="recruiterName" id="recruiterName+${index}"
                                class="form-control" value="${data.recruiterName}"
                                @change="${this.updateCandidateList.bind(this)}">
                                ${this.recruiterList.map((recruiter: IRecruiter) => {
                            return html` <option value=${recruiter.Name}>
                                    ${recruiter.Name} (${recruiter.EmployeeId})
                                </option>`;
                        })}
                            </select></div>` : html`${data.recruiterName}`}
                        </td>

                        <td class="text-center">${this.editArray[index].editable ? html`
                                <div class="divHeight"><input class="form-select form-control"  value = '${data.interviewer}' aria-label="Default select example" @change = "${this.updateCandidateList.bind(this)}"
                                id="interviewer+${index}">
                            </div>` : html`${data.interviewer}`}
                        </td>

                        <td class="text-center">${this.editArray[index].editable ? html`<div class="divHeight"><input type="date" id="interviewDate+${index}"
                                class="form-control" value="${data.interviewDate.slice(0, 10)}"
                                @change="${this.updateCandidateList.bind(this)}"></div>` : html`${data.interviewDate.slice(0,
                            10).split('-').reverse().join('-')}`}
                        </td>

                        <td class="text-center">${this.editArray[index].editable ? html`<div class="divHeight">
                        <select class="form-control" name="interviewRound" id="interviewRound+${index}"  @change="${this.updateCandidateList.bind(this)}">
                            <option value="Technical Round1">Technical Round1</option>
                            <option value="Technical Round2">Technical Round2</option>
                            <option value="Technical Round3">Technical Round3</option>
                        </select>
                        </div>` : html`${data.interviewRound}`}
                        </td>

                        <td class="text-center">${this.editArray[index].editable ? html`<div class="divHeight"><select id="interviewMode+${index}" class="form-control"
                                .value="${data.interviewMode}" @change="${this.updateCandidateList.bind(this)}">
                                <option id="Teams">Teams</option>
                                <option id="Skype">Skype</option>
                                <option id="Call">Call</option>
                                <option id="Online">Online</option>
                                <option id="Face to Face">Face to Face</option>
                            </select></div>` : html`${data.interviewMode}`}
                        </td>

                        <td class="text-center">${this.editArray[index].editable ? html`<select name="status" id="status+${index}"
                                @change="${this.updateCandidateList.bind(this)}"
                                .value="${this.copyCandidateList[index].status}" class="form-control">
                                <option id="Selected">Selected</option>
                                <option id="Rejected">Rejected</option>
                            </select>` : html`${data.status}`}
                        </td>
                        <td class="text-center">${this.editArray[index].editable ? html`
                                <select name="designation" id="designation+${index}" class="form-control" @change="${this.updateCandidateList.bind(this)}">
                                    <option value="SE">SE</option>
                                    <option value="SSE">SSE</option>
                                    <option value="SA">SA</option>
                                    <option value="SSA">SSA</option>
                                    <option value="Architect">Architect</option>
                                    <option value="QA Engineer">QA Engineer</option>
                                    <option value="Sr. QA Engineer">Sr. QA Engineer</option>
                                    <option value="QA Analyst">QA Analyst</option>
                                    <option value="Sr. QA Analyst">Sr. QA Analyst</option>
                                    <option value="QA Architect">QA Architect</option>
                                </select>
                                `
                        : html`${data.designation}`}
                        </td>
                        <td class="text-center">${this.editArray[index].editable ? html`<input type="number" min='0' id="exp+${index}" class="form-control"
                                value="${data.exp}" @change="${this.updateCandidateList.bind(this)}" maxlength='5' class="widthTen">` :
                        html`${data.exp}`}
                        </td>
                        <td class="text-center">${this.editArray[index].editable ? html`<input type="tel" id="phoneNumber+${index}"
                                class="form-control" value="${data.phoneNumber}" maxlength='10'
                                @change="${this.updateCandidateList.bind(this)}">` : html`${data.phoneNumber}`}
                        </td>

                        <td class="text-center">${this.editArray[index].editable ? html`<select id="joiningStatus+${index}" class="form-control"
                                .value="${data.joiningStatus}" @change="${this.updateCandidateList.bind(this)}">
                                <option id="NA">NA</option>
                                <option id="Confirm">Confirm</option>
                                <option id="Pending">Pending</option>
                            </select>` : html`${data.joiningStatus}`}
                        </td>

                        <td>${this.editArray[index].editable ? html`
                        <div class="scrolldown allowScroll skillArea">
                                ${this.skills.map((skills: ISkill) => {
                                        return html`
                                            <div class="skillGrid" style="width: 140px">
                                                                    <input class="skillbox" type='checkbox' class="form-control" value=${skills.skill_name} @click='${this.editSkillArray.bind(this, skills.skill_name, index)}'>
                                                                    <label for="${skills.skill_name}">${skills.skill_name}</label></div>`;
                                                                    })}
                                            </div>` :
                                    html`${data.skill_name.map((skills: ISkill, indexOfSkill) => {
                                        if (indexOfSkill === data.skill_name.length - 1) {
                                            return skills;
                                        } else {
                                            return skills + ', ';
                                        }
                                    })
                            }`}
                        </td>

                        <td>${this.editArray[index].editable ? html`
                            <div id="profileSummery*${index}" class="form-control editableArea allowScroll"
                                @input="${this.updateCandidateList.bind(this)}" contenteditable="true">
                                ${unsafeHTML(data.profileSummery)}
                            </div>
                            <br>
                            <div class="editor">
                                <button onclick="document.execCommand( 'undo',false,null);" title="undo">
                                    <i class="fa fa-rotate-left" style="font-size:14px"></i>
                                </button>
                                <button onclick="document.execCommand( 'redo',false,null);" title="redo">
                                    <i class="fa fa-rotate-right" style="font-size:14px"></i>
                                </button>
                                <button onclick="document.execCommand('italic',false,null);" title="Italic">
                                    <i class="fa fa-italic" style="font-size:14px"></i>
                                </button>
                                <button onclick="document.execCommand( 'bold',false,null);" title="Bold">
                                    <i class="fa fa-bold" style="font-size:14px"></i>
                                </button>
                                <button onclick="document.execCommand( 'underline',false,null);" title="underline">
                                    <i class="fa fa-underline" style="font-size:14px"></i>
                                </button>
                                <button onclick="document.execCommand( 'strikethrough',false,null);" title="strikethrough">
                                    <i class="fa fa-strikethrough" style="font-size:14px"></i>
                                </button>
                            </div>` : html`${unsafeHTML(data.profileSummery)}`}
                        </td>

                        <td>${this.editArray[index].editable ? html`
                        <div id="feedback*${index}" class="form-control editableArea  allowScroll"
                                @input="${this.updateCandidateList.bind(this)}" contenteditable="true">
                                ${unsafeHTML(data.feedback)}
                        </div><br>
                        <div class="editor">
                                <button onclick="document.execCommand( 'undo',false,null);" title="undo">
                                    <i class="fa fa-rotate-left" style="font-size:14px"></i>
                                </button>
                                <button onclick="document.execCommand( 'redo',false,null);" title="redo">
                                    <i class="fa fa-rotate-right" style="font-size:14px"></i>
                                </button>
                                <button onclick="document.execCommand('italic',false,null);" title="Italic">
                                    <i class="fa fa-italic" style="font-size:14px"></i>
                                </button>
                                <button onclick="document.execCommand( 'bold',false,null);" title="Bold">
                                    <i class="fa fa-bold" style="font-size:14px"></i>
                                </button>
                                <button onclick="document.execCommand( 'underline',false,null);" title="underline">
                                    <i class="fa fa-underline" style="font-size:14px"></i>
                                </button>
                                <button onclick="document.execCommand( 'strikethrough',false,null);" title="strickthrough">
                                    <i class="fa fa-strikethrough" style="font-size:14px"></i>
                                </button>
                            </div>
                            ` : html`${unsafeHTML(data.feedback)}`}
                            <br>
                        </td>
                    </tr>`;
            })}
                </table>
                ${this.candidateList.length === 0 ? html`<span class='message'>No Data Found</span> ` : html``}
            </div>
            </div>
            ${this.candidateList.length === 0 ? html` ` : html`
            ${this.candidateList.length > this.itemsPerPage ?
                html`<div>
                <div class="btn-container text-center">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            ${this.currentPage === 1 ? html`
                            <li class="page-item text-center"><a class="page-link disabled noCursor"> Previous </a> </li>
            <li class="page-item"><span> ${this.currentPage} </span></li>
                            ` : html`
                            <li class="page-item text-center"><a class="page-link Cursor"
                                    @click='${this.filterDataForPagination.bind(this, 'previous')}'> Previous </a> </li>
                            <li class="page-item"><span>${this.currentPage}</span></li>
                            `}
                            ${this.currentPage === this.totalPages ? html`
                            <li class="page-item text-center"> <a class="page-link disabled noCursor"> Next </a></li>
                            ` : html`
                            <li class="page-item text-center"> <a class="page-link Cursor"
                                    @click='${this.filterDataForPagination.bind(this, 'next')}'> Next </a></li>
                            `}
                        </ul>
                    </nav>
                </div>
            </div> ` :
                html`
            <div class="btn-container center">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item text-center"><a class="page-link disabled noCursor"> Previous </a> </li>
                        <li class="page-item"><span>${this.currentPage}</span></li>
                        <li class="page-item text-center"> <a class="page-link disabled noCursor"> Next </a></li>
                    </ul>
                </nav>
            </div>
            `}
            `}
            <table class="table table-striped table-bordered center" id="myTable">
                <thead>
                    <tr>
                        <th class="text-center">Sr.No</th>
                        <th class="text-center">Interview Type</th>
                        <th class="widthTen">Candidate Name</th>
                        <th>Project</th>
                        <th>Recruiter Name</th>
                        <th>Interview Date</th>
                        <th>Interview Round</th>
                        <th>Interview Mode</th>
                        <th>Status</th>
                        <th>Designation</th>
                        <th>Exp</th>
                        <th>Phone No</th>
                        <th>Joining status</th>
                        <th class='colWidth'>Profile Summary</th>
                        <th class='colWidth'>Feedback</th>
                    </tr>
                </thead>
                ${this.candidateList.map((data, index) => {
                    return html`
                <tr>
                    <td>${index + 1}</td>
                    <td>${data.interviewType}</td>
                    <td>${data.candidateName}</td>
                    <td>${data.project}</td>
                    <td>${data.recruiterName}</td>
                    <td>${data.interviewDate.slice(0, 10).split('-').reverse().join('-')} </td>
                    <td>${data.interviewRound}</td>
                    <td>${data.interviewMode}</td>
                    <td>${data.status}</td>
                    <td>${data.designation}</td>
                    <td>${data.exp}</td>
                    <td>${data.phoneNumber}</td>
                    <td>${data.joiningStatus}</td>
                    <td>${unsafeHTML(data.profileSummery)}</td>
                    <td>${unsafeHTML(data.feedback)}</td>
                </tr>`;
                })}
            </table>
        </body>
     `;
}
