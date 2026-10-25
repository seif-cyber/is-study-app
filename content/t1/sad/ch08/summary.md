## ⚡ ملخص SAD Ch8: Associations, Aggregation, Generalization & Object Diagrams

- **Association** = علاقة بين classes (verb phrase) · ثنائية الاتجاه · **reading arrow** للقراءة فقط.
- **Multiplicity:** `*` zero or more · `1..*` one or more · `1..40` · `5` · `3,5,8` · `0..1`.
- **Link** = بين objects · **Association** = مجموعة links.
- **Roles** لكل طرف · مهمة في **self-associations**.
- **Association class:** attributes للعلاقة (salary, accessPermission) · occurrence واحد لكل زوج (عكس ordinary class).
- **Qualified association:** Bank + accountNumber → account واحد.
- **ترتيب النمذجة:** classes ← associations ← multiplicity.
- **Aggregation** ◇ (has-a) · **Composition** ◆ (الجزء يعتمد على الكل: Hand–Finger).
- **Generalization** = **is-a** · specialization · inheritance (الآلية) · transitive · ancestor/descendant.
- **فوائد:** polymorphism · هيكلة · reuse · **Overriding** يحافظ على الـ signature.
- **Abstract class** ما ينفعش instances.
- **Object diagram** = snapshot · `ObjectName : ClassName` مسطّر · **links**.
- **Tips:** tangible · roles · events · org units · scope · simplicity · layout · أسماء بالمفرد.
