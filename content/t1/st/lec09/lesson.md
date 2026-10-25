# النسخ الاحتياطي والاسترجاع — Chapter 9: Backup and Recovery

> [!NOTE]
> المحاضرة دي عملية جدًا: يعني إيه **backup** وأغراضه، والاعتبارات اللي بنختار على أساسها، وأنواع الـ backup (**Full و Incremental و Differential**) وإزاي بنرجّع من كل نوع، و**Hot vs Cold**، ومكونات نظام الـ backup، والـ **Topologies**، وفي الآخر الـ backup في بيئات **NAS** (NDMP).

**خريطة المحاضرة:**

1. الـ Backup والـ Recovery وأغراضهم
2. اعتبارات الـ Backup (Backup Considerations)
3. مستويات الـ Backup (Granularity): Full و Incremental و Cumulative
4. اعتبارات الاسترجاع (RPO و RTO)
5. طرق الـ Backup: Hot و Cold و PIT و BMR
6. عملية الـ Backup (المكونات)
7. خطوات الـ Backup والـ Restore
8. طوبولوجيات الـ Backup
9. الـ Backup في بيئات الـ NAS

---

## 1. الـ Backup والـ Recovery

> **Backup** is a **copy of production data** retained specifically for **recovering deleted or corrupted information**.

### التحديات

مع زيادة متطلبات البيزنس والقوانين في التخزين والاحتفاظ والتوافر، الشركات بتواجه:
1. **أحجام بيانات متزايدة** في **أماكن متعددة**.
2. الحاجة لـ **backups و restores سريعة ومتسقة**.
3. ده كله **بتكلفة أقل وموارد أقل**.

### عشان تنجح، الشركة لازم:
1. تضمن إن **البيانات الصح** موجودة **في المكان الصح والوقت الصح**.
2. تقيّم تقنيات الـ backup **مع احتياجات الاسترجاع والاحتفاظ**.
3. تطبّق حلول بتخلّي **الاسترجاع سهل** حسب احتياجات البيزنس.

![شكل 1: ليه محتاجين backup؟ البيانات شريان حياة البيزنس، والمخاطر في كل حتة: Human error، System/hardware failure، Virus/hackers، Natural disaster، وكمان القوانين بتطلب حماية البيانات](img/st/lec09/why-backup.webp)

> [!TIP]
> **Recovery procedures:** استراتيجية الـ backup محتاجة **إجراءات استرجاع موثّقة ومختبرة** عشان نضمن إن الـ backup هيرجع صح فعلًا.

### أغراض الـ Backup (Purposes)

| الغرض | الشرح | أمثلة / طرق |
|---|---|---|
| **1. Disaster Recovery** | لما **الموقع الأساسي مش متاح** بسبب كارثة | **Tape backups offsite** بتترجع وقت الحاجة · أو **remote replication** لما الـ RPO/RTO صارمين |
| **2. Operational Backup** | حماية من **فقد البيانات الروتيني** (مسح ملف أو e-mail بالغلط، ملفات فاسدة) | **incremental أو differential** للبيانات الشغالة · مثال: **backup للـ database قبل bulk update** |
| **3. Archival** | **حفظ طويل المدى** للـ **compliance** والسجلات التاريخية | e-mails، transaction records، بيانات قانونية · والـ **CAS** بقى شائع، بس الشركات الصغيرة والمتوسطة لسه بتستخدم backup تقليدي |

---

## 2. اعتبارات الـ Backup — Backup Considerations

| الفئة | الاعتبارات |
|---|---|
| **1. Business Needs** | **RPO و RTO** = **أهم عوامل** اختيار الاستراتيجية · **Retention period**: قد إيه البيانات تتحفظ (قصير للـ operational، وطويل للـ archival) |
| **2. Technical Factors** | **نوع الوسيط** (disk، tape، cloud) حسب الاحتفاظ والوصول · **Granularity**: مستوى التفاصيل (full system، files، transactions) · **Timing**: الـ backup ميعطّلش الإنتاج، والـ restore يتخطط كويس |
| **3. File & System Characteristics** | **Location**: بيانات على **منصات مختلفة** والـ backup لازم يحافظ على الاتساق · **حجم وعدد الملفات**: **الملفات الكبيرة أكفأ في الـ backup من ملفات صغيرة كتير**، لأن الملفات الصغيرة الكتير بتزوّد **catalog entries** فتبطّأ الـ backup والـ restore |
| **4. Performance Factors** | **حدود الوسيط**: الـ **tape بيبطأ مع الملفات الصغيرة** بسبب **start/stop cycles** · **Compression**: بيوفر مساحة، وفعاليته بتعتمد على نوع البيانات: **كويس للنصوص، وضعيف للـ binaries أو الملفات المضغوطة أصلًا (JPEG/ZIP)** |

