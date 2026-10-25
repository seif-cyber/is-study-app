## ⚡ ملخص Ch3: Processes

- **Program** = passive entity (executable file على الديسك) · **Process** = active entity (اتحمّل في الميموري).
- **Process management** = المهمة الأساسية للـ OS، ومعناها: allocate resources · enable sharing · protect resources · enable synchronization.
- الـ process فيها كمان: open files · pending signals · kernel data · processor state · address space · data section.

| Segment | فيه إيه |
|---|---|
| **Text** | program code (read-only، ممكن يتشارك) |
| **Data** | global variables |
| **Heap** | dynamic allocation during run time (يكبر لفوق) |
| **Stack** | function parameters · return addresses · local variables (يكبر لتحت، من max) |

**PCB (Process Control Block)**، وده تمثيل الـ process في الـ OS:
- **Identification**: PID · user ID · parent ID
- **Processor state**: process state
- **Program counter**: عنوان الـ instruction الجاية
- **CPU registers**
- **CPU scheduling info**: priorities · queue pointers
- **Memory-management info**
- **Accounting**: CPU used · elapsed time · time limits
- **I/O status**: allocated devices · open files

**الحالات:** new · ready · running · waiting · terminated

| الانتقال | السبب |
|---|---|
| new → ready | admitted |
| ready → running | scheduler dispatch |
| running → ready | interrupt |
| running → waiting | I/O or event wait |
| waiting → ready | I/O or event completion |
| running → terminated | exit |

⚠️ مفيش waiting → running مباشرة.

- **Context switch**: save state into PCB0 ← reload state from PCB1 (overhead).
- **Job queue** = كل الـ processes · **Ready queue** = في الميموري وجاهزة · **Device queues** = مستنية I/O.
- الـ Queueing diagram: I/O request · time slice expired · fork a child · wait for an interrupt ← كلهم بيرجعوا للـ ready queue.

| Scheduler | اسمه | بيعمل | التكرار |
|---|---|---|---|
| Short-term | CPU scheduler | يختار process للـ CPU | ms ← must be fast |
| Long-term | Job scheduler | يدخّل processes الـ ready queue ويتحكم في degree of multiprogramming | seconds/minutes ← may be slow |
| Medium-term | — | **swapping** (يقلل degree of multiprogramming) | — |

- **Independent** (لا تأثر ولا تتأثر) vs **Cooperating** (تأثر وتتأثر وتشارك بيانات ← محتاجة **IPC**).
- **IPC models:** Shared memory (أسرع) · Message passing (عن طريق message queue في الـ kernel).
