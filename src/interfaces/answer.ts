interface AnswerTraits {
    id: number;
    body: string;
    authorId: number;
    questionId: number;
    upvotes: number;
    downvotes: number;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

export default AnswerTraits