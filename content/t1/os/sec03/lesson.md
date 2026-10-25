# سكشن 3: أوامر المساعدة والنسخ والنقل — Commands (help, ls options, man, cp, mv)

## 1. خيار المساعدة — `--help`

الـ **help option** بيعرض **وصف مختصر وطريقة استخدام** الأمر، وبيساعدك تفهم الأمر بيعمل إيه وخياراته (options) و arguments بتاعته.

```bash
ls --help
```

## 2. خيارات أمر `ls` — LS Command Options

| الأمر | بيعمل إيه |
|---|---|
| `ls -a` | يعرض **كل** الملفات والفولدرات، **حتى المخفية** (اللي بتبدأ بنقطة `.` زي `.bashrc`) |
| `ls -l` | **long listing**: تفاصيل (صلاحيات، مالك، حجم، تاريخ) |
| `ls -s` | يعرض **حجم** كل ملف (size) |
| `ls -S` | **يرتّب** حسب الحجم (Sort by size) |
| `ls -h` | الأحجام بشكل **مقروء** (K, M, G) مع `-l` أو `-s` |

> [!WARNING]
> الـ **options في Linux case-sensitive**: `-s` غير `-S`.
> - `-s` ← **يعرض حجم** الملفات والفولدرات.
> - `-S` ← **يرتّب** حسب الحجم.

### طريقتين تجمع بيهم الـ options

| الطريقة | مثال |
|---|---|
| **مسافة بين كل option** | `ls -s -h` |
| **dash واحدة** | `ls -sh` أو `ls -hs` |

## 3. أمر `man` — الدليل (Manual)

`man` بيفتح **الـ manual** بتاع أي أمر، وفيه **وصف تفصيلي**: إزاي تستخدمه وكل الـ options بتاعته.

```bash
man ls
```

> [!TIP]
> جوه صفحة الـ man (الـ **man pager**):
> - تدوّر على option بالرمز **`/`** (مثلًا `/-a` وبعدين Enter).
> - `n` للنتيجة الجاية · `q` للخروج.

## 4. أمرين `whatis` و `apropos`

| الأمر | بيعمل إيه | مثال |
|---|---|---|
| `whatis` | **يوصف وظيفة أمر معين** (سطر واحد) | `whatis ls` ← `ls (1) - list directory contents` |
| `apropos` | **يدوّر على أوامر بوصف معين** (العكس)، وغالبًا بيتستخدم مع **grep** | `apropos copy \| grep file` |

> [!EXAM]
> - **whatis** ← عندك **اسم الأمر** وعايز تعرف **بيعمل إيه**.
> - **apropos** ← عندك **وصف** وعايز تعرف **اسم الأمر**.

## 5. أمر `cp` — النسخ

`cp` بينسخ **ملف** أو **فولدر** (مع `-r`) من **source** لـ **destination**.

```bash
cp file1.txt backup.txt          # copy a file
cp file1.txt Documents/          # copy into a folder
cp -r project/ project_backup/   # copy a whole folder (recursive)
```

> [!IMPORTANT]
> نسخ **فولدر** محتاج **`-r`** (recursive)، وإلا هيطلع error.

## 6. أمر `mv` — النقل وإعادة التسمية

`mv` بيعمل **rename** أو **move**. **وظيفته بتعتمد على الـ destination**:

```bash
mv old.txt new.txt          # same folder → RENAME
mv new.txt Documents/       # destination is a folder → MOVE
mv a.txt Documents/b.txt    # move and rename at the same time
```

| الـ destination | النتيجة |
|---|---|
| **اسم جديد في نفس المكان** | **Rename** |
| **فولدر تاني** | **Move** |

## ✅ الخلاصة
- `--help` وصف مختصر · `man` دليل تفصيلي (ابحث بـ `/`).
- `ls -a` مخفي · `-s` حجم · `-S` ترتيب بالحجم · والـ options **case-sensitive**.
- دمج الـ options: `ls -s -h` = `ls -sh`.
- `whatis` الأمر بيعمل إيه · `apropos` دوّر على أمر بوصف (مع grep).
- `cp` نسخ (`-r` للفولدرات) · `mv` نقل أو rename حسب الـ destination.
