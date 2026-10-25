# سكشن 2: أوامر Linux الأساسية — Basic Commands

> [!NOTE]
> بعد ما ثبّتنا Ubuntu هندخل عليه ونفتح الـ **Terminal**، ونتعلم أول أوامر: نطبع، ونعرف إحنا فين، ونعرض المحتوى، ونتنقل، ونعمل ونمسح فولدرات وملفات، ونكتب جوه ملف.

## 1. البداية مع Ubuntu

1. **User login page**: تختار المستخدم.
2. **Password page**: تكتب الباسورد.
3. **Accessing the terminal**: تفتح الـ Terminal (من Applications، أو بالاختصار **Ctrl + Alt + T**).

> [!TIP]
> شكل السطر في الـ terminal: `user@hostname:~$`
> - `~` معناها إنك في الـ **home directory** بتاعك.
> - `$` معناها إنك **مستخدم عادي**، ولو ظهرت `#` تبقى **root**.

## 2. الأوامر الأساسية

| الأمر | بيعمل إيه | مثال |
|---|---|---|
| `echo` | **يطبع نص** على الـ terminal | `echo "Hello"` |
| `pwd` | **present working directory**: يعرّفك إنت فين في شجرة الملفات | `pwd` ← `/home/ahmed` |
| `ls` | **يعرض محتوى** الفولدر (list) | `ls` |
| `cd` | **change directory**: يغيّر مكانك في الشجرة | `cd Documents` |
| `mkdir` | **يعمل فولدر** فاضي (make directory) | `mkdir lab2` |
| `rmdir` | **يمسح فولدر فاضي** (remove directory) | `rmdir lab2` |
| `touch` | **يعمل ملف** فاضي | `touch notes.txt` |
| `rm` | **يمسح ملف** | `rm notes.txt` |
| `cat` | **يعرض محتوى** ملف | `cat notes.txt` |
| `>` | **يكتب** output في ملف (redirect) | `echo "hi" > notes.txt` |

### أمثلة عملية

```bash
echo "Hello Linux"          # Hello Linux
pwd                         # /home/student
ls                          # Desktop  Documents  Downloads ...
cd Documents                # move into Documents
cd ..                       # go up one level
cd ~                        # back to home
mkdir os_lab                # create folder
rmdir os_lab                # delete it (must be empty)
touch file1.txt             # create empty file
echo "OS section 2" > file1.txt   # write content into the file
cat file1.txt               # OS section 2
rm file1.txt                # delete the file
```

### الكتابة في ملف بـ `cat` و `>`

```bash
cat > myfile.txt            # type the text, then press Ctrl + D to save
cat myfile.txt              # show the content
echo "one line" > myfile.txt   # the same thing in one line
```

> [!WARNING]
> - `>` **بيمسح المحتوى القديم** ويكتب الجديد مكانه.
> - `>>` بيضيف **في آخر** الملف من غير ما يمسح.
> - `rmdir` بيمسح الفولدر **لو فاضي بس**. لو فيه ملفات استخدم `rm -r folder`.

### أشهر استخدامات `cd`

| الأمر | المعنى |
|---|---|
| `cd folder` | ادخل فولدر |
| `cd ..` | اطلع مستوى لفوق (parent) |
| `cd ~` أو `cd` | ارجع للـ home |
| `cd /` | روح للـ root |
| `cd -` | ارجع للمكان اللي كنت فيه قبل كده |

## ✅ الخلاصة
- `echo` يطبع · `pwd` إنت فين · `ls` اعرض · `cd` اتنقل.
- `mkdir` / `rmdir` للفولدرات · `touch` / `rm` للملفات.
- `cat` يعرض · `>` يكتب (ويمسح القديم) · `>>` يضيف.
