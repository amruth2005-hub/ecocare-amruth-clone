# 🔄 Flutter Real-Time Integration Guide

**Goal:** Bring real-time backend data to both Desktop and Flutter apps without changing UI layouts.

---

## ✅ What's Been Created

1. **API Service** (`lib/services/api_service.dart`) - All 6 backend API methods
2. **API Config** (`lib/config/api_config.dart`) - Centralized configuration
3. **Dashboard Provider** (`lib/providers/dashboard_provider.dart`) - State management for real-time updates

---

## 🚀 Integration Steps (Minimal Changes Required)

### **Step 1: Add Provider Package**

Update `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0
  provider: ^6.0.0  # Add this line
```

Then run:
```bash
flutter pub get
```

---

### **Step 2: Initialize Provider in main.dart**

Update your `main.dart` to wrap the app with MultiProvider:

```dart
import 'package:provider/provider.dart';
import 'providers/dashboard_provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => DashboardProvider()),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'EcoCare',
        // ... rest of your theme config
        home: const SplashScreen(),
      ),
    );
  }
}
```

---

### **Step 3: Update Dashboard Screen onRefresh Method**

In `lib/screens/dashboard_screen.dart`, update the `_onRefresh()` method:

**FIND:**
```dart
  Future<void> _onRefresh() async {
    // simulate refresh
    await Future.delayed(const Duration(seconds: 2));
  }
```

**REPLACE WITH:**
```dart
  Future<void> _onRefresh() async {
    final provider = Provider.of<DashboardProvider>(context, listen: false);
    await provider.refreshData();
  }
```

**Also add import at top:**
```dart
import 'package:provider/provider.dart';
import '../providers/dashboard_provider.dart';
```

---

### **Step 4: Load Data on Screen Initialization**

In `_DashboardScreenState`, add `initState`:

```dart
@override
void initState() {
  super.initState();
  // Load dashboard data when screen opens
  WidgetsBinding.instance.addPostFrameCallback((_) {
    final provider = Provider.of<DashboardProvider>(context, listen: false);
    provider.loadDashboardData();
  });
}
```

---

### **Step 5: Use Backend Data in Your Widgets**

Your existing widgets (like `StatCard`, `AlertsCard`, etc.) can now use real data:

**Example: Modify _buildStatCards to use real data:**

```dart
Widget _buildStatCards(BuildContext context) {
  return Consumer<DashboardProvider>(
    builder: (context, provider, _) {
      if (provider.isLoading && provider.stats.isEmpty) {
        return const SizedBox(
          height: 100,
          child: Center(child: CircularProgressIndicator()),
        );
      }

      // Use your existing StatCard widget but with real data
      return GridView(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          childAspectRatio: 1.5,
          mainAxisSpacing: 16,
          crossAxisSpacing: 16,
        ),
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        children: [
          StatCard(
            title: 'Detection Rate',
            value: '${provider.stats['detectionRate']?['value'] ?? 0}%',
            subtitle: 'Today',
          ),
          StatCard(
            title: 'Total Items',
            value: '${provider.stats['totalItems']?['value'] ?? 0}',
            subtitle: 'Scanned',
          ),
          StatCard(
            title: 'Error Items',
            value: '${provider.stats['errorItems']?['value'] ?? 0}',
            subtitle: 'Failed',
          ),
          StatCard(
            title: 'Accuracy',
            value: '${provider.stats['detectionRate']?['value'] ?? 95}%',
            subtitle: 'Average',
          ),
        ],
      );
    },
  );
}
```

---

### **Step 6: Update Alerts & Materials Widgets**

Similarly update your existing widgets:

```dart
// In AlertsCard widget or wherever you display alerts
Consumer<DashboardProvider>(
  builder: (context, provider, _) {
    return Column(
      children: [
        _alertItem('Unknown', provider.alerts['unknown'] ?? 0),
        _alertItem('Low Confidence', provider.alerts['lowConfidence'] ?? 0),
        _alertItem('Repeated Scan', provider.alerts['repeatedScan'] ?? 0),
      ],
    );
  },
)
```

---

## 📱 Real-Time Flow

```
Backend Add Data
        ↓
User clicks "Refresh" in Flutter
        ↓
DashboardProvider.refreshData()
        ↓
ApiService.getDashboardStats() (+ other methods)
        ↓
DashboardProvider notifyListeners()
        ↓
Consumer<DashboardProvider> widgets rebuild with new data
        ↓
UI displays real-time changes
```

