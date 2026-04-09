import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update the bonus-cards container classes
old_container_regex = r'<div class="bonus-cards[^>]*>'
new_container = '<div class="bonus-cards mt-6 md:mt-8 flex overflow-x-auto touch-pan-x sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6 -mx-4 px-4 sm:mx-0 sm:px-0 w-[calc(100%+2rem)] sm:w-full reveal pb-4 sm:pb-8 snap-x snap-mandatory scrollbar-hide py-4">'
html = re.sub(old_container_regex, new_container, html, count=1)

# 2. Extract and remove the background glow effect
html = html.replace('<!-- Subtle Glowing Background effect for the whole section to match the orange lights -->\n                            <div class="absolute inset-0 bg-brand-orange/5 blur-[120px] pointer-events-none -z-10"></div>', '')
html = html.replace('<!-- Subtle Glowing Background effect for the whole section to match the orange lights -->\r\n                            <div class="absolute inset-0 bg-brand-orange/5 blur-[120px] pointer-events-none -z-10"></div>', '')
html = html.replace('<div class="absolute inset-0 bg-brand-orange/5 blur-[120px] pointer-events-none -z-10"></div>', '')

# 3. Update the individual cards
# They need to be 3 per mobile screen, so about 30vw or less, with snap-center.
# Remove card-item (which had CSS animations) and drift hover effect.
def replace_card(m):
    cls = m.group(1)
    cls = cls.replace('card-item', 'carousel-card')
    cls = cls.replace('w-[42vw]', 'w-[30vw] min-w-[110px]')
    cls = cls.replace('snap-start', 'snap-center')
    cls = cls.replace('hover:-translate-y-1', '')
    cls = cls.replace('transform-gpu', '')
    # Replace any multiple spaces with single space
    cls = re.sub(r'\s+', ' ', cls).strip()
    return f'<div class="{cls}">'

old_card_regex = r'<div class="(card-item shrink-0 w-\[42vw\][^>]*hover:-translate-y-1 transform-gpu[^>]*)">'
html = re.sub(old_card_regex, replace_card, html)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Replacement complete.")
