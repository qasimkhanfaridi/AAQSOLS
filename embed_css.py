from pathlib import Path

root = Path(r"D:\AAQSOLS\website")
html = root.joinpath("index.html").read_text(encoding="utf-8")
css = root.joinpath("styles.css").read_text(encoding="utf-8")

old = '  <link rel="stylesheet" href="styles.css">\n</head>'
new = (
    '  <link rel="stylesheet" href="/styles.css">\n'
    "  <style>\n"
    + css
    + "\n  </style>\n</head>"
)

if old not in html:
    raise SystemExit("pattern not found in index.html")

root.joinpath("index.html").write_text(html.replace(old, new), encoding="utf-8")
print("CSS embedded successfully")
