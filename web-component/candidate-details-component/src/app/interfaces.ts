import { ISkill } from './shared/skill';

export interface ICandidate {

    interviewType: string;
    candidateName: string;
    project: string;
    recruiterName: string;
    interviewDate: string;
    interviewRound: string;
    interviewMode: string;
    interviewer: string;
    status: string;
    designation: string;
    exp: number;
    email: string;
    phoneNumber: string;
    joiningStatus: string;
    profileSummery: string;
    feedback: string;
    flag: boolean;
    skill_name: ISkill[];
}
export interface IFilter {
    condition: string;
    interviewType: string;
    interviewMode: string;
    status: string;
    joiningStatus: string;
    interviewer: string;
    flag: boolean;
}
