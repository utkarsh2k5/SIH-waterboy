import json

# Load raw JSON (8106 lines)
with open("states_raw.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

# Function to clean state data
def extract_state_data(state_name, tables):
    for table_data in tables:
        for row in table_data.get("table", []):
            if row.get("STATES", "").strip().upper() == state_name.upper():
                return {
                    "state": state_name.title(),
                    "year": "2023-2024",
                    "rainfall": {
                        "normal": row.get("Normal\nRainfall\n(mm)", "N/A") + " mm",
                        "calendar_year_2023": row.get("Rainfall\nduring\nCalendar\nYear\n2023\n(mm)", "N/A") + " mm",
                        "assessment_year": row.get("Rainfall\nduring\nGround\nWater\nAssessment\nYear 2023-\n24 (mm)", "N/A") + " mm",
                        "monsoon": row.get("Monsoon\nRainfall\nduring\nGround\nWater\nAssessment\nYear 2023-\n24 (mm)", "N/A") + " mm",
                        "non_monsoon": row.get("Non-\nMonsoon\nRainfall\nduring\nGround Water\nAssessment\nYear 2023-24\n(mm)", "N/A") + " mm"
                    }
                }
    return None

# Extract only Rajasthan & Uttar Pradesh
tables = raw_data["RAJASTHAN"]["tables"]

rajasthan = extract_state_data("RAJASTHAN", tables)
uttar_pradesh = extract_state_data("UTTAR PRADESH", tables)

# Save cleaned JSON
cleaned = [data for data in [rajasthan, uttar_pradesh] if data]
with open("states_data.json", "w", encoding="utf-8") as f:
    json.dump(cleaned, f, indent=2)

print("✅ Cleaned data for Rajasthan & Uttar Pradesh saved to states_data.json")
