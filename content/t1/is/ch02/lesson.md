# معالجة البيانات وقواعد البيانات — Chapter 2: Data Processing, Database & DBMS

> [!NOTE]
> الشابتر ده عن **معالجة البيانات (Data Processing)**، الفرق بين **Data و Information**، **File Processing** ومشاكله، وبعدين **Database و DBMS**، وأنواع الـ DBMS، و**تصميم الـ database** (المستويات الثلاثة، الـ **Keys**، الـ **Relationships**) وأخيرًا **الـ Normalization** (1NF و 2NF و 3NF).

---

## 1. معالجة البيانات — Data Processing

> **Data processing** = **تحويل البيانات لشكل مفيد ومطلوب**، بـ **تسلسل عمليات محدد مسبقًا** يدويًا أو أوتوماتيك (غالبًا بالكمبيوتر).

- المخرجات ممكن تكون: **image, graph, table, vector file, audio, charts** أو أي شكل حسب البرنامج أو الطريقة.

### Data vs Information

![شكل 1: البيانات الخام بتتحول لمعلومات بعد المعالجة](img/is/ch02/data-info.webp)

| | التعريف |
|---|---|
| **Data** | **الحقائق أو الإحصائيات** اللي بيجمعها الباحث للتحليل **في شكلها الأصلي** |
| **Information** | البيانات بعد ما **اتعالجت واتحولت** لشكل **مفيد للمستخدمين** |

---

## 2. معالجة الملفات — File Processing

بيانات الكمبيوتر بتتعالج بطريقتين أساسيتين: **File processing** و **Database processing**. في الـ file processing البيانات **بتتخزن وتتعالج في ملفات منفصلة**، وليها نوعين:

### 2.1 Sequential File Processing
- بيخزّن ويوصل للسجلات **بالترتيب (in sequence)**.
- ممكن على **tape** أو **disk**.
- السجلات **لازم تتـ sort** قبل المعالجة.
- بيتستخدم لما البيانات تتعالج على **دفعات (batches)** وجزء كبير من الـ **master file** بيتغير مع كل دفعة.

### 2.2 Direct Access (Random Access) File Processing
- بنحتاجه لما **المعالجة التسلسلية مش عملية**.
- اسمه التاني **random access**.
- شرطين:
  1. الملف يتخزن على **direct access device** زي الـ **disk**، عشان السجلات متتعالجش بالترتيب.
  2. لازم وسيلة **لتحديد مكان** سجل معين.

![شكل 2: Direct access file processing](img/is/ch02/direct-access.webp)

### مشاكل الـ File Processing — Problems of File Processing

| المشكلة | الشرح |
|---|---|
| **Program-Data Dependence** | كل البرامج بتحتفظ بـ **metadata** لكل ملف بتستخدمه |
| **Duplication of Data** | الأنظمة/البرامج المختلفة عندها **نسخ منفصلة من نفس البيانات** |
| **Limited data sharing** | كل application ليه **ملفاته الخاصة**، تقرير ممكن يحتاج بيانات من **ملفات غير متوافقة** في أنظمة منفصلة |
| **Lengthy Development Times** | مفيش فرصة لإعادة استخدام الشغل القديم، كل application يبدأ **من الصفر** (تصميم formats وأوصاف ملفات جديدة) |
| **Excessive Program Maintenance** | العوامل اللي فوق بتعمل **عبء صيانة كبير** |

![شكل 3: Traditional file system (بيانات مكررة لكل برنامج) مقابل DBMS](img/is/ch02/file-vs-dbms.webp)

> [!TIP]
> في الـ **file system**: كل برنامج ليه **Meta-Data + Data** خاصين بيه (تكرار). في الـ **DBMS**: كل البرامج بتتعامل مع **database واحدة** عن طريق الـ DBMS.

---

## 3. معالجة قواعد البيانات — Database Processing

- **Data processing** = تنفيذ عمليات معينة على مجموعة بيانات أو database.
- بتتم أساسًا في **information systems**، وجوهر أي IS: **input → processing → output**.

### نظام إدارة قواعد البيانات — DBMS

> **DBMS** = نظام برمجي بيُستخدم **لإنشاء وصيانة وتوفير وصول مُتحكم فيه** لقواعد بيانات المستخدمين.

