from elasticsearch import Elasticsearch

from app.core.config import settings

es = Elasticsearch(
    cloud_id=settings.ELASTICSEARCH_CLOUD_ID,
    api_key=settings.ELASTICSEARCH_API_KEY,
)


def get_elasticsearch_client():
    return es
