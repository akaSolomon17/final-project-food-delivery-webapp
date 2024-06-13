export interface Feedback {
    "id": string,
    "name": string,
    "avatar": string,
    "feedback": string,
    "isFeedbackApproved": string,
    "reviews": [Reviews]
}

export interface Reviews {
    "id": string,
    "comment": string,
    "rate": number,
    "food_id": string
}