- مثال السلايد: **Order Filing System** و **Invoicing System** و **Payroll System** كلهم بيتعاملوا مع **Central database** (فيها بيانات الموظفين والطلبات والمخزون والتسعير والعملاء) عن طريق **DBMS**.
- أمثلة DBMS: **MySQL** و **Oracle**.
- **مهام الـ DBMS:**
  - **Data Definition:** إنشاء وتعديل وحذف **تعريفات** تنظيم البيانات.
  - **Data Updating:** إدخال وتعديل وحذف **البيانات الفعلية**.

---

## 4. جودة المعلومات — Quality of Information

جودة المعلومة **multi-attribute concept**. أهم صفاتها:

| الصفة | المعنى |
|---|---|
| **Timeliness** | **سرعة** استلام المعلومة · كل ما أسرع كل ما أحسن |
| **Reliability** | **الموثوقية**: بتتحدد بالخبرة السابقة ومصداقية المصدر وطريقة الجمع والمعالجة وقناة التوصيل |
| **Accuracy** | **صحة** المعلومة · كل ما أدق كل ما جودتها أعلى |

## 5. تاريخ المعلومات — History of Information

التاريخ بيغطي: **تاريخ الطباعة والثقافة المكتوبة** (المكتبات، النشر، القراءة)، و**تاريخ تخصصات المعلومات الحديثة** (إدارة المعلومات، IS، علم المعلومات)، و**مجالات مرتبطة** (مجتمع المعلومات، البنية التحتية، الاتصالات، سياسات المعلومات)، و**المعلومات كتاريخ اجتماعي** (شبكات المعلومات غير الرسمية).

---

## 6. قاعدة البيانات — Database

> **Database** = **مجموعة بيانات مترابطة** بتساعد في **استرجاع وإدخال وحذف** البيانات بكفاءة، وبتنظمها في **tables, views, schemas, reports**.

> [!EXAMPLE]
> **university database** بتنظم بيانات الطلاب وأعضاء هيئة التدريس والإداريين.

### ليه نستخدم Database؟ — Why Database (عيوب الـ file system)

| المشكلة | الشرح |
|---|---|
| **Redundancy** (تكرار) | نفس البيانات منسوخة في أماكن كتير، مثلًا تغيير رقم تليفون الطالب لازم يتعدل في كل الأقسام |
| **Inconsistency** (تضارب) | النسخ المتعددة **مش متطابقة** (رقم مختلف في Accounts و Academics) بسبب أخطاء كتابة أو عدم تحديث كل النسخ |
| **Difficult Data Access** | المستخدم لازم يعرف **مكان الملف بالظبط**، مثلًا البحث في 10000 سجل غير مرتب |
| **Unauthorized Access** | ممكن طالب يوصل لملف درجاته ويعدلها |
| **No Concurrent Access** | مستخدم **واحد بس** في الوقت (مفيش concurrency) |
| **No Backup and Recovery** | مفيش نسخ احتياطي واسترجاع لو الملف ضاع أو اتلف |

### خصائص البيانات في الـ Database — Characteristics

| الخاصية | المعنى |
|---|---|
| **Shared** | مشتركة بين مستخدمين وتطبيقات مختلفة |
| **Persistence** | بتفضل موجودة **بعد انتهاء** العملية اللي أنشأتها |
| **Integrity** | البيانات **صحيحة** بالنسبة للكيان الحقيقي |
| **Security** | محمية من الوصول غير المصرح |
| **Consistency** | القيم المرتبطة **متسقة** مع العلاقة بينها |
| **Non redundancy** | مفيش عنصرين يمثلوا نفس الكيان الحقيقي |
| **Independence** | **المستويات الثلاثة** للـ schema **مستقلة** عن بعض، فتغيير مستوى ميأثرش في الباقي |

> [!TIP]
> **للحفظ:** **S**hared · **P**ersistence · **I**ntegrity · **S**ecurity · **C**onsistency · **N**on-redundancy · **I**ndependence.

---

## 7. أنواع الـ DBMS — Types of DBMS

> [!WARNING]
> **تنبيه على السلايد:** السلايد بيقول "there are **four** structural types" لكنه بيعدّد **خمسة** أنواع: Hierarchical, Network, Relational, Object-oriented, Deductive. الصح **5 أنواع** حسب القائمة.

