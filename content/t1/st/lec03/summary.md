## ⚡ ملخص ST Ch3: RAID

- **RAID** = Redundant Array of Independent/Inexpensive Disks: كذا ديسك ← logical unit واحد.
- **Software RAID**: OS level، و CPU الـ host، ورخيص وسهل · عيوبه: CPU، وأداء يقل تحت الضغط، ومميزات محدودة.
- **Hardware RAID**: controller (processor + cache) على PCI/PCIe، بيعمل offload للـ CPU، ويدعم 5/6/10/50، و battery-backed cache · عيوبه: غالي، ولو الـ controller باظ محتاج هاردوير مطابق.
- **Onboard RAID**: entry-level، وناقصه cache و battery و advanced features.
- **Components:** RAID array ← physical arrays ← **logical arrays (RAID set / group)** ← **logical volumes**.

| Technique | الفكرة |
|---|---|
| **Striping** | strip (blocks على ديسك) ← stripe (على كل الديسكات) · stripe size = strip × disks · أداء من غير حماية |
| **Mirroring** | نسختين · read ↑ write ↓ · ضعف السعة · **مش بديل للـ backup** |
| **Parity** | **XOR** · بتعيد البناء · أرخص من mirroring · الكتابة أبطأ |

| RAID | التقنية | Min | Efficiency | يستحمل |
|---|---|---|---|---|
| 0 | striping | 2 | 100% | ❌ |
| 1 | mirroring | 2 | 50% | 1 |
| 3 | **byte** + dedicated parity | 3 | (n−1)/n | 1 |
| 4 | **block** + dedicated parity | 3 | (n−1)/n | 1 |
| 5 | block + **distributed** parity | 3 | (n−1)/n | 1 |
| 6 | block + **double** distributed parity | 4 | (n−2)/n | **2** |
| 1+0 | **mirror ثم stripe** | 4 | 50% | rebuild سريع ✅ |
| 0+1 | **stripe ثم mirror** | 4 | 50% | rebuild الـ stripe كله ❌ |

- **Write penalty:** RAID 0 = None · RAID 1 و 10 و 01 = Moderate · 3/4/5 = High · **6 = Very High**.
- **RAID 3** ← video streaming · **RAID 10** ← OLTP · **RAID 5** ← general-purpose · **RAID 6** ← mission-critical بديسكات كبيرة.
- **Hot spare:** ديسك احتياطي **مساوي أو أكبر** · parity RAID ← rebuild بالـ parity · mirror ← نسخ من الـ mirror · **Automatic** (قبل العطل) vs **User-initiated** (off-peak، بس عرضة للخطر).
