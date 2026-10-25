## ⚡ ملخص ST Ch7: Object-Based & Unified Storage

| | File | Block | Object |
|---|---|---|---|
| التنظيم | فولدرات | blocks + IDs | **flat** |
| البروتوكول | SMB/NFS | iSCSI/FC/FCoE | **REST/HTTP** |
| AWS | **EFS** | **EBS** | **S3** |

- **OSD** = objects في **flat address space** حسب المحتوى والخصائص · object = **Data + Metadata + Unique ID** (الـ metadata مش المحتوى!).
- **الخصائص:** self-describing · flat namespace · scalability · REST بدل mount.
- **Traditional** (NFS/SMB/iSCSI/FC، metadata محدودة، databases و structured) vs **Object** (REST، metadata غنية، cloud و unstructured).
- **Components:** OSD nodes (metadata service + storage service، replication/recovery/distribution) · Internal network (Ethernet/InfiniBand، sync) · Storage pool.
- **Store:** file ← split data/metadata ← ID من الـ data ← metadata service ← storage service ← ack.
- **Retrieve:** request ← metadata service يلاقي الـ ID ← app يبعته للـ storage service ← الملف.
- **Benefits:** Security & reliability · Platform independence · Scalability · Manageability (self-healing).
- **Cloud:** S3 / Azure Blob / Google · PUT/GET/DELETE · Policies: **Retention** (المدة) · **Tiering** (أرخص) · **Replication** (مناطق).
- **CAS:** محتوى **ثابت** · العنوان = **hash** (MD5/SHA-1) · bit يتغير ← CA مختلف · API: Store / Retrieve / **Verify** · Dedup · Self-repair · Healthcare / banks / email archiving (بعد 60 يوم).
- **Unified (multiprotocol):** block + file + object · **Storage controller** (block I/O) · **NAS head** (file ← block) · **OSD node** (object ← block) · storage pool.
- **NAS mode** (NFS/SMB، `\\Server\Share`) · **SAN mode** (FC/iSCSI، LUN = ديسك محلي، databases و VMware).
