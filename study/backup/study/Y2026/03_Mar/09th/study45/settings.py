from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
  mariadb_user: str
  mariadb_password: str
  mariadb_host: str
  mariadb_port: int

  # source_database: str
  # target_database: str
  
  model_config = SettingsConfigDict(
    env_file=".env",
    env_file_encoding="utf-8",
  )

settings = Settings()