### 7.1 Hierarchical Database
- بينظم البيانات في **شجرة (tree)** بـ **root واحد** وكل البيانات مربوطة بيه، وبتتفرّع بـ **child nodes** تحت **parent nodes**.
- **الـ child ليه parent واحد بس.**
- بيوصف علاقات حقيقية زي **فهرس الكتاب** و**الوصفات**.
- علاقة **one-to-many** بين نوعين من البيانات، مثلًا قسم واحد فيه كورسات كتير وأساتذة كتير وطلاب كتير.

### 7.2 Network Database
- **امتداد للـ hierarchical**: البيانات منظمة كـ **graph** والـ node ممكن يكون ليه **أكتر من parent**.
- علاقات أكتر ← **وصول أسهل وأسرع**.
- بيُستخدم لتمثيل علاقات **many-to-many**.

### 7.3 Relational Model
- البيانات في **جداول ثنائية الأبعاد (two-dimensional tables)** والعلاقة بتتحافظ بـ **common field**.
- قدّمه **E.F. Codd** سنة **1970**، وهو **الأكتر استخدامًا** في العالم.
- الجدول = **relation**، والمعلومات الخاصة بنوع معين بتتخزن في **صفوف (rows)** الجدول.

![شكل 4: النموذج العلائقي: جداول وعلاقات](img/is/ch02/relational.webp)

### 7.4 Object-Oriented Database
- بتستخدم **objects**: أجزاء برمجية صغيرة قابلة لإعادة الاستخدام، متخزنة في الـ database.
- كل object فيه عنصرين: **(1) data** (صوت، فيديو، نص، رسومات) و **(2) methods**: التعليمات اللي بتقول يعمل إيه بالبيانات.
- مثال: درجات الاختبار + تعليمات حساب **المتوسط**.

### 7.5 Deductive Database
- نظام بيقدر **يستنتج** من بياناته بناءً على **قواعد وحقائق** محددة.
- اتطور لدمج **logic programming** مع **RDBMS**، واللغة المستخدمة عادةً **Datalog**.

| النوع | الفكرة |
|---|---|
| **Hierarchical** | شجرة · parent واحد · one-to-many |
| **Network** | graph · أكتر من parent · many-to-many |
| **Relational** | جداول (relations) · common field |
| **Object-oriented** | objects = data + methods |
| **Deductive** | قواعد وحقائق · Datalog |

---

## 8. تصميم قاعدة البيانات — Database Design

> **Database Design** = مجموعة عمليات لـ **تصميم وتطوير وتنفيذ وصيانة** أنظمة إدارة بيانات المنظمات، بحيث تلبي **متطلبات المستخدمين** وتكون **عالية الأداء**.

### المستويات الثلاثة — Three Levels

![شكل 5: Physical / Conceptual / External levels](img/is/ch02/three-levels.webp)

| المستوى | الوصف |
|---|---|
| **Physical level** (**Internal level**) | بيوصف **بنية التخزين الفعلية**، قريب من التخزين الحقيقي: كـ **bits** بعناوين على الـ secondary storage، وعلى أعلى مستوى كـ **files** · **internal schema** بيحدد أنواع البيانات المخزنة (physical data model) |
| **Conceptual level** | بيوصف **بنية قاعدة البيانات كلها** لمجموعة مستخدمين · اسمه **data model** · **conceptual schema** = تمثيل لمحتوى الـ database كله ويخفي تفاصيل التخزين |
| **External level** | **البيانات اللي بيشوفها كل مستخدم نهائي** · فيه **user views** (external schemas) · **الأقرب للمستخدم** · بيوصف الجزء المطلوب لمجموعة مستخدمين ويخفي الباقي |

> [!TIP]
> من الأقرب للمستخدم للأبعد: **External → Conceptual → Physical (Internal)**.

---

## 9. المفاتيح — Database Keys

> **Key** = قيمة بتستخدم **لتحديد سجل في جدول بشكل فريد (uniquely)**. ممكن عمود واحد أو أكتر.

### Primary Key
عمود واحد بيحدد السجل بشكل فريد. خصائصه:
- **ممنوع يكون NULL**.
- القيمة **لازم تكون unique**.
- القيمة **متتغيرش**.
- لازم **تتحط له قيمة** لما يتضاف سجل جديد.

