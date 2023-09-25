import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./dto/request/auth";
import { SignInResponseDto, SignUpResponseDto } from "./dto/response/auth";
import ResponseDto from "./dto/response";
import { GetSignInUserResponseDto } from "./dto/response/user";

// description: API Domain 주소 //
const API_DOMAIN = 'http://localhost:4000/api/v1';
// description: Authorization Header //
const atuhorization = (token: string) => { 
    return { headers: { Authorization: `Bearer ${token}` } };
};  // ! { headers: { Authorization: `Bearer ${token}` } } Bearer 토큰 사용하는 방식

// description: sign up API end point //
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
// description: sign in API end point //
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;

// description: sign up request //
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then(response => {
            const responseBody: SignUpResponseDto = response.data;
            const { code } = responseBody;
            return code;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            const { code } = responseBody;
            return code;
        });
    return result;
};

// description: sign in request //
export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(response => {
            const responseBody: SignInResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

// description: get sign in user API end point //
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

// description: get sign in request //
export const getSignInRequest = async (token: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_URL(), atuhorization(token))
        .then(response => {
            const responseBody: GetSignInUserResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};