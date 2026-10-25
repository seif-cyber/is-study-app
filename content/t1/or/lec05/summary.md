## ⚡ ملخص OR Lec 5: Transportation (NW & Least Cost)

- **Transportation problem:** نقل من sources لـ destinations بأقل تكلفة · Sᵢ (supply) · dⱼ (demand) · Cᵢⱼ (تكلفة الوحدة).
- **Balanced:** supply = demand · **Unbalanced:** dummy row/column بتكلفة **0** (الفرق).
- **الحل الابتدائي:** NW · Least cost · VAM · عدد basic cells = **m+n−1**.
- **المثال:** supply 300/400/500 · demand 250/350/400/200 (1200).
- **Least cost:** (O1,D2)=300 · (O2,D1)=250 · (O3,D4)=200 · (O3,D2)=50 · (O3,D3)=250 · (O2,D3)=150 ⇒ **2850**.
- **NW:** 250,50 / 300,100 / 300,200 ⇒ **4400** (بيتجاهل التكاليف).
- **Unbalanced:** 117 vs 95 ⇒ dummy column 22 · NW 547 · LC 472 · **VAM 374**.
