# العمليات والـ Activity و Use Case Diagrams — Chapter 5: Business Processes, Activity & Use Case Diagrams

> [!NOTE]
> الشابتر ده عن: **Business Processes مقابل Business Rules**، **الـ UML Modeling**، **Activity Diagram** (رموزه وأمثلته والـ swim-lanes)، و**Use Case Diagram** (الرموز والوصف والعلاقات `include` و `extend` والـ generalization).

---

## 1. Business Processes vs Business Rules

| | التعريف | مثال (شركة تأجير سيارات) |
|---|---|---|
| **Business process** | بيحدد **إيه اللي بيتعمل** في الـ business، **بمين**، **بأي ترتيب**، **بأي موارد**، و**بأي نتائج** | **تأجير سيارة** |
| **Business rule** | **بيقيّد إزاي** الـ business بيتدار | السيارة المخصصة هي **أقل سيارة مسافة (lowest mileage)** المتاحة في المجموعة المختارة |

- فيه **فرق واضح** بين الـ processes والقيود (rules).

**أهمية الـ Business processes:** فهم اللي بيعمله الـ business واكتساب **خبرة المجال (domain expertise)** لتطوير حلول برمجية.

**ليه نسجّل الـ Business rules؟**
1. لتوفير **وصول سريع وسهل** عند حدوث تغيير.
2. هي **أساس اتخاذ القرار**.
- لازم **traceability** للقواعد من احتياجات الـ business لحد الحل البرمجي.

### تقنيات تمثيل الـ Business Rules
اللغة لازم تكون **محددة ومنظمة** عشان التحقق يسهل:
1. **Natural language:** سهلة لأهل الـ business (غير رسمية).
2. **UML و OCL:** **Object Constraint Language** = لغة **رسمية** لتمثيل القيود في UML.

> الـ **Business processes** بتتمثل بـ **UML activity diagrams**.

---

## 2. Activity Diagram — مخطط النشاط

> بيعرض العملية كـ **مجموعة أنشطة** بـ **تسلسلها**، ومين الأنشطة اللي ممكن تتنفذ **بالتوازي**. ممكن يتوسّع ليبين **مين المسؤول عن كل نشاط**. النشاط ممكن يكون **مهمة** بيؤديها شخص أو كمبيوتر.

### مزايا الـ Activity Diagrams
1. بتساعد في فحص **الـ workflow (flow of control)** من نشاط لنشاط.
2. بتساعد في فهم **السلوك الأساسي** للنظام والموقف الـ business.
3. ممكن تستخدم لنمذجة **النظم المتزامنة (concurrent)**.
4. ممكن **تسجل سيناريوهات الـ use cases**.
5. بتساعد في تحديد **المراحل اللي كل role محتاج فيها تفاعل** مع العملية.

> **Workflow** = تسلسل أنشطة بينتج **نتيجة ذات قيمة ملحوظة**.

### العناصر والرموز — Elements & Symbols

![شكل 1: رموز الـ Activity Diagram](img/sad/ch05/activity-symbols.webp)

| العنصر | المعنى |
|---|---|
| **Activity** (مستطيل بزوايا دائرية) | عمليات ومهام الـ business |
| **Start node** (دايرة مصمتة) | **بداية** العملية |
| **End node** (دايرة بداخلها دايرة) | **نهاية** العملية |
| **Transition** (سهم) | الانتقال من نشاط لنشاط |
| **Synchronization bar** (خط عريض) | **Fork** = أنشطة **متزامنة** (تفرّع) · **Join** = نهاية الأنشطة المتزامنة والانتقال للنشاط التالي بعد ما **كلها تخلص** |
| **Decision node** (معين ◇) | **مسارات بديلة** من نشاط · **له خرجين (2 outgoing arcs)** على الأقل |
| **Merge node** (معين ◇) | **بيجمع** المسارات البديلة · **له خرج واحد** |
| **Guard** `[condition]` | **شرط (Boolean test)** مرتبط بالـ transition · الانتقال بيحصل **بس لو الـ guard = true** |
| **Swimlane** | بيبين **مين المسؤول** عن أنشطة مرتبطة، وبيجمّع الأنشطة حسب الـ **roles** |

