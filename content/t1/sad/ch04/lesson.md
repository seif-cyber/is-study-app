# جمع المتطلبات — Chapter 4: Requirement Gathering

> [!NOTE]
> الشابتر ده عن **المتطلبات (Requirements)**: يعني إيه requirement وليه مهم، **Requirements Engineering**، **معايير المتطلب الجيد**، **الاكتمال والاتساق**، **عوامل نجاح وفشل المشاريع**، وبعدين **Functional Requirements** و **Non-Functional Requirements** (تصنيفاتها ومقاييسها وقيودها).

**المواضيع:** What are requirements? · Requirements Engineering · Criteria of a good requirement · Completeness & Consistency · Failure/Success factors · Functional REQs · Non-functional REQs.

---

## 1. يعني إيه Requirement؟

> **Requirement** = **صفة ضرورية في النظام**، بيان بيحدد **قدرة أو خاصية أو عامل جودة** لازم النظام يكون عنده عشان تبقى له **قيمة ومنفعة** للعميل أو المستخدم.

**تعريف IEEE 1998 (IEEE-STD-1220):** بيان بيحدد خاصية **تشغيلية أو وظيفية أو تصميمية** أو قيد لمنتج أو عملية، وهو **غير غامض (unambiguous)، قابل للاختبار أو القياس (testable/measurable)، وضروري** لقبول المنتج أو العملية.

- ممكن تتراوح من **بيان تجريدي عالي المستوى** لخدمة أو قيد، لحد **مواصفات رياضية تفصيلية**.
- ده **حتمي** لأن المتطلبات ليها **وظيفتين**:
  1. ممكن تكون **أساس لعرض مناقصة (bid) لعقد** ← لازم تكون **مفتوحة للتفسير**.
  2. ممكن تكون **أساس العقد نفسه** ← لازم تتحدد **بالتفصيل**.

### ليه المتطلبات مهمة؟
المتطلبات **أساس كل شغل التطوير اللي بعدها**: system design, development, testing, implementation, operation.

> "Without requirements or design, programming is the art of adding bugs to an empty text file." — *Louis Srygley*

**المتطلبات هي أساس:** **Project Planning** · **Risk Management** · **Trade Off** · **Acceptance Testing** · **Change Control**.

---

## 2. Requirements Engineering

> **Requirements Engineering** = فرع من هندسة النظم معني بـ **اكتشاف وتطوير وتتبع وتحليل وتأهيل وتوصيل وإدارة** المتطلبات اللي بتعرّف النظام على **مستويات تجريد متتالية**.

> هي **عملية تحديد الخدمات** اللي العميل محتاجها من النظام و**القيود** اللي بيشتغل ويتطور تحتها. والمتطلبات نفسها هي **وصف خدمات وقيود النظام** الناتجة من العملية دي.

### الاكتمال والاتساق — Completeness & Consistency
- **Complete:** لازم تشمل **وصف كل المرافق (facilities)** المطلوبة.
- **Consistent:** **مفيش تعارض أو تناقض** في وصف مرافق النظام.
- **عمليًا:** بسبب تعقيد النظام والبيئة، **مستحيل** تنتج وثيقة متطلبات **كاملة ومتسقة** 100%.

---

## 3. معايير المتطلب الجيد — Criteria of a Good Requirement

| المعيار | المعنى |
|---|---|
| **Necessary** | لو النظام يقدر يحقق الاحتياجات الفعلية المرتبة بأولوية من غيره، يبقى **مش ضروري** |
| **Feasible** | **قابل للتنفيذ** في حدود الميزانية والجدول |
| **Correct** | الحقائق **دقيقة** ومستطاع تقنيًا وقانونيًا |
| **Concise** | **مصاغ ببساطة** |
| **Unambiguous** | **يتفسر بطريقة واحدة بس** |
| **Complete** | كل **الشروط** اللي بتنطبق عليها مذكورة، وبيعبر عن فكرة كاملة |
| **Consistent** | **مش بيتعارض** مع متطلبات تانية |
| **Verifiable** | تنفيذه في النظام **ممكن إثباته** |
| **Traceable** | **مصدره يتتبع** وبيتتبع خلال النظام (التصميم، الكود، الاختبار، التوثيق) |
| **Allocated** | **متعيّن** لمكوّن في النظام المصمم |
| **Design independent** | **مش بيفرض حل تنفيذي** معين |
| **Nonredundant** | **مش مكرر** |
| **Standard construct** | مصاغ بصيغة أمر باستخدام **"shall"** |
| **Unique identifier** | كل متطلب ليه **رقم تعريف فريد** |
| **Devoid of escape clauses** | بدون عبارات زي **if, when, but, except, unless, although** وبدون كلمات عامة/تخمينية زي **usually, generally, often, normally, typically** |

