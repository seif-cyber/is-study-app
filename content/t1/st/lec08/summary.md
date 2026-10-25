## ⚡ ملخص ST Ch8: Business Continuity

- **BC** = الشركة تكمّل بأقل تعطيل · **BC = Proactive planning + Reactive recovery**.
- **IA** = البنية تشتغل حسب توقعات البيزنس · معاييرها: **Reliability · Accessibility · Timeliness**.
- **عدم التوافر:** **Planned 80%** (backup، reporting، DW extracts، restore) · **Unplanned 20%** (DB corruption، component failure، human error) · **Disaster < 1%**.
- **MTTR** = إصلاح = **downtime** (detection + diagnosis + repair + restoration) ← أقل أحسن.
- **MTBF** = بين الأعطال = **uptime** ← أعلى أحسن.
- **IA = Uptime/(Uptime+Downtime) = MTBF/(MTBF+MTTR)** (مثال: 720/(720+8) ≈ 98.9%).
- **Cost/hr = Productivity loss/hr (salaries÷hours) + Revenue loss/hr (revenue÷open hours)**.
- **Disaster recovery ← backup + logs** · **Disaster restart ← mirrored replicas**.
- **RPO** = أقصى **فقد بيانات** (RPO 1h ← backup كل ساعة) · **RTO** = أقصى **downtime** (RTO 4h ← الرجوع خلال 4 ساعات).
- **BCP lifecycle:** Establishing objectives ← Analyzing (**BIA**) ← Designing & developing ← Implementing (DR sites، redundancy) ← Training/testing/assessing/maintaining.
- **SPOF** = مكون عطله يوقف كل حاجة ← fault tolerance: multiple HBAs (HBA) · multiple fabrics (switch) · multiple ports · RAID (disk) · remote site (site) · **clustering + heartbeats** (server).
- **Multipathing** = path failover + load sharing.
- **BIA** (فلوس أو وقت): العمليات الحرجة · التكلفة · **max tolerable outage + RTO/RPO** · الموارد · الاستراتيجيات.
- **الحلول:** fault-tolerant config · multipathing · backup (tape ← disk) · local replication · remote replication · host-based (LVM).
