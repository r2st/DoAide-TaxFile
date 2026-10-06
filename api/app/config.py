from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+psycopg://taxfile:taxfile@localhost:5432/taxfile"
    SECRET_KEY: str = "change-me-in-production"
    CORS_ORIGINS: list[str] = ["http://localhost:3066", "https://tax.doaide.com"]

    model_config = {"env_prefix": "TAXFILE_"}


settings = Settings()