> [!TIP]
> **أمثلة للحفظ:** "The system **shall** ..." ← الـ **shall** صيغة المتطلب القياسية. وتجنب "usually/often".

---

## 4. أسباب فشل ونجاح المشاريع — Project Failure / Success

> **أغلب أسباب فشل المشاريع مش تقنية.**

### أسباب الفشل (Standish Group 1995)
| السبب | النسبة |
|---|---|
| **Incomplete requirements** | **13.1%** |
| **Lack of user involvement** | **12.4%** |
| Lack of resources | 10.6% |
| Unrealistic expectations | 9.9% |
| Lack of executive support | 9.3% |
| Changing requirements/specifications | 8.7% |
| Lack of planning | 8.1% |
| Didn't need it any longer | 7.5% |

### عوامل النجاح (Standish Group 1995)
| العامل | النسبة |
|---|---|
| **User involvement** | **15.9%** |
| Management support | 13.9% |
| **Clear statement of requirements** | 13.0% |
| Proper planning | 9.6% |
| Realistic expectations | 8.2% |
| Smaller milestones | 7.7% |
| Competent staff | 7.2% |
| Ownership | 5.3% |

### عوامل النجاح (Standish Group 2015)
| العامل | النسبة |
|---|---|
| **Executive management support** | **20%** |
| User involvement | 15% |
| Optimization | 15% |
| Skilled resources | 13% |
| Project management expertise | 12% |
| Agile process | 10% |
| Clear business objectives | 6% |
| Emotional maturity | 5% |
| Execution | 3% |
| Tools and infrastructure | 1% |

```python
# تحقق: مجموع نسب جدول 2015
print(20+15+15+13+12+10+6+5+3+1)   # = 100
```

> [!NOTE]
> مجموع نسب عوامل نجاح 2015 = **100%** (راجعتها بالحساب).

---

## 5. أنواع المتطلبات — Types of Requirements

### 5.1 Functional Requirements (المتطلبات الوظيفية)

> **بيانات بالخدمات اللي النظام لازم يقدمها، وإزاي لازم يتفاعل مع مدخلات معينة وإزاي يتصرف في مواقف معينة.**

- اسمها كمان: **Behavioral REQs** أو **Operational REQs**.
- بتوصف **إيه اللي النظام لازم يعمله**: وظائف أو خدمات، يعني بتحدد **فعل (action)** لازم النظام يقدر يؤديه.
- بتسمى behavioral لأنها بتحدد **المدخلات (stimuli)** و**المخرجات (responses)** و**العلاقات السلوكية** بينهم.
- **Functional User Requirements:** بيانات **عالية المستوى** بما يعمله النظام. **Functional System Requirements:** بتوصف خدمات النظام **بالتفصيل**.
- ممكن تحدد **إيه اللي النظام لازم ما يعملوش**.

> [!EXAMPLE]
> **MHC-PMS** (Mental Health Care Patient Management System: نظام لحفظ سجلات الناس اللي بتتلقى رعاية صحية نفسية):
> - المستخدم **shall** be able to search the appointments lists for all clinics.
> - النظام **shall** generate each day, for each clinic, a list of patients expected to attend appointments that day.
> - كل موظف **shall** be uniquely identified by his or her **8-digit employee number**.

### عدم الدقة في المتطلبات — Requirements Imprecision
- المتطلبات **الغامضة** بتتفسر بشكل مختلف من المطورين والمستخدمين.
- مثال كلمة **"search"**:
  - **نية المستخدم:** يدوّر على اسم مريض في **كل المواعيد في كل العيادات**.
  - **تفسير المطور:** يدوّر في **عيادة واحدة**؛ المستخدم يختار العيادة الأول.

### 5.2 Non-Functional Requirements (المتطلبات غير الوظيفية)

> بتحدد **خصائص النظام** (زي الموثوقية والأمان) و**قيود على الخدمات أو الوظائف** (زي قيود الوقت وزمن الاستجابة) أو **قيود على عملية التطوير** وقدرات الـ I/O والمعايير... (مثلًا ممكن تفرض IDE أو لغة برمجة أو منهجية معينة).

- بتنطبق غالبًا على **النظام كله** مش على خصائص أو خدمات فردية.
- ممكن تكون **أهم** من الوظيفية: لو متحققتش، النظام ممكن يبقى **عديم الفايدة**.

#### التصنيف حسب Ian Sommerville (3 أنواع)

![شكل 1: تصنيف المتطلبات غير الوظيفية](img/sad/ch04/nfr-classes.webp)

