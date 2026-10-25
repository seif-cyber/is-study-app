## ⚡ ملخص ST Ch6: NAS

- **NAS** = جهاز **file-sharing على IP متوصل بالـ LAN**: single-purpose، و OS متخصص، و **file-level**.
- **البروتوكولات:** TCP/IP · **NFS (UNIX)** · **CIFS/SMB (Windows)** · FTP.
- **NAS vs General-purpose server:** الـ NAS مخصص للملفات بس، وبيخدم مستخدمين أكتر (server consolidation).
- **المميزات:** Efficiency (offload) · Flexibility (UNIX+Windows) · Centralized · Simplified mgmt · Scalability · High availability · Security.
- **العيوب:** أبطأ من **DAS** · محتاج معرفة شبكات · المميزات حسب الـ chip والـ firmware.
- **File I/O** = بيحدد الملف من غير LBA ← الـ NAS OS يحوّله **block I/O** ويرجّعه file-level.
- **Mounting** = رابط الـ FS بالـ OS · الملفات في **leaf nodes** · Unmount = نهاية العلاقة.
- **File sharing:** FTP (مش مشفّر) / **SFTP** (SSH) · **DFS** · NFS / CIFS، والـ owner بيحدد الصلاحيات.
- **المكونات:** **NAS head (المخ)** · NICs · Optimized OS · NFS/CIFS · ATA/SCSI/FC.

| | Integrated | Gateway |
|---|---|---|
| البنية | all-in-one | head + **SAN** backend |
| الـ Back-end | internal / JBOD | **FC أو iSCSI** |
| البيئة | صغيرة ومتوسطة | متوسطة وكبيرة |

- **NAS I/O:** Request (TCP/IP) ← Convert to block ← Process (NFS/CIFS) ← Response (TCP/IP).
- **Latency:** congestion · hops · LDAP · retransmissions · routers · metadata/lookup · NAS overload · clients overload.
- **File-level virtualization** = يخبّي المكان ← **global namespace** ← file mobility و pooling من غير downtime.
- **NAS (file, Ethernet, رخيص) vs SAN (block, FC, غالي)**.
