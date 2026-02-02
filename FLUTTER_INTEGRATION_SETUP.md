# 🚀 Flutter Backend Integration - Setup Guide

## ✅ Prerequisites Completed

Your backend is running on **http://localhost:5000** and connected to MongoDB Atlas. The Flutter app now has:
- ✅ HTTP dependency added (`http: ^1.1.0`)
- ✅ API configuration (`lib/config/api_config.dart`)
- ✅ API service (`lib/services/api_service.dart`)
- ✅ Test dashboard screen (`lib/screens/test_dashboard_screen.dart`)

---

## 🎯 Quick Start - Run Flutter App

### **1. Install Dependencies**

```bash
cd d:\EcoCare-stcd\flutter\flutter_app
flutter pub get
```

Expected output:
```
Running "flutter pub get" in flutter_app...
Resolving dependencies... (10-15 seconds)
Got dependencies
Process finished with exit code 0
```

### **2. Choose Your Test Entry Point**

**Option A: Quick Test (Recommended)**
- Open VS Code's Run and Debug panel (`Ctrl + Shift + D`)
- Create launch configuration or use:
  ```bash
  flutter run -t lib/main_test.dart
  ```
  This launches directly to the test dashboard, bypassing the splash screen

**Option B: Normal App Flow**
- Use standard:
  ```bash
  flutter run
  ```
  This goes through splash screen (may take longer)

### **3. Run on Emulator or Device**

**For Android Emulator (Virtual Device):**
```bash
# Start emulator first (from Android Studio)
# OR manually:
# emulator -avd <device_name>

# Then run Flutter app
flutter run -t lib/main_test.dart
```

**For Real Android Device:**
```bash
# Enable USB debugging on phone
# Connect via USB cable
# Run:
flutter run -t lib/main_test.dart
```

**For iOS Simulator (Mac only):**
```bash
open -a Simulator
flutter run -t lib/main_test.dart
```

---

## 📱 What You'll See

### **Test Dashboard Screen Features:**

1. **Connection Status**
   - Green checkmark: ✅ Backend connected successfully
   - Red error: ❌ Backend connection failed

2. **Dashboard Statistics** (Real-time from backend)
   - Detection Rate (%)
   - Total Items Scanned
   - Error Items

3. **Alerts Summary** (Real-time from backend)
   - Unknown Products Count
   - Low Confidence Detections
   - Repeated Scans Needed

4. **Add New Detection Form**
   - Enter Product Type (e.g., "Laptop")
   - Enter Brand (e.g., "Dell")
   - Enter Model/Series (e.g., "Inspiron 15")
   - Click "Add Detection"
   - **Data immediately appears in recent detections list below**

5. **Recent Detections List**
   - Shows last 5 detections
   - Displays confidence percentage
   - Refreshes automatically after adding new detection

6. **Refresh Button**
   - Top-right icon button
   - Pulls latest data from backend
   - Shows loading spinner while fetching

---

## 🔧 Platform-Specific Configuration

### **Android Emulator**
Base URL: `http://10.0.2.2:5000` (already configured in `api_config.dart`)

### **iOS Simulator**
If testing on iOS, update `lib/config/api_config.dart`:
```dart
static const String baseUrl = 'http://localhost:5000';
```

### **Real Device (Phone/Tablet)**
Find your machine's IP address:
```powershell
# Windows
ipconfig
# Look for IPv4 Address (e.g., 192.168.x.x)
```

Update `lib/config/api_config.dart`:
```dart
static const String baseUrl = 'http://192.168.x.x:5000'; // Replace with your IP
```

---

## 🧪 End-to-End Testing Flow

### **Test Scenario: Add Detection and See Real-Time Update**

1. **Start Backend** (if not running)
   ```bash
   cd d:\EcoCare-stcd\backend
   npm run dev
   ```
   Expected: `Server running on port 5000`

2. **Open Flutter App**
   ```bash
   cd d:\EcoCare-stcd\flutter\flutter_app
   flutter run -t lib/main_test.dart
   ```

3. **Verify Connection**
   - See green ✅ status indicator

