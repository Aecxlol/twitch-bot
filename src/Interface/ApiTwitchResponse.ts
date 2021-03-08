export interface twitchApiResponse {
    total: number;
    data: Array<{
        from_id: string;
        from_login: string;
        from_name: string;
        to_id: string;
        to_login: string;
        to_name: string;
        followed_at: string;
    }>
}