> [!EXAM]
> - **الملفات الكبيرة أكفأ من ملفات صغيرة كتير** في الـ backup.
> - الـ **compression** ممتاز للـ **text**، وضعيف للـ **JPEG و ZIP**.

---

## 3. مستويات الـ Backup — Backup Granularity

الـ granularity بتعتمد على **احتياجات البيزنس و RTO/RPO**، والأنواع: **Full، Cumulative (Differential)، Incremental**.

![شكل 2: مستويات الـ backup: Full (كل يوم Su بيتعمل كامل)، و Cumulative (بيكبر يوم عن يوم لحد الـ full الجاي)، و Incremental (صغير كل يوم)](img/st/lec09/granularity.webp)

| النوع | بينسخ إيه | الـ Backup | الـ Restore |
|---|---|---|---|
| **Full Backup** | **كل بيانات الإنتاج** في نقطة زمنية معينة | **بطيء ومستهلك للموارد** | **الأبسط**: من نسخة الـ full بس |
| **Incremental Backup** | **التغييرات من آخر full أو incremental** | **سريع** (بيانات قليلة) | **أبطأ وأعقد**: محتاج **آخر full + كل الـ incrementals بعده** لحد نقطة الاسترجاع |
| **Cumulative / Differential Backup** | **كل التغييرات من آخر full** | **أبطأ من الـ incremental** (بيكبر كل يوم) | **أسرع من الـ incremental**: محتاج **آخر full + آخر cumulative بس** |

### مثال عملي

> [!EXAMPLE]
> **Full backup يوم الإتنين**، وباقي الأيام backup يومي. حصل عطل **يوم الجمعة** وعايزين نرجّع:
>
> | | الإتنين | التلات | الأربع | الخميس | **الـ Restore يوم الجمعة محتاج** |
> |---|---|---|---|---|---|
> | **Incremental** | Full (Files 1,2,3) | File 4 | Updated File 3 | File 5 | **Full + Tue + Wed + Thu** (4 نسخ) |
> | **Cumulative** | Full (Files 1,2,3) | File 4 | Files 4,5 | Files 4,5,6 | **Full + Thu cumulative** (نسختين بس) |

![شكل 3: الـ restore من incremental (محتاج كل النسخ) مقابل الـ restore من cumulative (محتاج الـ full وآخر cumulative)](img/st/lec09/restore-inc-cum.webp)

> [!IMPORTANT]
> - **Incremental** = **backup أسرع / restore أبطأ**.
> - **Cumulative** = **backup أبطأ / restore أسرع**.
> - **Full** = **backup أبطأ حاجة / restore أسرع وأبسط حاجة**.

---

## 4. اعتبارات الاسترجاع — Recovery Considerations

| | **RPO** | **RTO** |
|---|---|---|
| **بيحدد** | **فقد البيانات المقبول** و**تكرار الـ backup** | **سرعة استرجاع البيانات** |
| **مثال** | **RPO = يوم واحد** ← backup **يومي** | بيأثر على **اختيار الوسيط** (الـ **disk أسرع من الـ tape**) |
| **ملاحظات** | بيحدد كمان **فترة الاحتفاظ (retention)**: **قصيرة** ← ممكن متلاقيش النقطة اللي محتاجها · **طويلة** ← تضمن الاسترجاع بس **تخزين وتكلفة أكتر** | الشركات ممكن **تخلط طرق backup** عشان تحقق الـ RTO · و**الـ full backups مفضّلة للاسترجاع الأسرع** لأن الـ incremental و cumulative معتمدين على full سابق ووسائط متعددة |

---