4. **View Initial Stats**
   - Dashboard shows current counts
   - Recent detections list (if any exist)

5. **Add Test Detection**
   - Form fields:
     - Product Type: `Smartphone`
     - Brand: `Samsung`
     - Model: `Galaxy S24`
   - Click "Add Detection"

6. **See Real-Time Update**
   - Button shows loading spinner
   - Form clears
   - Success message appears
   - New detection appears in "Recent Detections" list
   - Statistics update automatically

7. **Test Refresh**
   - Modify data via curl (see backend README)
   - Click refresh button in Flutter app
   - Data updates instantly

---

## 🐛 Troubleshooting

### **Issue: "Connection Refused" Error**
**Cause:** Backend not running
**Solution:**
```bash
cd d:\EcoCare-stcd\backend
npm run dev
# Wait for: "Server running on port 5000 and Connected to MongoDB"
```

### **Issue: "Network Error" in Flutter App**
**Cause:** Incorrect base URL for your device type
**Solution:**
- Android Emulator: Ensure using `http://10.0.2.2:5000`
- iOS Simulator: Use `http://localhost:5000`
- Real Device: Use machine IP (e.g., `http://192.168.x.x:5000`)

Update in `lib/config/api_config.dart`

### **Issue: "Timeout" Errors**
**Cause:** Backend taking >10 seconds to respond
**Solution:**
1. Check backend console for errors
2. Verify MongoDB Atlas connection
3. Check network/firewall
4. Increase timeout in `lib/services/api_service.dart`:
   ```dart
   static const Duration _timeout = Duration(seconds: 15); // Increase from 10
   ```

### **Issue: "No Recent Detections" but Backend Has Data**
**Solution:**
- Click refresh button (top-right icon)
- Or re-add a detection
- Data should appear instantly

---

## 📊 Backend API Endpoints Being Used

| Endpoint | Method | Purpose | Called By |
|----------|--------|---------|-----------|
| `/api/detections/add` | POST | Create new detection | "Add Detection" button |
| `/api/detections/recent` | GET | Get recent detections | Auto-refresh on load |
| `/api/detections/stats` | GET | Get statistics | Auto-load on screen open |
| `/api/detections/alerts` | GET | Get alerts summary | Auto-load on screen open |

---

## 🎨 Customizing the Dashboard

### **To modify the test dashboard:**

Edit: `lib/screens/test_dashboard_screen.dart`

**Add more statistics:**
```dart
// Add this after loading stats
final materials = await ApiService.getTopMaterials();
final trend = await ApiService.getAccuracyTrend();
```

**Add charts:**
Install `fl_chart` package and create visualizations

**Add real-time socket updates:**
See `FLUTTER_GUIDE.md` for Socket.IO integration

---

## ✅ Testing Checklist

- [ ] Backend running on `http://localhost:5000`
- [ ] MongoDB Atlas connection verified
- [ ] `flutter pub get` executed
- [ ] App launches without errors
- [ ] Green ✅ connection status visible
- [ ] Initial statistics load
- [ ] Can add new detection
- [ ] Statistics update after adding detection
- [ ] Recent detections list shows new entry
- [ ] Refresh button works
- [ ] On real device: Updated base URL in `api_config.dart`

---

## 📚 Next Steps

Once everything is working:

1. **Integrate with existing screens**
   - Update `Dashboard.jsx` to use ApiService
   - Replace static data with real backend data
   - Add FutureBuilder for async loading

2. **Add real-time Socket.IO**
   - See FLUTTER_GUIDE.md for implementation
   - Auto-refresh when new data added elsewhere

3. **Add pagination**
   - Load 20 detections per page
   - Implement scroll-to-load-more

4. **Add filtering**
   - Filter by date range, product type, confidence
   - Update UI based on filters

---

## 🆘 Need Help?

1. Check backend logs: `d:\EcoCare-stcd\backend` (running terminal)
2. Check Flutter console output: Run terminal shows errors
3. Enable verbose logging: `flutter run -v`
4. Check network: Ensure emulator/device can reach your machine

---

**Happy testing!** 🎉
