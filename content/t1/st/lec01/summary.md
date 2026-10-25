## ⚡ ملخص ST Ch1: Introduction to Information Storage

- **Information storage** = حفظ البيانات عشان access و update و manage.
- **Data** = raw facts من غير سياق (0s و 1s) · **Information** = knowledge derived from data. يعني Data = اللي بنخزنه، و Information = اللي بنطلع بيه بعد المعالجة بسياق.
- **نمو البيانات بسبب:** processing capabilities أعلى · تخزين أرخص · اتصالات أرخص وأسرع.
- **Structured** (rows/columns، DBMS، ~20%) · **Unstructured** (> **80%**: X-Rays, images, forms, IM, web pages, audio/video).
- **Big Data**: أكبر من قدرة الأدوات التقليدية، ومحتاجة real-time. والـ Ecosystem: **Devices ← Collectors ← Aggregators ← Users/Buyers**.

| المعمارية | الفكرة |
|---|---|
| **DAS** | متوصل مباشرة بالسيرفر، بسيط ورخيص بس محدود |
| **JBOD** | Just a Bunch of Disks |
| **RAID** | كذا ديسك ← performance + capacity + reliability |
| **NAS** | **file-level** عن طريق **LAN** · رخيص لمشاركة الملفات |
| **SAN** | **block-level** عن طريق **Fibre Channel** · سريع بس غالي |
| **IP-SAN** | block-level عن طريق **IP** · أرخص |

- **Server-centric** = تخزين جوه كل server ← **islands of information** · **Information-centric** = مركزي ومتشارك، والسعة بتتوسع من غير downtime.
- **Data center core elements (5):** Application · DBMS · Server & OS · Network · Storage Array.
- **Characteristics:** Availability · Security · Scalability · Performance · Data Integrity · Capacity · Manageability.
- **Management:** Monitoring · Reporting · Provisioning (Capacity planning + Resource planning).
- **Challenges:** Explosive growth · Changing value · Data quality & integration · Security/Privacy/Compliance (GDPR) · Accessibility & recovery · Cost.
- **Cloud** = on-demand + pay-as-you-go، وقايم على **virtualization**.
