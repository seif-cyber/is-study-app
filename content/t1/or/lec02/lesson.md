# البرمجة الخطية: الصياغة والحل البياني — Lecture 2: Linear Programming (Chapter 2)

> [!NOTE]
> المحاضرة دي (فصل 2 من كتاب Anderson) بتشرح **LP بالتفصيل**: خصائص أي LP، مثال **Par, Inc.** (Maximization) بالحل البياني، **Slack variables**، **Extreme points**، مثال **M&D Chemicals** (Minimization) و**Surplus variables**، والحالات الخاصة: **Alternative optima** و **Infeasibility** و **Unbounded**، والـ **Standard form**.

---

## 1. خصائص أي مسألة LP

> **Linear programming** = أسلوب لحل المشاكل لمساعدة المديرين في اتخاذ القرار. (اسمها كان "programming in a linear structure"؛ في 1948 اقترح **Koopmans** على **Dantzig** يختصرها لـ *linear programming*.)

أمثلة تطبيقات: جدولة الإنتاج والمخزون (minimize cost) · اختيار محفظة استثمار (maximize return) · توزيع ميزانية الإعلانات (maximize effectiveness) · شحن من مخازن لعملاء (minimize transportation cost).

**كل LP ليه خاصيتين مشتركتين:**
1. **Objective:** تعظيم (**max**) أو تقليل (**min**) كمية معينة.
2. **Constraints:** قيود بتحدد درجة السعي ورا الهدف.

---

## 2. مثال Maximization: Par, Inc.

شركة بتصنع شنط جولف: **Standard bag** و **Deluxe bag**. الربح (contribution): **10$** لكل standard و **9$** لكل deluxe. المتاح من الوقت (ساعات):

| القسم | Standard (ساعة/شنطة) | Deluxe (ساعة/شنطة) | المتاح |
|---|---|---|---|
| Cutting & Dyeing | 7/10 | 1 | **630** |
| Sewing | 1/2 | 5/6 | **600** |
| Finishing | 1 | 2/3 | **708** |
| Inspection & Packaging | 1/10 | 1/4 | **135** |

> [!NOTE]
> بنعظّم **profit contribution** مش **profit** (التكاليف الثابتة والـ overhead بتتخصم بعدين).

### خطوات الصياغة — Problem Formulation
1. **افهم المشكلة كويس.**
2. **صف الهدف:** تعظيم إجمالي الربح.
3. **صف كل قيد:** 4 قيود لساعات الأقسام.
4. **عرّف متغيرات القرار:** S = عدد الـ standard، D = عدد الـ deluxe.
5. **اكتب الهدف والقيود بدلالة المتغيرات.**

```
Max   10S + 9D
s.t.  (7/10)S + 1D      <= 630    Cutting and dyeing
      (1/2)S  + (5/6)D  <= 600    Sewing
      1S      + (2/3)D  <= 708    Finishing
      (1/10)S + (1/4)D  <= 135    Inspection and packaging
      S, D >= 0
```

> [!IMPORTANT]
> **Nonnegativity constraints** (S, D ≥ 0) خاصية عامة لكل LP. والـ LP هو اللي **الهدف وكل القيود فيه دوال خطية** (proportionality + additivity).

---

## 3. الحل البياني — Graphical Solution Procedure

**الخطوات:**
1. ارسم **خط كل قيد** (بالتعويض بـ S=0 ثم D=0 لإيجاد نقطتين) وحدد **الجانب الممكن (feasible side)** بتجربة نقطة (مثلًا الأصل).
2. اتقاطع كل الجوانب الممكنة = **Feasible region** (فيها كل الحلول الممكنة).
3. ارسم **خط دالة الهدف (profit line)** مثلًا 10S + 9D = 1800 (نقاط: D=200 و S=180)، وحرّكه **موازيًا لنفسه** في اتجاه الزيادة لحد آخر نقطة بتلمس فيها الـ feasible region = **الحل الأمثل**.

![شكل 1: خطوط الربح المتوازية](img/or/lec02/par-profit-lines.webp)

![شكل 2: الحل الأمثل لمسألة Par, Inc.](img/or/lec02/par-optimal.webp)

الحل الأمثل عند **تقاطع قيدي Cutting&Dyeing و Finishing**:

