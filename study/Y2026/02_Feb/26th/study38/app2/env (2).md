ROOT_PATH=/app1

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_ACCESS_DB=0
REDIS_REFRESH_DB=1

KAKAO_REST_API_KEY=2335d3f9615cf12a0f79dcc1cf2b12be
KAKAO_CLIENT_SECRET=RQwhTpI344yix3PrMAkG6dvLyZzrkSEl

# 컨테이너에 올릴려면 도메인이 필요함
KAKAO_AUTHORIZE_URL=https://kauth.kakao.com/oauth/authorize
KAKAO_TOKEN_URL=https://kauth.kakao.com/oauth/token
KAKAO_API_BASE_URL=https://kapi.kakao.com/

# 카카오 로그인 리다이렉트 URI에 추가
# 카카오 클라이언트 시크릿 중 로그인 코드
KAKAO_REDIRECT_URI=http://aiedu.tplinkdns.com:6303/app1/oauth/callback/kakao
# KAKAO_REDIRECT_URI=http://t3s3.quadecologics.cloud:6303/oauth/callback/kakao
# KAKAO_REDIRECT_URI=http://localhost:8000/app1/oauth/callback/kakao

KAKAO_USER_INFO_URL=https://kapi.kakao.com/v2/user/me
KAKAO_USER_LOGOUT_URL=https://kapi.kakao.com/v1/user/logout

DNS=aiedu.tplinkdns.com
# DNS=t3s3.quadecologics.cloud
# DNS=localhost

SECURE=False