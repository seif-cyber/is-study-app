# رفع الأبلكيشن على Firebase (Hosting + تسجيل دخول + Firestore)

الأبلكيشن بيشتغل بطريقتين:
- **من غير Firebase** (زي GitHub Pages دلوقتي): كل حاجة على الجهاز ومفيش تسجيل دخول.
- **مع Firebase**: لازم الطالب يعمل حساب بالإيميل، وتقدّمه بيتحفظ على Firestore، وإنت بتفعّل الحسابات من **لوحة الأدمن** جوه الأبلكيشن.

---

## 1) إنشاء المشروع على Firebase
1. ادخل على https://console.firebase.google.com ← **Add project**.
2. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable**.
3. **Build → Firestore Database → Create database** (اختار region قريبة، مثلًا `europe-west1`) وابدأ بـ **production mode**.
4. **Project settings (⚙️) → General → Your apps → Web (`</>`)** ← سجّل app وانسخ قيم `firebaseConfig`.
5. **Authentication → Settings → Authorized domains**: هتلاقي `PROJECT.web.app` و `PROJECT.firebaseapp.com` موجودين. لو هتستخدم دومين خاص ضيفه هنا.

## 2) إعداد المشروع على جهازك
```bash
npm install
npm install -g firebase-tools
firebase login
cp .env.example .env.firebase.local     # واملأ القيم من firebaseConfig
cp .firebaserc.example .firebaserc      # وحط project id بتاعك
```

القيم المهمة في `.env.firebase.local`:

| المتغير | المعنى |
|---|---|
| `VITE_BASE=/` | Firebase بيخدم الموقع من `/` (مش `/is-study-app/`) |
| `VITE_FIREBASE_*` | قيم `firebaseConfig` (مش سرية، عادي تبقى في الكود) |
| `VITE_REQUIRE_ACCESS=true` | الحساب الجديد **مايدخلش** غير لما تفعّله إنت |
| `VITE_CONTACT` | رقم/لينك التواصل اللي بيظهر للطالب وهو مستني التفعيل |

## 3) الرفع
```bash
npm run deploy:firebase
```
الأمر ده بيعمل: فحص المحتوى ← build بإعدادات Firebase ← رفع **Hosting** + **Firestore rules**.
الموقع هيبقى على `https://PROJECT.web.app`.

## 4) تعيين نفسك أدمن (مرة واحدة)
1. افتح الموقع واعمل حساب بإيميلك.
2. في **Firebase Console → Authentication → Users** انسخ الـ **User UID** بتاعك.
3. **Firestore → Start collection** باسم `admins` ← Document ID = الـ UID ← حقل `role` = `admin`.
4. اعمل refresh: هيظهرلك في **المزيد ← 🛡 لوحة الأدمن**.

من لوحة الأدمن تقدر: تشوف كل الطلاب، **تفعّل/توقف** الحساب، وتشوف آخر ظهور، آخر محاضرة فتحها، عدد اللي قراه ومتوسط درجاته، الجهاز (نظام التشغيل/المتصفح/الشاشة/المنطقة الزمنية)، و**سجل النشاط** (دخول، فتح محاضرة، امتحان + الدرجة).

## 5) شكل البيانات على Firestore
```
users/{uid}                    email, name, access, createdAt, lastLoginAt, lastSeenAt,
                               device {os, browser, mobile, pwa, screen, lang, tz},
                               current {course, unit, at}, stats {unitsRead, quizzesTaken, avgBest, ...}
users/{uid}/private/progress   state (كل تقدم الطالب: الامتحانات، الغلطات، الكروت، الملاحظات...), updatedAt
users/{uid}/events/{id}        type (login | open_unit | quiz_finish), course, unit, score, at, device
admins/{uid}                   أي document هنا = أدمن
```

**قواعد الأمان (`firestore.rules`):** الطالب يقرا ويكتب بياناته بس، **مايقدرش يفعّل نفسه** (`access`)، ومايقدرش يشوف حد تاني. الأدمن بس اللي يشوف الكل ويفعّل.
(اتختبرت على Firebase Emulator: تسجيل، انتظار التفعيل، التفعيل من الأدمن، حفظ واسترجاع التقدم على جهاز تاني، منع التفعيل الذاتي.)

## 6) اختبار محلي من غير ما تلمس المشروع الحقيقي (اختياري)
```bash
firebase emulators:start --only auth,firestore --project demo-isapp
# وفي .env.<mode>.local حط VITE_USE_EMULATOR=true و VITE_FIREBASE_PROJECT_ID=demo-isapp
```

## ⚠️ مهم قبل البيع
1. **GitHub Pages:** الـ workflow الحالي (`.github/workflows/deploy.yml`) بينشر نسخة **مجانية من غير تسجيل دخول** على `seif-cyber.github.io/is-study-app`. لو هتبيع، اقفل GitHub Pages (Settings → Pages) أو امسح الـ workflow، وخلّي الـ repo **private**.
2. **حماية المحتوى:** شاشة الدخول بتمنع الطالب العادي، لكن ملفات الشرح متجمعة جوه الـ JavaScript نفسه، فحد فاهم ممكن يطلّعها من المتصفح. لو عايز حماية حقيقية، المحتوى لازم يتنقل لـ Firestore/Storage وتقرأه القواعد للمفعّلين بس (خطوة تانية).
3. **حقوق المحتوى:** صور السلايدات والشرح مبنيين على محاضرات الدكاترة؛ اتأكد إن ده مسموح قبل ما تبيعه.
4. **الدفع:** مفيش بوابة دفع؛ التفعيل يدوي من لوحة الأدمن بعد ما الطالب يدفع (فودافون كاش/إنستاباي...).
