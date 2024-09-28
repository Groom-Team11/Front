export const REST_API_KEY = '7438421e5d8a354ef8203fc06284f1da';
export const REDIRECT_URI = 'http://3.36.171.123/oauth2/callback/kakao';
// export const REDIRECT_URI = 'http://localhost:3000/oauth2/callback/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`