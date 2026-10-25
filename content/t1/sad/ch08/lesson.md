# العلاقات في الـ Class Diagram — Chapter 8: Associations, Aggregation, Generalization & Object Diagrams

> [!NOTE]
> الشابتر ده بيكمل الـ **Class Model**: **Associations** (الاسم، الـ multiplicity، الـ roles، الـ self-associations)، **Links**، **Association classes**، **Qualified associations**، **Aggregation و Composition**، **Generalization / Specialization / Inheritance**، **Overriding**، **Abstract classes**، **Object diagrams**، ونصايح الـ class modeling.

---

## 1. الـ Associations

> **Association** = علاقة بين classes بتدل على **ارتباط له معنى ومهم**. بتتمثل بـ **خط له اسم**. تسمية الـ associations كويس مهمة للفهم: **استخدم عبارة فعلية (verb phrase)**.

![شكل 1: Association: Country HasCapital CapitalCity](img/sad/ch08/association.webp)

- **Reading direction arrow** (اختياري): بيدل على **اتجاه قراءة** اسم الـ association بس، **ملوش علاقة بالـ visibility أو الـ navigation**، وغالبًا بيتشال.
- ممكن يكون فيه **أكتر من association** بين نفس الـ classes (مش غريب): مثلًا **OwnsStock** و **WorksFor**.
- الـ associations بتتنفذ عادةً بـ **reference** من object لـ object تاني.
- الـ associations **بطبيعتها ثنائية الاتجاه (bidirectional)**: ممكن تتعبر في الاتجاهين (الشخص **WorksFor** شركة، والشركة **Employs** شخص). وممكن تكون **unidirectional**.

### الـ Multiplicity

> **Multiplicity** = **عدد instances** من class اللي ممكن يترتبوا بـ **instance واحد** من class مرتبط.
> بتكشف **افتراضات مخفية** في النموذج: لو شخص **WorksFor** شركة، هل ممكن يشتغل في **أكتر من شركة**؟ يعني one-to-one ولا one-to-many؟

| القيمة | المعنى |
|---|---|
| `*` | **zero or more** ("many") |
| `1..*` | **one or more** |
| `1..40` | **one to 40** |
| `5` | **exactly 5** |
| `3,5,8` | **exactly 3, 5, or 8** |
| `0..1` | **zero or one** (اختياري) |

---

## 2. Links و Associations

![شكل 2: Many-to-many association: Person WorksFor Company](img/sad/ch08/links.webp)

- **Link** = **ارتباط فيزيائي أو مفاهيمي بين objects**. مثال: **John works for GE**.
- **Association** = علاقة بين **classes** وبتمثل **مجموعة links**. مثال: Person **WorksFor** Company.
- الـ association بتوصف مجموعة **links محتملة** زي ما الـ class بيوصف مجموعة **objects محتملة**.
- **Class diagram** ← associations · **Object diagram** ← links.
- ممكن تستخدم **عدة associations** لتمثيل عدة links بين نفس الـ objects.

> مثال **one-to-one**: Country **HasCapital** CapitalCity: (Canada, Ottawa) · (France, Paris) · (Senegal, Dakar).

---

## 3. الـ Roles

![شكل 3: Roles: employee و employer](img/sad/ch08/roles.webp)

- كل **نهاية association** ممكن يتحط لها **role** (اسم).
- بتسهّل فهم الـ associations، خصوصًا الـ **self-associations** بين objects نفس الـ class.
- مثال: **Person** `employee` ←WorksFor→ `employer` **Company**.

## 4. Self (Recursive) Associations

![شكل 4: Self-association: Course/prerequisite و Person/Parent-Child](img/sad/ch08/self.webp)

- بنستخدم **association end names (roles)** لنمذجة **عدة references لنفس الـ class**.
- مثال: **Person** مع **parent** و **child** (role names)، بدل نموذج **غلط** من غير roles.

---

## 5. Association Classes

> **Association class** = association **هي كمان class** (عندها attributes و operations).

![شكل 5: Association class: WorksFor بـ salary و jobTitle](img/sad/ch08/assoc-class.webp)

- **الاستخدام الصح:** attributes الـ association (**salary, jobTitle**) تتحط في **association class (WorksFor)**، **مش** تتحط جوه Person أو Company. (الشكل **Discouraged**: دمج attributes الـ association في class).
- **Many-to-many** بيدي سبب قوي لـ association classes: مثال **accessPermission** هي **خاصية مشتركة بين File و User**، **ما ينفعش** تتحط في واحد منهم بس (class **AccessibleBy**).

