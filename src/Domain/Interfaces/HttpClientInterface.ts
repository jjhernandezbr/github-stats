export interface HttpClientInterface {
    get<T> (endpoint: string): Promise<any>
}
