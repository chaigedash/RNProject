import {Difficulty, QuestionType, ResourceType} from "./Enums.ts";

export type inputType = {
    value: string,
    errorMessage: string,
}
export type verifyType = {
    success: boolean,
    message: string,
}
export type userBasicInfoType = {
    uid: string,
    userName: string,
    avatar: string,
    school: string,
    major: string,
}
export type resourceBasicInfoType = {
    id: string,
    title: string,
    intro: string,
    type: ResourceType,
}
export type evaluationBasicInfoType = {
    id: string,
    title: string,
    difficulty: Difficulty,
}
export interface questionBasicInfoType {
    id: string,
    type: (QuestionType | null),
}
export interface gapFillingQuestionType extends questionBasicInfoType {
    title: string[],
    correctAnswer: string[],
}
export interface multipleChoiceQuestionType extends questionBasicInfoType {
    title: string,
    answerList: string[],
    correctAnswer: string[],
}
export interface trueOrFalseQuestionType extends questionBasicInfoType {
    title: string,
    correctAnswer: boolean,
}