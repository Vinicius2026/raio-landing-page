import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Make the wrapper relative and insert the #N badge
def fix_card(m):
    block_comment = m.group(1)
    class_def = m.group(2)
    inner_content = m.group(3)
    num = m.group(4)
    title = m.group(5)
    
    new_class = class_def
    if "relative" not in new_class:
        new_class = new_class.replace('deliverable-block', 'deliverable-block relative')
        
    badge = f'<span class="absolute top-3.5 right-3.5 text-[10px] font-black text-[#A8203E]/40 tracking-wider">#{num}</span>'
    
    new_inner = inner_content.replace(f'{num}. {title}', title)
    
    return f'{block_comment}\n                                <div class="{new_class}">\n                                    {badge}\n{new_inner}'

# Regex to capture the block:
# 1. <!-- Bloco: Name -->
# 2. <div class="...">
# 3. Everything inside until the title span
# 4. Number (1-4)
# 5. Title (Treinamento, etc)
pattern = re.compile(
    r'(<!-- Bloco: \w+ -->)\s*\n\s*<div class="([^"]*)">\n(.*?<span class="text-\[9px\] font-black uppercase tracking-\[0\.2em\] text-\[#C4284A\]">)(\d+)\.\s*([^<]+)</span>',
    re.DOTALL
)

html = pattern.sub(fix_card, html)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Cards updated!")
