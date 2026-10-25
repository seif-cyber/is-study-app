# النمذجة والـ Class Model — Lecture 7: Modelling & Object-Oriented Concepts

> [!NOTE]
> المحاضرة دي عن **النمذجة (Modelling)**، **أنواع الـ UML diagrams**، **أدوات UML**، **Static diagrams**، وعن **الـ Object-Oriented concepts**: Identity و Classification و Abstraction و Encapsulation و Inheritance و Polymorphism و Generics، وبعدين **الـ Class Model**: Objects و Attributes و Operations و Methods وصيغة الـ class notation ومثال Flights.

---

## 1. عملية البرمجيات — The Software Process

> **Software process** = مجموعة أنشطة منظمة لازمة لتطوير نظام برمجي. كل العمليات فيها:
> 1. **Specification:** تحديد إيه اللي النظام لازم يعمله.
> 2. **Design and implementation (Development):** تحديد تنظيم النظام وتنفيذه.
> 3. **Validation (Testing):** التأكد إنه بيعمل اللي العميل عايزه.
> 4. **Maintenance & Evolution:** تغيير النظام مع تغير احتياجات العميل.

> **Software process model** = تمثيل مجرد لعملية بيوصفها من منظور معين.

---

## 2. النمذجة — Modelling

> **Model** = **abstraction** (تجريد) لنظام. الـ **abstraction** بيسمح لنا **نتجاهل التفاصيل غير الأساسية**.

**ليه بنبني models؟**
1. **لتقليل التعقيد.**
2. **لاختبار النظام قبل بنائه.**
3. **للتواصل مع العميل.**
4. **لتوثيق وتصور (visualize) أفكارك.**

---

## 3. بعض الـ UML Diagrams

| النوع | الوصف |
|---|---|
| **Functional diagrams** | بتوصف **وظائف النظام من وجهة نظر المستخدم**، التفاعل بين المستخدم والنظام · تشمل **use case diagrams** |
| **Static diagrams** | بتوصف **البنية الثابتة**: Classes, Objects, attributes, associations |
| **Dynamic diagrams** | **Interaction diagrams** (التفاعل بين objects) · **State diagrams** (الجانب الزمني/السلوكي لـ object فردي) · **Activity diagrams** (السلوك الديناميكي، خصوصًا الـ workflow) |

### أدوات UML
- بعض الأدوات **تولّد كود** بعد اكتمال الـ diagram، وبعضها **أدوات رسم (sketching)**.
- **Rational Rose** (IBM): من أشهر البرامج لإنشاء UML.
- **Bouml:** برنامج **open source** بيدعم **Python, C++, Java**.
- **Visio:** أداة **sketching**.

### الـ Static Diagrams
- **Class diagrams:** تبين الـ classes وعلاقاتها.
- **Object diagrams:** تبين الـ objects وعلاقاتها.
- **Package diagrams:** تبين إزاي الـ classes بتتجمّع في packages لتبسيط الـ class diagrams المعقدة.

---

## 4. الـ Class Model

> **Class model** بيلتقط **البنية الثابتة** للنظام بتوصيف: **الـ classes والـ objects** و**العلاقات بين الـ objects** و**الـ attributes والـ operations** لكل class.

- الـ class models هي **أهم الـ OO models**. في النظم OO بنبني النظام **حوالين الـ objects مش الوظائف**.

## 5. يعني إيه OO Software؟

> **Object-oriented software** = تنظيم البرنامج كـ **مجموعة objects منفصلة** بتجمع **بنية البيانات والسلوك** مع بعض. **الوحدة الأساسية = الـ Object**. للـ object **state (data)** و **behavior (operations)**.

- في **البرمجة الهيكلية (Structured)** كانت البيانات والعمليات عليها **منفصلة أو مرتبطة بشكل ضعيف**.

**خصائص الـ OO:** Identity · Classification · Encapsulation · Abstraction · Inheritance · Polymorphism · Generics · Cohesion · Coupling.

---

## 6. Identity — الهوية

- الـ object ممكن يكون **مادي** (car, file) أو **مفاهيمي** (feeling, plan).
- **كل object ليه هويته الخاصة حتى لو اتنين ليهم نفس الـ state بالظبط** (مثلًا Omar's car و Rana's car).
- **Object identity** = الخاصية اللي بيتحدد بيها كل object ويتعامل معاه ككيان برمجي مميز. هي **عنوانه في الذاكرة (memory address / handle)** اللي بتشاور عليه **object identifier** (متغير) أو أكتر.

```java
car my_car = new car("Opel", 2005);
// object handle = 0x00FDA610، و object identifier (variable) = my_car
```

---