> **تمرين:** كل **person** بيشتغل في **company**، وبياخد **salary**، وعنده **job title**. الشخص ممكن يشتغل في **أكتر من company**. **الـ boss** بيقيّم أداء كل **worker**. الحل: **Person ←→ Company** مع association class **WorksFor** (salary, jobTitle)، و association ذاتية على Person: **Manages** (boss 1 ← worker *) مع **performanceRating**.

> **تمرين:** user مصرح له على **workstations كتير**. كل authorization ليها **priority و access privileges**. كل user له **home directory** لكل workstation مصرح بيها، بس **عدة workstations و users** ممكن يشاركوا نفس الـ home directory. الحل: association class **Authorization** (priority, ...) بين **User و Workstation**، مرتبطة بـ **homeDirectory**.

### Association class vs Ordinary class

![شكل 6: Association class مقابل ordinary class](img/sad/ch08/assoc-vs-ordinary.webp)

- **OwnsStock** (association class): **occurrence واحد بس** لكل زوج (person, company) (link واحد فقط بين الزوج).
- بالعكس **Purchase** (ordinary class): ممكن يكون فيه **أي عدد** من Purchase objects لكل زوج person/company.

---

## 6. Qualified Association

![شكل 7: Qualified association: Bank + accountNumber → Account](img/sad/ch08/qualified.webp)

> **Qualified association** = association بيستخدم attribute اسمه **qualifier** لتقليل علاقة **many** لـ **one** عند الطرف التاني.

> **مثال:** Bank عنده accounts كتير `[0..*]`. لكن **Bank + account number يدي account واحد**. الـ **accountNumber** attribute في class Account، وبيتعمل qualifier عند Bank. وكذلك **Directory + filename → File واحد**.

- الـ qualification **بتزود دقة** النموذج.

---

## 7. نموذج الرحلات — A Sample Class Model

**ترتيب النمذجة:** (1) **Define classes** ← (2) **Define associations** ← (3) **Define multiplicity**.

![شكل 8: الـ class model لنظام الرحلات](img/sad/ch08/flight.webp)

**الـ classes:** City · Airline · Pilot · Plane · Passenger · Airport · Flight · Seat.

**الـ associations (من النص):**
- City **has** airport(s) · Airline **operates** flights · Flight **from** airport · Flight **to** airport.
- Flight **has** passengers · Passenger **has** seat · Flight **uses** airplane.
- Airplane **owned by** airline · Flight **run by** pilot & co-pilot.

مثال multiplicities: City **1** ←→ **\*** Airport · Airline **1** owns **\*** Plane · Flight **2** pilots (pilot + co-pilot) · Flight **\*** ←→ **1** Plane.

---

## 8. Aggregation و Composition

| | **Aggregation** | **Composition** |
|---|---|---|
| التعريف | نوع خاص من الـ association فيه **aggregate object بيحتوي أجزاء (parts)** · علاقة **has-a** | نوع خاص من الـ association فيه الجزء **ينتمي لـ assembly واحد على الأكثر** و**يوجد فقط لو الـ assembly موجود** |
| الرمز | **معين فاضي ◇** عند الـ aggregate (الكل) | **معين مصمت ◆** عند الـ assembly (الكل) |
| أمثلة | **PoliceStation ◇— PoliceOfficer** · **Directory ◇— File** | **Hand ◆— Finger** (1 : 1..5) · **Board ◆— Square** (1 : 1..64) |

![شكل 9: Composition: Hand و Finger، Board و Square](img/sad/ch08/composition.webp)

> الـ **whole** عند طرف المعين، والـ **part** عند الطرف التاني (مثال Theater و BoxOffice).

---

## 9. Generalization و Specialization و Inheritance

> **Generalization** = العلاقة بين class (**superclass**) وواحد أو أكتر من **variations** (subclasses). الـ superclass فيها **الـ attributes والـ operations والـ associations المشتركة**، والـ subclasses بتضيف **الخاص**. كل subclass **ترث (inherit)** خصائص الـ superclass. الوراثة اسمها علاقة **"is-a"**.

| المصطلح | المعنى |
|---|---|
| **Generalization** | الـ super-class **بتعمّم** subclasses |
| **Specialization** | الـ subclass **بتخصص أو بتحسّن** الـ super-class |
| **Inheritance** | **الآلية** اللي بتنفّذ generalization/specialization |

