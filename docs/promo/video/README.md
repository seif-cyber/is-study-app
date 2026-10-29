# فيديو الإعلان (HyperFrames)

تكوين 1080×1920 (9:16)، مدته 65 ثانية، ومتزامن مع `vo.mp3`.

```bash
cd docs/promo/video
npx hyperframes@0.8.216 snapshot --at 5,20,40,62   # صور للمراجعة
npx hyperframes@0.8.216 render -o promo.mp4        # الفيديو النهائي
```

- **صورة م. سيف:** حط الصورة هنا باسم `seif.jpg`، وفي `index.html` حط `<img src="seif.jpg" />` جوه `#s8av` مكان الإيموجي.
- **صور الشاشات** في `shots/` متصورة من الأبلكيشن (dark mode، 390×844 @3x).
- **GSAP والخطوط** موجودين محليًا، عشان الرندر ميعتمدش على CDN.
