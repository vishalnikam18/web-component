/**
 *
 * These are templates for Add Candidate Detail Component
 *
 * @packageDocumentation
 * @module Templates
 */

import { html } from 'lit-element';
import { EmptyCheckTxt, OnlyAlphabetCheckTxt, ValidPhoneNumber, EmailValidation } from '../../../constants/text-constants';
import { ISkill } from '../../../shared/skill';

export function addCandidateDetailTemplate() {
  return html`
 ${this.popUpForm ? html`
  <div class="container">
 <div class="modal" id="myModal">
 <div class="modal-dialog">
      <div class="modal-content shadow-lg p-3 mb-5 bg-white rounded modal-dialog modal-dialog-scrollable">
      <!-- Modal Header -->
        <div class="modal-header">
          <b><h4 class="modal-title">Candidate Details</h4></b>
          <button type="button" class="close" @click=${this.closeForm} data-dismiss="modal">&times;</button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <form class="add-candidate-form">
            <div class="form-grid">
              <div class="form-group">
                <label for="interviewType">Interview Type</label>
                <span>*</span>
                <select name="interviewType" id="interviewType" @change=${this.validator}>
                  <option value="External">External</option>
                  <option value="Internal">Internal</option>
                </select>
                <span id="selected" class="col-12 error" hidden>${EmptyCheckTxt}</span>
              </div>
              <div class="form-group">
                <label for="candidateName">Candidate Name</label>
                <span>*</span>
                <input type="text" id="candidateName" @change=${this.validator} placeholder=" Enter Name" />
                <span id="candidateName1" class="col-12 error" hidden>${EmptyCheckTxt}</span>
                <span id="candidateName2" class="col-12 error" hidden>${OnlyAlphabetCheckTxt}</span>
              </div>
              <div class="form-group">
                <label for="project">Project</label>
                <span>*</span>
                <input type="text" id="project" @change=${this.validator} placeholder="project name" />
                <span id="project1" class="col-12 error" hidden>${EmptyCheckTxt}</span>
              </div>
              <div class="form-group">
                <label for="recruiterName">Recruiter</label>
                <span>*</span>
                <select name="recruiterName" id="recruiterName" @change=${this.validator}>
                  ${this.recruiterList.map((data: any) => {
    return html`
                  <option value=${data.Name}>${data.Name} (${data.EmployeeId})</option>`;
  })}
                </select>
                <span id="recruiterName1" class="col-12 error" hidden>${EmptyCheckTxt}</span>
                <span id="recruiterName2" class="col-12 error" hidden>${OnlyAlphabetCheckTxt}</span>
              </div>
              <div class="form-group">
                <label for="interviewDate">Interview Date</label>
                <span>*</span>
                <input class="dateCandidate" type="date" @change=${this.validator} id="interviewDate"
                  placeholder="Enter Date" />
                <span id="date" class="col-12 error" hidden>${EmptyCheckTxt}</span>
              </div>
              <div class="form-group">
                <label for="interviewRound">Interview Round</label>
                <span>*</span>
                <select name="interviewRound" id="interviewRound" @change=${this.validator}>
                  <option value="Technical Round 1">Technical Round 1</option>
                  <option value="Technical Round 2">Technical Round 2</option>
                  <option value="Technical Round 3">Technical Round 3</option>
                </select>
                <span id="round" class="col-12 error" hidden>${EmptyCheckTxt}</span>
              </div>
              <div class="form-group">
                <label for="interviewMode">Interview Mode</label>
                <span>*</span>
                <select name="interviewMode" id="interviewMode" @change=${this.validator}>
                  <option value="Teams">Teams</option>
                  <option value="Skype">Skype</option>
                  <option value="Call">Call</option>
                  <option value="Online">Other Online medium</option>
                  <option value="Skype">Skype</option>
                  <option value="FaceToFace">Face to face</option>
                </select>
                <span id="mode" class="col-12 error" hidden>${EmptyCheckTxt}</span>
              </div>
              <div class="form-group">
                <label for="status">Status</label>
                <span>*</span>
                <select name="status" id="status" @change=${this.validator}>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                  <option value="NA">NA</option>
                </select>
                <span id="status1" class="col-12 error" hidden>${EmptyCheckTxt}</span>
              </div>
              <div class="form-group">
                <label for="designation">Designation</label>
                <span>*</span>
                <select name="designation" id="designation" @change=${this.validator}>
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
                <span id="designation1" class="col-12 error" hidden>${EmptyCheckTxt}</span>
              </div>
              <div class="form-group">
                <label for="exp">Experience <small>(in years) </small></label>
                <span>*</span>
                <input type="number" id="exp" @change=${this.validator} placeholder="Enter Experience in years" min='0'
                  maxlength='3' />
                <span id="exp1" class="col-12 error" hidden>${EmptyCheckTxt}</span>
              </div>
              <div class="form-group">
                <label for="phoneNumber">Phone Number</label>
                <span>*</span>
                <input type="tel" id="phoneNumber" @change=${this.validator} placeholder="Enter Phone Number"
                  maxlength='10' pattern='[5-9]{1}[0-9]{9}' />
                <span id="phoneNumber1" class="col-12 error" hidden>${EmptyCheckTxt}</span>
                <span id="phoneNumber2" class="col-12 error" hidden>${ValidPhoneNumber}</span>
              </div>
              <div class="form-group">
                <label for="joiningStatus">Joining Status</label>
                <span>*</span>
                <select name="joiningStatus" id="joiningStatus" @change=${this.validator}>
                  <option value="Confirm">Confirm</option>
                  <option value="Pending">Pending</option>
                  <option value="NA">NA</option>
                </select>
                <span id="joiningStatus1" class="col-12 error" hidden>${EmptyCheckTxt}</span>
              </div>
              <div class="form-group">
                <label for="profileSummary">Profile Summary</label>
                <textarea id="profileSummary" name="profileSummary" rows="2" cols="50">
            </textarea>
                <span id="profileSummary" class="col-12 error" hidden></span>
              </div>
              <div class="form-group">
                <label for="feedback" class="labelFeedback">Evaluation Feedback</label>
                <textarea id="feedback" name="feedback" rows="2" cols="50" class="feedback">
            </textarea>
                <span id="feedback" class="col-12 error" hidden></span>
              </div>
              <div class="form-group">
                ${this.role === 'Admin' ? html`
                <label for="interviewer">Interviewer</label>
                <span></span>
                <input type="text" id="interviewer" placeholder="interviewer name" @change=${this.validator} />
                <span id="interviewer1" class="col-12 error" hidden>${EmptyCheckTxt}</span>
                <span id="interviewer2" class="col-12 error" hidden>${OnlyAlphabetCheckTxt}</span>` : html``}
              </div>
              <div class="form-group">
                ${this.role === 'Admin' ? html`
                <label for="email">Email</label>
                <span>*</span>
                <input type="email" id="email" placeholder="interviewer email" @change=${this.validator} />
                <span id="email1" class="col-12 error" hidden>${EmptyCheckTxt}</span>
                <span id="email2" class="col-12 error" hidden>${EmailValidation}</span>` : html``}
              </div>
            </div>
            <div class="form-group">
              <label for="Skills">Skills</label>
              <div class="scroll">
                <div class="checkboxes">
                  ${this.skills.map((data: ISkill) => {
    return html`
                  <input type='checkbox' id='skills' class="form-control checkBackground" value=${data.skill_name}
                    @click='${this.skillArray.bind(this, data.skill_name)}'>
                  <label for="${data.skill_name}">${data.skill_name}</label>`;
  })}
                </div>
              </div>
              <span id="skill" class="col-12 error" hidden>${EmptyCheckTxt}</span>
            </div>
          </form>
        </div>
        <div class="modal-footer">
        <div class="form-button">
          ${this.formEnable ? html`
          <button type="button" class="btn btn-primary" id="register" @click=${this.saveForm}>Save</button>
          ` : html`
          <button type="button" class="btn btn-primary" disabled id="register" @click=${this.saveForm}>Save</button>
          `}
          ${this.formEnable ? html`
          <button type="button" class="btn btn-primary reset-btn" @click=${this.saveAndAddAnotherCandidate}>
            Save and Add another candidate
          </button>
          ` : html`
          <button type="button" class="btn btn-primary reset-btn" disabled @click=${this.saveAndAddAnotherCandidate}>
            Save and Add another candidate
          </button>
          `}
        </div>
        </div>
        <div>
        <span id="duplicateEntry" class="error"></span>
       </div>
      </div>
    </div>
  </div>
</div>` : html``}
`;
}

