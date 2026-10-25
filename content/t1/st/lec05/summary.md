## ⚡ ملخص ST Ch5: SAN

- **SAN** = شبكة **مخصصة وسريعة** للتخزين، والهدف نقل البيانات بين السيرفرات والتخزين.
- **الأنواع:** FC (سريع وغالي) · iSCSI (رخيص وأبطأ) · FCoE (Ethernet + FC) · NVMe-oF (الجيل الجاي).
- **التطور:** FC-AL (hubs ← SAN islands) ← **Switched fabric** (switches) ← IP-based SANs (iSCSI, FCIP).
- **المكونات:** servers + network + storage ← node ports · cabling · interconnect devices · storage arrays · management software.
- **Node ports:** جزء من الـ HBA، و full-duplex (Tx + Rx).

| Fiber | MMF | SMF |
|---|---|---|
| الضوء | كذا شعاع | شعاع واحد |
| Core | 62.5 / 50 µm | **9 µm** |
| المسافة | ~500m | **10km** |
| التكلفة | أرخص | أغلى |

- **Copper** لحد 30m في الـ back-end · Connectors: **SC 1Gb** · **LC 4Gb (الأشهر)** · **ST bayonet**.
- **Hubs** (shared، اتلغت) · **Switches** (dedicated، aggregation) · **Directors** (enterprise، redundancy).
- **Management:** centralized view · resource mgmt · device mapping · monitoring · zoning.
- **Ports:** N / NL (end) · F / FL (switch ← device) · **E** (switch ← switch = **ISL**) · **G** (generic) · وفيه public loop و private loop.
- **FC:** 1–128 Gb/s · full duplex · ~15M nodes · **ANSI T11**.
- **Zoning:** members ← zones ← **zone set (واحد active)** · Hard = **port** (آمن) · Soft = **WWN** (مرن) · Mixed · ومعاه LUN masking.
- **Core-Edge:** hosts على الـ edge والتخزين على الـ core · single / **dual core**.
- **Full mesh** (hop واحد، ≤ 4، مش scalable) · **Partial mesh** (hops أكتر).
- **iSCSI** = SCSI over IP (initiator / target، software NIC أو HBA) · **FCIP** = FC over IP (ربط SANs بعيدة) · **FCoE** = FC over Ethernet (DCB + CNA، كابل واحد).
