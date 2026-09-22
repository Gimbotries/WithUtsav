import csv
from pathlib import Path
from collections import OrderedDict, Counter

ROOT = Path(r"E:\Making 7000 rs in 17 days\WithUtsav")
OUT = ROOT / "prospects"
OUT.mkdir(exist_ok=True)

GYM_FIELDS = [
    "name",
    "area",
    "city",
    "full_address",
    "phone",
    "google_rating",
    "review_count",
    "website_status",
    "notes",
    "source_url",
]
TUTOR_FIELDS = [
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
]

NEW_GYMS = r"""
PULSE FITNESS Tilak Nagar,Tilak Nagar / Krishna Nagar,Delhi,"WZ-23 Krishna Nagar Near CRPF Camp, Gali Number 2, Tilak Nagar, New Delhi 110018",+91 99102 91683,4.9,377,unknown_likely_none,Strong local Tilak Nagar gym; no dedicated professional site found,https://gym-india.nears.me/listings/india/delhi/new-delhi-delhi/highly-rated-pulse-fitness-best-gym-in-tilak-nagar-new-delhi-delhi-dl/
Fit Gym West Patel Nagar,West Patel Nagar,Delhi,"Metro Pillar Number 216, BP 17, Patel Rd, Block 1, West Patel Nagar, New Delhi 110008",+91 88265 65779,4.1,275,unknown_likely_none,Independent neighborhood gym; no own website found,https://gym-india.nears.me/listings/india/delhi/new-delhi-delhi/fit-gym-west-patel-nagar-new-delhi-delhi-dl/
Fit Pros Gym,West Patel Nagar,Delhi,"House number 51, ground floor, Block no. 20, near Mother Dairy, West Patel Nagar, New Delhi 110008",+91 93101 02951,4.8,310,unknown_likely_none,High reviews; no dedicated site found,https://gym-india.nears.me/listings/india/delhi/new-delhi-delhi/highly-rated-fit-pros-gym-new-delhi-delhi-dl/
World Champion Raj Nayak's Gym,East Patel Nagar,Delhi,"11/18, Block 11, East Patel Nagar, Patel Nagar, New Delhi 110008",+91 93103 36490,3.5,6,unknown_likely_none,Phone+address verified; low review count,https://gym-india.nears.me/listings/india/delhi/new-delhi/world-champion-raj-nayaks-gym-new-delhi-dl/
Rep Max Gym,West Patel Nagar,Delhi,"6/15, Block 6, West Patel Nagar, Patel Nagar, New Delhi 110008",,4.9,94,unknown_likely_none,94 reviews + address; phone not public,https://gym-india.nears.me/listings/india/delhi/new-delhi-delhi/highly-rated-rep-max-gym-new-delhi-delhi-dl/
The Gym Health Planet Karol Bagh,Karol Bagh,Delhi,"2C/2, New Rohtak Rd, near Bikanerwala, opposite Liberty Cinema, Block 2C, Karol Bagh, New Delhi 110005",+91 98910 16741,4.7,450,unknown_likely_none,High review volume; no polished brand site confirmed,https://gym-india.nears.me/listings/india/delhi/new-delhi-delhi/highly-rated-the-gym-health-planet-new-rohtak-road-karol-bagh-new-delhi-delhi-dl/
Body Power Gym,Ashok Vihar / Wazirpur,Delhi,"WP-391, near Lal School / Chowdhry Banwari, Wazirpur Village, Ashok Vihar, Delhi 110052",+91 99535 07776,4.6,40,unknown_likely_none,Local Ashok Vihar gym; no website found,https://gym-india.nears.me/listings/india/delhi/delhi-1/trusted-body-power-gym-delhi-dl/
SR Fitness Unisex Gym Govindpuri Ext,Tughlakabad / Govindpuri Ext,Delhi,"Rz-397/1, Street No. 14, Tughlakabad Extension, New Delhi 110019",+91 84470 10711,5.0,8,unknown_likely_none,Near Govindpuri/Okhla belt; phone+address; low reviews,https://gym-india.nears.me/listings/india/delhi/new-delhi/sr-fitness-unisex-gym-govindpuri-extension-new-delhi-dl/
OLD SCHOOL GYM Mahipalpur,Mahipalpur,Delhi,"H.No 17, Rd Number 2 near Aeroporto Hotel, A/B Block, Mahipalpur Village, New Delhi 110037",+91 97181 44684,4.9,81,unknown_likely_none,No dedicated website found,https://gym-india.nears.me/listings/india/delhi/new-delhi/highly-rated-old-school-gym-new-delhi-dl/
Sagars Vyayam Station Gym Mahipalpur,Mahipalpur Extension,Delhi,"Kh.No.845/3, Vasant Kunj Rd, Mahipalpur Extension, Mahipalpur, New Delhi 110037",+91 88261 05411,5.0,196,unknown_likely_none,Strong reviews; no professional site found,https://gym-india.nears.me/listings/india/delhi/new-delhi/highly-rated-sagars-vyayam-station-gym-mahipalpur-new-delhi-dl/
Fitness One Gym Nawada,Uttam Nagar / Nawada,Delhi,"C9, Block F, Nawada Extension, Uttam Nagar, New Delhi 110059",+91 96543 03579,4.5,31,unknown_likely_none,Also listed +91 98995 11543; no dedicated site found,https://allpeople.biz/dakshan+murthi_fitness-one-gym_7x-in
FitZest Fitness Gym Uttam Nagar,Uttam Nagar,Delhi,"WZ-152 B-1 & 2, Bal Udhyan Rd, Metro Pillar 677, Block D/E, Uttam Nagar, New Delhi 110059",+91 98715 15505,4.7,149,broken_or_template,Has fitzestfitness.com but looks template/generic,https://mymetro.in/gyms/fitzest-fitness-gym-best-gym-in-uttam-nagar-uttam-nagar-west-687/
Dark Sweat Health Club,Rohini Sector 11,Delhi,"Rohini Sector 11, New Delhi (confirm plot on Maps)",+91 70115 51259,,,unknown_likely_none,Owner-listed phone; confirm full address on Google Maps,https://www.linkedin.com/in/darksweat-healthclub-186ab61b9
Being Fit Gym,Mohammadpur / R.K. Puram,Delhi,"C-124, Mohammadpur, Rama Krishna Puram, New Delhi 110066",+91 98118 50905,,,unknown_likely_none,Phone+address from business directory; confirm rating on Maps,https://allpeople.biz/mukesh+kumar_being-fit-gym_7V-in
Be Fit Gym Khera Kalan,Khera Kalan,Delhi,"Apna Store 1st floor, Khera Kalan Village, Delhi 110082",+91 82851 00926,,,unknown_likely_none,Phone+address verified; near Model Town/North Delhi,https://allpeople.biz/hemant+kumar_be-fit-gym_3t-in
Fitholic Gym,Paschim Vihar / Peeragarhi,Delhi,"2, RR Block, Rohtak Rd, near Peeragarhi, Mianwali Nagar, Paschim Vihar, New Delhi 110087",+91 11 4940 9005,,,unknown_likely_none,Phone+address verified; confirm Google rating,https://allpeople.biz/dewan+singh+bisht_fitholic-gym-in
Xtreme Fitness Gym Gaur City 2,Gaur City 2 / Greater Noida West,Ghaziabad,"Near Gagan Public School, Gaur City 2, Greater Noida West, Ghaziabad 201016",+91 96505 28700,4.4,335,unknown_likely_none,Local multi-review gym; no polished site confirmed,https://gym-india.nears.me/listings/india/uttar-pradesh/noida-ghaziabad/trusted-xtreme-fitness-gym-gaur-city-2-noida-ghaziabad-up/
RDX Gym Ashok Vihar,Ashok Vihar Phase II,Delhi,"B-1/35, 2nd & 3rd Floor, Ashok Vihar Phase II, New Delhi 110052",+91 93196 52521,3.9,51,broken_or_template,Local RDX branch; thin multi-branch site,https://gym-india.nears.me/listings/india/delhi/new-delhi-delhi/rdx-gym-ashok-vihar-new-delhi-delhi-dl/
Monkeys Fitness,Uttam Nagar,Delhi,"B-152, Mudgal Complex, Pal Udyan Road, Near Pillar No 678, Uttam Nagar, Delhi 110059",,4.3,241,none,Justdial Add Website; unlock phone via Show Number on JD,https://www.justdial.com/Delhi/Monkeys-Fitness-Near-Pillar-No-678-Uttam-Nagar/011PXX11-XX11-171113114906-R2T3_BZDET
Reform Gym & Spa,Uttam Nagar,Delhi,"Wz-41, Aaryan Garden, Om Vihar Phase-1, Uttam Nagar, Delhi 110059",,3.8,158,none,Justdial Add Website; unlock phone via Show Number on JD,https://www.justdial.com/Delhi/Reform-Gym-Spa-Aaryan-Garden-Uttam-Nagar/011PXX11-XX11-161008092922-T9J9_BZDET
"""