### مثال 1: عمل مشروب ساخن (Make Hot Drink)

![شكل 2: Activity diagram: Make hot drink](img/sad/ch05/ex-hot-drink.webp)

العملية الأساسية **تسخين الماء في الغلاية**، خطوتين: **1) Fill the kettle** · **2) Boil the water**. وفيه قرارات (اختيار المشروب، مثلًا **instant coffee**)، وبعدين تحتاج **كوب**.

- الأنشطة = **مستطيلات بزوايا دائرية**، والـ transitions = **خطوط بأسهم**.
- فيه نشاطين مُعرَّفين مسبقًا: **start** و **stop** (دوائر مصمتة) — ويجوز أكتر من stop node لو أوضح.
- **Synchronisation bars** (خطوط أفقية سميكة): **العلوي = fork** و**السفلي = join**. بين الاتنين الخيطين ينفذوا **بالتوازي**.
- **Note** في UML = مستطيل بركنه العلوي اليمين مطوي، وبيتوصل بالعنصر بـ **خط متقطع**.

### مثال 2: التحقق من نضافة الكوب (Decision & Merge)

![شكل 3: Activity diagram مع decision و guards](img/sad/ch05/ex-cup-check.webp)

> المطلوب: عدّل الـ diagram بحيث **يتحقق لو الكوب نضيف** يكمل، **وإلا يغسله**.

- الـ flow بين الأنشطة مقيّد بـ **Boolean test = guard** بين **أقواس مربعة** `[ ]`.
- كل transition خارجة من الـ decision diamond لها **guard**، و**لازم transition واحدة بالظبط تتنفذ** (يعني **guard واحد بالظبط = true**).
- المعين بيستخدم كمان كـ **merge node** بيجمع **مسارات بديلة متنافية (mutually exclusive)**؛ هيتوصل له مسار واحد بس وله **خرج واحد**.
- **النشاط ليه transition واحدة داخلة وواحدة خارجة**؛ وده بتفرضه **decision/merge** للبدائل و**synchronisation bars** للتزامن (fork/join).

### مثال 5: عملية الاستعارة في المكتبة (Library Lending)

> **السيناريو:** المكتبة بتحتفظ بمخزون كتب لأعضائها. العضو يختار نسخة ويستعير **حتى حد معين**. بعد فترة المكتبة بتتوقع الإرجاع. عند الاستعارة، العضو **يستنى في الطابور**، يسلّم الكتب لأمين المكتبة، اللي **يسجل كل استعارة** قبل ما يصدر الكتب. **فترة الاستعارة العادية أسبوعين**. لو العضو اتأخر في الإرجاع، المكتبة **تفرض غرامة**.

**Business processes:** find book on a shelf · wait in the queue · issue a book · return a book.
**Business rules:**
- فيه **حد لعدد الكتب** اللي العضو يقدر ياخدها.
- الاستعارة **لمدة أسبوعين** عادةً.
- **التأخير** يتحمّل **غرامة**.

![شكل 4: Activity diagram لإصدار نسخة كتاب](img/sad/ch05/ex-borrow.webp)

### الـ Swim-lanes

> بتجمّع الأنشطة المرتبطة بـ **roles مختلفة**؛ بتبين **الدور المسؤول عن كل نشاط**. مفيدة لما الـ workflow فيه أكتر من role، وبتحدد المراحل اللي كل role محتاج فيها تفاعل.

- في مثال 5: الـ lane **الشمال** = أنشطة **عضو المكتبة** وهو بيستعير، والـ lane **اليمين** = workflow نظام الـ **self-service** للمكتبة لـ "issue copy of book".

