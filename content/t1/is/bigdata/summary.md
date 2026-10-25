## ⚡ ملخص IS: Big Data

- **Big Data:** ضيق = sample size · واسع = sample size + dimensionality · بيانات كبيرة ومعقدة والأدوات التقليدية مش كفاية.
- **الـ Vs:** 3Vs = **Volume · Velocity · Variety** · 4Vs + **Value** · 5Vs + **Veracity**.
- **التعرّف:** Computer scientist = ذاكرة/تخزين مش كفاية · Statistician = حساب طويل / dimensionality عالية.
- **مصادر:** Machine data (GPS) · Social data (Facebook **50 TB log/day**، 100 TB analysis) · IoT + Smart Cities.
- **DB vs BD:** MB/GB ↔ GB/TB/PB · structured ↔ متنوعة · **models first ↔ data first** · **one size fits all ↔ no size fits all**.
- **تحديات التقليدي:** scalability محدودة · تكلفة عالية · batch غير كافي · no streaming · single source.
- **HDFS** (من GFS، commodity hardware): fault tolerance · high throughput · TB/PB · **مناسب:** ملفات كبيرة + streaming · **مش مناسب:** ملفات صغيرة + random write + low-delay read.
- **المعمارية:** **NameNode** (واحد، metadata) · **DataNodes** (كتير، البيانات، replication) · **Client**.
- **Write:** NameNode يعمل file node ← **pipeline DN1→DN2→DN3** ← ack ← close ← NameNode يأكد.
- **Read:** open ← NameNode يرجّع block locations ← قراءة من **أقرب** DataNodes ← close.
- **MapReduce:** parallel لبيانات **> 1 TB** · easy to program · scalable · fault tolerant · **Shuffle** بين Map و Reduce.
- **YARN** = Yet Another Resource Negotiator (إدارة موارد موحدة).
- **WordCount:** Bye **3** · Hadoop **4** · Hello **3** · World **2**.
