## ⚡ ملخص OR: Transportation Model and Its Variants (Taha Ch.5)

- **Transportation model:** شحن من sources لـ destinations بأقل تكلفة · خطواته = **simplex** · basic variables = **m+n−1**.
- **MG Auto:** supply 1000/1500/1200 · demand 2300/1400 · الأمثل: LA→Denver 1000 · Detroit→Denver 1300 · Detroit→Miami 200 · NO→Miami 1200 ⇒ **$313,200**.
- **Balancing:** dummy source (الطلب أكبر) / dummy destination (العرض أكبر) بتكلفة **0** · مثال Detroit 1300 ⇒ dummy 200 ⇒ $291,600.
- **Boralis (production-inventory):** إنتاج 40 · holding 0.5/شهر · penalty 2/شهر ⇒ **$31,455**.
- **Tool sharpening:** 12 / 6 / 3 · طلب 124 ⇒ **$840** (الدوري $372).
- **SunRay:** supply 15/25/10 · demand 5/15/15/15 · **NW 520 · LC/VAM 475 · الأمثل 435**.
- **MODI:** uᵢ+vⱼ=cᵢⱼ للـ basic · entering = أكبر موجب لـ uᵢ+vⱼ−cᵢⱼ · optimal لو كلها ≤ 0 (على NW: x₃₁ = +9).
- **Assignment** = transportation بعرض/طلب 1 (Hungarian) · **Transshipment** = nodes وسيطة + buffer B.
