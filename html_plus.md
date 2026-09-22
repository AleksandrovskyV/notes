Заметки связанные с html...
<br><br>

## favicon
выдаёт сразу комплектом и в бой<br>
<https://favicon.im/ru/convert/svg-to-favicon><br><br>

## sublime...
...text!
<details markdown="1"><summary><strong> shortcut __</strong></summary><br>

например \[ <b>CTRL</b> + <b>SHIFT</b> + <b>P</b> \]  
чтобы вызвать ~~MarkdownPreviewEnhanced~~, <b>&nbsp;[GitpubPreview](https://aleksandrovskyv.github.io/GitpubPreview/) !</b> <br>
дабы видеть `README.md` с кастомным `.css`<br>

</details><br>

## минификации...
...разные!

<details markdown="1"><summary><strong> expand __</strong></summary>

- ### \[ шрифта \]

    из ttf > woff2 > и на выходе сразу байткод для css  
    <https://transfonter.org/>


- ### \[ .html \]

    117  кб     > 67кб  
    3531 строка > 669 строк

    upd.. может сломать верстку  
    up2.. не поддерживает CSS Nesting - не знаю что это...  
    up3.. просто убрал группировку одним селектором и вроде хорошо  
    <https://www.toptal.com/developers/html-minifier>


- ### \[ .svg \]

    copy from<br>
    <https://svgomg.net> and paste to <br>
    <https://yoksel.github.io/url-encoder/>


- ### \[ .png \]

    Выставляю "output format : css background", <br>
    чтобы сразу вставить в `обои.css`<br>
    <https://base64.guru/converter/encode/image/png>


</details><br>

## цсс
`css` cелектор для элемента c тегом "class" будучи внутри div элемента с наличием id.. <br>
Сложно? Я сам ничерта не понял
```bash
<div> id="element" </div>
    <div> class="text" </div>
</div> 
```
будет выглядеть так: `#element .text`<br>

Удачи!<br><br><br>

\* и на страницах с текстом аккуратнее с vh,<br>т.к. вёрсточка может скакать при открытии<br>через _"social web wrappers"_


<br><br><br>