```
(7/10)S + D = 630   -> D = 630 - 0.7 S
S + (2/3)D = 708    -> S + (2/3)(630 - 0.7S) = 708
                       S + 420 - (7/15)S = 708  ->  (8/15)S = 288  ->  S = 540
D = 630 - 0.7(540) = 252
```

> [!EXAMPLE]
> **S = 540 و D = 252** والربح الأمثل = 10(540) + 9(252) = **7668$**.

### Slack Variables — المتغيرات الراكدة

بنعوّض بالحل في القيود:

| القسم | الساعات المستخدمة | المتاح | **Slack** (الغير مستخدم) |
|---|---|---|---|
| Cutting & Dyeing | 0.7(540)+252 = 630 | 630 | **0** |
| Sewing | 0.5(540)+(5/6)(252) = 480 | 600 | **120** |
| Finishing | 540+(2/3)(252) = 708 | 708 | **0** |
| Inspection & Packaging | 0.1(540)+0.25(252) = 117 | 135 | **18** |

- **Slack** = الجزء الغير مستخدم من المورد في قيد **≤** (بنضيفه للطرف الأيسر عشان نحول القيد لمعادلة).
- القيد اللي **slack = 0** اسمه **binding constraint** (C&D و Finishing).
- القيد اللي **مبيأثرش على الـ feasible region** اسمه **Redundant constraint** (قيد الـ Sewing هنا).

**الصيغة بعد إضافة الـ slacks (Standard form):**
```
Max 10S + 9D + 0s1 + 0s2 + 0s3 + 0s4
s.t. 0.7S + 1D + s1 = 630  ...  S, D, s1..s4 >= 0
```

```python
# تحقق بالحساب
from scipy.optimize import linprog
A=[[0.7,1],[0.5,5/6],[1,2/3],[0.1,0.25]]; b=[630,600,708,135]
r=linprog([-10,-9],A_ub=A,b_ub=b); print(r.x, -r.fun)   # [540. 252.]  7668.0
```

---

## 4. نقاط الركن — Extreme Points

> **الحل الأمثل لأي LP بيكون عند extreme point** (نقطة ركن) من الـ feasible region.

لـ Par, Inc. فيه **5 extreme points** (بالـ S, D → الربح):

| Extreme point | (S, D) | Z = 10S + 9D |
|---|---|---|
| ① | (0, 0) | 0 |
| ② | (708, 0) | 7080 |
| ③ | **(540, 252)** | **7668** ← optimum |
| ④ | (300, 420) | 6780 |
| ⑤ | (0, 540) | 4860 |

> [!TIP]
> لو غيرنا ربح الـ standard لـ **5$** (دالة الهدف 5S + 9D) الحل الأمثل بيتحول لـ **(300, 420)** والربح 5(300)+9(420) = **5280$**، يعني الحل الأمثل **اتحرك لركن تاني**.

---

## 5. مثال Minimization: M&D Chemicals

```
Min  2A + 3B
s.t. 1A        >= 125     (demand for product A)
     1A + 1B   =  350     (total production)
     2A + 1B   <= 600     (processing time)
     A, B >= 0
```

![شكل 3: الحل البياني لمسألة M&D Chemicals](img/or/lec02/md-optimal.webp)

- الـ feasible region **خط** (لأن في equality). الـ extreme points: (125, 225) ← Z = **925**، و (250, 100) ← Z = **800** ← **الأقل**.
- **الحل الأمثل: A = 250، B = 100، التكلفة = 800$**.

### Surplus Variables — المتغيرات الفائضة
- قيد **≥** بنطرح منه **surplus variable** عشان يتحول لمعادلة. **Surplus** = الكمية الزايدة عن الحد الأدنى.
- هنا: 250 − 125 = **125 جالون surplus** في قيد demand لـ A.
- **Slack = ≤** (الغير مستخدم)، **Surplus = ≥** (الزيادة).

| نوع القيد | بنعمل إيه لتحويله لمعادلة |
|---|---|
| **≤** | نضيف **slack** (+s) |
| **≥** | نطرح **surplus** (−s) |
| **=** | زي ما هو |

---

## 6. الحالات الخاصة — Special Cases

