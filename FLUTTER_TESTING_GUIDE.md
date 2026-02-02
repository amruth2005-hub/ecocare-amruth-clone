# 🧪 Flutter Real-Time Testing Guide

## ✅ Prerequisites Check

Before testing, verify everything is running:

```bash
# Backend Status - Should return 201 Created
$body = @{product_type="Test";brand="TestBrand";model_or_series="TestModel";confidence=95} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:5000/api/detections/add" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing

# Flutter App - Should be running in terminal
# Chrome or device should show EcoCare app UI
```

---

## 🚀 Testing Real-Time Updates

### **Step 1: Open Flutter App**

The app is now running. You should see:
- **EcoCare Dashboard** in Chrome or your connected device
- Initial data loading (may show empty or previous data)
- A **pull-to-refresh** gesture available

### **Step 2: Pull Down to Refresh**

**On Web/Chrome:**
- Simply refresh the page: `F5` or `Ctrl+R`
- OR manually pull down (if available in dev tools)

**On Mobile/Emulator:**
- Drag from top of screen downward
- Release to trigger refresh

### **Step 3: Watch for Real-Time Data**

After refresh, you should see:

```
✅ Detection Rate: 100%
✅ Total Items: 3
✅ Error Items: 0

📋 Recent Detections:
   1. Smartphone - Samsung - S24 (98% confidence)
   2. Smartphone - Samsung - S24 (98% confidence)
   3. Smartphone - Samsung - S24 (98% confidence)
```

---

## 📊 Testing Workflow

### **Test Case 1: Initial Load**
1. App opens
2. Dashboard calls `loadDashboardData()` in `initState`
3. Data appears without manual refresh

### **Test Case 2: Manual Refresh**
1. Pull down on dashboard
2. `_onRefresh()` is called
3. Provider fetches fresh data
4. UI updates with new stats

### **Test Case 3: Add New Data & Refresh**
1. Add new detection via curl:
   ```powershell
   $body = @{
       product_type = "Laptop"
       brand = "Dell"
       model_or_series = "XPS 15"
       confidence = 95
   } | ConvertTo-Json
   
   Invoke-WebRequest -Uri "http://localhost:5000/api/detections/add" `
     -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
   ```

2. Pull to refresh in Flutter app

3. **Stats should update:**
   - Total Items: **4** (was 3)
   - Recent list: **4 items** instead of 3
   - New Laptop appears in list

---

## 🔍 Debug: What to Check If It Doesn't Work

### **Issue 1: No Data Shows**
**Causes:**
- Backend not running
- Wrong API base URL

**Solutions:**
```bash
# Check backend is running
netstat -ano | findstr :5000

# Check logs in backend terminal
# Should show: "Connected to MongoDB"

# Check Flutter console for errors
# Look for: "Error connecting to backend"
```

### **Issue 2: Data Doesn't Update on Refresh**
**Causes:**
- Provider not properly initialized
- API timeouts

**Solutions:**
- Check internet connection: Can you reach localhost:5000?
- Check Flutter console for API errors
- Verify `api_config.dart` baseUrl is correct:
  - Chrome: `http://localhost:5000` ✓
  - Android Emulator: `http://10.0.2.2:5000`
  - iOS Simulator: `http://localhost:5000`
  - Real Device: `http://<your-machine-ip>:5000`

### **Issue 3: Provider Not Connected**
**Check:**
```dart
// In main.dart - verify MultiProvider wraps MaterialApp
return MultiProvider(
  providers: [
    ChangeNotifierProvider(create: (_) => DashboardProvider()),
  ],
  child: MaterialApp(...),
);
```

---

## ✅ Verification Checklist

- [ ] Backend running: `npm run dev` (shows "Server running on port 5000")
- [ ] Flutter app running: Can see UI in Chrome/device
- [ ] Initial data loads on app open
- [ ] Pull-to-refresh works
- [ ] Statistics show: 100% detection rate, 3+ items
- [ ] Recent detections list shows Samsung S24 phones
- [ ] Can add new data and see stats update on refresh

---

## 🎯 Expected Output

### **Dashboard Screen Should Show:**

```
┌────────────────────────────────────┐
│  EcoCare Dashboard                 │
├────────────────────────────────────┤
│                                    │
│  📊 STATISTICS:                   │
│  ┌──────┐  ┌──────┐  ┌──────┐    │
│  │ 100% │  │  3   │  │  0   │    │
│  │ Rate │  │Items │  │Errors│    │
│  └──────┘  └──────┘  └──────┘    │
│                                    │
│  📋 RECENT DETECTIONS:            │
│  ─────────────────────────────────│
│  • Smartphone                      │
│    Samsung | S24 | 98%            │
│                                    │
│  • Smartphone                      │
│    Samsung | S24 | 98%            │
│                                    │
│  • Smartphone                      │
│    Samsung | S24 | 98%            │
│                                    │
│  ⚠️  ALERTS:                       │
│  Unknown: 0 | Low Conf: 0         │
│                                    │
└────────────────────────────────────┘
```

---

## 🔄 Real-Time Flow Diagram

```
User Opens Flutter App
        ↓
initState() triggers
        ↓
DashboardProvider.loadDashboardData()
        ↓
API calls to backend:
├─ /api/detections/stats
├─ /api/detections/recent
├─ /api/detections/alerts
├─ /api/detections/materials
└─ /api/detections/accuracy-trend
        ↓
Data loaded from MongoDB Atlas
        ↓
DashboardProvider notifyListeners()
        ↓
Flutter Widgets rebuild with real data
        ↓
Dashboard displays:
├─ Statistics
├─ Recent Detections
├─ Alerts
└─ Materials Chart
        ↓
User pulls down to refresh
        ↓
_onRefresh() → provider.refreshData()
        ↓
New data fetched → UI updates instantly ✓
```

---

## 📱 Quick Commands

**Add test data:**
```powershell
$body = @{product_type="Tablet";brand="Apple";model_or_series="iPad Pro";confidence=96} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:5000/api/detections/add" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
```

**Check stats:**
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/detections/stats" -Method GET -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Refresh Flutter:**
- Chrome: `F5`
- Mobile: Drag from top
- Code: `Provider.of<DashboardProvider>(context, listen: false).refreshData()`

---

## 🎉 Success Criteria

✅ You're successful when:
1. App shows "100% Detection Rate" on load
2. "Total Items: 3" displays
3. Samsung S24 phones appear in recent detections
4. Pull-to-refresh updates the data
5. Adding new items increases the counter
6. No error messages in Flutter console

---

## 📞 Quick Reference

| Component | Status | Command |
|-----------|--------|---------|
| Backend | Running | `npm run dev` in `d:\EcoCare-stcd\backend` |
| Flutter | Running | `flutter run` in `d:\EcoCare-stcd\flutter\flutter_app` |
| Database | Connected | MongoDB Atlas (check backend logs) |
| API | Working | `http://localhost:5000` ✓ |
| Provider | Integrated | DashboardProvider in main.dart ✓ |

---

**🎊 You're all set! Start testing now!**