### Composite Key
- **primary key مكوّن من أكتر من عمود** لتحديد السجل بشكل فريد.
- مثال السلايد: شخصين بنفس الاسم **Robert Phil** بس بيعيشوا في أماكن مختلفة ← الاسم لوحده مش كفاية.

### Foreign Key
- **بيشاور على الـ primary key في جدول تاني**، وبيربط الجداول.
- ممكن يكون **اسمه مختلف** عن الـ primary key.
- بيضمن إن كل صف في جدول **ليه صف مقابل** في جدول تاني.
- **مش لازم يكون unique** (غالبًا مش بيكون).
- **ممكن يكون NULL** (عكس الـ primary key).

| | Primary Key | Foreign Key |
|---|---|---|
| NULL | **ممنوع** | **مسموح** |
| Unique | **لازم** | **مش لازم** |
| الوظيفة | تحديد السجل | ربط جدولين |

---

## 10. العلاقات — Relationships

![شكل 6: أنواع العلاقات بين الجداول](img/is/ch02/relationships.webp)

| النوع | التعريف |
|---|---|
| **One-to-One** | سجل في الجدول الأول مرتبط بـ **سجل واحد بس** في التاني، والعكس |
| **One-to-Many** | سجل في الأول ممكن يرتبط بـ **سجل أو أكتر** في التاني، لكن سجل في التاني مرتبط بـ **سجل واحد بس** في الأول |
| **Many-to-Many** | سجل في الأول ممكن يرتبط بـ **سجلات كتير** في التاني، والعكس صحيح |

---

## 11. الـ Normalization

> **Normalization** = فرع من النظرية العلائقية بيدي إرشادات تصميم. هي عملية **تحديد مقدار التكرار (redundancy)** في الجدول.

**أهدافها:**
- **توصيف مستوى التكرار** في الـ relational schema.
- **آليات لتحويل الـ schemas** لإزالة التكرار.

- بتعتمد على **functional dependencies**. بتعرّف **6 normal forms**، وكل واحد بيضمن غياب/وجود **update anomalies**. **كل ما الـ NF أعلى، التكرار أقل ومشاكل التحديث أقل.**

### First Normal Form (1NF) — إزالة المجموعات المتكررة
- العلاقة في **1NF** لو **كل attribute فيها single-valued**.
- لو فيها **composite أو multi-valued attribute** ← **بتخالف 1NF**.

### Second Normal Form (2NF) — إزالة البيانات المكررة
- لازم تكون في **1NF** و**من غير partial dependency**.
- **Partial dependency:** لما **جزء من الـ candidate key** (proper subset) بيحدد **non-prime attribute** (عمود مش جزء من أي candidate key).

> [!EXAMPLE]
> علاقة **STUDENT_COURSE**: الـ FD = `COURSE_NO → COURSE_NAME`، والـ candidate key = `{STUD_NO, COURSE_NO}`.
> `COURSE_NO` (جزء من المفتاح) بيحدد `COURSE_NAME` (non-prime) ← **partial dependency** ← **العلاقة مش في 2NF**.
> الحل: نفصل جدول `COURSE(COURSE_NO, COURSE_NAME)`.

### Third Normal Form (3NF) — إزالة الأعمدة غير المعتمدة على المفتاح
- العلاقة في **3NF** لو في **2NF** و**مفيش transitive dependency** للـ non-prime attributes.
- أو بصيغة تانية: في كل non-trivial FD `X → Y` لازم **واحد** من الاتنين:
  1. **X هو super key**.
  2. **Y هو prime attribute** (جزء من candidate key).

```mermaid
flowchart LR
    U[Unnormalized table] -- "remove multi-valued attributes" --> N1[1NF]
    N1 -- "remove partial dependency" --> N2[2NF]
    N2 -- "remove transitive dependency" --> N3[3NF]
```

> [!EXAM]
> - **1NF** = single-valued فقط · **2NF** = 1NF + **no partial dependency** · **3NF** = 2NF + **no transitive dependency**.
> - الـ **primary key**: not null + unique + ثابت · الـ **foreign key**: null مسموح + مش لازم unique.
