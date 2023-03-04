import Axios from 'axios'
import {HttpClientInterface} from "../../Domain/Interfaces/HttpClientInterface";

export class AxiosHttpClient implements HttpClientInterface {
    get(endpoint): Promise<any>{
        let baseUrl = process.env.GITHUB_API;
        Axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
        Axios.defaults.headers.common['Accept'] = "application/vnd.github+json";
        let url = `${baseUrl}${endpoint}`;
        return Axios.get(url);
    };
}
