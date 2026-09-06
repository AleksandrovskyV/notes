<br><br><br>

### минификация html 
117  кб     > 67кб<br>
3531 строка > 669 строк

upd.. может сломать верстку<br>
up2.. не поддерживает CSS Nesting - не знаю что это...<br>
up3.. просто убрал группировку одним селектором и вроде хорошо<br>
<https://www.toptal.com/developers/html-minifier>

### минификация svg
copy from<br>
<https://svgomg.net> and paste to <br>
<https://yoksel.github.io/url-encoder/>

### минификация шрифта 
из ttf > woff2 > и на выходе сразу байткод для css <br>
<https://transfonter.org/>

### минификация png
Выставляю "output format : css background", <br>
чтобы сразу вставить в `обои.css`<br>
<https://base64.guru/converter/encode/image/png>

### true fast ico
<https://redketchup.io/icon-converter>

### favicon
<https://favicon.im/ru/convert/svg-to-favicon>

### ЦСС
css cелектор для элемента c тегом "class" будучи внутри div элемента с наличием id.. <br>
Сложно? Я сам ничерта не понял
```bash
<div> id="element" </div>
    <div> class="text" </div>
</div> 
```
будет выглядеть так: `#element .text`<br><br>
Удачи!


