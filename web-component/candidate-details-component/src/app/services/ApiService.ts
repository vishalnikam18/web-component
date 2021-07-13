import { IFilter } from '../interfaces';
import {GetAllList, GetAllRecruiters, UpdateCandidateList, CheckFilterUrl, GetAllSkills, GetInterviewerList } from '../constants/constants';
declare const TCCommonService;
/**
 * @ignore
 */
const $http = TCCommonService.$http;

export class ApiServiceClass {

    // API to get the list of all candidates.
    getList(): any {
        return $http.get(GetAllList);
    }

    getRecruiters(): any {
        return $http.get(GetAllRecruiters);
    }

    getSkills(): any {
        return $http.get(GetAllSkills);
    }
    postRecruiters(): any {
        return $http.get(GetAllRecruiters);
    }
    /**
     * This function is used to filter the list of candidate.
     */
     getListBasedOnFilter(filterOptions: IFilter): any {
        console.log(filterOptions);
        return $http.get(
            CheckFilterUrl +
            'interviewType=' +
            filterOptions.interviewType +
            '&interviewMode=' +
            filterOptions.interviewMode +
            '&status=' +
            filterOptions.status +
            '&joiningStatus=' +
            filterOptions.joiningStatus +
            '&flag=' +
            filterOptions.flag +
            '&interviewer=' +
            filterOptions.interviewer
        );
      }

    // API to update the candidate details.

    updateCandidateList(data: any): any {
        return $http.put(UpdateCandidateList + data._id, JSON.stringify(data));
    }

    // API to add new candidate information.
    setNewCandidate(data: any): any {
        return $http
        .post(UpdateCandidateList, JSON.stringify(data));
    }


    // API to get Interviewer List
    getInterviewer(): any {
        return $http.get(GetInterviewerList);
    }
}


export const ApiService = new ApiServiceClass();
