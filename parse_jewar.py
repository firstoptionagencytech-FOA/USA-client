with open('jewar_helpdesk.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

import re

matches = re.finditer(r'proposal-impact', html)
for m in matches:
    start = max(0, m.start() - 200)
    end = min(len(html), m.end() + 1000)
    print("=== PROPOSAL IMPACT SECTION ===")
    print(html[start:end])

# Also search for dashboard or screenshot sections
print("\n=== SEARCH FOR DASHBOARD / SCREENSHOT / HELP DESK SECTIONS ===")
for m in re.finditer(r'(?:dashboard|screenshot|preview|portal|mobile)', html, re.IGNORECASE):
    s = max(0, m.start() - 50)
    e = min(len(html), m.end() + 100)
    print(html[s:e].strip().replace('\n', ' '))
