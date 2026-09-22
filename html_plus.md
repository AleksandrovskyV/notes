Заметки связанные с html...
<br>

### favicon
выдаёт сразу комплектом и в бой<br>
<https://favicon.im/ru/convert/svg-to-favicon>

<br>

- ##  w sublime...
...text!
<details markdown="1">
<summary><strong> shortcut </strong></summary>

например \[ CTRL + SHIFT + P \],<br>
чтобы вызвать ~~MarkdownPreviewEnhanced~~, [GitpubPreview](https://aleksandrovskyv.github.io/GitpubPreview/)!<br>
дабы посмотреть `README.md` с кастомным `.css`

</details>

## минификации...
...разные!

<details markdown="1"><summary><strong> expand </strong></summary>

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


</details>

## цсс
css cелектор для элемента c тегом "class" будучи внутри div элемента с наличием id.. <br>
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