## 5. طرق الـ Backup — Backup Methods

| | **Hot Backup** | **Cold Backup** |
|---|---|---|
| **حالة التطبيق** | **شغال (active)** أثناء الـ backup | **واقف (inactive)** أثناء الـ backup |
| **المستخدمين** | **يقدروا يوصلوا للبيانات** | **مش هيقدروا يوصلوا** |
| **محتاج** | **open file / database agents** عشان الاتساق | — |
| **✅ الميزة** | **مفيش downtime** | **backup موثوق ومتسق** |
| **❌ العيب** | **ممكن يأثر على الأداء**، و**الاتساق أصعب** | **downtime** |

### Point-in-Time (PIT) Copy

- بيتستخدم لما **الـ downtime بتاع الـ cold** أو **تأثير الأداء بتاع الـ hot** **مش مقبولين**.
- بيعمل **snapshot سريعة قائمة على pointers**.
- الـ database **بتقف لحظة قصيرة**، وبعدين الـ backup يكمّل **في الخلفية**.
- **كفء في السرعة والمساحة**.

### Bare-Metal Recovery (BMR)

- في بيئة الـ **disaster recovery**: backup فيه **كل الـ metadata ومعلومات النظام وإعدادات التطبيقات** عشان **استرجاع كامل للنظام**.
- بيرجّع **النظام كله** (**OS، partitions، applications، configs**) **مع البيانات**.
- بيسمح بالاسترجاع على **نفس الهاردوير أو حتى هاردوير مختلف**.

> [!TIP]
> **BMR** = ترجّع الجهاز من **"الصفر" (bare metal = هاردوير فاضي)** لنفس حالته بالظبط، مش البيانات بس.

---

## 6. عملية الـ Backup — Backup Process

نظام الـ backup بيستخدم **client/server architecture**: **backup server** و **backup clients** كتير.

![شكل 4: معمارية الـ backup: Application server and backup client ← Backup data ← Backup server and storage node ← Storage array / Tape library، والـ metadata catalog عند الـ backup server](img/st/lec09/architecture.webp)

| المكون | دوره |
|---|---|
| **1. Backup Server** | **بيدير عمليات الـ backup**، وبيحتفظ بالـ **backup catalog** (معلومات العملية + الـ metadata) · بيعتمد على الـ clients يجمعوا البيانات · **بيحدد الـ policies** (schedule، event-based triggers) · **بيبدأ الطلبات** للـ clients · **بيستقبل الـ metadata** من الـ clients |
| **2. Backup Clients** | ممكن يبقوا **local أو على سيرفر تاني** · **بيبعتوا الـ metadata للـ backup server** · **بيبعتوا البيانات الفعلية للـ storage node** |
| **3. Storage Node** (Media Server) | **بيتحكم في أجهزة الـ backup** · **بيكتب البيانات** اللي جاية من الـ clients على الأجهزة · غالبًا **مدمج مع الـ backup server** |
| **4. Backup Devices** | **الوسائط الفعلية** (disk، tape...) المتوصلة بالـ storage node |

> [!IMPORTANT]
> **الـ metadata ← الـ backup server** · **البيانات الفعلية ← الـ storage node**.

![شكل 5: Backup Management System (BMS) في الـ data center: Backup clients (agents على السيرفرات)، و backup network (TCP/IP أو FC)، و backup media (tapes، VTL، disk arrays، cloud)](img/st/lec09/bms.webp)

---

## 7. خطوات الـ Backup والـ Restore

### عملية الـ Backup

![شكل 6: Backup operation](img/st/lec09/backup-op.webp)

| # | الخطوة |
|---|---|
| 1 | **بداية الـ backup المجدول** |
| 2 | الـ backup server **يجيب معلومات الـ backup من الـ catalog** |
| 3a | الـ backup server **يأمر الـ storage node يحمّل الوسيط** في جهاز الـ backup |
| 3b | الـ backup server **يأمر الـ clients يبعتوا الـ metadata للـ backup server والبيانات للـ storage node** |
| 4 | الـ clients **يبعتوا البيانات للـ storage node** |
| 5 | الـ storage node **يبعت البيانات لجهاز الـ backup** |
| 6 | الـ storage node **يبعت الـ metadata ومعلومات الوسيط** للـ backup server |
| 7 | الـ backup server **يحدّث الـ catalog** ويسجّل الحالة |