## 7. Classes and Objects و Classification

![شكل 1: Objects و Classes: Bicycle و Polygon](img/sad/lec07/classes-objects.webp)

- **كل object هو instance من class**، وكل object **ليه reference لـ class بتاعه**.
- **Classification:** الـ objects **اللي ليها نفس بنية البيانات (attributes) ونفس السلوك (operations)** بتنتمي لنفس الـ **class**.
- **الـ class = abstraction** بيوصف الخصائص المهمة للتطبيق، **واختيار الـ classes اختياري ومعتمد على التطبيق**.
- مثال: **Bicycle** class (frame size, wheel size, number of gears, material | shift, move, repair) و **Polygon** (vertices, border color, fill color | draw, erase, move). كل class بيوصف مجموعة **ممكن تكون لا نهائية** من الـ objects.

> **مثال Car و Cow:** الاتنين ليهم **price و age**. لو اتمذّجوا كـ **financial assets** بس، ممكن في **نفس الـ class**. لو التطبيق محتاج إن Cow **ياكل ويطلّع لبن** و Car ليها **speed و make و manufacturer**، يبقى **classes منفصلة**. فالـ **semantics** تعتمد على التطبيق.

---

## 8. Abstraction — التجريد

> **Abstraction** = **الفحص الانتقائي لجوانب معينة من المشكلة**، لعزل الجوانب المهمة لغرض معين **وإخفاء غير المهم**. **الغرض هو اللي بيحدد إيه المهم**.

![شكل 2: نفس الـ Car بـ abstraction مختلف: DMV مقابل mechanic](img/sad/lec07/abstraction.webp)

> **مثال:** الـ **Car** في **Department of Motor Vehicles** (model, year, licenseNumber, motorCapacity) مختلف عن الـ **Car** عند **mechanic** (model, year, problem, owner, balance, isFinished).

---

## 9. Encapsulation — التغليف

> **Encapsulation** = فصل **الجوانب الخارجية** للـ object (اللي ممكن باقي الـ objects توصلها) عن **تفاصيل التنفيذ الداخلية** (المخفية).

- بيقلل **الاعتماد المتبادل (interdependency)** بين أجزاء البرنامج.
- تقدر **تغير تنفيذ الـ class** (لتحسين الأداء، إصلاح bugs...) **من غير التأثير** على التطبيقات اللي بتستخدم objects الـ class.
- **Data hiding:** المعلومات جوه الـ object **ما تتشافش** من برا.
- **Implementation hiding:** تفاصيل التنفيذ جوه الـ object **ما تتشافش** من برا.

![شكل 3: Encapsulation: List class بـ sort() بتنفيذين مختلفين](img/sad/lec07/encapsulation.webp)

> **مثال:** class **List** (items, length | List, search, getMax, sort). نقدر نغير `sort()` من **Bubble Sort** لـ **Quick Sort** من غير ما نغير التطبيقات.

---

## 10. Inheritance — الوراثة

> **Inheritance** = **مشاركة الخصائص (attributes و operations)** بين classes بناءً على **علاقة هرمية**. الـ **superclass (parent / base)** فيها الخصائص العامة، والـ **subclasses (child / derived)** بترثها وممكن تعدّل فيها. ده **من أقوى مميزات تقنية OO**.

- الـ objects من class **B** تقدر تستخدم methods و variables معرّفة لـ objects class **A** **كأنها اتعرّفت في B**.

### كيف نستخدم الوراثة؟
بتساعد في **بناء البرمجيات تزايديًا (incrementally)**:
1. **أولًا:** ابني classes للحالة **العامة/الأبسط**.
2. **ثانيًا:** ابني الحالات **الخاصة** اللي بترث من الـ base class؛ لها نفس خصائص الـ base + خصائصها.

![شكل 4: Car كـ base class و Taxi و Truck كـ subclasses](img/sad/lec07/inheritance.webp)

---

## 11. Polymorphism — تعدد الأشكال

> **Polymorphism** = **نفس الـ operation ممكن تتصرف بشكل مختلف** في classes مختلفة.

- **Operation** = إجراء أو تحويل بيعمله الـ object.
- **Method** = **تنفيذ operation** بواسطة class معين.
- لأن الـ operation OO polymorphic، ممكن يكون لها **أكتر من method**، كل واحدة لـ class مختلف.

![شكل 5: Shape و Rectangle و Circle و Square: getArea() بتنفيذات مختلفة](img/sad/lec07/polymorphism.webp)

| Class | `getArea()` |
|---|---|
| **Rectangle** | length × width |
| **Circle** | π × radius² |
| **Square** | side² |

