# مخططات الكيانات والعلاقات — Chapter 5: ERD Techniques

> [!NOTE]
> الشابتر ده عن **ERD (Entity Relationship Diagrams)**: أهدافه، **الـ Entities** (strong / weak / associative)، **الـ Attributes**، **الـ Relationships** (cardinality و optionality و degree)، **Conceptual vs Logical ERDs**، خطوات إنشاء الـ ERD، **الـ Subtyping**، **الـ Exclusivity**، **Unary و Ternary relationships**، ومثال كامل بـ **associative entity**.

---

## 1. مقدمة عن الـ ERD

- الـ **ERD** قدّمه **Chen سنة 1976** لنمذجة **دلالات (semantics) البيانات** اللي هتتخزن في نظام معلومات.
- **المكونات الأساسية:** **Entities** · **Attributes** (خصائص) · **Relationships**.
- أكتر من notation بس الأساسيات واحدة: **Barker** (Oracle Designer) · **IE** · **Chen** · **IDEF1X**.

### أهداف الـ ERD
- توفير **نموذج دقيق** لاحتياجات المنظمة من المعلومات (Barker, 1990).
- **إطار** لتطوير نظم محسّنة جديدة.
- نمذجة البيانات اللي تلبي احتياجات المنظمة.
- نمذجة البيانات لبناء **database** النظام المقترح **بشكل مستقل عن طريقة التخزين أو الوصول** (objective view).
- **أداة تواصل** لتوضيح متطلبات البيانات مع المستخدمين.
- **التحقق من المتطلبات الوظيفية** (علاقتها بـ DFD و FDC، و**CRUD**).

---

## 2. الـ Entities

![شكل 1: Entity type و attributes و entity instances](img/sad/ch05-erd/entity.webp)

> **Entity** = شيء ممكن **تمييزه بوضوح** (Chen 1976).

| المصطلح | المعنى |
|---|---|
| **Entity type (class)** | تعريف الـ attributes ونطاق قيمها (**domain**) لكل attribute (template) · **أسماء الـ entity types تكون بالمفرد (singular)** |
| **Entity instance** | **مثال محدد (occurrence)** من الـ entity type، بقيم من الـ domain لكل attribute |

مثال الجدول: **PART** (PART NUMBER, PART DESCRIPTION, UNIT OF MEASURE, QUANTITY ON HAND, QUANTITY ON ORDER, UNIT COST) والصفوف = **entity instances**.

---

## 3. الـ Attributes

> **Attribute** = **معلومة** بتوصف الـ entity (Date, 1994).

**الأنواع:**
- **Descriptive:** خصائص ذرية فردية بتوصف الـ object.
- **Identifying:** بتتستخدم **لتحديد حالات (occurrences) الـ entity type بشكل فريد**.

- كل attribute بياخد قيمة من مجموعة قيم اسمها **domain**. مثال: **color** من domain **{red, blue, white, yellow}**.
- ممكن تتضاف attributes في الـ logical design: **Surrogate keys** (لما مفيش مرشح من الـ descriptive attributes) و **Foreign keys** (لتنفيذ العلاقات).

### الاختيارية — Attribute Optionality
| | المعنى | أمثلة |
|---|---|---|
| **Optional** | القيمة **مش مطلوبة** عند إنشاء الـ instance · بتتمثل منطقيًا بـ **NULL** | email, car registration |
| **Mandatory** | القيمة **مطلوبة دايمًا** | customer name, contact details |

الاتنين بتحددهم **business rules** المنظمة.

---

## 4. الـ Relationships

> **Relationship** = **ارتباط بين entities** (Chen, 1976). بتعكس علاقة العالم الحقيقي بين عناصر الـ domain.

- الـ entity types المشاركة اسمها **participants**.
- **عدد المشاركين = Degree** للعلاقة: غالبًا **binary**، وممكن **unary** أو **ternary**.

### أنواع العلاقات بالـ Cardinality

| النوع | الوصف | مثال |
|---|---|---|
| **Many-Many (M:M)** | | **Student** studies many **Courses**، و**Course** studied by many **Students** |
| **One-Many (1:M)** | | **Customer** places many **Orders**، و**Order** placed by only one **Customer** |
| **One-One (1:1)** | | **Citizen** has only one **SSID**، و**SSID** issued for only one **Citizen** |

![شكل 2: Many-to-Many](img/sad/ch05-erd/rel-mm.webp)

![شكل 3: One-to-Many](img/sad/ch05-erd/rel-1m.webp)

![شكل 4: One-to-One](img/sad/ch05-erd/rel-11.webp)

### خصائص العلاقة — Relationship Properties
- **Cardinality:** **كام instance** من entity type ممكن يترتبط بـ instance واحد من التاني. الخيارات: **1:1, 1:M, M:M**.
- **Optionality (participation):** هل instances من entity type **لازم** تشارك مع instances من type تاني؟ الخيارات: **0:0, 0:M, M:0, M:M**.
- **Labels:** وصف بصيغة جملة لطبيعة العلاقة، بيوضح المعنى في **الاتجاهين**، ويتحول لـ **business rules**.

