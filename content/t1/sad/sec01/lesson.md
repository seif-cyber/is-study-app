# Section: UML و Use Case و Sequence Diagrams

> [!NOTE]
> السكشن ده عن **UML**: يعني إيه، **أنواع الـ diagrams** (Structural و Behavioral)، **Use Case Diagram** ومثال **Airline Reservation**، و**Sequence Diagram** ومثال **ATM**.

> [!WARNING]
> **تنبيه:** ملف السكشن ده مكتوب على أول سلايد منه "**SEC 2**"، وملف `sec02` مكتوب عليه "**SEC 1**". المحتوى هنا هو الـ UML، ومحتوى `sec02` هو مقدمة SAD والـ SDLC والمتطلبات.

---

## 1. يعني إيه UML؟

- **UML = Unified Modeling Language**.
- هي **لغة رسومية معيارية في الصناعة** لـ **تحديد (specifying)** و**تصور (visualizing)** و**بناء (constructing)** و**توثيق (documenting)** مكونات (artifacts) النظم البرمجية.
- بتستخدم **تدوينات رسومية** أغلبها للتعبير عن تصميم مشاريع البرمجيات.
- **بتبسّط** العملية المعقدة لتصميم البرمجيات.

## 2. أنواع الـ UML — UML Modelling Types

![شكل 1: أنواع الـ UML diagrams](img/sad/sec01/uml-types.webp)

| النوع | المعنى | أمثلة |
|---|---|---|
| **Structural Diagrams** | **الجوانب الثابتة (static)** للنظام | Class diagram · Package diagram · Composite structure · Profile |
| **Behavioral Diagrams** | **الجوانب الديناميكية (dynamic)** للنظام | Use case · Sequence · Activity · State |

---

## 3. Use Case Diagram

- بيوصف **التفاعل بين النظام والـ actors الخارجيين**.
- بيتستخدم أساسًا **لالتقاط متطلبات المستخدم**.
- بيشتغل **كعقد** بين المستخدم النهائي ومطوري البرمجيات.

![شكل 2: Airline Reservation System: use case](img/sad/sec01/airline.webp)

---

## 4. Sequence Diagram

- هو **Interaction diagram**.
- بيبين **إزاي عمليات (processes) النظام بتشتغل مع بعض** و**بأي ترتيب**.

![شكل 3: ATM Sequence diagram](img/sad/sec01/atm.webp)

مثال **ATM**: رسائل مرقمة بالترتيب، منها: `1: insert card` ... `4.1.1: validateTransaction(accountNumber, amount)` (ترقيم هرمي للرسائل المتداخلة).

> [!EXAM]
> - **UML** = لغة رسومية لـ specifying / visualizing / constructing / documenting.
> - **Structural = static** · **Behavioral = dynamic**.
> - **Use case** = تفاعل النظام مع actors خارجيين (متطلبات/عقد) · **Sequence** = ترتيب التفاعل بين الـ processes.
