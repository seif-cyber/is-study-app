# 📚 IS Study — مذاكرة قسم IS

أبلكيشن مذاكرة (PWA) لمواد **الترم الأول — الفرقة التالتة — قسم IS** (2025/2026).
بيتثبت على الأندرويد والآيفون، وبيشتغل أوفلاين.

## المميزات
- 📖 شرح مفصل لكل محاضرة وسكشن (عربي مع المصطلحات بالإنجليزي) فيه رسومات وجداول
- 📄 فتح المحاضرة الأصلية (PDF) جوه الأبلكيشن
- ❓ 50 سؤال MCQ لكل محاضرة، ولو غلطت بيشرحلك
- 🎯 مراجعة مخصصة: اختار أول 4 أو أول 5 محاضرات أو أي مجموعة، وامتحان تجريبي بتايمر، وملخص مركز، وأسئلة مقالي
- 📕 كراسة الغلطات · 🃏 Flashcards (تكرار متباعد) · 📊 نقط الضعف وعداد الامتحانات
- 🗒 ملاحظات و Bookmarks · 🔤 قاموس مصطلحات · 🔎 بحث

## المواد
| المادة | النوع |
|---|---|
| Operating Systems | General |
| Computer Networks | General |
| Operations Research (1) | General |
| Information Systems | IS |
| Storage Technologies | IS |
| System Analysis & Design | IS |

## التطوير
```bash
npm install
npm run dev      # تشغيل محلي
npm run check    # فحص المحتوى (عدد الأسئلة، الإجابات، الصور)
npm run build
```

### هيكل المحتوى
```
content/t1/<course>/course.json        # بيانات المادة والمحاضرات
content/t1/<course>/<unit>/lesson.md   # الشرح
                          summary.md   # الملخص
                          quiz.json    # [{ q, choices[4], answer, explain, topic }]
                          cards.json   # [{ front, back }]
                          essay.json   # [{ q, a }]
                          glossary.json# [{ en, ar, def }]
public/img/<course>/<unit>/*.webp      # رسومات المحاضرة
```

النشر أوتوماتيك على GitHub Pages مع كل push على `main`.