![شكل 5: مثال Artist و Artwork](img/sad/ch05-erd/artist.webp)

> **مثال (mandatory):** الفنان **لازم** يعمل artwork **واحد على الأقل**، والـ artwork **لازم** يتعمل بواسطة **فنان واحد وبس**.
> **مثال (optional):** الفنان **ممكن** يعمل artwork واحد أو أكتر، والـ artwork لازم يتعمل بواسطة فنان واحد.

> [!TIP]
> **إزاي تعرف نوع العلاقة؟** اقرا العلاقة في الاتجاهين: "Course is taken by **many** students" و"Student takes **many** courses" ← **M:M**. "Customer places **many** orders" و"Order is placed by **one** customer" ← **1:M**.

### لماذا نكتب labels؟
من غير labels العلاقات **meaningless** و**ambiguous** و**incomplete**. مثال: بين **Employee** و **Project**: "supervises / supervised by" و"assigned to / assigned". وبين **Person** و **Car**: "drives / driven by" و"rides in / carries". وفي **Bill of Materials**: **contains / contained in** و **includes / for**.

---

## 5. أنواع الـ ERDs

| | **Conceptual ERD** | **Logical ERD** |
|---|---|---|
| التركيز | **توثيق العالم الحقيقي** | توثيق العالم الحقيقي **بدلالة بنية الـ relational database** |
| M:M | **بيستخدم** علاقات M:M | **بيستبدل** M:M بـ **علاقتين 1:M + intermediary entity** (all-key) |
| Foreign keys | **مش بتظهر** كـ attributes | **بتظهر** |
| نوع الـ DB | مفيش اهتمام | بيراعي الـ relational DB |

---

## 6. خطوات إنشاء الـ ERD

1. **Identify entities:** على الأقل **descriptive attribute** واحد · **occurrences متعددة** (حدد identifier) · strong, weak, associative · **synonyms** (customer = client).
2. **Identify relationships:** **optionality, cardinality, degree** (business rules) · **label** في الاتجاهين.
3. **Document the attributes** لكل entity: اربط الـ attribute **مرة واحدة** بالـ entity · حدد **domain** مناسب · ابحث إمكانيات **التفكيك (decomposition)**.

---

## 7. Strong vs Weak vs Associative Entities

| النوع | الوصف |
|---|---|
| **Strong entity** | **بتوجد بشكل مستقل** عن أي entity تانية · مرادفات: kernel, major, regular, independent |
| **Weak entity** | **وجودها معتمد** على entity تانية · مرادفات: dependent, minor · الـ key بيتحدد غالبًا بالعلاقة بالـ strong |
| **Associative entity** | بتمثل معلومات عن **ارتباط بين اتنين أو أكتر** (غالبًا strong) · **بتعتمد على اتنين على الأقل** (عكس الـ weak) |

- الفرق مهم في أنشطة **data maintenance** (create و delete). بيتحددوا بـ **optionality (participation)** العلاقة.
- **Barker notation** مش بتفرق بين أنواع الـ entities، لكن **Chen** بتفرق.

> **مثال strong/weak:** **CUSTOMER** (strong) places **ORDER** (weak). **Business rule:** الـ order **ما ينفعش يوجد** غير لو اتعملت بواسطة customer؛ كل occurrence من ORDER لازم يرتبط بـ occurrence من CUSTOMER.

> **مثال associative:** بين **STUDENT** و **ASSESSMENT** (علاقة achieved / has) والـ entity الوسيطة بتحمل معلومات الارتباط نفسه.

### الـ Unique Identifiers
> **Unique identifier** = أي **توليفة من attributes وعلاقات** تحدد occurrence من entity **بشكل فريد**. بتتحول لـ **primary key** في الـ logical design. ممكن تتبني من **العلاقات بس** (weak و associative).

---

## 8. مثال: Tasty Travel Agency

![شكل 6: ERD لوكالة Tasty Travel](img/sad/ch05-erd/tasty.webp)

**الـ Entities:** **Itinerary** (date prepared) · **Staff** (name) · **Sector** (departure/arrival time/date, airline, flight number, aircraft) · **Customer** (name, address) · **Payment** (date, number, amount).
**العلاقات:** itinerary مرتبط بـ staff member · مرتبط بـ customer · **itinerary فيه sector أو أكتر** · **sector ممكن يتستخدم في أكتر من itinerary**.

في الـ Barker notation: **#** = identifier (PK) · **\*** = mandatory · **o** = optional.

السؤال: **هل فيه طريقة أحسن لنمذجة Staff و Customer؟** الإجابة: **نعم، باستخدام Subtypes**.

---

## 9. الـ Subtyping

![شكل 7: Staff و Customer كـ subtypes من PERSON](img/sad/ch05-erd/subtypes.webp)

> **Subtype** = مجموعة جزئية من occurrences كيان تاني (**supertype**). بتقوم على فكرة **التعميم (generalisation)**. بنستخدمه لـ **تصنيف** العناصر المتشابهة.

