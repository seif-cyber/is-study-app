## ⚡ ملخص CN Lec 1: Introduction to Computer Networks

- **الشبكة** = أجهزة متوصلة ببعض **لمشاركة البيانات**.

| النوع | النطاق |
|---|---|
| **PAN** | شخص واحد |
| **LAN** | مبنى واحد |
| **CAN** | مجموعة LANs في نفس الأرض (جامعة) |
| **MAN** | مدينة |
| **WAN** | دولة/دول |
| **VPN** | اتصال آمن بالـ WAN |
| **EPN** | مؤسسة واحدة + فروعها |
| **SAN** | شبكة مخصصة للتخزين |

| Topology | قطع كابل | ملاحظة |
|---|---|---|
| **Bus** | الكل يقع | terminators |
| **Ring** | الدايرة تتكسر | مفيش termination، اتجاه واحد |
| **Star** | جهاز واحد | المركز يقع = الكل يقع |
| **Hybrid** | — | نوعين بس: star-ring و star-bus |
| **Mesh** | مسارات بديلة | fully / partially |
| **P2MP** | — | جهاز **ذكي** في النص |
| **P2P** | — | جهازين مباشرة |

- **الأجهزة:** Modem (dial-up) · NIC · **Repeater** (attenuation) · **Hub = multi-port repeater** · **Bridge** (segments نفس الـ LAN) · **Switch = multi-port bridge** · **Router** (شبكات مختلفة) · **WAP** = hub لاسلكي.
- **Hex** base 16: (7DE)₁₆ = 7×256 + 13×16 + 14 = **2014**.
- **MAC** = **48 bits = 6 bytes = 12 hex** على ROM · أول 6 hex = **OUI** (الشركة) · آخر 6 = serial.
- **التاريخ:** ARPANET **1969** · email 1971 (Tomlinson) · Ethernet (Metcalfe، Alto Aloha) · **TCP 1974** (Kahn & Cerf) · MILNET 1983 · **DNS 1984** · **IANA 1988** · أول ISP **1990** (World.Std.com) · **ICANN 1998**.
- **Protocol** = قواعد · **Port** = مكان (HTTP = **80**).
- **TCP**: connection-oriented، reliable، ack، sequencing · **UDP**: connectionless، unreliable · **HTTP** ويب · **FTP** ملفات.
- **هيكل الإنترنت:** subnets ← **PoP** (DSLAM) ← local ISP ← regional ISP ← **IXP** ← global ISPs + content providers.

| الاتصال | السرعة | أهم نقطة |
|---|---|---|
| Dial-up | 56 Kbps | مينفعش تكلم وإنت متصل |
| Cable | 100 Mbps | بيبطأ وقت الذروة |
| Fiber (BoF) | 15–150 Mbps | مقاوم EMI بس هش |
| DSL/ADSL | 24 Mbps | في حدود 5 km من السنترال |
| VDSL | 70–100 Mbps | fiber node قريب |
| Satellite | 25–220 Mbps | latency عالي + الجو |
| Mobile | 4G 3–15 · 5G 100–1000 | وإنت بتتحرك |
