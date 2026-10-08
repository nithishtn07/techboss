import urllib.request
import urllib.error
import json
import psycopg2

BASE_URL = "http://127.0.0.1:8000"
DB_URL = "postgresql://postgres@127.0.0.1:5432/techboss"

def request_json(path, data=None):
    url = f"{BASE_URL}{path}"
    req = urllib.request.Request(
        url,
        headers={"Content-Type": "application/json"} if data else {},
        data=json.dumps(data).encode("utf-8") if data else None,
        method="POST" if data else "GET"
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode("utf-8"))

def run_tests():
    print("=== 1. Testing GET /api/health ===")
    status, body = request_json("/api/health")
    print(f"Status: {status}, Body: {body}")
    assert status == 200
    assert body.get("status") == "ok"
    print("PASS: Health check OK\n")

    print("=== 2. Testing POST /api/questions ===")
    question_payload = {
        "name": "Karthik Raja",
        "email": "karthik.raja@example.com",
        "category": "Smartphones",
        "question": "Which phone under Rs 25,000 has the best camera and battery for college use?"
    }
    status, body = request_json("/api/questions", question_payload)
    print(f"Status: {status}, Body: {body}")
    assert status in (200, 201)
    assert body.get("success") is True
    print("PASS: Question submitted successfully\n")

    print("=== 3. Testing POST /api/questions with Invalid Email ===")
    bad_payload = {
        "name": "Arun",
        "email": "not-an-email",
        "category": "AI",
        "question": "How to start learning generative AI?"
    }
    status, body = request_json("/api/questions", bad_payload)
    print(f"Status: {status}, Body: {body}")
    assert status == 422
    assert body.get("success") is False
    print("PASS: Validation correctly caught invalid email\n")

    print("=== 4. Testing POST /api/newsletter ===")
    import time
    ts = int(time.time())
    email_payload = {"email": f"subscriber_{ts}@example.com"}
    status, body = request_json("/api/newsletter", email_payload)
    print(f"Status: {status}, Body: {body}")
    assert status == 200
    assert body.get("success") is True
    print("PASS: Newsletter subscribed successfully\n")

    print("=== 5. Testing POST /api/newsletter (Duplicate Check) ===")
    status, body = request_json("/api/newsletter", email_payload)
    print(f"Status: {status}, Body: {body}")
    assert status == 200
    assert body.get("success") is False
    assert "already subscribed" in body.get("message", "").lower()
    print("PASS: Duplicate newsletter subscription cleanly rejected\n")

    print("=== 6. Verifying Direct Records in PostgreSQL Database ===")
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    cur.execute("SELECT id, name, email, category, question, created_at FROM questions ORDER BY id DESC LIMIT 5")
    questions = cur.fetchall()
    print("Questions in PostgreSQL:")
    for q in questions:
        print(f"  ID: {q[0]} | Name: {q[1]} | Email: {q[2]} | Category: {q[3]} | Created: {q[5]}")
    assert len(questions) >= 1

    cur.execute("SELECT id, email, created_at FROM newsletter_subscribers ORDER BY id DESC LIMIT 5")
    subscribers = cur.fetchall()
    print("\nNewsletter Subscribers in PostgreSQL:")
    for s in subscribers:
        print(f"  ID: {s[0]} | Email: {s[1]} | Created: {s[2]}")
    assert len(subscribers) >= 1

    cur.close()
    conn.close()
    print("\nPASS: All database records confirmed in PostgreSQL!")
    print("\nALL BACKEND API AND DATABASE TESTS PASSED SUCCESSFULLY! [SUCCESS]")

if __name__ == "__main__":
    run_tests()