![شكل 5: مثال 6: إرجاع نسخة كتاب (Member / Librarian)](img/sad/ch05/ex-return.webp)

![شكل 6: مثال 7: دمج الاستعارة والإرجاع في diagram واحد](img/sad/ch05/ex-borrow-return.webp)

**افتراضات مثال 7:** (1) متشغلش بالغرامات. (2) الأمين يحط الكتب المرتجعة على **trolley**. (3) فيه **طابور واحد** للأعضاء.

### ربط الأنشطة بواجهات المستخدم — Linking Activities to User Interfaces

- قبل الـ prototyping المطور لازم يحدد **الواجهات المناسبة** من متطلبات المستخدمين ويحدد **إمتى وفين** هتتطلب. إحدى الطرق: **activity diagram**.
- بالنسبة للمستخدمين **الواجهة هي النظام**: واجهة غير مقبولة ممكن تؤدي لـ **فشل**. هي **الرابط بين اللي المستخدمين عايزينه واللي المطورين بينتجوه**.

![شكل 7: Activity diagram لتسجيل عضو جديد (NonMember / Librarian / LibrarySystem)](img/sad/ch05/ex-enrol.webp)

- **غير العضو** يتفاعل مع **الأمين** ويطلب التسجيل ويدي المعلومات. الأمين يستخدم النظام لـ **تسجيل** المعلومات، فهو **محتاج واجهة** مع النظام.
- المعاملة تكتمل لما النظام: **يفحص المعلومات** · **يولّد رقم عضوية** · **ينشئ سجل عضو جديد** · **يبلّغ الأمين** برقم العضوية.

---

## 3. Use Case Models — نماذج حالات الاستخدام

> بتقدم وسيلة لتحديد **ماذا النظام المقترح لازم يعمل من وجهة نظر المستخدم**. ممكن تكون **أساس عقد بين العميل والمطور**. بتحدد **"مين بيعمل إيه" (who does what)**.

**مزايا الـ Use-case models:**
- **التقاط واستخلاص** المتطلبات · **تمثيل** المتطلبات.
- **تخطيط** تكرارات التطوير (iterations).
- **التحقق (validating)** من النظم البرمجية.
- **تحديد نطاق النظام** (تفاعل النظام مع بيئته).
- **أداة نقاش** بين المطور والمستخدم و**لغة مشتركة**.

### الرموز — Elements & Symbols

![شكل 8: رموز الـ Use Case Diagram](img/sad/ch05/usecase-symbols.webp)

| العنصر | الرمز |
|---|---|
| **Actors** | **رجل عصا (stick figure)** |
| **Use cases** | **أشكال بيضاوية (ovals)** تمثل مهام |
| **Relationships** | **خطوط** بين actors و use cases |
| **Note** | لتوضيح جانب أو مهمة، بتتوصل بـ **خط متقطع** |

![شكل 9: مثال use case للفندق: make reservation / check in / check out](img/sad/ch05/usecase-hotel.webp)

> مثال: نظام فندق: **make reservation** و **check-in** و **check-out**؛ الحجز يعمله **الـ receptionist أو الضيف (guest)** بالتليفون/الويب.

### حدود النظام — System Boundary

![شكل 10: System boundary](img/sad/ch05/boundary.webp)

- **System boundary** بيحدد **نطاق النظام** ويميّز بين المكونات **الداخلية والخارجية**.
- **المكونات الخارجية = actors**، و**الداخلية = use cases**.
- في UML الاستخدام **اختياري**. **صندوق متصل** حوالين الـ use cases والـ actors **برّاه**.
- بنستخدمه لما النظام **معقد** وفيه **نظم فرعية (subsystems)**.

### وصف الـ Use Case — Descriptions

