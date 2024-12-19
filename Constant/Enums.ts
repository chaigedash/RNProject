export enum Route {
    Home = 'Home',
    User = 'User',
    Resource = 'Resource',
    Evaluation = 'Evaluation',
    Statistics = 'Statistics',
    UserMain = 'UserMain',
    Collection = 'Collection',
    UserInfo = 'UserInfo',
    UserName = 'UserName',
    UserSchool = 'UserSchool',
    UserMajor = 'UserMajor',
    PermissionAssignment = 'PermissionAssignment',
    ResourceMain = 'ResourceMain',
    UploadResource = 'UploadResource',
    StatisticsMain = 'StatisticsMain',
    EvaluationMain = 'EvaluationMain',
    ResourceEdit = 'ResourceEdit',
    ResourceDetail = 'ResourceDetail',
    EvaluationDetail = 'EvaluationDetail',
    EvaluationResult = 'EvaluationResult',
    CreateGapFilling = 'CreateGapFilling',
    CreateTrueOrFalse = 'CreateTrueOrFalse',
    CreateMultipleChoice = 'CreateMultipleChoice',
    ChooseQuestionType = 'ChooseQuestionType',
}
export enum ResourceType {
    text = 'text',
    video = 'video',
}
export enum Difficulty {
    easy = 'easy',
    moderate = 'moderate',
    hard = 'hard',
}
export enum QuestionType {
    gapFilling,
    multipleChoice,
    trueOrFalse,
}