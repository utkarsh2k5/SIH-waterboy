import pdfplumber
import pandas as pd
import json
import re

# path to your downloaded CGWB PDF
PDF_PATH = "17387543101433268167file.pdf"
OUT_JSON = "states_raw.json"

# target states
TARGETS = ["RAJASTHAN", "UTTAR PRADESH", "UTTARPRADESH"]

def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip()).upper()

def extract_from_pdf():
    results = {}
    with pdfplumber.open(PDF_PATH) as pdf:
        for i, page in enumerate(pdf.pages, start=1):
            text = page.extract_text() or ""
            norm = normalize(text)

            # ---- text snippets ----
            for target in TARGETS:
                if target in norm:
                    idx = norm.find(target)
                    snippet = norm[max(0, idx - 300): idx + 600]
                    results.setdefault(target, {"snippets": [], "tables": []})
                    results[target]["snippets"].append({
                        "page": i,
                        "snippet": snippet
                    })

            # ---- tables ----
            tables = page.extract_tables()
            if tables:
                for t in tables:
                    if not t or not t[0]:
                        continue
                    try:
                        df = pd.DataFrame(t[1:], columns=t[0])
                    except Exception:
                        continue
                    combined = " ".join(df.astype(str).values.flatten()).upper()
                    for target in TARGETS:
                        if target in combined:
                            results.setdefault(target, {"snippets": [], "tables": []})
                            results[target]["tables"].append({
                                "page": i,
                                "table": df.fillna("").to_dict(orient="records")
                            })

    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)
    print(f"✅ Saved extracted content to {OUT_JSON}")

if __name__ == "__main__":
    extract_from_pdf()