- **الـ Italic** في الـ UML معناه إن الـ operation **متحددة لكن مش منفذة في الـ base class**.

```python
import math
print(4*3, round(math.pi*2**2, 2), 5**2)   # Rectangle 4x3 = 12 · Circle r=2 ≈ 12.57 · Square 5 = 25
```

---

## 12. Generics

> **Generic class** = الـ **data types** لواحد أو أكتر من attributes بتتحدد **في وقت التشغيل (run-time)** (وقت إنشاء object). يعني الـ class **متـ parameterized**: بتاخد **parameter هو اسم type تاني**.

- مثال: class بـ **`T`** (يتعرف وقت التشغيل)، فيه `data[]: T` و `sortData(): void`.

---

## 13. Objects و Class في الـ Class Model

### Objects
- الـ objects غالبًا بتظهر كـ **proper nouns** في وصف المشكلة أو نقاش العميل.
- بعضها **كيانات حقيقية** (BUE, MIT, Omar's car) وبعضها **مفاهيمية** (معادلة، binary tree).
- **اختيار الـ objects يعتمد على حكم المحلل** والمشكلة، وممكن يكون فيه أكتر من تمثيل صح.

### Class
- الـ object **instance من class**. الـ class بيوصف مجموعة objects بنفس **الخصائص (attributes)** و**السلوك (operations)** و**أنواع العلاقات**.
- **Person, Company, Window** كلها classes. الـ classes غالبًا بتظهر كـ **common nouns وعبارات اسمية** في الوصف.

![شكل 6: Class و objects: Person → JoeSmith:Person](img/sad/lec07/attributes.webp)

### Values and Attributes
- **Attribute** = **خاصية مسماة** لـ class بتوصف **قيمة** عند كل object.
- **اسم الـ attribute فريد داخل الـ class**، وممكن classes مختلفة يكون عندها نفس اسم الـ attribute.
- **Value** = **قطعة بيانات** معيّنة لـ attribute.

> **مثال:** class **Person** (name: string, birthdate: date) و objects **JoeSmith** (name="Joe Smith", birthdate=21 October 1983) و **MarySharp** (name="Mary Sharp", birthdate=16 March 1950).

### Operations and Methods
- **Operation** = دالة أو إجراء ممكن يتطبق على أو بواسطة objects الـ class.
- **Method** = **تنفيذ** الـ operation لـ class.
- الـ operation **polymorphic** لو بتاخد **أشكال مختلفة** في classes مختلفة.
- **كل objects نفس الـ class ليها نفس الـ operations.**

### ملخص الـ Class Notation

![شكل 7: صيغة الـ class notation](img/sad/lec07/notation.webp)

```
ClassName
attributeName1 : dataType1 = defaultValue1
attributeName2 : dataType2 = defaultValue2
operationName1(argumentList1) : resultType1
operationName2(argumentList2) : resultType2
```

- الصندوق بيمثل class وله **حتى 3 compartments** (الاسم · الـ attributes · الـ operations).
- **compartments الـ attributes والـ operations اختيارية**، تظهر أو لا حسب مستوى التجريد.
- **compartment مفقود** = الـ attributes **لسه محددتش**. لكن **compartment فاضي** = اتحددت **ومفيش أي منها**.

**رموز الـ visibility والـ attributes:** `-` = **private** · `+` = **public** · `{readOnly}` = قراءة فقط · مع قيمة ابتدائية (مثال `+ pi : Real = 3.14 {readOnly}`).

---

## 14. مثال: نظام الرحلات الجوية — Flights

> **المطلوب:** نمذجة classes نظام يمثل الرحلات: كل **city** فيها **airport** على الأقل. **Airlines** تشغّل **flights** من وإلى airports. الـ **flight** ليها **قائمة ركاب** كل واحد له **seat** محدد. وكمان الـ flight بتستخدم **plane** من الطائرات اللي بتملكها الـ airline المشغلة. وأخيرًا الـ flight يقودها **pilot و co-pilot**.

![شكل 8: الـ classes الناتجة من نص المسألة](img/sad/lec07/sample.webp)

**الـ classes (الأسماء):** City · Airport · Airline · Flight · Passenger · Seat · Plane · Pilot (و Co-Pilot).

> [!EXAM]
> - **Abstraction** = إخفاء غير المهم حسب الغرض · **Encapsulation** = data hiding + implementation hiding · **Inheritance** = is-a · **Polymorphism** = نفس الـ operation بـ methods مختلفة.
> - **Class** = attributes + operations · **Object** = instance · **Identity** = كل object مميز حتى لو نفس الـ state.
> - **compartment مفقود ≠ فاضي**.
> - **Generic class** = type بيتحدد وقت التشغيل.
