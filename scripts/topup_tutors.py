import csv
from pathlib import Path
from collections import Counter

ROOT = Path(r"E:\Making 7000 rs in 17 days\WithUtsav")
OUT = ROOT / "prospects"

FIELDS = [
    "name",
    "category",
    "area",
    "city",
    "full_address",
    "phone",
    "google_rating",
    "review_count",
    "website_status",
    "notes",
    "source_url",
    "call_ready",
    "priority_score",
]

NEW = r"""
Syncopation School Of Music,Music,Meera Bagh,Delhi,"A-8 Basement, Near Punjab and Sind Bank, Meera Bagh, Delhi 110087",08123904620,4.9,75,none,Guitar/vocal/dance; Justdial Claimed + Add Website; high ratings,https://www.justdial.com/Delhi/Syncopation-School-Of-Music-Near-Punjab-and-Sind-Bank-Meera-Bagh/011PXX11-XX11-210102181118-S5U1_BZDET
Vibes School Of Music & Performing Arts,Music,Indirapuram,Ghaziabad,"Plot Number 15, Ground Floor-1, Behind St.Thomas School, Indirapuram, Ghaziabad 201014",,4.6,58,none,Instrumental/vocal performing arts; Justdial Claimed + Add Website,https://www.justdial.com/Ghaziabad/Vibes-School-Of-Music-Performing-Arts-Behind-StThomas-School-Indirapuram/011PXX11-XX11-200228111519-X5L9_BZDET
Pmc Music Academy,Music,Sukhdev Vihar,Delhi,"J-1, Church Compound, Masi Garh, Near Sukhdev Vihar Metro, Delhi 110025",,4.9,10,none,Multi-instrument/vocal; Justdial Add Website,https://www.justdial.com/Delhi/Pmc-Music-Academy-Near-Sukhdev-Vihar-Metro-Sukhdev-Vihar/011PXX11-XX11-210619152524-Y3H1_BZDET
Akshay Rocks Guitar Classes,Music,New Ashok Nagar,Delhi,"No.10, B1/308 Street, New Ashok Nagar, Delhi 110096",,5.0,3,none,Guitar classes; Justdial Claim + Add Website,https://www.justdial.com/Delhi/Akshay-Rocks-Guitar-Classes-New-Ashok-Nagar/011PXX11-XX11-190524231351-N5N3_BZDET
ELI The English Language Institute,Spoken_English,Pitampura,Delhi,"QU Block, Near Income Tax Colony, Pitampura, Delhi 110034",,,,none,Spoken English tutorial since ~1999; Justdial Add Website,https://www.justdial.com/Delhi/ELI-The-English-Language-Institute-Near-Income-Tax-Colony-Pitampura/011PXX11-XX11-190524000008-I5A9_BZDET
The English Academy IELTS Dilshad Garden,Spoken_English,Dilshad Garden,Delhi,"F-199A, Opposite Chetak Complex, Dilshad Garden, Delhi 110095",,4.9,502,none,IELTS + spoken English; Justdial Claimed + Add Website; high review count,https://www.justdial.com/Delhi/The-English-Academy-IELTS-Spoken-English-Opposite-Chetak-Complex-Dilshad-Garden/011PXX11-XX11-170425182211-D7M3_BZDET
Aspiring Aces,IIT_NEET,Rohini Sector 14 / Prashant Vihar,Delhi,"A1/1 2nd Floor above MG Motors, A Block Prashant Vihar, Sector 14 Rohini, Delhi 110085",,,,urbanpro_only,NEET/JEE/foundation small institute; UrbanPro,https://www.urbanpro.com/delhi/aspiring-aces-rohini-sector-14/52150898
Srijan Institute Dwarka,IIT_NEET,Dwarka Sector 8,Delhi,"Sector-8 Dwarka near Medical Council of India, Delhi 110059",,,,urbanpro_only,JEE Main/Advanced + NEET small batches; UrbanPro,https://www.urbanpro.com/delhi/srijan-institute-dwarka/640583
Jitender Kumar Chemistry,IIT_NEET,Malka Ganj,Delhi,"Malka Ganj, Delhi 110007",,,,urbanpro_only,DU MSc Chemistry; JEE/NEET Chemistry tutor; UrbanPro,https://www.urbanpro.com/gurgaon/jitender-kumar
Ramanjeet S IELTS Noida,Spoken_English,Sector 45,Noida,"Sector 45, Noida 201303",,,,urbanpro_only,Cambridge CELTA/British Council/IDP IELTS trainer; UrbanPro,https://www.urbanpro.com/noida/ramanjeet
"""

LOW = ["energiegym", "spartagym", "moltom", "knockoutfight", "aimfitgym", "enigmafitness", "functionalfitness", "dalyfstyle", "nutansmagiic", "oxination", "rdxgymnspa"]


def has_phone(r):
    return bool((r.get("phone") or "").strip())


def review_count(r):
    try:
        return int(float(str(r.get("review_count") or "0").replace(",", "") or 0))
    except Exception:
        return 0


def priority(r):
    status = (r.get("website_status") or "").strip()
    notes = ((r.get("notes") or "") + " " + (r.get("source_url") or "")).lower()
    score = 50
    if status in ("none", "instagram_only"):
        score = 10
    elif status == "unknown_likely_none":
        score = 20
    elif status == "urbanpro_only":
        score = 35
    elif status == "broken_or_template":
        score = 40
    if any(x in notes for x in LOW):
        score += 30
    if has_phone(r):
        score -= 15
    rc = review_count(r)
    if rc >= 100:
        score -= 10
    elif rc >= 30:
        score -= 5
    if status == "urbanpro_only" and not has_phone(r):
        score += 10
    return score


def main():
    path = OUT / "02_tutors_coaching_delhi_ncr.csv"
    with open(path, encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))

    existing = {("".join(c for c in r["name"].lower() if c.isalnum())) for r in rows}
    for line in NEW.strip().splitlines():
        r = next(csv.DictReader([line], fieldnames=FIELDS[:11]))
        key = "".join(c for c in r["name"].lower() if c.isalnum())
        if key in existing:
            continue
        r["call_ready"] = "yes" if has_phone(r) else "no"
        r["priority_score"] = str(priority(r))
        rows.append(r)
        existing.add(key)

    for r in rows:
        r["call_ready"] = "yes" if has_phone(r) else "no"
        r["priority_score"] = str(priority(r))

    rows.sort(key=lambda r: (int(r["priority_score"]), -review_count(r), r["name"]))
    top = rows[:100]

    for out_path in (path, ROOT / "delhi_ncr_tutors_no_website.csv"):
        with open(out_path, "w", encoding="utf-8", newline="") as f:
            w = csv.DictWriter(f, fieldnames=FIELDS, extrasaction="ignore")
            w.writeheader()
            w.writerows(top)

    call_ready = [r for r in top if r["call_ready"] == "yes"]
    with open(OUT / "02_tutors_CALL_READY.csv", "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS, extrasaction="ignore")
        w.writeheader()
        w.writerows(call_ready)

    print("tutors exported", len(top), "call_ready", len(call_ready))
    print("cats", Counter(r["category"] for r in top))
    print("status", Counter(r["website_status"] for r in top))


if __name__ == "__main__":
    main()
