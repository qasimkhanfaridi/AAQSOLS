from pathlib import Path
from PIL import Image

assets_dirs = [
    Path(r"C:\Users\qasim.faridi\.cursor\projects\d-0-Git-JS-Zindigi-Rebrand-Zindigi-Rebranding\assets"),
]

src = None
for d in assets_dirs:
    if not d.exists():
        continue
    for p in d.glob("*10.45.46*.png"):
        if p.is_file() and p.stat().st_size > 0:
            src = p
            break
    if src:
        break

if not src:
    raise SystemExit("Logo source file not found")

out = Path(r"D:\AAQSOLS\website\assets")
out.mkdir(parents=True, exist_ok=True)

im = Image.open(src).convert("RGBA")
w, h = im.size
mid = h // 2
light_bg = im.crop((0, 0, w, mid))
dark_bg = im.crop((0, mid, w, h))


def trim(img: Image.Image) -> Image.Image:
    xs, ys = [], []
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = img.getpixel((x, y))
            if a < 20:
                continue
            if r > 245 and g > 245 and b > 245:
                continue
            xs.append(x)
            ys.append(y)
    if not xs:
        return img
    pad = 12
    return img.crop(
        (
            max(0, min(xs) - pad),
            max(0, min(ys) - pad),
            min(img.width, max(xs) + pad + 1),
            min(img.height, max(ys) + pad + 1),
        )
    )


light_bg = trim(light_bg)
dark_bg = trim(dark_bg)

light_bg.save(out / "logo-light-bg.png", optimize=True)
dark_bg.save(out / "logo-dark-bg.png", optimize=True)
im.save(out / "logo-source.png", optimize=True)

print(f"source={src}")
print(f"light={light_bg.size} dark={dark_bg.size}")
