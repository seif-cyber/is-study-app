## ⚡ ملخص CN Lec 5: Network Models & Encapsulation

| # | OSI Layer | الوظيفة | PDU | أمثلة |
|---|---|---|---|---|
| 7 | Application | واجهة المستخدم، process-to-process | Data | HTTP/S، FTP/S، POP3/IMAP/SMTP، Telnet، SNMP |
| 6 | Presentation | Translate · Compress · Encrypt | Data | ASCII/EBCDIC/Unicode · lossless/lossy · SSL |
| 5 | Session | establish · manage · authenticate · terminate | Data | — |
| 4 | Transport | reliable process-to-process، error recovery | **Segment** | TCP/UDP، port، sequence |
| 3 | Network | logical addressing · path determination · forwarding | **Packet** | IP |
| 2 | Data-Link | LLC (drivers، sync، flow، error) + MAC (MAC، FCS، CSMA/CD) | **Frame** | Ethernet |
| 1 | Physical | modulation · multiplexing · transmission mode · media | **Bits** | copper/fiber/air |

- **Top-down** = من 7 لـ 1 · حفظ: **All People Seem To Need Data Processing**.
- **Transport services:** end-to-end delivery (TCP ✔ / UDP ✘) · addressing (port) · reliable delivery (error، sequence، loss، duplication، ARQ) · flow control (100 ← 10 Mbps) · multiplexing.
- **TCP/IP (4):** Application (= 5+6+7: HTTP، FTP، SMTP، DNS، SNMP، Telnet، POP3) · Transport (TCP، UDP) · Network (IP، IGMP، ICMP، ARP) · Link (Ethernet، ATM، Frame relay).
- **Encapsulation** (المرسل) / **De-encapsulation** (المستقبل): **Data ← Segment (+port/seq) ← Packet (+IP) ← Frame (+MAC+FCS) ← Bits**.
- **Frame switching:** الـ **IP ثابت** · الـ **MAC بيتغير كل hop** · Switch = L2 · Router = L3 + routing table.
- **Metric:** hop count · reliability · speed · load · bandwidth · latency.
