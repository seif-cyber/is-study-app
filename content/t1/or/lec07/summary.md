## ⚡ ملخص OR Lec 7: Assignment & Hungarian Method

- **Assignment:** n مهمة لـ n عامل · واحد لواحد · xᵢⱼ ∈ {0,1} · حالة خاصة من transportation (supply=demand=1).
- **Hungarian:** balance ← row reduction ← column reduction ← assign zeros ← optimal test ← (cover zeros بأقل خطوط، lines = n ⇒ stop) ← adjust بـ k ← كرر.
- **Adjust:** اطرح k (أصغر غير مغطى) من غير المغطى · اجمعه عند التقاطع.
- **Maximization:** اطرح من أكبر عنصر · **Unbalanced:** dummy بتكلفة 0.
- **أمثلة:** 5×5 min ⇒ **86** (1-II,2-IV,3-I,4-V,5-III) · 4×4 max ⇒ **99** · 5×4 unbalanced ⇒ **54**.
