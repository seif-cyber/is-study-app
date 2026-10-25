"""Rotate each question's correct answer (authored at index 0) to position i % n,
so answer keys are evenly spread. Usage: python3 scripts/place-answers.py path/to/quiz.json"""
import json
import sys

path = sys.argv[1]
qs = json.load(open(path))
out = []
for i, q in enumerate(qs):
    if q.get('answer', 0) != 0:
        out.append(q)  # already placed by hand
        continue
    ch = q['choices']
    pos = i % len(ch)
    q['choices'] = ch[1:pos + 1] + [ch[0]] + ch[pos + 1:]
    q['answer'] = pos
    out.append(q)
with open(path, 'w') as f:
    f.write('[\n' + ',\n'.join('  ' + json.dumps(q, ensure_ascii=False) for q in out) + '\n]\n')
print(path, len(out))
