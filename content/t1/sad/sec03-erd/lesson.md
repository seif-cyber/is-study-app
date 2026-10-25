# Section 3: مفاهيم الـ ERD — Entity Relationship Diagram Concepts

> [!NOTE]
> السكشن ده بيشرح **الـ ER Model**: الـ **Entities** (strong و weak)، **أنواع الـ Attributes** (Simple / Composite / Derived / Multi-valued / Complex)، **الـ Relationships** (الـ degree والـ cardinality والـ participation)، و**أنواع الـ Keys**، ورموز الـ ERD.

---

## 1. الـ ER Model — Basic Constructs

| العنصر | الوصف |
|---|---|
| **Entities** | شخص، مكان، شيء، حدث، مفهوم (غالبًا بيقابل **object حقيقي** مميز عن أي object تاني) |
| **Attributes** | **خاصية** لـ entity type (غالبًا بتقابل **field في جدول**) |
| **Relationships** | **رابط بين entities** (بيقابل علاقات **primary key–foreign key** في الجداول) |

![شكل 1: ER diagram مبدئي: customer و account](img/sad/sec03-erd/example.webp)

**الرموز:** **Rectangles** = entity sets · **Diamonds** = relationship sets · **Ellipses** = attributes.

---

## 2. Strong vs Weak Entity

![شكل 2: Weak entity](img/sad/sec03-erd/weak.webp)

| | التعريف |
|---|---|
| **Strong Entity** | entity set **ليها primary key** |
| **Weak Entity** | entity set **ملهاش attributes كفاية لتكوين primary key** |

- **Partial key:** مجموعة attributes تتربط بـ **PK الـ owner entity set** عشان **تميّز** الـ weak entity.
- **Identifying relationship** بتربط strong بـ weak وبتتمثل **بمعين بخط مزدوج (double line diamond)**.

---

## 3. أنواع الـ Attributes

| النوع | الوصف |
|---|---|
| **Simple** | attribute بسيط ذري (مثلًا account number) |
| **Composite** | ممكن **يتقسم لأجزاء** (مثلًا name = first + last) |
| **Derived** | **بيتحسب** من attribute تاني (مثلًا age من birth date) |
| **Multi-valued** | **ليه أكتر من قيمة** لنفس الـ entity (مثلًا phone numbers) |
| **Complex** | **تركيب** من composite و multi-valued |

![شكل 3: Simple attribute](img/sad/sec03-erd/simple.webp)

![شكل 4: Composite attribute](img/sad/sec03-erd/composite.webp)

![شكل 5: Derived attribute](img/sad/sec03-erd/derived.webp)

![شكل 6: Multi-valued attribute](img/sad/sec03-erd/multivalued.webp)

---

## 4. الـ Relationship

> **Relationship** = **ارتباط بين عدة entities**. ممكن يكون ليه **attributes** كمان.

> مثال: entity sets **customer** و **loan** وعلاقة **borrower**. ممكن نربط attribute **date-issued** بالعلاقة لتحديد **تاريخ إصدار القرض**.

**خصائص الـ Relationship (3):** **Degree** · **Cardinality constraint** · **Participation constraint**.

### Degree — درجة العلاقة
> عدد **entity types** المشاركة في العلاقة.

| الدرجة | الوصف | مثال |
|---|---|---|
| **Unary (Recursive)** | بين **instances من entity type واحد** (نفس الـ entity تشارك أكتر من مرة) | PERSON **is married to** PERSON · EMPLOYEE **manages** EMPLOYEE |
| **Binary** | بين instances من **entity typeين** (degree = 2) | employee – branch |
| **Ternary** | بين instances من **3 entity types** (degree = 3) | VENDOR – WAREHOUSE – Product (Shipping_mode) |

![شكل 7: Ternary relationship](img/sad/sec03-erd/ternary.webp)

### Cardinality — الـ Mapping Cardinalities
> **كام instance** من entity ممكن/لازم يتوصل بـ **instance واحد** من entity تانية.

**One-to-One · One-to-Many · Many-to-Many**

![شكل 8: Mapping cardinalities](img/sad/sec03-erd/cardinality.webp)

### Participation Constraint — قيد المشاركة

| النوع | الوصف | مثال |
|---|---|---|
| **Total participation** | كل instance **لازم** يشارك في العلاقة | Employee **MUST** work for a department (الـ employee entity ما توجد غير لو شاركت في WORKS FOR) |
| **Partial participation** | **بعض** الـ instances بس تشارك | بعض الموظفين بس **يديروا** departments |

> مثال: **Employee ← Car:** الموظف **ممكن** يكون عنده عربية (optional)، والعربية **لازم** تتعيّن لموظف محدد (mandatory).
> مثال: **Department ← Employee:** القسم **ممكن** يوظّف موظفين كتير (zero or more) (**optional**)، والموظف **لازم** يكون موظف في قسم (**mandatory**).

---

## 5. الـ Keys — Different Types

| المفتاح | التعريف |
|---|---|
| **Candidate Key** | مجموعة attribute أو أكتر قيمتها **تحدد entity بشكل فريد**. **ما ينفعش تحذف أي attribute** منه من غير ما تخسر الـ uniqueness. ممكن يكون فيه **أكتر من attribute** |
| **Primary Key** | **الـ candidate key اللي المصمم اختاره** كمعرّف فريد · **Unique & Not Null** · ممكن يكون **Composite** |
| **Foreign Key** | بيشاور على PK في جدول تاني |
| **Composite Key** | key من **أكتر من attribute** |
| **Partial Key** | بيميّز الـ weak entity مع PK الـ owner |
| **Alternate Key** | candidate key **اللي ما اتاخدش** كـ primary |
| **Super Key** | مجموعة attributes تحدد الـ entity بشكل فريد (ممكن فيها زيادة) |

> **أمثلة:** `(SSN, Name)` **مش candidate key** (Name زيادة، ممكن تتشال). **SSN** هو candidate key للـ customer. وفي **Driver**: كل من **SSN** و **License #** candidate keys، والـ designer يختار واحد كـ **primary key**.

- في الـ ER diagram الـ **primary key** بيتحط له **خط تحته (underlined)**.

---

## 6. ملخص رموز الـ ERD — Summary of Notation

![شكل 9: ملخص رموز الـ ER diagrams](img/sad/sec03-erd/notation.webp)

| الرمز | المعنى |
|---|---|
| مستطيل | **Entity** |
| مستطيل مزدوج | **Weak Entity** |
| معين | **Relationship** |
| معين مزدوج | **Identifying Relationship** |
| بيضاوي | **Attribute** |
| بيضاوي بخط تحته | **Key Attribute** |
| بيضاوي مزدوج | **Multivalued Attribute** |
| بيضاوي منقط | **Derived Attribute** |
| خط مزدوج | **Total participation** لـ E في R |
| **1 : N** | **Cardinality ratio** |
| **(min, max)** | **Structural constraint** على مشاركة E في R |

## 7. Case Study

![شكل 10: Case study](img/sad/sec03-erd/case-study.webp)

بتطبيق الخطوات: حدد الـ entities ← attributes (والـ keys) ← relationships (والـ cardinality والـ participation).

> [!EXAM]
> - **Strong** (عنده PK) · **Weak** (من غير PK ← partial key + identifying relationship).
> - **5 attributes:** Simple · Composite · Derived · Multi-valued · Complex.
> - **Degree:** Unary / Binary / Ternary · **Cardinality:** 1:1 / 1:M / M:M · **Participation:** Total / Partial.
> - **Candidate key** ← **Primary key** (المختار) + **Alternate key** (الباقي).