- الـ generalization **متعدية (transitive)** عبر أي عدد من المستويات.
- **Ancestor** = parent أو grandparent · **Descendant** = child أو grandchild.

![شكل 10: Inheritance لأشكال Figure: ZeroDimensional / OneDimensional / TwoDimensional](img/sad/ch08/inheritance.webp)

### فوائد الـ Generalization (3)
1. **دعم الـ polymorphism.**
2. **هيكلة وصف الـ objects** وعلاقتها بناءً على **التشابه والاختلاف**.
3. **إعادة استخدام الكود (reuse)**: وراثة الكود من superclasses أو class library تلقائيًا، وده أكتر إنتاجية من إعادة الكتابة، وممكن تعدّل لو لازم.

### Overriding Features
- الـ subclass ممكن **تعمل override** لـ feature في الـ superclass بتعريف feature **بنفس الاسم**. الـ overriding feature **بتحل محل** الـ overridden.
- **ما تعملش override بشكل يتعارض** مع الـ feature الأصلية المورّثة. الـ overriding لازم **يحافظ** على: **نوع الـ attribute** و**عدد وأنواع arguments الـ operation** و**نوع الـ return**.

### Abstract Class

![شكل 11: Abstract class: Employee و FullTimeEmployee و PartTimeEmployee](img/sad/ch08/abstract.webp)

> **Abstract class** = class **ناقص ما ينفعش يتعمل منه instances**. فيه **abstract operation** (مثال `computePay`) بتتنفذ في subclasses (FullTime: weeklyRate · PartTime: hourlyRate).

---

## 10. Object Diagrams

> **Object model** = مجموعة objects، **كل object instance من class** في الـ class model. بيمثل **لقطة (snapshot)** للنظام **في لحظة زمنية معينة**. ما ينفعش object يكون عنده attributes أو علاقات **مش موجودة** في الـ class model. هو **instantiation** للـ class model، وبيوضح **الاتصالات الموجودة فعلًا** في اللحظة دي.

![شكل 12: Object diagram لنظام فندق](img/sad/ch08/object-diagram.webp)

**عناصره:**
- **صناديق مستطيلة** = objects.
- جوه كل صندوق **`ObjectName : ClassName`** (**مسطّر underlined**).
- **ثاني compartment:** أسماء وقيم attributes مفيدة (اختياري).
- **الخطوط بين الـ objects = links**: حالات معينة لـ object **"يعرف"** object تاني. **كل link = instance من association**.
- مثال: `theRitz : Hotel` (name = the Ritz, address = Bootle, VATno = 123521) و `r1235 : Room` و `jack : Guest` ...

---

## 11. نصايح الـ Class Modeling

**مصادر الـ objects المناسبة:**
1. **Tangible objects:** أشياء مادية (rooms, bills, books, vehicles).
2. **Roles:** أدوار الناس (employees, guests, members).
3. **Events:** أحداث (room reservations, vehicle registrations, orders, deliveries, transactions).
4. **Organizational units:** مجموعات الناس (accounts departments, production teams, maintenance crews).

**نصايح عامة:**
- **Scope:** النموذج بيمثل الجوانب **ذات الصلة** بالمشكلة؛ استخدم **حكمك** في إيه تعرضه وإيه تتجاهله.
- **Simplicity:** خلّي النموذج **بسيط قد الإمكان**.
- **Diagram Layout:** رتّبه ليسهل فهمه، **تجنب الخطوط المتقاطعة** وحط الـ classes المهمة في مكان بارز.
- **Names:** اختار أسماء **وصفية**، وسمّي الـ classes **بصيغة المفرد (singular nouns)**.

> [!EXAM]
> - **Association** = علاقة بين classes (verb phrase) · **Link** = علاقة بين objects · **Multiplicity** = عدد الـ instances.
> - **Association class** لما الـ attribute يخص **العلاقة** (مثال accessPermission، salary).
> - **Aggregation** ◇ (has-a، الجزء ممكن يوجد لوحده) · **Composition** ◆ (الجزء يموت بموت الكل).
> - **Generalization = is-a** · **Overriding** لازم يحافظ على الـ signature · **Abstract class** ما ينفعش ينعمل منه instance.
> - **Object diagram** = snapshot · الأسماء **مسطّرة**.