NEW_TUTORS = r"""
Music Tutor Delhi Mr Paras,Music,Delhi NCR home tuition,Delhi,"Home coaching Model Town Ashok Vihar Karol Bagh Shahdara Rohini Dwarka",9873085729,,,broken_or_template,WordPress blog only; guitar/keyboard/vocal home tuition,https://musictutordelhi.wordpress.com/
Music Tutor Delhi Mr Paras alt,Music,Delhi NCR home tuition,Delhi,"Same home-tuition network covering West/East/South Delhi & NCR",9310277999,,,broken_or_template,Second published phone on Music Tutor Delhi WordPress page,https://musictutordelhi.wordpress.com/
Tamanna Sangeet Vidyalaya,Music,Sukhrali / MG Road,Gurgaon,"First Floor, Chajju Ram Building, MG Road, Sukhrali, Gurugram",9654929196,,,urbanpro_only,Guitar/keyboard/piano/vocal + dance; UrbanPro listing,https://www.urbanpro.com/gurgaon/tamanna-sangeet-vidyalaya-sukhrali/5697336
Yuvraj Guitar Om Music Hub,Music,Yamuna Vihar,Delhi,"Yamuna Vihar, Delhi 110053",,,,urbanpro_only,Guitar/vocal; phone verified UrbanPro,https://www.urbanpro.com/delhi/yuvraj/25165709
Oviya Music Studio,Music,Karol Bagh,Delhi,"13/67, Faiz Road, Karol Bagh, Delhi 110005",,,,none,Justdial Add Website; unlock phone on JD,https://www.justdial.com/Delhi/Oviya-Music-Studio-Karol-Bagh/011PXX11-XX11-190910184154-X9Q8_BZDET
C K Studios Hastsal,Music,Uttam Nagar / Hastsal,Delhi,"A-84, Vidya Vihar, Hastsal Road near Kendriya Vidyalaya, Uttam Nagar 110059",,4.6,35,none,Justdial Claimed + Add Website,https://www.justdial.com/Delhi/C-K-Studios-Near-Kendriya-Vidyalaya-Uttam-Nagar/011PXX11-XX11-210830122308-J2H8_BZDET
Ravindra K Chemistry IIT NEET,IIT_NEET,Dwarka Sector 4,Delhi,"Sector 4, Dwarka, Delhi 110078",,,,urbanpro_only,IIT Delhi PhD Chemistry; JEE/NEET; phone on UrbanPro,https://www.urbanpro.com/delhi/ravindra-k
Abhishek Sinha Abiona Education,IIT_NEET,Sector 57,Gurgaon,"Sector 57, Gurgaon (online small batches)",9717288557,,,urbanpro_only,IIT BHU PCM; JEE/boards,https://www.urbanpro.com/gurgaon/abhishek-sinha
Siddhant Kumar Maurya Physics,IIT_NEET,Online / Delhi NCR,Delhi,"Online Zoom/Webex Physics Class 11 + JEE/NEET",9905683583,,,urbanpro_only,Published WhatsApp phone on UrbanPro,https://www.urbanpro.com/online-class/physics-class-11-jee-neet-online-through-zoom/24324333
Modhumita G Spoken English,Spoken_English,Dwarka Sector 22,Delhi,"Dwarka Sector 22, Delhi 110075",,,,urbanpro_only,Spoken English + communication; phone on UrbanPro,https://www.urbanpro.com/delhi/modhumita
Deepti T Spoken English,Spoken_English,Dwarka Sector 10,Delhi,"Sector 10, Dwarka, Delhi 110075",,,,urbanpro_only,Spoken English home/online; phone on UrbanPro,https://www.urbanpro.com/delhi/deepti-t/24814616
Satyam Acting Institute,Spoken_English,Uttam Nagar,Delhi,"WZ-70B, Dyalsar Road near Nirankari Gurudwara West, Uttam Nagar 110059",,5.0,6,none,Justdial Add Website; acting/spoken-performance,https://www.justdial.com/Delhi/Satyam-Acting-Institute-Near-Nirankari-Gurudwara-West-Near-Metro-Station-Uttam-Nagar/011PXX11-XX11-230507173634-W3G2_BZDET
Aryan Classes Shahdara,IIT_NEET,Vishwas Nagar Shahdara,Delhi,"500/7, Gali Number 5 near Mata Chintpurni Mandir, Block 17 East Rohtas Nagar, Vishwas Nagar, Shahdara 110032",,,,unknown_likely_none,School + entrance coaching; unlock phone on Maps,https://www.studydekho.com/institutes/show/aryan-classes/1107
SARVODAYA Shahdara,IIT_NEET,West Jyoti Nagar Shahdara,Delhi,"168, Ground Floor, West Jyoti Nagar, Shahdara, Delhi 110093",,,,unknown_likely_none,Local coaching; unlock phone on Maps,https://www.studydekho.com/institutes/show/sarvodaya/6274
Dwivedi Study Circle,IIT_NEET,Tilak Nagar / Mahavir Nagar,Delhi,"M-1, Main Najafgarh Road, Mahavir Nagar, Janak Puri Metro pillar no 557, Tilak Nagar, Delhi 110018",,,,urbanpro_only,NEET/IIT + boards; UrbanPro,https://www.urbanpro.com/delhi/dwivedi-study-circle-tilak-nagar/12003888
Sardar Patel Institute Spoken English,Spoken_English,Uttam Nagar,Delhi,"A-9, First Floor, Milap Nagar, Uttam Nagar, Delhi 110059",,,,unknown_likely_none,Spoken English + IELTS since 2009; Sulekha; confirm no polished site,https://www.sulekha.com/profile/sardar-patel-institute-uttam-nagar-delhi
Penultimate Institute NEET,IIT_NEET,Pitampura,Delhi,"CD block market near Pitampura metro station, Delhi 110052",,,,urbanpro_only,Affordable NEET; Mohit Rana Chemistry; UrbanPro,https://www.urbanpro.com/delhi/penultimate-institute-pitampura/8719570
Rajan Mittal Classes,IIT_NEET,Tri Nagar,Delhi,"1468/103, Ganeshpura, Tri Nagar, New Delhi 110035",,,,unknown_likely_none,9-12 JEE NEET; no polished brand site found,https://topcoachingindelhi.com/institute/rajan-mittal-classes/
"""

