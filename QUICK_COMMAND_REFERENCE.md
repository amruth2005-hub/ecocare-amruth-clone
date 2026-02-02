# 🎯 Quick Command Reference

## 🚀 Start Everything

```powershell
# Terminal 1: Start Backend
cd d:\EcoCare-stcd\backend
npm run dev

# Terminal 2: Start Flutter (in new powershell)
cd d:\EcoCare-stcd\flutter\flutter_app
flutter run -d chrome
```

**Access:**
- Flutter App: http://localhost:6388
- Backend API: http://localhost:5000

---

## 📊 Test API Endpoints

### Check Today's Stats
```powershell
$res = Invoke-WebRequest -Uri "http://localhost:5000/api/detections/stats?range=today" -UseBasicParsing
($res.Content | ConvertFrom-Json).data | ConvertTo-Json
```

### Check Year Stats
```powershell
$res = Invoke-WebRequest -Uri "http://localhost:5000/api/detections/stats?range=year" -UseBasicParsing
($res.Content | ConvertFrom-Json).data | ConvertTo-Json
```

### Check Lifetime Stats
```powershell
$res = Invoke-WebRequest -Uri "http://localhost:5000/api/detections/stats?range=lifetime" -UseBasicParsing
($res.Content | ConvertFrom-Json).data | ConvertTo-Json
```

### Check Today's Alerts
```powershell
$res = Invoke-WebRequest -Uri "http://localhost:5000/api/detections/alerts?range=today" -UseBasicParsing
($res.Content | ConvertFrom-Json).data | ConvertTo-Json
```

### Check Today's Recent Items
```powershell
$res = Invoke-WebRequest -Uri "http://localhost:5000/api/detections/recent?range=today&limit=5" -UseBasicParsing
($res.Content | ConvertFrom-Json).data | ConvertTo-Json
```

---

## ➕ Add Test Data

### Add Hazardous Item (Triggers Alert)
```powershell
$body = @{
  product_type="Hazardous Device"
  brand="TestBrand"
  model_or_series="HD-001"
  confidence=45
  battery_materials=@("Lithium","Mercury")
  semiconductors=@()
  metals=@()
  structural_materials=@("Plastic")
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/detections/add" `
  -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
```

### Add Unknown Item (Increases Error Count)
```powershell
$body = @{
  product_type="Unknown"
  brand="Unknown"
  model_or_series="Unknown"
  confidence=5
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/detections/add" `
  -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
```

### Add High-Confidence Item
```powershell
$body = @{
  product_type="Smartphone"
  brand="Samsung"
  model_or_series="S25"
  confidence=98
  battery_materials=@("Lithium")
  semiconductors=@()
  metals=@()
  structural_materials=@("Glass","Aluminum")
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/detections/add" `
  -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
```

---

## 🔄 Refresh in Flutter

```
Press: F5 in browser (or Cmd+R on Mac)
Effect: Reloads data for currently selected time period
```

---

## 🧪 Run Test Scripts

### Push All Alert Types (10 Items)
```powershell
cd d:\EcoCare-stcd\backend
node test-alerts-data.js
```

### Push Time-Based Data (9 Items from different dates)
```powershell
cd d:\EcoCare-stcd\backend
node test-time-based-data.js
```

---

## 📈 Expected Variations

### By Time Period:
```
MON (Today):
- Total Items: 36
- Detection Rate: 92%
- Error Items: 3
- Hazardous Alerts: 3
- Low Confidence: 9

YEAR (2026):
- Total Items: 61
- Detection Rate: 89%
- Error Items: 7
- Hazardous Alerts: 4
- Low Confidence: 12

LIFETIME (All):
- Total Items: 61+
- Detection Rate: 89%
- Error Items: 7+
- Hazardous Alerts: 5+
- Low Confidence: 13+
```

---

## 🔍 Verify System is Working

### Backend Running?
```powershell
netstat -ano | findstr :5000
```
✓ Should show: LISTENING on 0.0.0.0:5000

### MongoDB Connected?
```powershell
$res = Invoke-WebRequest -Uri "http://localhost:5000/api/detections/stats" -UseBasicParsing
($res.Content | ConvertFrom-Json).data | ConvertTo-Json
```
✓ Should return: stats with numbers

### Flutter Connected?
1. Open http://localhost:6388
2. Should see dashboard with data
3. Click Mon → See 36 items
4. Click Year → See 61 items

---

## 📝 Check Logs

### Backend Logs
```powershell
# Logs show in terminal where npm run dev is running
# Look for: "✓ Server running on http://localhost:5000"
# Look for: "✓ MongoDB connected"
```

### Flutter Logs
```
# Logs show in VS Code terminal for Flutter
# Look for: "⚡ Dart DevTools running on..."
# Look for: API responses in console
```

---

## 🎯 Test Workflow

**Recommended Test Order:**

1. **Start Backend & Flutter**
   ```powershell
   npm run dev  # Terminal 1
   flutter run -d chrome  # Terminal 2
   ```

2. **Check Initial State**
   - Flutter shows: 36 items, 92%, 3 alerts

3. **Test Time Filters**
   - Click Mon → 36 items
   - Click Year → 61 items
   - Click Lifetime → 61+ items
   - Click Mon again → Back to 36

4. **Add New Data**
   ```powershell
   # Use one of the "Add Test Data" commands above
   ```

5. **Refresh Flutter (F5)**
   - New data appears
   - Counts update
   - Alerts change

6. **Repeat**
   - Switch between periods
   - Add different types (hazardous, unknown, etc.)
   - See all values change dynamically

---

## 🚨 Troubleshooting

### Backend Not Starting?
```powershell
# Make sure .env file exists with:
# MONGO_URI=mongodb+srv://sonu:sonu123@cluster0.wrwk0kk.mongodb.net/ecocare
# PORT=5000

# Restart:
npm run dev
```

### Flutter Not Loading?
```powershell
# Clear cache:
flutter clean
flutter pub get

# Run again:
flutter run -d chrome
```

### No Data Showing?
```powershell
# Check backend connection:
$res = Invoke-WebRequest -Uri "http://localhost:5000/api/detections/stats" -UseBasicParsing
$res.StatusCode  # Should be 200

# Check MongoDB:
# Log into https://cloud.mongodb.com
# Cluster0 → Browse Collections → ecocare.detections
```

### Alerts Showing 0?
```
This is normal! Alerts only show for specific data types.
Test by adding hazardous item:
node test-alerts-data.js

Then press F5 in Flutter
```

---

## 📊 Data Summary

| Items | Type | Date | Status |
|-------|------|------|--------|
| 36 | Today | 2026-02-01 | ✓ Active |
| 25 | Year (Jan) | 2026-01-01+ | ✓ Active |
| 9 | Various dates | 2025-2026 | ✓ Active |
| + | New via API | Any time | ✓ Addable |

**Total in MongoDB:** 70+ items

---

## ✅ Success Checklist

- [ ] Backend running on :5000
- [ ] Flutter showing dashboard
- [ ] Mon shows 36 items
- [ ] Year shows 61 items
- [ ] Alerts display real counts
- [ ] Can add new data via API
- [ ] F5 refresh updates values
- [ ] Charts change per period
- [ ] Recent items vary by filter

**All items checked? System is ALIVE!** 🎉
