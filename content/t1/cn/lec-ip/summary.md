## ⚡ ملخص CN Lec 3: IP Addressing

- **Weight = Base^Order** · **Value = digit × weight** · (1011)₂ = 11 · (11101)₂ = 29 · 13 = (1101)₂ · 10001011 = 139.
- أوزان الـ byte: **128 64 32 16 8 4 2 1** · Byte max = **255**.

### IPv4
- **32-bit dotted decimal** · 4 **octets** (0–255) · **Network ID + Host ID**.
- **Subnet mask**: network = 1s · host = 0s · **IP AND Mask = Network ID** · /24 = 255.255.255.0.
- **Hosts = 2ⁿ − 2** (كله 0 = network · كله 1 = broadcast) · /24 ← 254 · /16 ← 65,534.

| Class | أول bits | المدى | Mask | Networks | Hosts | الاستخدام |
|---|---|---|---|---|---|---|
| A | 0 | 1–126 | /8 | 126 | 16,777,214 | كبيرة |
| B | 10 | 128–191 | /16 | 16,384 | 65,534 | متوسطة |
| C | 110 | 192–223 | /24 | 2,097,152 | 254 | LANs |
| D | 1110 | 224–239 | — | — | — | Multicast |
| E | 1111 | 240–255 | — | — | — | Research |

- **127.x.x.x** = loopback (مش لأجهزة).
- **Private:** 10.x · 172.16–31.x · 192.168.x · **APIPA 169.254.x** (لما مفيش DHCP).
- **Assign:** Static · **DHCP** (ديناميك) · **APIPA** · Unicast (1:1) · Multicast (1:many) · Broadcast (1:all).

### IPv6
- **128-bit hex** · 8 **quartets** (16 bit) · **nibble** = 4 bit · 64 network + 64 interface.
- **تبسيط:** شيل الـ leading 0s · **`::` مرة واحدة بس** (fe80::5ee:0:0:47b1 ✅ · fe80::5ee::47b1 ❌).
- **Unicast · Multicast · Anycast** (أقرب node) · **مفيش Broadcast**.

| النوع | البداية | يقابل |
|---|---|---|
| Global unicast | 2000–3fff | Public |
| Unique local | fd | Private |
| Link-local | fe80 | APIPA |
| Loopback | ::1 | 127.0.0.1 |
| 6to4 | 2002 | migration |
| Multicast | ff | ff02::1 nodes · ff02::2 routers |

- **Global:** 48-bit prefix (IANA) + 16-bit subnet + 64-bit interface.
- **6to4:** IPv4 في الـ **network ID** (192.0.10.100 ← **2002:c000:0a64**) · **ISATAP:** في الـ **interface ID** (**0:5efe:c000:a64**)، intranet بس · **Teredo:** **2001:0000**، UDP عبر **NAT**، والـ port والـ host **XOR ffff** (5000 ← ec77 · 131.107.0.1 ← 7c94:fffe).
- **Stateful** (DHCPv6/manual) · **SLAAC**: link-local ← RS ← RA (prefix + gateway) ← prefix + random interface ID.
