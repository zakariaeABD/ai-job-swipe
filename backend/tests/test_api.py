from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    assert client.get('/health').json() == {'status': 'ok'}

def test_jobs():
    response = client.get('/jobs')
    assert response.status_code == 200
    assert len(response.json()) == 2

def test_unverified_without_official_link():
    response = client.post('/verify', json={'source_url': 'https://example.com/job'})
    assert response.status_code == 200
    assert response.json()['status'] == 'unverified'
