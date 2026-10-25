## ⚡ ملخص SAD Ch5: ERD Techniques

- **ERD** (Chen 1976) = **Entities + Attributes + Relationships** · notations: Barker, IE, Chen, IDEF1X.
- **الأهداف:** نموذج دقيق لاحتياجات المنظمة · مستقل عن التخزين · أداة تواصل · تحقق من المتطلبات (CRUD).
- **Entity type** (مفرد + domain) vs **instance**.
- **Attributes:** Descriptive · Identifying · **Optional (NULL)** / **Mandatory** · surrogate & foreign keys.
- **Relationship:** **Degree** (unary/binary/ternary) · **Cardinality** (1:1, 1:M, M:M) · **Optionality** · **Labels** (الاتجاهين).
- **Conceptual** (M:M، بدون FK) ← **Logical** (M:M ← 1:M + 1:M + associative، مع FK).
- **الخطوات:** entities ← relationships ← attributes.
- **Strong** (مستقل) · **Weak** (معتمد) · **Associative** (على 2+) · **Unique identifier** ← PK.
- **Subtyping:** subtype ⊂ supertype · يرث · أدق وأقل تكرار (Boat, Person ← Staff/Customer).
- **Exclusivity (Arc):** either/or (حساب لفرد أو لشركة).
- **Unary** (نفس الـ entity) · **Ternary** (3 entities) · **Temporal** (history).
- **مثال:** Sales Office / Employee / Property / Owner ← فك M:M بـ associative يحمل **Percent_Owned**.