### عملية الـ Restore

![شكل 7: Restore operation](img/st/lec09/restore-op.webp)

| # | الخطوة |
|---|---|
| 1 | الـ backup server **يفحص الـ catalog** عشان يحدد البيانات المطلوبة والـ client اللي هيستقبلها |
| 2 | الـ backup server **يأمر الـ storage node يحمّل الوسيط** |
| 3 | البيانات **تتقرا وتتبعت للـ client** |
| 4 | الـ storage node **يبعت restore metadata** للـ backup server |
| 5 | الـ backup server **يحدّث الـ catalog** |

---

## 8. طوبولوجيات الـ Backup — Backup Topologies

| الطوبولوجيا | الفكرة | الـ Data | الـ Metadata |
|---|---|---|---|
| **1. Direct-attached** | جهاز الـ backup **متوصل بالـ client مباشرة** | **مباشرة للجهاز** | عبر **LAN** |
| **2. LAN-based** | كل السيرفرات على **LAN**، والأجهزة على الـ storage node | **عبر الـ LAN** ❌ | عبر **LAN** |
| **3. SAN-based** (**LAN-free**) | الجهاز والـ clients على **SAN** | **عبر الـ SAN** ✅ | عبر **LAN** |
| **4. Mixed** | **LAN-based + SAN-based** مع بعض | حسب الجزء | — |

### 1. الـ Direct-attached Backup

![شكل 8: Direct-attached: البيانات من الـ application server لجهاز الـ backup مباشرة، والـ metadata بس على الـ LAN](img/st/lec09/direct.webp)

- **بيفضّي الـ LAN من ترافيك الـ backup**.

### 2. الـ LAN-based Backup

![شكل 9: LAN-based: البيانات من الـ client عبر الـ LAN للـ storage node ثم لجهاز الـ backup](img/st/lec09/lan-based.webp)

- البيانات بتتنقل من الـ client للجهاز **عبر الـ LAN**، وده **ممكن يأثر على أداء الشبكة** لكل الأجهزة اللي على نفس الـ segment.
- **الحلول:** **شبكة backup مخصصة**، أو **storage nodes مخصصة** للسيرفرات الحرجة.

### 3. الـ SAN-based Backup (LAN-free)

![شكل 10: SAN-based: البيانات عبر الـ FC SAN للـ backup device، والـ metadata بس على الـ LAN](img/st/lec09/san-based.webp)

- **الأنسب** لما **جهاز الـ backup محتاج يتشارك بين clients كتير**.

| ✅ المميزات | ⚠️ الاعتبارات |
|---|---|
| **الـ LAN بيفضى** من ترافيك الـ backup التقيل (مفيش bottleneck) | الـ backup لسه **بيستهلك I/O bandwidth و CPU و memory** بتوع الـ host |
| **أداء أحسن** للـ backup-to-tape | **محتاج بنية SAN** (أغلى وأعقد من LAN) |
| بيدعم **disk-based backup** على arrays متوصلة بالـ SAN، مع **نسخ tape** للـ DR والاحتفاظ الطويل | |

### 4. الـ Mixed Topology

![شكل 11: Mixed: application server 1 بيعمل backup عبر LAN، و application server 2 عبر FC SAN](img/st/lec09/mixed.webp)

- بيستخدم **LAN-based و SAN-based** مع بعض، لأسباب زي **التكلفة، ومكان السيرفرات، وتقليل الإدارة، والأداء**.

> [!EXAM]
> **SAN-based backup = LAN-free backup** ← البيانات على الـ SAN، والـ **metadata بس** على الـ LAN.

---

## 9. الـ Backup في بيئات الـ NAS

الـ NAS heads بتستخدم **OS و file systems خاصة (proprietary)**، فليها **4 طرق backup**:

