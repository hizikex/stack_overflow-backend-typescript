import TagTraits from "./tag";

interface QuestionTraits {
    id: number;
    title: string;
    body: string;
    authorId: number;
    // tagId: TagTraits[];
    tagId: number;
    upvotes: number;
    downvotes: number;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

export default QuestionTraits