### 6.1 Alternative Optimal Solutions

![شكل 4: دالة الهدف 6.3S + 9D موازية لقيد](img/or/lec02/alt-optimal.webp)

> لو **خط دالة الهدف موازي لأحد القيود الـ binding** ← **أكتر من حل أمثل**.

مثال Par بدالة هدف **6.3S + 9D**: الحل الأمثل عند ركنين **(300, 420)** و **(540, 252)**:
- 6.3(300) + 9(420) = **5670** · 6.3(540) + 9(252) = **5670**.
- وأي نقطة على الخط بينهم تبقى optimal، مثلًا **(420, 336)** ← 6.3(420)+9(336) = 5670.
- ده **حظ للمدير** لأنه يقدر يختار الحل الأنسب.

### 6.2 Infeasibility
> **Infeasible** = **مفيش حل** بيحقق كل القيود (حتى الـ nonnegativity). بيانيًا: **مفيش feasible region**. بتحصل لما القيود **متعارضة**، ومش مرتبطة بدالة الهدف.

![شكل 5: مثال Unbounded](img/or/lec02/unbounded.webp)

مثال Par: لو فرضنا إنتاج **500 standard على الأقل** و **360 deluxe على الأقل** ← الموارد المطلوبة (Table 2.2): C&D = 0.7(500)+360 = 710 > 630 (ينقص **80**)، Finishing = 500+(2/3)(360) = 740 > 708 (ينقص **32**)، Inspection = 140 > 135 (ينقص **5**) ← **Infeasible**. الحل: نفك قيد أو أكتر.

### 6.3 Unbounded
> **Unbounded** = قيمة دالة الهدف **ممكن تزيد للـ ∞** (max) من غير ما نكسر قيد. غالبًا **بسبب قيد ناسي** أو غلطة في الصياغة.

مثال: Max 20X + 10Y بقيود تسمح بنمو X و Y بلا حد.

> [!IMPORTANT]
> **Infeasibility** مرتبط **بالقيود** (مش بالهدف). **Unbounded** مرتبط بالهدف + القيود: تغيير دالة الهدف (مثلًا Max −20X −10Y) ممكن يخلي المسألة bounded من غير ما نغير القيود.

---

## 7. الصيغة العامة — General LP Notation

```
Max (or Min)  c1 x1 + c2 x2 + ... + cn xn
s.t.  a11 x1 + a12 x2 + ... + a1n xn  (<=, =, >=)  b1
      ...
      x1, x2, ..., xn >= 0
```

> **Standard form**: كل القيود معادلات (بإضافة slack أو طرح surplus)، والحل الأمثل للـ standard form هو نفس حل الأصلي.

مثال: Max 3x₁ + 2x₂ ، 2x₁ + 2x₂ ≤ 8، ... وبعد إضافة slack: Max 3x₁ + 2x₂ + 0s₁ + 0s₂، ومنها الحل الأمثل (x₁ = 2, x₂ = 2) بـ **Z = 10** وقيم الـ slack = 0.

---

## 8. ملخص المصطلحات

| المصطلح | المعنى |
|---|---|
| **Feasible solution** | حل بيحقق **كل القيود** |
| **Feasible region** | مجموعة كل الحلول الممكنة |
| **Optimal solution** | أفضل حل ممكن (أعلى max / أقل min) |
| **Extreme point** | نقطة ركن، تتحدد بتقاطع خطوط القيود |
| **Slack variable** | تضاف لقيد ≤ (قيمتها = المورد غير المستخدم) |
| **Surplus variable** | تطرح من قيد ≥ (قيمتها = الزيادة عن الحد الأدنى) |
| **Redundant constraint** | قيد مش بيأثر على الـ feasible region |
| **Binding constraint** | قيد متحقق كـ equality عند الحل الأمثل |
| **Alternative optima** | أكتر من حل أمثل |

> [!EXAM]
> - الحل الأمثل = **extreme point**. · Par: **S=540, D=252, Z=7668** · M&D: **A=250, B=100, Z=800**.
> - **Slack ← ≤**, **Surplus ← ≥**. · **Alternative optima** لما الهدف موازي لقيد binding · **Infeasible** = مفيش feasible region · **Unbounded** = Z بلا حد.