**الحد الأدنى لوصف use case:**
- **Identifier and name**
- **Initiator:** الـ actor اللي يبدأ العملية
- **Pre-condition(s):** شرط لازم **يتحقق قبل** تنفيذ الـ use case
- **Post-condition(s):** شرط لازم **يتحقق بعد** اكتماله
- **Main Success Scenario:** **تسلسل واحد** من الخطوات (ممكن ترقيمها). **Scenario = instance من use case**.
- **Goal:** وصف قصير لهدفه

> **Exceptions** عن السلوك العادي شائعة، خصوصًا لما الـ actors يقرروا يلغوا الـ use case قبل ما يكتمل.

**مثال جدول وصف (UC1 make reservation):**

| الحقل | القيمة |
|---|---|
| Identifier and name | UC1 make reservation |
| Initiator | Guest or Receptionist |
| Goal | حجز غرفة في فندق لضيف |
| Precondition | None |
| Postcondition | غرفة من النوع المطلوب **اتحجزت** للضيف للفترة المطلوبة وبقت **مش متاحة** لتلك الفترة |

**Main success scenario:** 1) الضيف/الـ receptionist يختار الحجز. 2) يختار الفندق والتواريخ ونوع الغرفة. 3) النظام يدي **التوافر والسعر** (**offer**). 4) يوافق على العرض. 5) يدي **بيانات الهوية والاتصال**. 6) يدي **بيانات الدفع**. 7) النظام **ينشئ الحجز** ويدّيه identifier. 8) النظام **يعرض الـ identifier**. 9) النظام **ينشئ تأكيد** للحجز ويبعته للضيف.

### السيناريوهات — Scenarios

- لكل use case مجموعة سيناريوهات ممكنة. **السيناريو** = **تسلسل تفاعلات** بين النظام و actors.
- **Main (successful) scenario:** مفيش حاجة بتروح غلط والـ use case بيتحقق.

> **مثال حجز فندق:**
> - **Main success:** الضيف عايز **double room في 14 July**، فيه واحدة متاحة، يتم الحجز.
> - **Unsuccessful:** الضيف عايز **single room الأسبوع الأول من August**، مفيش غرفة فاضية 7 أيام، بس واحدة 4 أيام وأخرى 3 أيام. النظام يعرض ده والضيف **يرفض**.

> مثال Pre/Post لـ **check-in**: **Precondition:** فيه **حجز** للضيف، وفيه **غرفة متاحة** على الأقل من النوع المطلوب، والضيف **قادر على الدفع**. **Postcondition:** الضيف **اتخصصت له غرفة** للفترة، الغرفة **متعلّمة كمستخدمة**، **اتفتحت فاتورة** للإقامة، و**اتصدر مفتاح**.

### Generalization بين الـ Actors

![شكل 11: Generalization: Reserver ← Guest و Receptionist](img/sad/ch05/generalization.webp)

- لما actorين **بيشاركوا نفس السلوك** (نفس الـ use cases) وواحد منهم عنده سلوك زيادة: السلوك المشترك يتربط بـ **generalised actor** والأكثر تحديدًا بـ **specialised actor**.
- مثال: في الفندق **الـ receptionist والـ guest** الاتنين يعملوا حجز: الضيف أونلاين، والـ receptionist بالنيابة عنه لو بالتليفون أو الفاكس.
- بنضيف actor جديد **Reserver** مرتبط بـ **make reservation**، و**Guest و Receptionist يتخصصوا (specialize) منه**. السهم **مفتوح الرأس** من Guest لـ Reserver.

### العلاقات بين الـ Use Cases: Include و Extend

| | **«include»** | **«extend»** |
|---|---|---|
| الفكرة | use cases عدة **بيشتركوا في وظيفة** تتفصل كـ use case مستقل | use case له main scenario لكن فيه **سيناريوهات بديلة** تتطلب تغييرًا |
| الشرط | **غير مشروط (unconditional)** | **مشروط (conditional)** |
| الاتجاه | سهم **متقطع** من الـ use case **الأصلي** للجديد (المشترك) | سهم متقطع من الـ use case **الجديد (extension)** للأصلي |
| الغرض | **تجنب التكرار** | **فصل حالة خاصة** (alternative behaviour) |

