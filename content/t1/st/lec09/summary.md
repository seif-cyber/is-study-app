## ⚡ ملخص ST Ch9: Backup and Recovery

- **Backup** = نسخة من بيانات الإنتاج لاسترجاع المحذوف أو الفاسد.
- **الأغراض:** Disaster recovery (tapes offsite / remote replication) · **Operational** (مسح بالغلط، backup قبل bulk update) · **Archival** (compliance، e-mails، CAS).
- **الاعتبارات:** Business (**RPO/RTO**، retention) · Technical (media، granularity، timing) · Files (**الكبيرة أكفأ**، الصغيرة بتبطّأ الـ catalog) · Performance (tape و start/stop، compression كويس للـ text وضعيف للـ JPEG/ZIP).

| النوع | بينسخ | Backup | Restore |
|---|---|---|---|
| Full | كله | بطيء | الأبسط |
| Incremental | من آخر **full أو incremental** | **سريع** | full + **كل** الـ incrementals |
| Cumulative | من آخر **full** | أبطأ | full + **آخر** cumulative |

- **RPO 1 day** ← backup يومي، وبيحدد الـ retention · **RTO** ← الوسيط (disk أسرع من tape).
- **Hot** (شغال، مفيش downtime، agents) vs **Cold** (واقف، متسق، downtime) · **PIT** = snapshot بـ pointers · **BMR** = النظام كله على أي هاردوير.
- **المكونات:** Backup server (**catalog**، policies، metadata) · Clients (metadata ← server، data ← node) · Storage node (media server) · Devices.
- **Backup:** schedule ← catalog ← load media / instruct clients ← data ← device ← metadata ← update catalog.
- **Topologies:** Direct-attached (metadata على الـ LAN) · LAN-based (يضغط الشبكة) · **SAN-based = LAN-free** · Mixed.
- **NAS:** Server-based (صغير، يضغط الـ LAN) · **Serverless** (يتجاوز السيرفر) · **NDMP 2-way** (tape على نفس الـ NAS) · **NDMP 3-way** (tape على NAS تاني، private network).
