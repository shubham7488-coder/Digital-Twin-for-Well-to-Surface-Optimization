# SIH 26120: Database & Node.js Backend Architecture Reference
## AI-Powered Well-to-Surface Digital Twin for Integrated CSS–SRP Optimization

---

## 1. Database Architecture & Schema

The backend includes a dedicated persistent database layer located at `data/digital_twin_db.json`.

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│                   SIH 26120 DIGITAL TWIN DATABASE SCHEMA                         │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 1. `wells`                  - Technical wellbore & reservoir specifications     │
│ 2. `css_cycles`             - Historical & active thermal steam cycles           │
│ 3. `telemetry_history`      - Time-series SCADA sensor buffer (Pwf, Tbh, dyns)   │
│ 4. `optimizer_benchmarks`   - Multi-objective Pareto candidate evaluations       │
│ 5. `safety_audits`          - Hard-constraint verification records               │
│ 6. `engineer_approvals`     - Step 8 Human-in-the-Loop authorization audit log   │
│ 7. `kalman_calibration_logs`- Dynamic history matching parameters (k, S, U)     │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Table Definitions

#### 1. `wells` (Asset Metadata)
* `wellId` (String): Unique Well Identifier (e.g., `CSS-SRP-W108`)
* `assetName` (String): Asset Pad Name (`BHARAT-HEAVY-PAD-04`)
* `targetFormation` (String): Heavy Oil Formation (`Mandhali Pay Sandstone`)
* `trueVerticalDepthM` (Float): Total Vertical Depth ($1,150.0\text{ m}$)
* `initialViscosityCp` (Float): Cold Reservoir Viscosity ($14,200\text{ cP}$)
* `caprockFractureLimitMpa` (Float): Geomechanical Fracture Threshold ($16.8\text{ MPa}$)
* `suckerRodGrade` (String): API Sucker Rod Grade (`API Spec 11B Grade D`)

#### 2. `css_cycles` (Cyclic Steam Stimulation Runs)
* `id` (String): Cycle record ID (`CSS-W108-C04`)
* `cycleNumber` (Integer): Cycle ordinal index ($1, 2, 3, 4\dots$)
* `steamVolumeTonnes` (Float): Injected mass ($4,200\text{ t}$)
* `soakDurationDays` (Integer): Soak phase time ($5\text{ days}$)
* `cumOilRecoveredM3` (Float): Net oil recovery ($11,920\text{ m}^3$)
* `steamOilRatio` (Float): Cumulative Steam-Oil Ratio ($2.14\text{ m}^3/\text{m}^3$)

#### 3. `engineer_approvals` (Immutable Audit Ledger)
* `id` (String): Approval Record ID (`AUTH-20260904-001`)
* `engineerName` (String): Petroleum Engineer Sign-off (`Er. Shubham (PE #26120-ONGC)`)
* `approvedParameters` (Object): Steam Volume, Soak Days, Stroke Length, SPM
* `safetyStatus` (String): `CERTIFIED_SAFE`
* `status` (String): `DISPATCHED_TO_FIELD_PLC`

---

## 2. Direct Database REST Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/database/stats` | Database storage engine stats, record counts, file size |
| `GET` | `/api/database/wells` | Full list of asset production wells and geological parameters |
| `GET` | `/api/database/cycles` | Complete CSS cycle history with cumulative recovery & SOR |
| `GET` | `/api/database/telemetry` | Time-series SCADA sensor logs (query param: `?limit=50`) |
| `GET` | `/api/database/export` | **One-click full database backup export (`.json` download)** |

---

## 3. How to Launch & Demo

```powershell
# Start server with active database layer
node server.js
```
Then navigate to **View 7: `Database & Records`** inside the Industrial Dashboard:
`http://localhost:3000/industrial_dashboard.html`