#### «include» — مشاركة السلوك

![شكل 12: «include»: check reservation مشترك بين extend loan و return copy of book](img/sad/ch05/include.webp)

> **مثال المكتبة:** العضو يستعير عدد معين من الكتب ويقدر **يجدد الاستعارة حتى 3 مرات**، والتجديد مسموح **لو مفيش حجوزات** على الكتاب من أعضاء تانيين. وعند **الإرجاع** لازم فحص لو فيه **حجوزات معلقة** فالكتاب يتخصص للحجز الأعلى أولوية. نفس الفحص مطلوب عند **التجديد**. فـ **check reservation** use case **مشترك** بين **extend loan** و **return copy of book**، وده سلوك **غير مشروط**.

#### «extend» — بدائل السيناريو الرئيسي

![شكل 13: «extend»: refuse loan](img/sad/ch05/extend.webp)

> **مثال:** المكتبة بتحط حد أعلى لعدد الكتب. الأمين **ما يقدرش يصدر** نسخة لو الحد هيتجاوز. الـ use case الجديد **refuse loan** بيتنفذ **بس** لما العضو عنده **عدد كتب كبير** (note بيسجل الشرط).

- لازم نضيف **شرط لكل extension** (بـ note أو **extension point**).

**Extensions في وصف make reservation:** `3.a room not available` ← `3.a1` النظام يعرض **تواريخ وأنواع غرف بديلة** ← `3.a2` الضيف يختار أو **يرفض**. `5.a guest already on record` ← `5.a1` كمل من الخطوة 6.

### Extend ولا Include؟

![شكل 14: log on كـ include في كل use case](img/sad/ch05/login-include.webp)

- مثال **log on**: use case مشترك بين كل الـ use cases المرتبطة بـ actor ← **«include»**.
- **مفيش ترتيب زمني** في use-case diagrams.

### تجنب تعقيد الـ Use Case Diagrams
- قسّم المشكلة لمشاكل فرعية وبسّط بـ **abstraction**:
  1. **إعادة الرسم بمستوى تجريد أعلى**.
  2. **تقسيمه لـ modules أصغر**.
- مثال سلسلة فنادق: **packages**: (1) reservations (2) checking guests in and out (3) system access، وكل package لمطور منفصل والفريق يتعامل مع **الاعتماديات** بينهم.

### Use Cases كأداة تخطيط وفي الـ Architecture والـ Testing
- **تخطيط:** تساعد المطور في: فهم **تعقيد** كل use case · تحديد الـ actors المتفاعلين · تحديد الـ use cases **الأكثر مخاطرة** · **تقدير** الوقت.
- **Architecture:** الـ use cases بتحدد الوظائف وتساعد في تحديد **الواجهات**، وتتجمّع حسب التشابه، والسيناريوهات تتحقق من **الـ non-functional requirements** المتأثرة بالمعمارية (الأمان والسلامة).
- **Testing:** **walk-through technique**: التحقق من وظائف كل use case بالدور، واستنتاج **اختبارات النظام**، وده **verification**.

> [!EXAM]
> - **Business process** = إيه بيتعمل · **Business rule** = قيد على إزاي بيتدار.
> - **Fork/Join** للتزامن · **Decision** = خرجين+ مع **guards** · **Merge** = خرج واحد · **Swimlane** = مين المسؤول.
> - **Use case**: actors (رجل عصا) · use cases (بيضاوي) · system boundary (صندوق).
> - **include = غير مشروط (مشترك)** · **extend = مشروط (بديل)** · **Generalization بين actors** بسهم مفتوح الرأس.
> - وصف الـ use case: Identifier · Initiator · Preconditions · Postconditions · Main Success Scenario · Goal · Extensions.
