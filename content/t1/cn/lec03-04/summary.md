## ⚡ ملخص CN Lec 2: Transmission & Physical Media

| | Analog | Digital |
|---|---|---|
| القيم | continuous (لا نهائية) | discrete (محدودة) |
| الشكل | sine wave | square wave |
| الـ noise | بيتأثر | immune |
| الاستخدام | صوت وفيديو | كمبيوتر |

- **Wavelength** = مسافة دورة كاملة · **Frequency** = دورات/ثانية (Hz) · $f = 1/T$ · التردد ↑ ← الطول الموجي ↓.
- **Amplitude** = أقصى إزاحة (V) · **Phase**: 0° مفيش إزاحة · 90° = ¼ cycle · 180° = ½ cycle.
- **Composite** = موجات جيبية كتير · **Clock** = square wave للتزامن · **Clock rate** بالـ Hz.
- **Bit rate** = bps، $R = 1/T_B$ · **bits/level** = $\log_2 L$ (8 ← 3 bits).
- **Modulation** = بيانات على carrier عالي التردد · **Baseband** قبل · **Passband** بعد · **Demodulation** عكسها.
- **ASK** amplitude · **FSK** frequency · **PSK** phase.

| القانون | المعادلة |
|---|---|
| Bandwidth (Hz) | $f_{high} - f_{low}$ |
| Throughput | data ÷ time (**< bandwidth**) |
| Propagation | distance ÷ speed |
| Transmission | size (bits) ÷ bandwidth |
| Latency | prop + trans + queuing + processing |

- **أمثلة:** 100 ms ← 10 Hz · {100…900 Hz} ← 800 Hz · 12,000 frame/min × 10,000 bit ← **2 Mbps** · 12,000 km ÷ 2.4×10⁸ ← **50 ms** · 2.5 KB ÷ 1 Gbps ← **0.020 ms**.
- **Queuing** بيزيد مع الزحمة · **Processing** = µs (TTL، checksum) · **Packet loss** = buffer مليان.
- **Simplex** اتجاه واحد · **Half duplex** اتنين بالدور · **Full duplex** اتنين مع بعض.

| Multiplexing | الفكرة |
|---|---|
| TDM | slots ثابتة |
| STDM | حسب الاحتياج (statistical gain) |
| FDM | ترددات + **guard bands** |
| OFDM | orthogonal، **مفيش guard band** (Wi-Fi، 4G، 5G) |
| WDM | ضوء على fiber |
| CDM | code لكل مستخدم |

| الكابل | المسافة | السرعة | Connector |
|---|---|---|---|
| Coax | 185 m | 10 Mbps | BNC |
| Twisted pair (UTP/STP) | 100 m | CAT3 10M · CAT5 100M · CAT5e 1G · CAT6 10G | RJ45 |
| Multi-mode fiber | قصير (جوه المباني) | LED، 850 nm، 50/125 و 62.5/125 | ST/SC/LC/FC |
| Single-mode fiber | طويل (بين المباني) | Laser، 1310/1550 nm، 9/125 | ST/SC/LC/FC |

- **FC** threaded (اهتزاز) · **LC** standard للـ SFP · **SC** high-density · **ST** single + multi.
- **Access:** Ethernet (10M–10G) · **DSL** (نت + تليفون مع بعض، DSLAM، 24 down / 2.5 up) · VDSL (ضعف ADSL) · **FTTH** (الأسرع والأغلى) · WLAN (30.5 m، 11/54/450 Mbps) · 3G/4G (base station، عشرات km).
