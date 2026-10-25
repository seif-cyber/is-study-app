# usage: pimg.py PDF OUTDIR page[:name] ...  -> largest embedded image on that page, saved as webp
import sys,subprocess,os,tempfile,glob
from PIL import Image
pdf,out=sys.argv[1],sys.argv[2]; os.makedirs(out,exist_ok=True)
for spec in sys.argv[3:]:
    p,*nm=spec.split(':'); p=int(p); name=nm[0] if nm else f'p{p:02d}'
    with tempfile.TemporaryDirectory() as td:
        subprocess.run(['pdfimages','-f',str(p),'-l',str(p),'-png',pdf,td+'/i'],check=True)
        best=None
        for f in glob.glob(td+'/i-*.png'):
            im=Image.open(f)
            if im.mode in ('L','1') : continue
            if not best or im.width*im.height>best.width*best.height: best=im.copy()
    if not best: print('none',p); continue
    best=best.convert('RGB')
    if best.width>1100: best=best.resize((1100,int(best.height*1100/best.width)),Image.LANCZOS)
    best.save(f'{out}/{name}.webp','WEBP',quality=85); print(name,best.size)