LOW_PRIORITY_MARKERS = [
    "energiegym",
    "spartagym",
    "moltom",
    "knockoutfight",
    "aimfitgym",
    "enigmafitness",
    "functionalfitness",
    "dalyfstyle",
    "nutansmagiic",
    "oxination",
    "rdxgymnspa",
]


def parse_csv_lines(text, fields):
    rows = []
    for line in text.strip().splitlines():
        if not line.strip():
            continue
        rows.append(next(csv.DictReader([line], fieldnames=fields)))
    return rows


def load_csv(path):
    with open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def norm_name(n):
    return "".join(c for c in (n or "").lower() if c.isalnum())


def has_phone(r):
    return bool((r.get("phone") or "").strip())


def review_count(r):
    try:
        return int(float(str(r.get("review_count") or "0").replace(",", "") or 0))
    except Exception:
        return 0


def priority(r, kind="gym"):
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
    if any(x in notes for x in LOW_PRIORITY_MARKERS):
        score += 30
    if has_phone(r):
        score -= 15
    rc = review_count(r)
    if rc >= 100:
        score -= 10
    elif rc >= 30:
        score -= 5
    if kind == "tutor" and status == "urbanpro_only" and not has_phone(r):
        score += 10
    return score


def dedupe(rows):
    seen = OrderedDict()
    for r in rows:
        key = norm_name(r.get("name", "")) + "|" + norm_name(r.get("area", ""))
        base = (
            norm_name(r.get("name", ""))
            .replace("altcontact", "")
            .replace("mobile2", "")
            .replace("mobile3", "")
            .replace("mobile", "")
            .replace("alt", "")
        )
        soft = base[:22]
        if key in seen:
            if not has_phone(seen[key]) and has_phone(r):
                seen[key]["phone"] = r["phone"]
            continue
        collide = False
        for existing in seen.values():
            if soft and soft == norm_name(existing.get("name", ""))[:22]:
                if norm_name(r.get("city", "")) == norm_name(existing.get("city", "")):
                    if has_phone(r) and not has_phone(existing):
                        existing["phone"] = r["phone"]
                    collide = True
                    break
        if collide:
            continue
        seen[key] = r
    return list(seen.values())