| النوع | المعنى | أمثلة |
|---|---|---|
| **Product Requirements** | المنتج المسلّم لازم **يتصرف بطريقة معينة** | سرعة التنفيذ، الموثوقية (Usability, Performance, Space, Dependability, Security) |
| **Organisational Requirements** | نتيجة **سياسات وإجراءات المنظمة** | معايير العملية، متطلبات التنفيذ (Environmental, Operational, Development) |
| **External Requirements** | من **عوامل خارجية** عن النظام وعملية تطويره | الـ interoperability، المتطلبات التشريعية (Regulatory, Ethical, Legislative: Accounting, Safety/security) |

#### التصنيف حسب Robertson & Robertson (2012) (8 أنواع)
1. **Look-and-Feel:** روح مظهر المنتج.
2. **Usability & Humanity:** سهولة الاستخدام واعتبارات خاصة.
3. **Performance:** **كام بسرعة، كام آمن، كام دقيق، كام موثوق، كام متاح**.
4. **Operational & Environmental:** البيئة اللي هيشتغل فيها المنتج (مثلًا تحت الماء) واعتباراتها.
5. **Maintainability & Support:** التغييرات المتوقعة والوقت المسموح لها.
6. **Cultural:** متطلبات خاصة بسبب الناس المشاركين (تشمل **Political**، مثلًا: المنتج **ما يعرضش رموز أو كلمات دينية**).
7. **Legal:** القوانين والمعايير المنطبقة · تكلفة التقاضي (غرامات، سجن، فقدان السمعة) من أكبر مخاطر البرمجيات.
8. **Security:** الأمان والسرية.

#### الـ Security REQs
| الجانب | المعنى |
|---|---|
| **Access** | وصول **مستمر** للبيانات والوظائف للمستخدمين المصرح لهم |
| **Privacy** | حماية البيانات من **الوصول/الإفصاح** غير المصرح |
| **Integrity** | منع **التعديل/الحذف** غير المصرح (اتساق البيانات) |
| **Immunity** | الحماية من **التهديدات والهجمات** |

أشكال الهجوم: **Disclosure** (إفصاح) · **Modification** (تعديل/فقد سلامة) · **Denial of use/service** (حجب الخدمة) · **Repudiation** (مستخدم شرعي بيدّعي إنه ما بعتش/استقبلش رسالة اتبعتت/اتستقبلت).

---

## 6. المتطلبات غير الوظيفية القابلة للتحقق — Verifiable NFRs

- المتطلبات غير الوظيفية **صعب تتحدد بدقة**، وغير الدقيقة **صعب تتحقق**؛ تقييمها غالبًا **ذاتي (subjective)** وصعب اختباره.
- لو عندنا **Goal** (نية عامة زي سهولة الاستخدام)، فالمتطلب **القابل للتحقق** = بيان بيستخدم **مقياس (measure)** يتختبر **موضوعيًا**.

### مقاييس (Fit-Criteria)

![شكل 2: جدول المقاييس لتحديد المتطلبات غير الوظيفية](img/sad/ch04/metrics.webp)

| الخاصية | المقياس |
|---|---|
| **Speed** | معاملات متعالجة/ثانية · زمن استجابة المستخدم/الحدث · زمن تحديث الشاشة |
| **Size** | Mbytes · عدد شرائح ROM |
| **Ease of use** | **زمن التدريب** · عدد شاشات المساعدة |
| **Reliability** | **Mean time to failure** · احتمال عدم التوفر · معدل حدوث الفشل · **Availability** |
| **Robustness** | زمن إعادة التشغيل بعد الفشل · نسبة الأحداث المسببة للفشل · احتمال تلف البيانات عند الفشل |
| **Portability** | نسبة العبارات المعتمدة على الهدف · عدد النظم المستهدفة |

### قيود إضافية — Constraints
- **Solution constraints:** أي تقنية مفروضة (مثلًا: المنتج **shall** operate using Windows XP).
- **Deadlines:** أي مواعيد معروفة (مثلًا: متاح قبل بداية السنة الضريبية الجديدة).
- **Financial budget.**
- **Current system constraints:** مثال: ماكينة تصوير لمنظمة واعية بيئيًا **لازم تشتغل بورق معاد تدويره**.

> [!EXAM]
> - **Functional** = إيه النظام يعمل (خدمات، سلوك) · **Non-functional** = خصائص وقيود (أداء، أمان، موثوقية).
> - تصنيف **Sommerville (3):** Product · Organisational · External. تصنيف **Robertson (8):** Look-and-feel · Usability · Performance · Operational · Maintainability · Cultural · Legal · Security.
> - أكتر سبب فشل: **Incomplete requirements (13.1%)**، وأكتر عامل نجاح 1995: **User involvement (15.9%)**، و2015: **Executive management support (20%)**.
