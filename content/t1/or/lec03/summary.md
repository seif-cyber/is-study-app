## ⚡ ملخص OR Lec 3: Reddy Mikks (Graphical & Simplex)

- **Reddy Mikks:** Max 5x₁+4x₂ · 6x₁+4x₂≤24 (M1) · x₁+2x₂≤6 (M2) · −x₁+x₂≤1 · x₂≤2.
- **Corner points:** (0,0)=0 · (4,0)=20 · **(3,1.5)=21** · (2,2)=18 · (1,2)=13 · (0,1)=4.
- **الحل:** x₁=3, x₂=1.5, **Z=21** (21,000\$).
- **Simplex:** slack لكل قيد · Entering = أكتر سالب في z · Leaving = **minimum ratio** (موجب فقط) · New row = Current − (pivot col coef) × New pivot row · stop لما z ≥ 0.
- **Iteration 0:** entering x₁ (−5) · leaving s₁ (24/6=4).
- **Iteration 1:** z=20 (4,0) · entering x₂ (−2/3) · leaving s₂ (1.5).
- **Optimal:** z=21 · x₁=3 · x₂=3/2 · s₃=5/2 · s₄=1/2 · z-row: s₁=3/4, s₂=1/2.
