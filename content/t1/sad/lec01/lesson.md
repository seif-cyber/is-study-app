# مقدمة في تحليل وتصميم النظم — Lecture 1: Introduction to Systems Analysis & Design

> [!NOTE]
> المحاضرة دي مقدمة المادة: يعني إيه **Systems Analysis** و **System Design**، مين هو **System Analyst** ودوره، مين الـ **Stakeholders**، صفات المحلل الجيد، أنواع المستخدمين، الـ **SDLC**، الـ **Models / Techniques / Tools**، الـ **Approaches** (Data-centered و Object-oriented)، مبادئ نجاح النظام، وإيه اللي بيعتبر **فشل** للمشروع.

**أهداف المادة (Course Objectives):**
- فهم **مبادئ ودوافع** تحليل وتصميم النظم ومكانها في عملية تطوير النظم.
- فهم إزاي **تجمّع وتحلل وتدير متطلبات المستخدمين** استعدادًا لتطوير النظام.

---

## 1. يعني إيه SAD؟

| | التعريف | بيجاوب على |
|---|---|---|
| **Systems Analysis** (تحليل النظم) | عملية **فهم وتحديد بالتفصيل** إيه اللي لازم نظام المعلومات يحققه | **What**: إيه المطلوب من النظام الجديد عشان يحل المشكلة؟ |
| **System Design** (تصميم النظم) | عملية **تعريف ووصف بالتفصيل** إزاي مكونات نظام المعلومات هتتنفذ **فيزيائيًا** | **How**: إزاي النظام هيشتغل عشان يحل المشكلة؟ |

> [!TIP]
> **Analysis = WHAT** (إيه المطلوب) · **Design = HOW** (إزاي هيتنفذ).

---

## 2. محلل النظم — The System Analyst

- المحلل هو **الجسر (bridge)** بين **مستخدمي الـ business** و**فنيي الكمبيوتر**.
- بيدرس **مشاكل ومتطلبات** المنظمة عشان يحدد إزاي **الناس والطرق وتقنية الكمبيوتر** تحقق أفضل تحسينات للـ business.

### دور المحلل — Role of Analyst
1. **تسهيل التواصل** بين كل المجموعات اللي ليها مصلحة في المشروع.
2. **استخلاص (elicit) المتطلبات** من أكبر عدد ممكن من المصادر.
3. **توثيق المتطلبات** بدقة واتساق بأكبر عدد من الخصائص الجيدة.
4. **إدارة التعديلات المستقبلية** للمتطلبات (**version control**) عشان تلبي احتياجات النظام المتطورة.

### الـ Stakeholders
> **من عنده مصلحة في النظام النهائي، وبالتالي تأثير على المتطلبات؟**

- **Managers** (ممكن يكونوا العملاء).
- **Regulators** (الجهات التنظيمية).
- **Day-to-day users** (مستخدمين يوميين).
- **Technical support**.
- **Developers**: system analyst, requirements engineer, systems engineer, system designer, programmer, test engineer.

### صفات المحلل الجيد — Characteristics of a Good Analyst

| الصفة | المعنى |
|---|---|
| **Impertinence** | **اسأل في كل حاجة ومتفترضش حاجة** (question everything, assume nothing) |
| **Impartiality** | دوّر على **أفضل حل** لمشكلة الـ business (من غير تحيز) |
| **Relax constraints** | افترض إن **أي حاجة ممكنة** واستبعد المستحيل |
| **Attention to detail** | كن **دقيق وشامل ومتسق** |
| **Re-framing** | كن **مبدع** · "think outside the box" |

---

## 3. المستخدمين النهائيين — End-Users of Information Systems

![شكل 1: هرم المستخدمين في المنظمة](img/sad/lec01/end-users.webp)

المستويات من الأعلى للأسفل:
1. **Top management / Executive management**.
2. **Middle management**.
3. **Supervisory staff**.
4. **Clerical and service staff**.

---

## 4. الـ SDLC والـ Models / Techniques / Tools

- **SDLC = Software Development Life Cycle** (دورة حياة تطوير البرمجيات) و**Project Methodology**.

| العنصر | التعريف | أمثلة |
|---|---|---|
| **Models** | **تمثيل** لجانب مهم من العالم الحقيقي (مدخلات، مخرجات، عمليات، بيانات، objects، مواقع، شبكات، أجهزة...) | **Graphical** · **Mathematical** · **Physical** |
| **Techniques** | **مجموعة إرشادات** بتساعد المحلل ينجز نشاط أو مهمة في تطوير النظام | Data modeling techniques · Software testing techniques |
| **Tools** | **برامج مساعدة** بتساعد في إنشاء النماذج أو المكونات المطلوبة | **CASE tools** (Computer-Aided System Engineering) |

---

## 5. المناهج — Approaches

![شكل 2: Data-centered approach مقابل Object-oriented approach](img/sad/lec01/approaches.webp)

| المرحلة | **Data Centered Approach** | **Object-Oriented Approach** |
|---|---|---|
| **Requirements** | Interviews, documentation, surveys | Interviews, documentation, surveys |
| **Conceptual Design** | **ERDs, DFDs, FDCs...** | **Use case diagrams, class diagrams...** |
| **Logical Design** | **Tables (relations)**, columns (attributes), **primary & foreign keys** | Schema مكتوب بـ **object definition language (ODL)** |
| **Physical Design** | **Files, records, fields, pointers** | **Class definitions** |

---

## 6. مبادئ أساسية لنجاح النظام — Essential Principles

1. **The system is for the end-user** (النظام للمستخدم النهائي).
2. **Establish phases and tasks** (حدد المراحل والمهام).
3. **Problem-solving skills** (مهارات حل المشكلات).
4. **System development is NOT a sequential process** (التطوير مش عملية خطية تسلسلية).
5. **Systems are capital investments** (النظم استثمارات رأسمالية).
6. **Don't be afraid to cancel** (متخافش تلغي المشروع).
7. **Documentation is a product of all phases** (التوثيق ناتج كل المراحل).

---

## 7. إيه اللي بيعتبر فشل للمشروع؟ — Project Failure

- **Complete failure:** مفيش **ناتج (deliverable)** خالص.
- أنواع فشل تانية:
  - **Cost overruns** (تجاوز التكلفة).
  - **Software quality problems** (مشاكل جودة).
  - **Missed deadlines** (تفويت المواعيد).
  - **Unsatisfied stakeholders** (أصحاب مصلحة غير راضيين).
  - **Operational failure** (فشل تشغيلي).

> [!EXAM]
> - **Analysis = what** · **Design = how**.
> - المحلل = **جسر** بين مستخدمي الـ business وفنيي الكمبيوتر.
> - **صفات المحلل:** Impertinence · Impartiality · Relax constraints · Attention to detail · Re-framing.
> - **Data-centered:** ERD/DFD ← tables ← files · **OO:** use case/class diagrams ← ODL ← class definitions.
