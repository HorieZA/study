from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
  title: str ="FastAPI App2"
  root_path: str

  redis_host: str
  redis_port: int
  redis_access_db: int
  redis_refresh_db: int

  kakao_rest_api_key: str
  kakao_client_secret: str

  kakao_authorize_url: str
  kakao_token_url: str
  kakao_api_base_url: str

  kakao_redirect_uri: str

  kakao_user_info_url: str
  kakao_user_logout_url: str

  dns: str
  secure: bool
  
  model_config = SettingsConfigDict(
    env_file=".env",
    env_file_encoding="utf-8",
  )

settings = Settings()
