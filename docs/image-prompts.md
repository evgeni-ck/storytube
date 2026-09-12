# Промптове за илюстрации / Image prompts

Целта е всички 37 картини да изглеждат като една серия: реалистична историческа живопис в духа на българската академична школа (Гюдженов, Мърквичка, Вешин), но топла и разбираема за дете на 7–8 години. Без кръв, без насилие в кадър, без надписи и текст в картината.

The goal is one consistent series: realistic historical oil painting in the spirit of the Bulgarian academic school, warm and legible for a 7–8-year-old. No blood, no on-screen violence, no text or lettering in the image.

## Как се използват / How to use

1. Generate each image at **16:9** (1280×720 or larger) in any AI image tool (Midjourney, DALL·E / ChatGPT, Imagen, Stable Diffusion). Paste the **style preamble** first, then the holiday prompt.
2. Save as `public/img/<slug>.jpg` (or `.png` / `.webp`), using the exact slug from the table. Keep JPEGs under ~300 KB; 1280×720 at quality 80 is plenty.
3. Run `npm run images` — it rewrites `thumbnail` in `public/holidays.json` for every slug that has a raster file, and falls back to the `.svg` where there is none. Then `npm run check`, commit, push.

## Style preamble (paste before every prompt)

```
Realistic oil painting in the style of late 19th-century Bulgarian academic historical painting, warm natural light, rich earthy palette with deep greens and reds, visible but fine brushwork, wide cinematic 16:9 composition, clear single focal point, dignified and hopeful mood suitable for a children's history book, no text, no lettering, no watermark, no blood, no weapons pointed at people.
```

## Prompts