---

## 🔄 Desktop App Integration (Same Concept)

For your **Desktop/React app**, use the same backend API:

```javascript
// In your React component
const [stats, setStats] = useState({});
const [isLoading, setIsLoading] = useState(false);

const loadDashboard = async () => {
  setIsLoading(true);
  try {
    const response = await fetch('http://localhost:5000/api/detections/stats');
    const data = await response.json();
    setStats(data.data);
  } catch (error) {
    console.error('Error loading data:', error);
  }
  setIsLoading(false);
};

useEffect(() => {
  loadDashboard();
}, []);

// Add manual refresh button
<button onClick={loadDashboard}>Refresh</button>
```

---

## ✅ Testing Real-Time Updates

1. **Backend Running:** `npm run dev` in `d:\EcoCare-stcd\backend`
2. **Flutter App Running:** With provider integration
3. **Add Test Data:**
   ```bash
   curl -X POST http://localhost:5000/api/detections/add \
     -H "Content-Type: application/json" \
     -d '{
       "product_type": "Smartphone",
       "brand": "Samsung",
       "model_or_series": "Galaxy S24",
       "confidence": 98
     }'
   ```
4. **See Changes:**
   - Click Refresh in Flutter app
   - Stats update immediately
   - No UI layout changes needed

---

## 📊 Data Flow Architecture

```
┌─────────────────────────────────────────────────────┐
│                BACKEND API                          │
│        (Express + MongoDB Atlas)                    │
│  - /api/detections/add                              │
│  - /api/detections/stats                            │
│  - /api/detections/recent                           │
│  - /api/detections/alerts                           │
│  - /api/detections/materials                        │
│  - /api/detections/accuracy-trend                   │
└────────────┬──────────────────────────┬─────────────┘
             │                          │
    ┌────────▼────────┐        ┌────────▼────────┐
    │ DESKTOP APP     │        │  FLUTTER APP    │
    │ (React/Node)    │        │  (Mobile/Web)   │
    │                 │        │                 │
    │ API calls       │        │ ApiService      │
    │ React useState  │        │ DashboardProv   │
    │ Real-time UI    │        │ Real-time UI    │
    │ Same layout ✓   │        │ Same layout ✓   │
    └─────────────────┘        └─────────────────┘
```

---

## 🆘 Minimal Code Example

If you want to test with absolute minimum changes:

**Just wrap your Dashboard with Consumer:**

```dart
class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  @override
  void initState() {
    super.initState();
    // Load data when screen opens
    Future.microtask(() {
      Provider.of<DashboardProvider>(context, listen: false).loadDashboardData();
    });
  }

  Future<void> _onRefresh() async {
    await Provider.of<DashboardProvider>(context, listen: false).refreshData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // ... your existing AppBar and structure
      body: Consumer<DashboardProvider>(
        builder: (context, provider, _) {
          // All your existing widgets here
          // Just pass provider.stats, provider.alerts, etc. to them
          return _AnimatedPage(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: RefreshIndicator(
                onRefresh: _onRefresh,
                child: ListView(
                  children: [
                    _buildStatCards(context, provider),
                    // ... rest of your widgets
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildStatCards(BuildContext context, DashboardProvider provider) {
    // Use provider.stats instead of mock data
    // Keep your existing StatCard widgets unchanged
    return GridView(/* ... */);
  }
}
```

---

## ⚡ Summary

✅ **NO UI CHANGES NEEDED** - Keep your existing layout
✅ **REAL-TIME UPDATES** - Provider pattern handles state
✅ **SAME FOR BOTH APPS** - Backend serves both equally
✅ **SCALABLE** - Easy to add Socket.IO later for auto-refresh

The key is: **Data flows through Provider → UI binds to Provider → When data changes, UI updates automatically without layout changes.**

---

## 📚 Next: Add Socket.IO for Truly Real-Time (Optional)

Once Provider is working, you can add Socket.IO for automatic updates without manual refresh:

```dart
// In DashboardProvider
void _listenToRealTimeUpdates() {
  socket.on('detection:new', (_) {
    loadDashboardData(); // Auto-refresh on new detection
  });
}
```

But that's **optional** - Provider-based refresh is fully functional and works great!
