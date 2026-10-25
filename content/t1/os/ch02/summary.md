## ⚡ ملخص Ch2: Operating-System Structures

**خدمات للمستخدم (6):** User interface (CLI / GUI / Batch) · Program execution (normally أو abnormally) · I/O operations · File-system manipulation (+ permission management) · Communications (shared memory / message passing) · Error detection (+ debugging facilities)

**خدمات لكفاءة النظام (3):** Resource allocation · Accounting (مين استخدم قد إيه) · Protection (controlled access) & Security (user authentication)

| الواجهة | النقاط |
|---|---|
| **CLI / command interpreter** | direct command entry · في الـ kernel أو system program · multiple flavors = **shells** · الأوامر built-in أو names of programs |
| **GUI** | desktop metaphor · icons · folder = directory · أنظمة كتير فيها CLI و GUI |
| **Touchscreen** | gestures · virtual keyboard · voice commands |

- **System calls** = programming interface لخدمات الـ OS، مكتوبة بـ **C / C++**، والوصول ليها غالبًا عن طريق **API**.
- **Win32** ← Windows · **POSIX** ← UNIX / Linux / Mac OS X · **Java API** ← JVM.
- `read(int fd, void *buf, size_t count)` ← بترجّع عدد الـ bytes، و **0** = EOF، و **-1** = error.
- **printf()** (library call) ← بتنادي ← **write()** (system call).
- الـ system-call interface فيه **جدول متفهرس بأرقام** الـ system calls.

| نوع الـ System Call | Unix |
|---|---|
| Process control | fork · exit · wait |
| File management | open · read · write · close |
| Device management | ioctl · read · write |
| Information maintenance | getpid · alarm · sleep |
| Communications | pipe · shmget · mmap |
| Protection | chmod · umask · chown |

**System programs:** File management · Status information · File modification (text editors) · Programming-language support (compilers, assemblers, debuggers, interpreters) · Program loading & execution · Communications · Background services (boot time) · Application programs (مش جزء من الـ OS)

- **User goals:** convenient · easy to learn · reliable · safe · fast
- **System goals:** easy to design, implement, maintain · flexible · reliable · error-free · efficient
- **اللغات:** زمان assembly ← Algol / PL/1 ← دلوقتي C / C++. وفي الواقع mix: assembly (lowest) + C (main body) + scripting (PERL, Python, shell).

| الهيكل | المثال / الفكرة |
|---|---|
| Simple | **MS-DOS**: مفيش فصل بين المستويات |
| More complex | **UNIX**: systems programs + kernel (كل حاجة تحت الـ system-call interface وفوق الهاردوير) = monolithic |
| Layered | layer 0 = hardware · layer N = user interface |
| Microkernel | **Mach**: moves as much from kernel into **user space** · و **Mac OS X (Darwin)** مبني جزئيًا عليه · والتواصل بالـ messages |
