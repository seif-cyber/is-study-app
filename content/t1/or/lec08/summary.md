## ⚡ ملخص OR Lec 8: Integer Programming

- **ILP:** pure (كلها integer) · mixed (بعضها) · 0-1 (binary) · **LP relaxation** = إسقاط شرط integer · أصعب بكتير من LP.
- **الاستراتيجية:** relax ← solve LP (continuous optimum) ← أضف قيود خاصة لحد integer.
- **طريقتين:** Branch-and-Bound · Cutting plane.
- **B&B مثال:** Max 5x₁+4x₂ · LP1 (3.75,1.25)=23.75 · LP2 (x₁≤3): (3,2)=**23** (bound) · LP3 (x₁≥4): (4,0.83)=23.33 ⇒ تفرع ⇒ (4,0)=20 و infeasible ⇒ **الأمثل (3,2)=23**.
- **Fathom:** infeasible · integer أحسن (حدّث bound) · مش أحسن من bound · Max: lower bound −∞ · Min: upper bound +∞.
- **Cutting plane:** مثال 1: D(8/3,7/3)=22/3 ⇒ cut x₂≤2 ⇒ **(3,2)=7** · مثال 2: LP 20/3 ⇒ ILP **6** عند (4,2) أو (2,4).