| الطريقة | بتشتغل إزاي | ✅ / ❌ | الأنسب لـ |
|---|---|---|---|
| **1. Server-based backup** | الـ NAS **يبعت الملفات لـ application server**، وبرنامج الـ backup على السيرفر يبعتها للتخزين | ❌ **حمل كبير على الـ LAN**، وبيستهلك **CPU و memory** السيرفر، و**أبطأ** للبيانات الكبيرة | **بيئات صغيرة** أو ملفات قليلة |
| **2. Serverless backup** | الـ **storage node يتوصل بالـ NAS مباشرة**، يقرا منه ويكتب على جهاز الـ backup، و**مفيش application server في النص** | ✅ **مفيش ضغط على السيرفر**، و **ترافيك أقل على الـ LAN**، و**أسرع** | **بيئات متوسطة وكبيرة** |
| **3. NDMP 2-way** (Network Data Management Protocol) | الـ NAS يبعت البيانات لـ **tape library متوصلة بالـ NAS نفسه مباشرة**، و**الـ control والـ metadata بس على الـ LAN** | ✅ الـ LAN مش مضغوط، وسريع، وتحكم مركزي بالـ NDMP · ❌ الـ **tape لازم يبقى على نفس الـ NAS** | لما **كل NAS عنده tape خاص بيه** |
| **4. NDMP 3-way** | NAS يبعت البيانات لـ **tape library متوصلة بـ NAS تاني**، عبر **شبكة backup خاصة (private)** مش الـ LAN الرئيسي، والـ LAN عليه **metadata و NDMP control بس** | ✅ **صفر حمل على الـ LAN الرئيسي**، و**كذا NAS يشاركوا tape library واحدة**، وممتاز لما الـ tapes قليلة | **شركات كبيرة فيها NAS كتير** |

![شكل 12: Server-based backup في بيئة NAS](img/st/lec09/nas-server.webp)

![شكل 13: Serverless backup في بيئة NAS](img/st/lec09/nas-serverless.webp)

![شكل 14: NDMP 2-way: الـ tape متوصل بالـ NAS نفسه](img/st/lec09/ndmp2.webp)

![شكل 15: NDMP 3-way: NAS بيبعت لـ tape متوصل بـ NAS تاني عن طريق private network](img/st/lec09/ndmp3.webp)

> [!EXAM]
> - **NDMP 2-way** ← tape على **نفس** الـ NAS.
> - **NDMP 3-way** ← tape على **NAS تاني** عبر **private network**، و**metadata بس على الـ LAN**.
> - **Serverless** ← بيتجاوز الـ **application server** (أقل حمل على الشبكة والسيرفر).

---

## ✅ خلاصة المحاضرة في 10 نقط

1. **Backup** = نسخة من بيانات الإنتاج لاسترجاع المحذوف أو الفاسد · الأغراض: **Disaster recovery، Operational، Archival**.
2. الاعتبارات: **Business** (RPO/RTO، retention) · **Technical** (media، granularity، timing) · **Files** (الكبيرة أكفأ) · **Performance** (tape والملفات الصغيرة، compression).
3. **Full** (كل حاجة، restore بسيط) · **Incremental** (من آخر backup: سريع، والـ restore = full + كل الـ incrementals) · **Cumulative** (من آخر full: أبطأ، والـ restore = full + آخر cumulative).
4. **RPO** بيحدد التكرار و الـ retention · **RTO** بيحدد الوسيط (disk أسرع من tape)، و full أسرع في الاسترجاع.
5. **Hot** (التطبيق شغال، مفيش downtime، الاتساق أصعب) vs **Cold** (التطبيق واقف، متسق، فيه downtime).
6. **PIT** = snapshot بـ pointers وتوقف لحظي · **BMR** = استرجاع النظام كله (OS + apps + configs) حتى على هاردوير مختلف.
7. المكونات: **Backup server** (catalog، policies، metadata) · **Clients** (metadata للسيرفر، data للـ node) · **Storage node** · **Backup devices**.
8. الـ Backup: scheduled ← catalog ← load media + instruct clients ← data ← device ← metadata ← update catalog.
9. Topologies: **Direct-attached** · **LAN-based** (بيضغط الشبكة) · **SAN-based = LAN-free** · **Mixed**.
10. NAS: **Server-based** (صغير) · **Serverless** (متوسط وكبير) · **NDMP 2-way** (tape على نفس الـ NAS) · **NDMP 3-way** (tape على NAS تاني، private network).
