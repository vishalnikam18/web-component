/**
 * Constants shared across application
 * @module Constants
 * @preferred
 */

export const GetAllList = 'http://localhost:4000/candidate';
export const GetAllRecruiters = 'http://localhost:4000/recruiter';
export const UpdateCandidateList = 'http://localhost:4000/candidate/';
export const SingleUser = 'http://localhost:4000/api/auth/userData/';
export const CheckFilterUrl = 'http://localhost:4000/candidateListBasedOnFilter?';
export const GetAllSkills = 'http://localhost:4000/skill';
export const GetInterviewerList = 'http://localhost:4000/interviewer';


const APP_GLOBAL_CONSTANTS = {
    events: {
        EVT_BOOK_NOW_CLICK: 'EVT_BOOK_NOW_CLICK'
    }
};
export const AppConstants = Object.freeze(APP_GLOBAL_CONSTANTS);

