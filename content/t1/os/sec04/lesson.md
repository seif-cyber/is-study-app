# سكشن 4: التاريخ ومراقبة النظام والصلاحيات — date, cal, top, Permissions, chmod

## 1. التاريخ والتقويم — `date` و `cal`

```bash
date      # Sun Oct 19 09:23:29 AM EEST 2025
cal       # shows the current month's calendar
```

## 2. أمر `top` — مراقبة النظام

`top` بيعرض **معلومات لحظية (real-time)** عن أداء النظام: **CPU** و **memory** والـ **processes** الشغالة، وبيساعدك تعرف أنهي process بتاكل موارد أكتر. هو **زي الـ Task Manager في Windows**.

### أهم الأعمدة (Main Columns)

| العمود | المعنى |
|---|---|
| **PID** | **Process ID**: رقم فريد لكل process (زي اللي في الـ PCB) |
| **USER** | المستخدم صاحب الـ process |
| **PR** | **Priority**: أولوية الـ process (**الأقل = أولوية أعلى**) |
| **NI** | **Nice value**: بيأثر على الأولوية |
| **VIRT** | **Virtual memory** اللي الـ process بتستخدمها |
| **RES** | **Physical (RAM) memory** المستخدمة |
| **SHR** | **Shared memory** المستخدمة |
| **S** | **Process state**: **R** = Running، **S** = Sleeping، **Z** = Zombie، ... |
| **%CPU** | نسبة استخدام الـ CPU |
| **%MEM** | نسبة استخدام الـ RAM |
| **TIME+** | **إجمالي وقت الـ CPU** اللي الـ process استخدمته |
| **COMMAND** | اسم الأمر اللي شغّل الـ process |

> [!NOTE]
> اربطها بـ Ch3: عمود **S** هو **process state**، و **PID** هو الـ **process identifier** اللي في الـ **PCB**. الـ **Zombie (Z)** هي process خلصت (terminated) بس الـ parent لسه مقراش حالتها. اخرج من `top` بـ **q**.

## 3. الصلاحيات — Permissions

### `ls -l` بيوريك الصلاحيات

![شكل 1: ls -l بيعرض الصلاحيات وأول حرف بيوضح نوع الملف](img/os/sec04/ls-l.webp)

```
-rwxrwxrwx. 1 aaron family 49 Oct 27 14:41 family_dog.jpg
│└┬┘└┬┘└┬┘    └─┬─┘ └─┬──┘
│ │  │  │       │     └── group
│ │  │  │       └──────── owner (user)
│ │  │  └── others
│ │  └───── group
│ └──────── user (owner)
└────────── file type
```

### أول حرف: نوع الملف (File Type)

| الرمز | النوع |
|---|---|
| `-` | **Regular file** (ملف عادي) |
| `d` | **Directory** (فولدر) |
| `c` | **Character device** |
| `l` | **Link** |
| `s` | **Socket file** |
| `p` | **Pipe** |
| `b` | **Block device** |

### User و Group و Others

![شكل 2: الصلاحيات التسعة متقسمة 3 مجموعات: owner (u) و group (g) و others (o)](img/os/sec04/ugo.webp)

| الرمز | الصلاحية | على الملف | على الفولدر |
|---|---|---|---|
| **r** | **Read** | تقرا المحتوى | تعرض المحتوى (ls) |
| **w** | **Write** | تعدّل | تضيف وتمسح ملفات |
| **x** | **Execute** | تشغّله كبرنامج | تدخل جواه (cd) |
| **-** | **No permission** | | |

| المجموعة | الرمز |
|---|---|
| **Owner / User** | **u** |
| **Group** | **g** |
| **Others** | **o** |
| **الكل** (all) | **a** |

## 4. تغيير الصلاحيات — `chmod`

`chmod` (**change mode**) بيغيّر صلاحيات الملفات والفولدرات، يعني بيتحكم **مين يقدر يقرا ويكتب وينفّذ**. وبيشتغل بطريقتين: **symbolic** (r, w, x) أو **numeric** (زي 755).

### الطريقة الرقمية (Numeric)

![شكل 3: كل صلاحية ليها bit، و r=4، w=2، x=1، فالمجموعة بتتحسب كرقم من 0 لـ 7](img/os/sec04/chmod-numeric.webp)

| Binary | Decimal | الصلاحيات |
|---|---|---|
| 000 | 0 | `---` |
| 001 | 1 | `--x` |
| 010 | 2 | `-w-` |
| 011 | 3 | `-wx` |
| 100 | 4 | `r--` |
| 101 | 5 | `r-x` |
| 110 | 6 | `rw-` |
| 111 | 7 | `rwx` |

> [!TIP]
> **r = 4 · w = 2 · x = 1**، واجمع الأرقام لكل مجموعة:
> - `rw-r-----` ← 6 4 0 ← **640**
> - `rwxr-xr-x` ← 7 5 5 ← **755**
> - `rwxrwxrwx` ← 7 7 7 ← **777**

```bash
chmod 755 script.sh     # owner: rwx, group: r-x, others: r-x
chmod 640 notes.txt     # owner: rw-, group: r--, others: ---
```

### الطريقة الرمزية (Symbolic)

| العملية | الرمز | أمثلة |
|---|---|---|
| **إضافة** صلاحية | `+` | `u+w` · `g+rw` · `o+rwx` |
| **شيل** صلاحية | `-` | `u-w` · `g-rw` · `o-r` |
| **تحديد بالظبط** | `=` | `g=r` · `u=rwx` · `g=` (يشيل كله) |

```bash
ls -l family_dog.jpg          # -r--rw----
chmod u+w family_dog.jpg      # add write for owner  → -rw-rw----
chmod o-r family_dog.jpg      # remove read from others
chmod g=r family_dog.jpg      # group gets exactly read → -rw-r-----
chmod g=rw family_dog.jpg     # group gets exactly rw
chmod g= family_dog.jpg       # group gets nothing
chmod g-rwx family_dog.jpg    # remove everything from group
```

> [!WARNING]
> **Permission error**: لما تحاول **توصل أو تعدّل أو تشغّل** ملف من غير الصلاحية المطلوبة.
> ```
> $ echo "Add this content to file" >> family_dog.jpg
> bash: family_dog.jpg: Permission denied
> ```
> السبب إن الـ owner مش معاه **w**، والحل `chmod u+w family_dog.jpg`.

## ✅ الخلاصة
- `date` و `cal` · `top` = Task Manager (PID, PR, NI, VIRT, RES, S, %CPU, %MEM...).
- `ls -l` ← نوع الملف (- d l c b s p) + rwx لـ **u g o**.
- **r=4, w=2, x=1** ← 755 = rwxr-xr-x.
- `chmod u+w` إضافة · `chmod o-r` شيل · `chmod g=r` تحديد بالظبط.
