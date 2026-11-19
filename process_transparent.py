import os
from PIL import Image
import numpy as np
from collections import deque

def make_transparent(input_path, output_path):
    img = Image.open(input_path).convert('RGBA')
    width, height = img.size
    pixels = np.array(img)

    # We want to remove the background starting from the 4 outer edges (flood fill)
    # Background is off-white (around 240-255)
    visited = np.zeros((height, width), dtype=bool)
    queue = deque()

    # Add all border pixels to queue if they are light/background
    for x in range(width):
        queue.append((0, x))
        queue.append((height - 1, x))
    for y in range(height):
        queue.append((y, 0))
        queue.append((y, width - 1))

    # A pixel is considered background if its RGB values are all > 220
    # and diff between R,G,B is small (grayish/whitish)
    while queue:
        y, x = queue.popleft()
        if visited[y, x]:
            continue
        visited[y, x] = True

        r, g, b, _ = pixels[y, x]
        # Check if this pixel is background
        is_bg = (int(r) > 215 and int(g) > 215 and int(b) > 215 and
                 abs(int(r) - int(g)) < 25 and abs(int(r) - int(b)) < 25)

        if is_bg:
            # Set transparency based on how close to 255 it is
            brightness = (int(r) + int(g) + int(b)) / 3.0
            if brightness > 242:
                pixels[y, x, 3] = 0
            else:
                # Soft feather for natural drop shadow edge
                pixels[y, x, 3] = int(np.clip((242 - brightness) * 12, 0, 255))

            # Push 4 neighbors
            for ny, nx in ((y-1, x), (y+1, x), (y, x-1), (y, x+1)):
                if 0 <= ny < height and 0 <= nx < width and not visited[ny, nx]:
                    nr, ng, nb, _ = pixels[ny, nx]
                    if (int(nr) > 215 and int(ng) > 215 and int(nb) > 215 and
                        abs(int(nr) - int(ng)) < 25 and abs(int(nr) - int(nb)) < 25):
                        queue.append((ny, nx))

    result_img = Image.fromarray(pixels, 'RGBA')
    result_img.save(output_path, 'PNG', optimize=True)
    print(f"Saved {output_path} (size: {os.path.getsize(output_path)} bytes)")

if __name__ == '__main__':
    make_transparent('public/hero-product-showcase.jpg', 'public/hero-product-showcase-transparent.png')
