# 🧪 Complete Testing Guide - Dynamic Dashboard

## ✅ System Status

**Backend:** Running on http://localhost:5000
**Database:** MongoDB Atlas with 54+ test items
**Flutter App:** Connected and showing real data

---

## 📊 Test Data Overview

| Period | Items | Hazardous | Low Conf | Unknown | High Conf |
|--------|-------|-----------|----------|---------|-----------|
| **TODAY (Mon)** | 36 | 3 | 9 | 4 | 20 |
| **THIS YEAR** | 61 | 4 | 12 | 7 | 38 |
| **LIFETIME** | 61+ | 5+ | 13+ | 7+ | 39+ |

---

## 🧪 Test Sequence

### **STEP 1: Start Fresh (Refresh Flutter)**
1. Open Flutter app: http://localhost:6388
2. Press **F5** to refresh
3. **Expected:** 
   - Default shows "General" (today's data)
   - Total Items: **36**
   - Detection Rate: **91%**
   - Error Items: **4**

---

### **STEP 2: Test "Mon" Filter (TODAY)**
1. Click the **"Mon"** button (should already be selected)
2. Watch the UI update
3. **Alerts & Notifications should show:**
   - Hazardous Material Detected: **3** 🔴
   - Overheating Risk: **3** 🟠
   - Unknown Item Detected: **4** 🔴
   - Low Confidence Detection: **9** ⚫
   - Repeated Scan Required: **10** 🔵

4. **Stats Cards should show:**
   - Total Items: **36**
   - Detection Rate: **91%**
   - Error Items: **4**

5. **Chart should show:** Today's accuracy trend (blue line)

---

### **STEP 3: Test "Year" Filter**
1. Click the **"Year"** button
2. **Expected Changes:**
   - Total Items: **61** (more than today!)
   - Detection Rate: **89%** (slightly different)
   - Error Items: **7** (increased)

3. **Alerts should increase:**
   - Hazardous Material: ~4
   - Unknown Items: ~7 (more from old data)

4. **Chart should show:** Different trend line (includes data from 2025!)

---

### **STEP 4: Test "Lifetime" Filter**
1. Click the **"Lifetime"** button
2. **Expected:**
   - Total Items: **61+** (all data ever)
   - Detection Rate: **stays similar** (~89%)
   - Error Items: **7+**

3. **Alerts:** Maximum counts across all time

4. **Chart:** Longest possible trend line

---

### **STEP 5: Test "General" Filter**
1. Click the **"General"** button
2. **Expected:** Same as "Mon" (shows today's aggregated data)

---

### **STEP 6: Test Refresh (F5) at Each Filter**
1. For each filter (Mon, Year, Lifetime, General)
2. Press **F5** to refresh
3. **Expected:** Data reloads from backend for that period

---

## 📈 Test Data Details

### **TODAY (2026-02-01) - Mon Filter:**
```
Recent Items Detected:
  ✓ Smart Watch - Apple Series 9 (96% confidence)
  ✓ External HDD - Western Digital My Passport (91%)
  ✓ USB Hub - Belkin Hub Pro (87%)
  ✓ CRT Monitor (Old) - Sony Trinitron (72%) - HAZARD
  ✓ Lithium Battery Pack - Generic (45%) - HAZARD + LOW CONF

Alerts Triggered:
  • Hazardous Materials (Mercury, Lead, Lithium): 3
  • Low Confidence (< 40%): 9
  • Unknown Items: 4
  • Overheating Risk (40-60%): 3
  • Repeated Scans Needed: 10 duplicates
```

### **YEAR (2025-2026) - Year Filter:**
```
Additional Old Items (from 2025):
  ✓ Old Monitor - Dell U2412M (2025-02-01)
  ✓ Old Keyboard - Razer BlackWidow (2025-05-15)
  ✓ Graphics Card - NVIDIA RTX 4080 (2026-01-05)
  ✓ Network Switch - Cisco (2026-01-12)
  
Total: 61 items (25 more than today)
```

### **LIFETIME (All Data):**
```
All 61+ items ever scanned:
  - From initial seed data
  - From test alert data (10 items)
  - From time-based data (9 items)
```

---

## 🎯 Dynamic Behavior to Observe

### ✅ Statistics Cards Change:
```
Mon       → Year      → Lifetime
Total: 36 → Total: 61 → Total: 61+
Rate: 91% → Rate: 89% → Rate: 89%
Error: 4  → Error: 7  → Error: 7+
```

### ✅ Alert Counts Vary:
```
Mon                    Year                   Lifetime
Hazardous: 3          Hazardous: 4           Hazardous: 5
Unknown: 4            Unknown: 7             Unknown: 7
Low Conf: 9           Low Conf: 12           Low Conf: 13
```

### ✅ Graph Changes:
```
Mon: Shows 30 days, peak today
Year: Shows full year, lower peaks from January
Lifetime: Shows all historical data
```

### ✅ Recent Items List Changes:
```
Mon: Only today's items (5-10 recent)
Year: Mix of Jan/Feb items
Lifetime: All items in reverse chronological
```

---

## 🔧 Manual Testing Commands

### **Push More Data to Test:**

```powershell
# Add another hazardous item (increases alerts)
$body = @{
  product_type="Old Circuit Board"
  brand="Generic"
  model_or_series="E-Waste"
  confidence=35
  metals=@("Mercury","Cadmium")
  semiconductors=@()
  battery_materials=@()
  structural_materials=@("Plastic")
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/detections/add" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
```

Then press **F5** in Flutter → Watch alerts increase!

---

## 📋 Verification Checklist

- [ ] Mon filter shows 36 items
- [ ] Year filter shows 61 items
- [ ] Lifetime filter shows 61+ items
- [ ] Alerts change when switching filters
- [ ] Detection rate varies (91% vs 89%)
- [ ] Error items increase (4 → 7)
- [ ] Charts update with different data
- [ ] Recent items list shows different data per filter
- [ ] F5 refresh works at each filter
- [ ] New data appears after adding via PowerShell

---

## 🚀 Quick Start

**In Terminal 1 (Backend):**
```powershell
cd d:\EcoCare-stcd\backend
npm run dev
```

**In Terminal 2 (Flutter):**
```powershell
cd d:\EcoCare-stcd\flutter\flutter_app
flutter run -d chrome
```

**Open:**
- Flutter: http://localhost:6388
- Backend API: http://localhost:5000

---

## 🎉 Expected Final Result

Your dashboard should now:
1. ✅ Show different stats for each time period
2. ✅ Display varying alert counts
3. ✅ Show different items in recent list
4. ✅ Graph changes based on selected period
5. ✅ All data synced from MongoDB Atlas
6. ✅ Real-time updates when new data is pushed

**Everything is now ALIVE!** 🚀
