interface UserTraits {
    id: number;
    username: string;
    email: string;
    password: string;
    phone: string;
    token: string;
    location: string;
    isVerify: boolean;
    reputation: number;
    createdAt: Date,
    updatedAt: Date
}

export default UserTraits