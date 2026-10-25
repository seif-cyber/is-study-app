## ⚡ ملخص ST Ch10: Local & Remote Replication

- **Replication** = نسخة مطابقة · **Local** (نفس الـ array أو الـ DC) · **Remote** (موقع بعيد).
- **Source / production LUNs** ← **Target LUNs (replicas)** · تعديل الـ target مش بيأثر على الـ source · incremental resync.
- **Uses:** backup source (مفيش backup window) · fast recovery (RTO) · testing · migration.
- **Consistency** = كل الـ buffer اتكتب على الديسك قبل الـ replica، وده **المتطلب الأساسي**.

| Host-based | الفكرة | العيب |
|---|---|---|
| FS-based | ملفات وفولدرات | الملفات المفتوحة + CPU |
| **LVM mirroring** | blocks، كل write مرتين | موارد الـ host |
| Snapshot | PIT سريع | مساحة |

| Array-based | Target متاح فورًا؟ | المساحة | ملاحظة |
|---|---|---|---|
| **Full-volume mirroring** | ❌ وقت الـ sync | = source | detached = PIT + resync |
| **Pointer-based full** | ✅ | ≥ source | **CoFA** أو Full copy (خلفية) |
| **Pointer-based virtual** | ✅ | صغيرة | **CoFW** + save location، و**يعتمد على الـ source** |

- **Remote:** يحمي من الكوارث والـ ransomware، ويشغّل من موقع DR.
- **Synchronous:** الطرفين مع بعض ← **RPO = 0** · < 100–200 km · bandwidth عالي · غالي و latency.
- **Asynchronous:** الأساسي الأول وبعدين البعيد ← **RPO > 0** · مسافات طويلة · أرخص · مفيش تأثير على الأساسي.
- **SAN-based remote:** على مستوى شبكة التخزين، **block level** (التغييرات بس)، والـ array بيتحكم · الأنواع: Full-volume · Block-level · Snapshot.
