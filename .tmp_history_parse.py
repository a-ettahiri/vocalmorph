import json, os
src = ".tmp_history/saas_app_20261022-135209.json"
with open(src, encoding="utf-8") as f:
    j = json.load(f)
doc = j["nodes"]["593:4624"]["document"]
fx = doc["absoluteBoundingBox"]["x"]; fy = doc["absoluteBoundingBox"]["y"]
fw = doc["absoluteBoundingBox"]["width"]; fh = doc["absoluteBoundingBox"]["height"]
out = []
out.append(f"FRAME {doc.get('id')} {doc.get('name')} size={fw}x{fh} origin=({fx},{fy})")
out.append(f"fills={json.dumps(doc.get('fills'))[:500]}")
def fmt_fill(f):
    if not f: return "none"
    t = f.get("type"); c = f.get("color",{})
    o = f.get("opacity",1)
    if t=="SOLID": return f"SOLID rgba({c.get('r')},{c.get('g')},{c.get('b')},{c.get('a')}) op={o}"
    return f"{t} {json.dumps(f)[:200]}"
def style_str(n):
    s = n.get("style",{})
    if not s: return ""
    return f"font={s.get('fontFamily')} w={s.get('fontWeight')} sz={s.get('fontSize')} lh={s.get('lineHeightPx')} ls={s.get('letterSpacing')} align={s.get('textAlignHorizontal')}"
def walk(n, d=0):
    bb = n.get("absoluteBoundingBox") or {}
    rx = round((bb.get("x",0))-fx,2); ry = round((bb.get("y",0))-fy,2)
    w = round(bb.get("width",0) or 0,2); h = round(bb.get("height",0) or 0,2)
    ch = (n.get("characters") or "").replace("\n"," | ")[:160]
    fills = n.get("fills")
    fill_s = ""
    if fills:
        fill_s = " fills=["+",".join(fmt_fill(f) for f in fills)[:300]+"]"
    extra = ""
    if n.get("type")=="TEXT":
        extra = " "+style_str(n)+f" chars={repr(ch)}"
    elif n.get("type") in ("RECTANGLE","ELLIPSE","VECTOR"):
        if n.get("cornerRadius") is not None: extra += f" radius={n.get('cornerRadius')}"
        if n.get("strokes"): extra += f" strokes={json.dumps(n.get('strokes'))[:200]}"
    out.append("  "*d + f"{n.get('id')}|{n.get('name')}|{n.get('type')}|rel=({rx},{ry}) {w}x{h}{fill_s}{extra}")
    if d < 6:
        for c in (n.get("children") or []):
            walk(c, d+1)
walk(doc,0)
out.append("")
out.append("ASSETMAP framelinkExport.assets:")
fe = j.get("framelinkExport",{})
assets = fe.get("assets",{})
if isinstance(assets, dict):
    for k,v in assets.items():
        out.append(f"  {k} -> {v}")
else:
    out.append(f"  assets type={type(assets)} val={str(assets)[:2000]}")
os.makedirs(".tmp_history", exist_ok=True)
with open(".tmp_history/summary.txt","w",encoding="utf-8") as f:
    f.write("\n".join(out))
print(f"wrote {len(out)} lines")
