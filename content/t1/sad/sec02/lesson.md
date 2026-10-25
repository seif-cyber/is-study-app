# Section: مقدمة SAD والـ SDLC والمتطلبات

> [!NOTE]
> السكشن ده بيغطي: **System Analysis & Design**، الـ **SDLC**، و**المتطلبات (Requirements)**: عملية جمعها وتصنيفها لـ **Functional** و **Non-functional**.

**المحاور (Outlines):** What is System Analysis & Design? · What is SDLC? · What is requirements?

---

## 1. System Analysis & Design

| | التعريف |
|---|---|
| **System Analysis** | عملية **دراسة النظام الحالي** لتحديد **المشاكل واحتياجات المستخدمين** و**جمع متطلبات** النظام الجديد |
| **System Design** | عملية إنشاء **خطة تفصيلية** لإزاي النظام الجديد هيتبني لتحقيق المتطلبات المحددة في التحليل |

## 2. الـ SDLC

> **SDLC (Software Development Life Cycle)** = عملية بتتستخدم **لتصميم وتطوير واختبار** تطبيقات البرمجيات.

![شكل 1: مراحل الـ SDLC](img/sad/sec02/sdlc.webp)

الـ phases تنتهي بـ **Deployment/Delivery Phase** (مرحلة النشر/التسليم).

---

## 3. المتطلبات — Requirements

> **Requirements** = **عملية جمع متطلبات البرنامج من العميل وتحليلها وتوثيقها**.

**خطوات عملية المتطلبات (4):**

| الخطوة | الوصف |
|---|---|
| **Requirements gathering** | المطورين **يناقشوا العميل والمستخدمين النهائيين** ويعرفوا توقعاتهم من البرنامج |
| **Organizing requirements** | المطورين **يرتبوها بالأولوية** حسب **الأهمية والاستعجال والملاءمة** |
| **Negotiation & discussion** | لو المتطلبات **غامضة أو متعارضة** بين stakeholders، تتفاوض وتتناقش، وممكن تترتب بأولوية و**تتنازل بشكل معقول** |
| **Documentation** | توثيق **كل** المتطلبات الرسمية وغير الرسمية، **الوظيفية وغير الوظيفية**، وإتاحتها للمرحلة التالية |

```mermaid
flowchart LR
    A[Gathering] --> B[Organizing] --> C[Negotiation and discussion] --> D[Documentation]
```

### تصنيف المتطلبات — Requirement Classification

| النوع | المعنى | مثال |
|---|---|---|
| **Functional requirements** | **إيه اللي البرنامج لازم يعمله**: الوظائف أو الـ features اللي لازم النظام يكون عنده · **الأفعال (actions)** اللي لازم ينفذها | **Search functionality:** البرنامج لازم يسمح للمستخدمين **بالبحث عن المنتجات بالاسم أو الفئة** |
| **Non-functional requirements** | **إزاي** البرنامج بيؤدي مهمة بدل **إيه** اللي يعمله: **quality attributes** و**معايير الأداء** و**القيود** | الأداء (performance) · قابلية الاستخدام (usability) · الموثوقية (reliability) · الأمان (security) |

> [!TIP]
> **Functional = WHAT** النظام يعمل · **Non-functional = HOW WELL** يعمله (سلوكه وجودته وقيوده).

> [!EXAM]
> - **Analysis** = دراسة النظام الحالي وتحديد المشاكل والمتطلبات · **Design** = خطة تفصيلية للبناء.
> - خطوات المتطلبات: **Gather → Organize → Negotiate → Document**.
