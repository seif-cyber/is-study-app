## ⚡ ملخص Ch4: Threads

- **Thread** = basic unit of CPU utilization، وليه: **thread ID · program counter · register set · stack**.
- **مشترك** بين threads نفس الـ process: **code section · data section · OS resources (open files, signals)**.
- أمثلة: **web browser** (عرض + تحميل من الشبكة) · **word processor** (جرافيكس + كيبورد + spelling في الخلفية).
- **Multithreaded server**: request ← create new thread to service ← resume listening.
- الـ kernels **multithreaded**: devices · memory · interrupt handling.
- **Concurrency** = single-core بيتبادل · **Parallelism** = multi-core في نفس اللحظة.
- **User threads**: فوق الـ kernel ومن غير دعمه · **Kernel threads**: الـ OS بيديرها مباشرة.

| Model | الربط | ملاحظات |
|---|---|---|
| **One-to-One** | كل user ↔ kernel | parallel على multiprocessors · العيب: overhead عمل kernel thread فبيحدّد عدد الـ threads · **Linux, Windows** |
| **Many-to-One** | كذا user ← kernel واحد | مفيش parallelism · blocking call يوقف الكل |
| **Many-to-Many** | كذا user ← كذا kernel | الـ OS يعمل sufficient kernel threads · المطوّر يعمل user threads قد ما هو عايز |
| **Two-level** | Many-to-Many + **bound** | user thread متربط بـ kernel thread لوحده |

**الفوائد (R-R-E-S):**
- **Responsiveness**: يكمّل لو جزء blocked (UI)
- **Resource sharing**: أسهل من shared memory و message passing
- **Economy**: أرخص من process creation، و switching أقل overhead
- **Scalability**: يستفيد من multiprocessor

**Thread libraries:** API لعمل وإدارة الـ threads ← **POSIX Pthreads · Windows · Java**
