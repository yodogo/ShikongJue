import os
from PIL import Image

def remove_white_bg(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        from rembg import remove
        with open(input_path, 'rb') as i:
            with open(output_path, 'wb') as o:
                input_data = i.read()
                output_data = remove(input_data)
                o.write(output_data)
        print(f"Saved to {output_path} (rembg)")
    except ImportError:
        print("rembg not found, using simple PIL white replacement")
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()
        newData = []
        for item in datas:
            # Change all white (also shades of whites)
            # to transparent
            if item[0] > 220 and item[1] > 220 and item[2] > 220:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Saved to {output_path} (PIL)")

images = {
    r"C:\Users\JK\.gemini\antigravity\brain\3494cc7e-fadf-4603-877c-8b2dd1a466cd\guan_yu_attack_a_1771719212093.png": "public/guan_yu_attack_a.png",
    r"C:\Users\JK\.gemini\antigravity\brain\3494cc7e-fadf-4603-877c-8b2dd1a466cd\guan_yu_attack_s_1771719231269.png": "public/guan_yu_attack_s.png",
    r"C:\Users\JK\.gemini\antigravity\brain\3494cc7e-fadf-4603-877c-8b2dd1a466cd\guan_yu_attack_d_1771719250111.png": "public/guan_yu_attack_d.png",
    r"C:\Users\JK\.gemini\antigravity\brain\3494cc7e-fadf-4603-877c-8b2dd1a466cd\guan_yu_attack_f_1771719266214.png": "public/guan_yu_attack_f.png",
    r"C:\Users\JK\.gemini\antigravity\brain\3494cc7e-fadf-4603-877c-8b2dd1a466cd\qin_qiong_attack_h_1771719297846.png": "public/qin_qiong_attack_h.png",
    r"C:\Users\JK\.gemini\antigravity\brain\3494cc7e-fadf-4603-877c-8b2dd1a466cd\qin_qiong_attack_j_1771719320412.png": "public/qin_qiong_attack_j.png",
    r"C:\Users\JK\.gemini\antigravity\brain\3494cc7e-fadf-4603-877c-8b2dd1a466cd\qin_qiong_attack_k_1771719340283.png": "public/qin_qiong_attack_k.png",
    r"C:\Users\JK\.gemini\antigravity\brain\3494cc7e-fadf-4603-877c-8b2dd1a466cd\qin_qiong_attack_l_1771719358939.png": "public/qin_qiong_attack_l.png"
}

for inp, out in images.items():
    if os.path.exists(inp):
        remove_white_bg(inp, out)
    else:
        print(f"File not found: {inp}")
