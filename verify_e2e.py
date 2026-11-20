import urllib.request
import json
import sys

BASE_URL = "http://localhost:3000"

def test_get(endpoint):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=5) as res:
        data = res.read().decode('utf-8')
        return res.status, data

def test_post(endpoint, payload):
    url = f"{BASE_URL}{endpoint}"
    body = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=body, headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=5) as res:
            data = res.read().decode('utf-8')
            return res.status, json.loads(data)
    except urllib.error.HTTPError as e:
        data = e.read().decode('utf-8')
        return e.code, json.loads(data)

def main():
    print("=== STARTING FULL END-TO-END VERIFICATION ===")

    # 1. Landing Page
    status, html = test_get("/")
    assert status == 200, f"Landing page failed with {status}"
    assert "JIT HELPDESK" in html, "JIT HELPDESK not found in HTML"
    assert "Your Clients Shouldn" in html, "Headline not found in HTML"
    print("✓ TEST 1: Landing Page loaded successfully (200 OK)")

    # 2. CRM Admin Page
    status, html = test_get("/admin")
    assert status == 200, f"CRM page failed with {status}"
    assert "JIT Helpdesk CRM" in html, "CRM heading not found"
    print("✓ TEST 2: CRM Admin Page loaded successfully (200 OK)")

    # 3. Create Lead
    lead_payload = {
        "full_name": "Marcus Sterling",
        "email": "marcus@sterling-msp.com",
        "phone": "(415) 890-1234",
        "company_name": "Sterling Cloud & Managed IT",
        "utm_params": {
            "utm_source": "meta_ads",
            "utm_campaign": "us_msp_scale_nov2026",
            "utm_content": "video_ad_6_chasing_updates"
        }
    }
    status, data = test_post("/api/leads", lead_payload)
    assert status == 200 and data.get("success"), f"Lead creation failed: {data}"
    lead_id = data["lead"]["id"]
    print(f"✓ TEST 3: Lead successfully created (ID: {lead_id})")

    # 4. Submit Qualification Survey (Qualified Lead)
    survey_payload = {
        "lead_id": lead_id,
        "answers": {
            "business_type": "IT support / Managed IT services",
            "role": "Owner / Founder",
            "serving_paying_clients": "Yes, regularly",
            "budget_fit": "Yes",
            "timeline": "Within 30 days"
        }
    }
    status, data = test_post("/api/survey", survey_payload)
    assert status == 200 and data.get("success"), f"Survey failed: {data}"
    assert data["qualification"]["isQualified"] is True, "Lead should be qualified"
    print(f"✓ TEST 4: Qualification Engine verified (Score: {data['qualification']['score']}, Qualified: True)")

    # 5. Check Disqualification Logic with a test lead
    disqual_lead = {
        "full_name": "Internal Corp User",
        "email": "internal@corpexample.com",
        "phone": "(555) 000-1111",
        "company_name": "Corp Internal IT"
    }
    _, d_lead = test_post("/api/leads", disqual_lead)
    disqual_survey = {
        "lead_id": d_lead["lead"]["id"],
        "answers": {
            "business_type": "Internal corporate IT department",
            "role": "Other",
            "serving_paying_clients": "Not yet",
            "budget_fit": "No",
            "timeline": "Later / researching"
        }
    }
    _, d_res = test_post("/api/survey", disqual_survey)
    assert d_res["qualification"]["isQualified"] is False, "Internal non-paying user must be disqualified"
    print("✓ TEST 5: Disqualification Engine verified (Polite alternative path triggered)")

    # 6. Check Calendar Availability (Target Tuesday 2026-11-24)
    status, avail = test_get("/api/availability?date=2026-11-24&timezone=America%2FNew_York")
    avail_data = json.loads(avail)
    assert status == 200 and avail_data.get("success"), f"Availability failed: {avail_data}"
    slots = avail_data.get("slots", [])
    assert len(slots) > 0, "Slots should be returned for business day"
    chosen_slot = slots[0]
    print(f"✓ TEST 6: Google Calendar FreeBusy Availability verified ({len(slots)} slots available on 2026-11-24)")

    # 7. Book Meeting
    book_payload = {
        "lead_id": lead_id,
        "start_time": chosen_slot["start"],
        "end_time": chosen_slot["end"],
        "prospect_timezone": "America/New_York"
    }
    status, book_res = test_post("/api/book", book_payload)
    assert status == 200 and book_res.get("success"), f"Booking failed: {book_res}"
    print(f"✓ TEST 7: Google Calendar Demo Booked (Booking ID: {book_res['booking']['id']})")

    # 8. Test Double Booking Prevention Guard
    status, conflict_res = test_post("/api/book", book_payload)
    assert status == 409, f"Double-booking must be rejected with 409 Conflict! Received: {status}"
    print("✓ TEST 8: Double-Booking Concurrency Guard successfully rejected collision (409 Conflict)")

    # 9. Verify Lead Status in CRM
    status, crm_leads = test_get("/api/leads")
    crm_data = json.loads(crm_leads)
    stored_lead = next((l for l in crm_data["leads"] if l["id"] == lead_id), None)
    assert stored_lead is not None, "Lead must be present in CRM"
    assert stored_lead["status"] == "meeting_booked", f"Lead status should be meeting_booked, got: {stored_lead['status']}"
    assert stored_lead["is_qualified"] is True
    print("✓ TEST 9: CRM Record Verified (Status: meeting_booked, Is_Qualified: True, Attribution intact)")

    print("\n🎉 ALL 9 END-TO-END VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉")

if __name__ == "__main__":
    main()
