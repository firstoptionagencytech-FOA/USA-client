import urllib.request
import re
import os

url = 'https://jewarinternational.com/product/helpdesk'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read().decode('utf-8', errors='ignore')
        print(f"Fetched {len(html)} bytes")
        with open('jewar_helpdesk.html', 'w', encoding='utf-8') as f:
            f.write(html)
        
        # Extract images and sections
        imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
        print("Total images found:", len(imgs))
        for img in set(imgs):
            if any(ext in img.lower() for ext in ['.png', '.jpg', '.jpeg', '.webp', '.svg']):
                print("Image:", img)
except Exception as e:
    print("Fetch error:", e)
