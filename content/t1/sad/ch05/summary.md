## ⚡ ملخص SAD Ch5: Business Processes, Activity & Use Case

- **Business process** = إيه بيتعمل ومين وبأي ترتيب · **Business rule** = قيد على إزاي بيتدار · الـ rules بتتسجل بـ natural language أو **UML + OCL**.
- **Activity diagram** (للـ business process): Start · End · Activity · Transition · **Fork/Join** (تزامن) · **Decision/Merge** ◇ · **Guard [ ]** · **Swimlane** (المسؤول).
- **Decision** خرجين+ و guard واحد = true · **Merge** خرج واحد · النشاط له transition واحدة داخلة/خارجة.
- **مثال المكتبة:** rules = حد للكتب، أسبوعين، غرامة · processes = find, queue, issue, return.
- **Use case model:** ماذا يفعل النظام من وجهة المستخدم (عقد) · **actor** = stick figure · **use case** = oval · **System boundary** = صندوق.
- **وصف الـ use case:** Identifier · Initiator · Pre · Post · Main success scenario · Goal · Extensions.
- **Scenario** = instance من use case (ناجح وغير ناجح).
- **Generalization بين actors:** Reserver ← Guest و Receptionist (سهم مفتوح الرأس).
- **«include»** = مشترك غير مشروط (check reservation) · **«extend»** = بديل مشروط (refuse loan).
- **استخدامات:** تخطيط · architecture · testing (walk-through).
