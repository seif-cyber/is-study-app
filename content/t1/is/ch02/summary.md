## ⚡ ملخص IS Ch2: Data Processing, Database & DBMS

- **Data processing** = تحويل البيانات لشكل مفيد · **Data** (خام) vs **Information** (معالجة).
- **File processing:** **Sequential** (بالترتيب، sort، batches) · **Direct/Random access** (disk + تحديد مكان السجل).
- **مشاكل الـ files:** Program-data dependence · Duplication · Limited sharing · Lengthy development · Excessive maintenance.
- **DBMS** (MySQL, Oracle): **Data Definition** + **Data Updating**.
- **جودة المعلومات:** Timeliness · Reliability · Accuracy.
- **ليه Database:** Redundancy · Inconsistency · صعوبة الوصول · Unauthorized access · No concurrency · No backup.
- **خصائص DB:** Shared · Persistence · Integrity · Security · Consistency · Non-redundancy · Independence.
- **أنواع DBMS (5):** **Hierarchical** (شجرة) · **Network** (graph، many-to-many) · **Relational** (جداول، Codd 1970) · **Object-oriented** (data + methods) · **Deductive** (Datalog).
- **المستويات:** **Physical (internal)** · **Conceptual** · **External (views)**.
- **Keys:** **Primary** (unique, not null) · **Composite** (أكتر من عمود) · **Foreign** (يشاور على PK، NULL مسموح، مش لازم unique).
- **Relationships:** 1:1 · 1:M · M:M.
- **Normalization:** **1NF** single-valued · **2NF** no partial dependency · **3NF** no transitive dependency. أعلى NF = تكرار أقل.