**المزايا:** تمثيل **أدق** للعالم الحقيقي · **إزالة التكرار** · تحسين **قراءة** الـ ERD · الـ subtypes **بترث attributes** الـ supertype.

![شكل 8: Supertype و Subtypes: Generalization و Specialization](img/sad/ch05-erd/subtyping.webp)

> **مثال:** Sailing boats, power boats, rowing boats, hydrofoils: **المشترك:** length, displacement, passenger capacity ← **Boat (supertype)**. **الخاص:** sailing (sail area, number of masts) · power (number of engines, power, fuel type) · rowing (number of oars, coxed?) · hydrofoil (number of foils, surface clearance distance).

في **Barker notation** الـ subtypes بتترسم **جوه** الـ supertype: بتاخد مساحة أقل وبتبين إن occurrences الـ subtypes هي occurrences من الـ supertype.

---

## 10. الـ Exclusivity (Arc)

![شكل 9: Exclusivity: الحساب لفرد أو لشركة مش الاتنين](img/sad/ch05-erd/exclusivity.webp)

- موقف **either/or**: العلاقة بين instance وكيانات متعددة مقيّدة بـ **واحد فقط** منهم. بنستخدم **Arc** في Barker.
- **قواعد الـ Arc:**
  1. كل نهايات العلاقات في الـ arc **تتصل بنفس الـ entity**.
  2. كل نهاية علاقة لها **نفس الـ optionality**.
  3. **ولا نهاية** تشارك في أكتر من arc.
- **مثال بنكي:** الحساب (ACCOUNT) يرتبط بـ **INDIVIDUAL أو COMPANY** لكن **مش الاتنين**.

---

## 11. Unary و Ternary Relationships و Temporal

| النوع | الوصف | مثال |
|---|---|---|
| **Unary (recursive)** | instance من entity مرتبط بـ instance من **نفس الـ entity type** · مفيد في الـ **hierarchies** · الـ labels حاسمة · غالبًا 1:M ويمكن 1:1 أو M:M (M:M مناسب لـ **bill-of-materials**) | EMPLOYEE **manages** EMPLOYEE · PART **composed of / used in** PART |
| **Ternary** | يشمل **ثلاث entity types** | PERSON_RECORDING يتطلب instances مرتبطة من الـ 3 entity types التانية (ROLE_TYPE, RECORDING, ...) |

![شكل 10: مثال Ternary relationship](img/sad/ch05-erd/ternary.webp)

**Temporal:** لو مطلوب **تسجيل تاريخ المناصب** لكل موظف، بنضيف **POSITION HISTORY** بدل علاقة مباشرة EMPLOYEE–POSITION (**holds / is held by**).

---

## 12. مثال كامل: Sales Offices و Properties

> **النص:** شركة عندها **sales offices** في ولايات. **Sales office:** Office_Number (key) و Location. كل office **تتعيّن لها موظف أو أكتر** (Employee_ID key, Employee_Name). الموظف يتعيّن لـ **office واحد بس**. كل office فيها **موظف واحد دايمًا بيديرها** (manager)، والموظف ممكن **يدير بس الـ office** اللي معيّن لها. الشركة بتعرض **properties** للبيع: Property_ID (key) و Location (Address, City, State, Zip_Code). كل property مدرجة في **office واحدة بس**، والـ office ممكن يكون عندها **أي عدد** من properties (أو صفر). كل property **ليها مالك أو أكتر** (Owner_ID, Owner_Name)، والمالك ممكن يمتلك **أكتر من property**. attribute للعلاقة بين property و owner هو **Percent_Owned**.

**الخطوات:**

![شكل 11: ERD مع الـ cardinality](img/sad/ch05-erd/cardinality.webp)

1. ارسم الـ entities: **Sales Office, Employee, Property, Owner**.
2. العلاقات: Sales Office **Work for** Employee (**1:M**) · Sales Office **has** Property (**1:M**) · Property **Is Owned by** Owner (**M:M**).
3. **إزالة M:M بـ associative/link entity** (**Property_Owner**) تحمل **Percent_Owned**.

![شكل 12: إزالة علاقة M:M](img/sad/ch05-erd/eliminate-mm.webp)

![شكل 13: ERD كامل بالـ attributes والـ keys](img/sad/ch05-erd/full-erd.webp)

- في الـ ERD الكامل: **PK** و **FK** ظاهرين، و**Property_Owner** ليه مفتاح مركب (**Property_ID [PK][FK] + Owner_ID [PK][FK]**) و attribute **Property_Percent_Owned**.

> [!EXAM]
> - **ERD** (Chen 1976) = entities + attributes + relationships.
> - **Cardinality:** 1:1 · 1:M · M:M · **Optionality:** 0/1.
> - **Conceptual** (M:M مسموح، من غير FK) ← **Logical** (M:M ← 1:M + 1:M + associative entity، مع FK).
> - **Strong** (مستقل) · **Weak** (معتمد على entity) · **Associative** (معتمد على 2+).
> - **Subtype** يرث من **supertype** · **Arc** للـ exclusivity · **Unary** = نفس الـ entity · **Ternary** = 3 entities.
