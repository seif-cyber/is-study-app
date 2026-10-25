## ⚡ ملخص ST Ch4: Intelligent Storage System

- **ISS** = array متقدم: سوفتوير + cache management + virtualization، و**الذكاء في الـ controller**. ظهر لأن الـ HDDs حتى مع RAID مكفّتش.
- **المكونات:** Front end → **Cache** → Back end → Physical disks.
- **Front end:** ports (SCSI / FC / iSCSI، redundancy) + controllers (internal bus، و **ack قبل الكتابة على الديسك**).
- **Command queuing (tag):** FIFO (default) · Seek time optimization · **Access time optimization (الأحسن)**.
- **Cache:** < 1 ms vs disk بالـ ms · **Data store + Tag RAM** (dirty bit + last access time) · pages = أصغر وحدة.
- **Read hit** (~1 ms) · **Read miss** (back-end يجيب من الديسك).

| Write | الطريقة | ✅ | ❌ |
|---|---|---|---|
| **Write-back** | cache ← ack ← de-stage | سريع | خطر فقد (محتاج battery/mirror) |
| **Write-through** | cache + disk ← ack | آمن | أبطأ |
| **Write-around** | الكبير يتجاوز الـ cache | الـ cache يفضل للـ I/O الصغير | — |

- **Dedicated** (نسب ثابتة 40/60) vs **Global** (pool، static/dynamic، أكفأ).
- **LRU** (الأقدم، الأشهر، و dirty ← flush الأول) vs **MRU** (الأحدث، sequential).
- **Flushing:** Idle (LWM، تدريجي) · High watermark (HWM، مكثف) · Forced (طوارئ، فوري).
- **Protection:** **Cache mirroring** (كارتين) · **Cache vaulting** (vault drives) · BBU محدود ← Battery + Vaulting.
- **Back end:** ports + controllers (RAID، error correction) · dual controllers + dual-ported disks + load balancing.
- **LUN** = logical volume يبان كديسك (200GB من 1TB) · **Meta-LUN** = تجميع LUNs.
- **Thick** = upfront (underutilization) · **Thin** = just-in-time (over-provisioning).
- **High-end = Active-Active** (كل المسارات، enterprise، mainframe) · **Midrange = Active-Passive** (المسارات الـ active، SMEs، 2 controllers).