| slug | Заглавие | Prompt |
|---|---|---|
| `nova-godina` | Нова година | A Bulgarian family gathered around a festive table at midnight, an old wall clock striking twelve, a large round banitsa on the table, candlelight, fireworks visible through a frosted window, children smiling. |
| `osvobozhdenie` | Ден на Освобождението | The Freedom Monument on Shipka Peak at dawn on 3 March, Bulgarian tricolour flags, a crowd of families climbing the stone stairs with flowers, snow on the Balkan ridges, golden light breaking through clouds. |
| `velikden` | Великден | An Orthodox Easter morning in a Bulgarian village yard: a table with red and painted eggs and a braided kozunak, a grandmother handing a red egg to a child, church bell tower and blossoming fruit trees behind. |
| `den-na-truda` | Ден на труда | Bulgarian workers of many trades — a baker, a doctor, a teacher, a farmer, a builder — standing together proudly in a sunny town square on 1 May, spring trees in bloom. |
| `gergyovden` | Гергьовден | Saint George on a white horse in the style of a Bulgarian icon painting brought to life, a green spring meadow with a flock of lambs, a swing hanging from an old oak, children in folk costume. |
| `den-na-bukvite` | 24 май | Saints Cyril and Methodius holding an open scroll with the first Slavic letters, in the manner of the classic Bulgarian school portrait, with a procession of schoolchildren carrying flowers and flags below them. |
| `saedinenie` | Ден на Съединението | Plovdiv, 6 September 1885: a jubilant crowd on the main square under the old clock tower hill, men lifting a Bulgarian flag, women waving from balconies, the two halves of the country symbolically joined. |
| `nezavisimost` | Ден на независимостта | Veliko Tarnovo, 22 September 1908: the church of the Holy Forty Martyrs, Prince Ferdinand reading the manifesto before officers and citizens, the Tsarevets hill behind, autumn light. |
| `buditeli` | Ден на народните будители | The monk Paisiy of Hilendar writing his History by candlelight in a stone monastery cell, a quill in hand, shelves of hand-written books, warm light on his focused face. |
| `badni-vecher` | Бъдни вечер | A Bulgarian Christmas Eve table with an odd number of meatless dishes, a round pitka bread with a hidden coin, walnuts, dried fruit, a single candle, straw under the tablecloth, a family bowing heads. |
| `koleda` | Коледа | Koledari carol singers in sheepskin coats and tall hats decorated with popcorn strings walking through a snowy Bulgarian village at night, lantern light, a family opening a door to greet them. |
| `levski-obesvane` | Ден в памет на Васил Левски | A solemn portrait of Vasil Levski in his revolutionary years, calm and determined, standing at dusk before a wide Bulgarian landscape with the Balkan mountains, a soft memorial light. |
| `tarnovska-konstitutsia` | Търновска конституция | The Constituent Assembly in Veliko Tarnovo, 1879: bearded delegates in 19th-century coats around a long table signing a large document, a Bulgarian flag on the wall, spring light through tall windows. |
| `aprilsko-vastanie` | Априлското въстание | Rayna Knyaginya embroidering the green silk flag of the April Uprising with a golden lion, women and girls gathered around her in a Panagyurishte house, 1876, warm lamplight. |
| `botev` | Ден на Ботев | Hristo Botev standing on the Danube bank at Kozloduy in 1876 with his raised sabre and the green flag, his cheta kneeling to kiss the soil, the steamboat Radetzky on the wide river behind. |
| `vazov` | Рождението на Иван Вазов | Ivan Vazov as an older man with a white beard sitting on a rock above the Rila lakes with an open notebook, the mountains he loved behind him, clear alpine light. |
| `levski-rozhdenie` | Рождението на Васил Левски | Young Vasil Levski as a boy in Karlovo in the 1840s, running through a rose field with the Balkan mountains behind, his family's stone house with a red roof, morning light. |
| `shipka` | Шипченската епопея | Bulgarian volunteers (opalchentsi) and Russian soldiers on the rocky summit of Shipka Pass in August 1877, holding the line together, hurling stones, dramatic sky, seen from a distance so no faces show pain. |
| `pleven` | Плевенската епопея | The snow-covered fields outside Pleven in December 1877, Russian and Romanian soldiers lowering their rifles as the siege ends, Osman Pasha's carriage surrendering, a grey winter sky with a break of light. |
| `surva` | Сурва | Survakari children on New Year morning tapping the backs of smiling grandparents with decorated cornel-wood survachka branches strung with popcorn and dried fruit, snowy village yard. |
| `yordanovden` | Йордановден | Epiphany at a Bulgarian river in January: a priest throwing a wooden cross into the icy water, young men leaping in to catch it, mist over the river, snowy banks, a cheering crowd. |
| `baba-marta` | Баба Марта | A smiling grandmother in traditional dress tying a red-and-white martenitsa on a child's wrist under a blossoming tree, a stork landing on a chimney, the first day of March. |
| `sirni-zagovezni` | Сирни заговезни | A Bulgarian village on the Sunday before Lent: a large bonfire with families around it, children trying to catch a piece of halva swinging on a string with their mouths, kukeri masks in the background. |
| `todorovden` | Тодоровден | Horse races (kushii) on Saint Theodore's Day in a Bulgarian village meadow, riders in folk dress on decorated horses, a woman holding a horseshoe-shaped ritual bread. |
| `lazarovden` | Лазаровден | Lazarki — girls in bright embroidered folk costumes with flower wreaths — dancing and singing in the yard of a Bulgarian Revival house, a grandmother giving them eggs from a basket. |
| `tsvetnitsa` | Цветница | Palm Sunday in Bulgaria: families leaving a small Orthodox church holding willow branches, willow wreaths hung on doors, spring flowers everywhere, soft April light. |
| `enyovden` | Еньовден | Sunrise on Midsummer's Day over Bulgarian meadows, girls in folk dress gathering herbs and weaving a large wreath, dew on the grass, the sun just clearing the hills. |
| `dimitrovden` | Димитровден | Saint Demetrius on a red horse in the manner of a Bulgarian icon, riding over autumn hills as the first snowflakes fall, shepherds bringing flocks down from the mountain. |
| `nikulden` | Никулден | Saint Nicholas calming a storm above a small fishing boat on the Black Sea in icon-inspired style, and below, a family table with a whole baked carp in bread (ribnik). |
| `ignazhden` | Игнажден | A cheerful first guest (polaznik) stepping over the threshold of a Bulgarian village house on 20 December, holding a green branch, the family welcoming him by the hearth, snow outside. |
| `den-na-maichiniya-ezik` | Ден на майчиния език | A Bulgarian classroom where children read aloud from a book with large Cyrillic letters on the board behind, a portrait of Cyril and Methodius on the wall, warm afternoon light. |
| `osmi-mart` | Ден на жената и майката | A child giving a bouquet of snowdrops and tulips and a hand-made card to a smiling mother and grandmother in a sunlit Bulgarian home, early spring. |
| `den-na-humora` | Ден на хумора | The Gabrovo carnival on 1 April: a joyful street parade with masks, a giant cat figure, laughing children and townspeople, Bulgarian Revival houses along the street. |
| `den-na-detskata-kniga` | Ден на детската книга | Children lying on a rug in a cosy library reading picture books, a stack of Bulgarian and world fairy-tale books beside them, a window with spring light, a small duckling figurine on the shelf. |
| `den-na-zemyata` | Ден на Земята | Bulgarian schoolchildren planting a young tree together in a green park with the Vitosha mountain behind, watering cans and shovels, clear blue sky. |
| `den-na-deteto` | Ден на детето | Children on 1 June drawing a colourful chalk rainbow on the pavement of a Sofia park, balloons rising, ice-cream cart, laughter, bright summer light. |
| `den-na-uchitelya` | Ден на учителя | A kind teacher at a blackboard in a Bulgarian classroom receiving flowers from her pupils, an apple on the desk, autumn leaves outside the window. |

## Бележки за точност / Accuracy notes

- Real people (Botev, Levski, Vazov, Paisiy, Ferdinand): AI tools rarely get likenesses right. Prefer three-quarter or distant views, and check the moustache/beard and period dress against a reference photo.
- Uniforms: Botev's cheta wore dark green tunics with a lion badge on the cap; Bulgarian volunteers at Shipka wore Russian-style uniforms; 1908 officers wore dark blue.
- Flags: the 1876 flag is green silk with a golden lion and "Свобода или смърт" — leave the lettering out of the image, the site text explains it.
