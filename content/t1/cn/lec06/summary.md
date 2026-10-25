## ⚡ ملخص CN Lec 10: Wireless Networks

- **Wireless network** = شبكة بتستخدم **RF connections** بين الـ nodes · تحديين: **Wireless** (الـ link) و **Mobility** (تغيير نقطة الاتصال).
- **Spectrum:** Radio/TV ← **Microwave (3–300 GHz)** ← Infrared ← Visible ← UV ← X-ray ← Gamma. **UV/X/Gamma ضارة** فمش بتتستخدم في الاتصالات.
- **ليه RF؟** مش ضارة · الـ **Ionosphere** (طبقتي E و F) بتعكسها ← **Skywaves** (آلاف الكيلومترات) · **Space waves** = microwaves للأقمار · **Ground wave** = low/medium freq (TV/AM/FM).
- **نطاقات RF:** ELF · SLF · VLF · LF (AM) · MF · HF · VHF (FM) · **UHF (TV، موبايل، GPS)** · **SHF (أقمار، wireless)** · EHF. λ = c/f.
- **2.4 GHz:** **14 قناة × 20 MHz** · **مدى أطول + اختراق أحسن** · عيوبه: **narrow، زحمة، تداخل** (1/6/11 غير متداخلة).
- **5 GHz:** **24 قناة non-overlapping × 20 MHz** (U-NII-1، 2A، 2C، 3، ISM) · **مدى أقل + اختراق أضعف** · قنوات 40/80/160 MHz.
- **العناصر:** **Wireless hosts** (laptop/smartphone/IoT) · **Base station** (cell tower، AP: relay بين wired و wireless) · **Wireless link** (+ multiple access protocol).
- **Modes:** **Infrastructure** (base station + **handoff**) · **Ad-hoc** (مفيش base stations، الـ nodes بتعمل routing بنفسها).
- **Taxonomy:** infrastructure/single hop = **Wi-Fi، cellular** · infrastructure/multi-hop = **mesh** · no-infra/single = **Bluetooth** · no-infra/multi = **MANET، VANET**.
- **Link characteristics:** **path loss** · **interference** · **multipath propagation**.
- **SNR ↑ ← BER ↓.** الجهاز بيغيّر الـ modulation حسب الـ SNR: **BPSK (1 Mbps)** ← **QAM16 (4)** ← **QAM256 (8)**.
- **Modulation:** **BPSK = 1 bit** · **QPSK = 2 bits (4 phases)** · **16-QAM = 4 bits** · **64-QAM = 6 bits** · **QAM = phase + amplitude**. بعيد عن المصدر ← **rate أقل** للحفاظ على BER.
- **Hidden terminal:** **A و C مش سامعين بعض** وبيتصادموا عند **B** ← **CSMA/CA**.
- **802.11:** **b** 11M/2.4 · **a** 54M/5 · **g** 54M/2.4 · **n** 600M/2.4+5 · **ac** 1.3G/5 · **ax** 10G/2.4+5 · **af** (TV bands) و **ah** (900 MHz) مداهم **1 Km** · الكل **CSMA/CA**.
