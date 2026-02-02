# 🎬 Real-Time Testing Scenarios - Watch It All Update Live!

## 🎯 Scenario 1: Add Low Confidence Item (30 seconds)

**Goal:** See alerts trigger in real-time

### **Step 1: Open Flutter App**
- Navigate to **"Mon"** tab
- Note current **Overheating Risk** count (should be 2)

### **Step 2: Run PowerShell Command**
```powershell
$body = @{
    product_type = "Phone Case"
    brand = "Generic"
    model_or_series = "Universal"
    confidence = 28
    metals = @("Plastic")
    semiconductors = @()
    battery_materials = @()
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/detections/add" `
  -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
```

### **Step 3: Immediate F5 Refresh**
- **Watch:** Overheating Risk: 2 → 3 ⚠️
- **Watch:** Total Items: 7 → 8
- **Watch:** New item appears at top of "Recent Items"
- **Watch:** Detection Rate recalculates

**Result:** ✅ All updates in <1 second!

---

## 🎬 Scenario 2: Switch Time Periods (See Dramatic Changes)

**Goal:** Show how same backend returns different data for different periods

### **Step 1: Open Flutter App - "Mon" Tab**
```
Observe:
✓ Total Items: 7
✓ Detection Rate: 85%
✓ Alerts: Overheating Risk: 2
✓ Recent Items: 7 items from Feb 1
✓ Chart: Small line with 7 points
```

### **Step 2: Click "Year" Tab**
```
Watch it CHANGE:
✓ Total Items: 18 (INCREASED from 7!)
✓ Detection Rate: 72% (DROPPED from 85!)
✓ Alerts: Overheating Risk: 6 (INCREASED!)
✓ Recent Items: Mix of dates across 2026
✓ Chart: Longer line with 18+ points
```

### **Step 3: Click "Lifetime" Tab**
```
Watch it CHANGE AGAIN:
✓ Total Items: 36 (DOUBLED again!)
✓ Detection Rate: 72% (SAME as Year)
✓ Alerts: All alerts at MAX
✓ Recent Items: Mix of 2025-2026 data
✓ Chart: Full trend across months
```

**Result:** ✅ Same backend, completely different data display!

---

## 🎬 Scenario 3: Add Unknown Item (Worst Case)

**Goal:** Trigger multiple alerts at once

### **Step 1: Note Current State**
```
Ensure you're on "Mon" tab:
- Unknown Item Detected: 1
- Low Confidence Detection: 2
- Total Items: 8
- Detection Rate: 75%
```

### **Step 2: Add Unknown Device**
```powershell
$body = @{
    product_type = "Unknown"
    brand = "Unidentified"
    model_or_series = "Suspicious Box"
    confidence = 22
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/detections/add" `
  -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
```

### **Step 3: Refresh and Observe**
```
MULTIPLE ALERTS TRIGGERED:
✓ Unknown Item Detected: 1 → 2 (RED alert active!)
✓ Low Confidence Detection: 2 → 3 (INCREASED!)
✓ Total Items: 8 → 9
✓ Detection Rate: 75% → 66% (DROPPED!)
✓ Recent Items: Unknown item appears at TOP
✓ Chart: New point added to accuracy trend
```

**Result:** ✅ Cascading updates across entire dashboard!

---

## 🎬 Scenario 4: Add High Confidence Item (Best Case)

**Goal:** See how good data IMPROVES statistics

### **Step 1: Add Premium Device**
```powershell
$body = @{
    product_type = "Premium Laptop"
    brand = "Apple"
    model_or_series = "MacBook Pro M3"
    confidence = 99
    metals = @("Aluminum", "Titanium", "Gold")
    semiconductors = @("Apple M3")
    battery_materials = @("Lithium-ion")
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/detections/add" `
  -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
```

### **Step 2: Refresh and Observe**
```
IMPROVEMENT IN STATS:
✓ Total Items: 9 → 10
✓ Detection Rate: 66% → 70% (IMPROVED!)
✓ Alerts: May DECREASE if no low confidence
✓ Recent Items: Premium item at TOP with 99%
✓ Materials: Aluminum, Titanium, Gold appear
```

**Result:** ✅ Good data lifts overall statistics!

---

## 🎬 Scenario 5: Batch Add - See Chart Transform

**Goal:** Add multiple items rapidly and watch chart evolve

### **Step 1: Open Flutter App - Stay on "Year" tab**

### **Step 2: Run 5 Additions in Sequence**
```powershell
# Item 1 - Good confidence
$body1 = @{product_type="Tablet";brand="Samsung";model_or_series="Tab S9";confidence=93;metals=@("Aluminum");semiconductors=@("Snapdragon");battery_materials=@("Lithium")} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:5000/api/detections/add" -Method POST -Body $body1 -ContentType "application/json" -UseBasicParsing

# Item 2 - Medium confidence  
$body2 = @{product_type="Scanner";brand="Canon";model_or_series="LiDE400";confidence=68;metals=@("Plastic");semiconductors=@("Generic")} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:5000/api/detections/add" -Method POST -Body $body2 -ContentType "application/json" -UseBasicParsing

# Item 3 - Low confidence
$body3 = @{product_type="Modem";brand="Generic";model_or_series="ISP-Provided";confidence=35;metals=@("Copper")} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:5000/api/detections/add" -Method POST -Body $body3 -ContentType "application/json" -UseBasicParsing

# Item 4 - Unknown
$body4 = @{product_type="Unknown";brand="Unknown";model_or_series="Device";confidence=15} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:5000/api/detections/add" -Method POST -Body $body4 -ContentType "application/json" -UseBasicParsing

# Item 5 - High confidence
$body5 = @{product_type="Smartwatch";brand="Fitbit";model_or_series="Sense2";confidence=94;metals=@("Aluminum");semiconductors=@("Qualcomm");battery_materials=@("Li-ion")} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:5000/api/detections/add" -Method POST -Body $body5 -ContentType "application/json" -UseBasicParsing
```

### **Step 3: Refresh Once**
```
BIG CHANGES:
✓ Total Items: 18 → 23
✓ Detection Rate: 72% → 70%
✓ Chart VISIBLY CHANGES:
  - Line extends further right
  - New data points appear
  - Trend pattern shifts
✓ Materials: 5 new product types added
✓ Recent Items: All 5 new items visible
```

**Result:** ✅ Dashboard transforms with each batch!

---

## 📊 Metrics to Watch

Create a simple tracking sheet:

```
EVENT           | Before  | After  | Change
Add low conf    | 7 items | 8 items| +1
Click Year Tab  | 8 items | 18 items| +10 (same backend!)
Add unknown     | 1 unknown| 2 unknown| +1
Batch add 5     | 23 items| 28 items| +5

ALERTS TRACKING:
EVENT           | Before  | After  | Alert Type
Add 28% conf    | 2 risk  | 3 risk | Overheating
Add unknown     | 1 unknown| 2 unknown| Unknown Item
Add 15% conf    | 2 low   | 3 low  | Low Confidence
```

---

## 🔧 Troubleshooting Checklist

**If updates don't show:**
- [ ] Backend running? Check: `netstat -ano | findstr :5000`
- [ ] Refresh app? Press F5 in Flutter browser
- [ ] Right tab? Must change tabs to see period changes
- [ ] Network working? Try: `curl http://localhost:5000/api/status`

**If data looks same across tabs:**
- [ ] Seed script ran? Should have 36+ items in MongoDB
- [ ] Time period filters working? Backend queries should vary
- [ ] MongoDB connection? Check backend logs

**If charts not changing:**
- [ ] Recent data visible? Check Recent Items list first
- [ ] Tab changed? Charts update based on tab selection
- [ ] Multiple data points? Need 3+ items for chart to show trends

---

## 🎯 Key Observations

### **Why Numbers Keep Changing:**
1. ✅ Different time periods have different data counts
2. ✅ Each item has real timestamp (not fake)
3. ✅ Backend queries filter by date range
4. ✅ Alerts calculated from filtered data

### **Why Alerts Vary:**
1. ✅ Based on confidence levels in filtered data
2. ✅ Unknown items counted only in that period
3. ✅ Low confidence thresholds apply to period
4. ✅ Multiple alert types trigger independently

### **Why Charts Look Different:**
1. ✅ More data points = smoother line
2. ✅ Different time ranges = different slopes
3. ✅ Material distribution changes with data
4. ✅ Product type variety increases with time

---

## 🚀 Pro Tips

**Fastest way to see changes:**
1. Add data in PowerShell
2. Immediately switch tabs in Flutter (not F5)
3. Watch numbers transform
4. Switch back to see difference

**Best test sequence:**
1. Start on "Mon" (today only)
2. Note all numbers
3. Switch to "Year" (should be different)
4. Switch to "Lifetime" (should be more)
5. Switch back to "Mon" (should return to original!)

**Proof of real-time:**
1. Add item with PowerShell
2. Switch tabs WITHOUT refreshing
3. Same item count (new item is in DB)
4. Press F5
5. Number jumps (Flutter fetched fresh data)

---

## ✨ You're Ready!

Everything is now **fully alive and dynamic**. Each element responds to real data:

- 📊 Statistics vary by time period
- 🚨 Alerts trigger based on confidence
- 📈 Charts show actual trends
- 📝 Recent items are real detections
- ⏰ Timestamps are accurate
- 🔄 Updates happen in real-time

**Go test it and watch the magic! 🎬**