def write(path, rows, fields):
    with open(path, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)


def main():
    gyms = load_csv(ROOT / "delhi_ncr_gyms_no_website.csv")
    tutors = load_csv(ROOT / "delhi_ncr_tutors_no_website.csv")
    # strip old ranking cols if re-running
    for rows in (gyms, tutors):
        for r in rows:
            r.pop("call_ready", None)
            r.pop("priority_score", None)

    gyms += parse_csv_lines(NEW_GYMS, GYM_FIELDS)
    tutors += parse_csv_lines(NEW_TUTORS, TUTOR_FIELDS)

    gyms = dedupe(gyms)
    tutors = dedupe(tutors)

    gyms = [
        g
        for g in gyms
        if not any(
            x in norm_name(g.get("name", ""))
            for x in ("goldsgym", "anytimefitness", "cultfit", "fitnessfirst", "strengththegym")
        )
    ]

    for g in gyms:
        g["priority_score"] = str(priority(g, "gym"))
        g["call_ready"] = "yes" if has_phone(g) else "no"
    for t in tutors:
        t["priority_score"] = str(priority(t, "tutor"))
        t["call_ready"] = "yes" if has_phone(t) else "no"

    gyms.sort(key=lambda r: (int(r["priority_score"]), -review_count(r), r["name"]))
    tutors.sort(key=lambda r: (int(r["priority_score"]), -review_count(r), r["name"]))

    gyms_top = gyms[:100]
    tutors_top = tutors[:100]

    gym_out = GYM_FIELDS + ["call_ready", "priority_score"]
    tutor_out = TUTOR_FIELDS + ["call_ready", "priority_score"]

    write(OUT / "01_gyms_delhi_ncr.csv", gyms_top, gym_out)
    write(OUT / "02_tutors_coaching_delhi_ncr.csv", tutors_top, tutor_out)
    write(OUT / "01_gyms_CALL_READY.csv", [g for g in gyms_top if g["call_ready"] == "yes"], gym_out)
    write(OUT / "02_tutors_CALL_READY.csv", [t for t in tutors_top if t["call_ready"] == "yes"], tutor_out)
    write(ROOT / "delhi_ncr_gyms_no_website.csv", gyms_top, gym_out)
    write(ROOT / "delhi_ncr_tutors_no_website.csv", tutors_top, tutor_out)

    print("GYMS unique:", len(gyms), "exported:", len(gyms_top), "call_ready:", sum(1 for g in gyms_top if g["call_ready"] == "yes"))
    print("TUTORS unique:", len(tutors), "exported:", len(tutors_top), "call_ready:", sum(1 for t in tutors_top if t["call_ready"] == "yes"))
    print("Gym status:", Counter(g["website_status"] for g in gyms_top))
    print("Tutor cats:", Counter(t.get("category") for t in tutors_top))
    print("Tutor status:", Counter(t["website_status"] for t in tutors_top))
    print("Files in", OUT)


if __name__ == "__main__":
    main()
