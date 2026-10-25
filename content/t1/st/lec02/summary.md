## ⚡ ملخص ST Ch2: Storage Technologies & Data Center Environment

- **التطور:** Punch cards (1890s–1960s) ← Magnetic tapes (1950s، لسه للـ backup) ← HDDs (1960s، random access) ← Optical ← Flash ← SSD (NAND) ← **NVMe** (ultra-low latency).
- **Data center environment** = temperature + humidity + airflow.
- **Application** ← R/W requests. والتصنيفات: Business (email, DSS) · Infrastructure mgmt · Data protection (backup) · Security.
- **DBMS** = bridge بين الـ application والتخزين.
- **Host** = physical أو virtual · hardware (CPU, storage, I/O) + software (OS, FS, **LVM**, drivers).
- **Connectivity:** Physical = **Bus · Port · Cable** · Logical = **PCI** (plug-and-play) · **IDE/ATA** (الأشهر والأرخص) · **SCSI** (high-end وأغلى).
- DAS (كابل) · NAS (file، TCP/IP، NFS/SMB) · SAN (block، FC / iSCSI / NVMe-oF) · Ethernet & InfiniBand.
- **Tape:** رخيص ومحمول، لكن **sequential** و app واحد · **Optical:** **WORM** بس سعة قليلة.

| مكون الديسك | الوظيفة |
|---|---|
| Platter | قرص مغناطيسي على الوجهين (HDA) |
| Spindle | يلف الـ platters: 7,200 / 10,000 / 15,000 rpm |
| R/W heads | head لكل سطح، و flying height، و landing zone (وإلا **head crash**) |
| Actuator arm | يحرك كل الـ heads مع بعض |
| Controller | circuit board: microprocessor + firmware |

- **Track** (TPI) ← **Sector** (512 bytes، أصغر وحدة) ← **Cylinder** (نفس الـ track على كل الأسطح) · و 500GB ← 465.7GB بسبب الـ metadata.
- **ZBR:** zones، والخارجية فيها sectors أكتر.
- **الأداء:** Seek time · Rotational latency (**½ rotation**: 7200 rpm ≈ 4.17 ms) · Data transfer rate (للـ HBA).
- **Host access:** Request ← **LBA** ← Positioning ← Transfer ← Completion.
- **DAS:** بسيط ورخيص وسريع لجهاز واحد، بس مش بيتشارك ومحدود.
- **NCQ (SATA):** يعيد ترتيب الأوامر، مفيد للـ multi-threaded، ومش مفيد للـ sequential.
- **Flash:** مفيش أجزاء متحركة، NAND، أسرع وأمتن وأوفر، لكن أغلى لكل GB و write cycles محدودة (wear-leveling).
