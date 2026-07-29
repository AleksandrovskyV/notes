Вместо бесконечных пушей, постоянно забываю, что можно быстро <br>
смотреть мобильную версию прямо с телефона - локально...

### инструкт

Для этого в cmd.exe (с установленным python естественно) ввожу команду<br>
```bash
python -m http.server
```

Файл "index.html" станет дооступен из браузера по адресу: localhost:8000<br><br>

А если вбить:<br>

```bash
python -m http.server 8080
```
Внезапно страница станет доступна по адресу: localhost:8080<br><br>

Есть ещё - <br>
```bash
python -m http.server 8000 --bind 0.0.0.0
```
Но я не знаю что она делает...<br><br>

На телефоне нужно будет вбить ip компьютера<br>
Мне пришлось вбивать 192.168.0.10:8000 (порт обязателен)

### cmd.exe быстро
Чтобы быстро его открыть достаточно в адресную строку проводника вбить cmd - `easy peasy`

### минификация html 
117  кб     > 67кб<br>
3531 строка > 669 строк

upd.. может сломать верстку<br>
up2.. не поддерживает CSS Nesting - не знаю что это...
up3.. просто убрал группировку одним селектором и вроде хорошо
<https://www.toptal.com/developers/html-minifier>

### минификация svg
copy from<br>
https://svgomg.net <br>
paste to <br>
https://yoksel.github.io/url-encoder/

### минификация шрифта 
из ttf > woff2 > сразу для css <br>
https://transfonter.org/

### минификация png
Выставляю сразу "output format (css background)",<br>
чтобы сразу вставить в styles.css
https://base64.guru/converter/encode/image/png


