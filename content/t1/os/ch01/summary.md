## ⚡ ملخص Ch1: Introduction

**مكونات النظام (4):** Hardware · Operating System · Application Programs · Users (People, machines, other computers)

**تعريف الـ OS:** program that **manages hardware**، و**basis for application programs**، و**intermediary** بين الـ user والـ hardware.

**الأهداف:** easier · convenient · efficient

| View | الفكرة |
|---|---|
| **User view** | convenience, ease of use, good performance، ومش فارق معاه resource utilization (إلا في mainframe / minicomputer) |
| **System view** | **Resource allocator** (efficient & fair) + **Control program** (prevent errors & improper use) |

- **Kernel** = the one program running at all times.
- **System programs** = associated with OS بس not necessarily part of kernel.
- **Bootstrap** ← ROM / EEPROM (**firmware**) ← initialize ← load kernel.
- **Interrupt** ← من hardware (signal عن طريق system bus) أو software (**system call = monitor call**).
- **Interrupt vector** = جدول عناوين الـ service routines.
- **Trap / Exception** = software-generated interrupt (error أو user request).
- **OS is interrupt driven.**
- **Main memory** = الوحيدة اللي الـ CPU يوصلها **directly**، وهي random access و volatile.
- **Disk** ← tracks ← sectors. والـ **SSD** أسرع و nonvolatile.
- **الهرم:** Registers → Cache → Main memory → SSD → HDD → Optical → Tape (فوق = أسرع وأغلى وأصغر و volatile).
- **Managed by:** registers ← compiler · cache ← hardware · memory/disk ← OS.
- **DMA** = نقل block مباشرة للميموري من غير CPU (high-speed I/O)، و interrupt واحد لكل block.
- **Multiprocessor (parallel) مزاياه:** Throughput · Economy of scale · Reliability (graceful degradation / fault tolerance).
- **Asymmetric** = كل processor مهمة معينة · **Symmetric (SMP)** = كل processor يعمل كل المهام.
- **Multiprogramming (batch)** = يبدّل لما الـ job يستنى I/O (للكفاءة).
- **Timesharing (multitasking)** = interactive، response < 1 sec. وفيه process · CPU scheduling · swapping · virtual memory.
- **Dual-mode:** user (1) / kernel (0) = supervisor = system = privileged. والـ privileged instructions في kernel mode بس.
- **Protection** = control access · **Security** = defense against attacks (DoS, worms, viruses).
- **Thin clients** = network computers · **Portals** = web access للسيرفرات الداخلية.
- **Distributed**: LAN · WAN · MAN · PAN، والأشهر TCP/IP.
- **Virtualization:** host / guest / **VMM**.
- **Cloud:** Public · Private · Hybrid. و **SaaS** (word processor) · **PaaS** (database server) · **IaaS** (storage for backup).
