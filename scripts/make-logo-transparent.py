from PIL import Image
from collections import deque
from pathlib import Path

root = Path(__file__).resolve().parents[1]
src = root / "public" / "brand" / "logo.png"
im = Image.open(src).convert("RGBA")
w, h = im.size
px = im.load()


def is_bg(r: int, g: int, b: int, a: int) -> bool:
    if a < 8:
        return True
    return r >= 245 and g >= 245 and b >= 245


visited = [[False] * h for _ in range(w)]
q: deque[tuple[int, int]] = deque()

for x in range(w):
    for y in (0, h - 1):
        r, g, b, a = px[x, y]
        if is_bg(r, g, b, a):
            q.append((x, y))
            visited[x][y] = True
for y in range(h):
    for x in (0, w - 1):
        if not visited[x][y]:
            r, g, b, a = px[x, y]
            if is_bg(r, g, b, a):
                q.append((x, y))
                visited[x][y] = True

dirs = ((1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (1, -1), (-1, 1), (-1, -1))
cleared = 0
while q:
    x, y = q.popleft()
    r, g, b, a = px[x, y]
    if is_bg(r, g, b, a):
        px[x, y] = (r, g, b, 0)
        cleared += 1
    for dx, dy in dirs:
        nx, ny = x + dx, y + dy
        if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny]:
            nr, ng, nb, na = px[nx, ny]
            if is_bg(nr, ng, nb, na):
                visited[nx][ny] = True
                q.append((nx, ny))

for x in range(w):
    for y in range(h):
        r, g, b, a = px[x, y]
        if a == 0:
            continue
        if r >= 240 and g >= 240 and b >= 240:
            neighbors_clear = False
            for dx, dy in dirs:
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and px[nx, ny][3] == 0:
                    neighbors_clear = True
                    break
            if neighbors_clear:
                whiteness = (r + g + b) / 3
                if whiteness >= 250:
                    px[x, y] = (r, g, b, 0)
                elif whiteness >= 245:
                    px[x, y] = (r, g, b, max(0, a // 3))

out_png = root / "public" / "brand" / "logo.png"
out_webp = root / "public" / "brand" / "logo.webp"
out_256 = root / "public" / "brand" / "logo-256.webp"
im.save(out_png, optimize=True)
im.save(out_webp, "WEBP", quality=90, method=6)
im.resize((256, 256), Image.Resampling.LANCZOS).save(out_256, "WEBP", quality=90, method=6)

im.save(root / "app" / "icon.png", optimize=True)
scaled = im.resize((180, 180), Image.Resampling.LANCZOS)
apple = Image.new("RGBA", (180, 180), (0, 0, 0, 0))
apple.paste(scaled, (0, 0), scaled)
apple.save(root / "app" / "apple-icon.png", optimize=True)

print("cleared", cleared, "corner", im.getpixel((5, 5)), "mode", im.mode)
print("saved transparent logo assets")
