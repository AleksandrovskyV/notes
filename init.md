<br><br>

## \[ cmd.exe \] - быстро
Вызвать терминал<!-- командной строки\\консоли--> по текущей директории в Windows,<br>можно просто вбив в строку проводника `cmd`<!-- в адресную строку, путь-->...<br>_\* easy-peasy_<br><br>


## \[ mobile.html \] - local preview 

> Вместо бесконечных пушей, постоянно забываю, что можно быстро\
> смотреть мобильную версию прямо с телефона - локально...\
> \* *естественно, с установленным <a style="color: black; text-decoration: underline;" href="https://www.python.org">python</a>* 

<br>

Для этого в <strong>cmd.exe</strong> ввожу ( *копируя отсюда* ) команду
<pre><code>python -m http.server</code></pre>

Файл "index.html" станет дооступен из браузера по адресу: localhost:8000<br>
<details><summary>А если вбить:</summary>
<pre><code>python -m http.server 8080</code></pre>
<p>Внезапно страница станет доступна по адресу: localhost:8080</p>

<details><summary>Есть ещё...</summary>
<pre><code>python -m http.server 8000 --bind 0.0.0.0</code></pre>
<p>Но я не знаю что она делает...</p>

<p>На телефоне нужно будет вбить ip компьютера<br>
Мне пришлось вбивать 192.168.0.10:8000 (порт обязателен)</p>

<details><summary>....</summary>
можно написать скрипт используя модуль "http.server", 
автоматизировав отдачу html файлов по заданным маршрутам 
(без flask\fastapi, хотя маршутизация у них приятнее с кучей бонусов)
что-то <a style="color: black; text-decoration: underline;" href="https://github.com/AleksandrovskyV/svg_viewer">подбное</a> с моего пк

</details>
</details>

</details>

<br>

## \[ make.ico \]
Одной ссылкой -\
<https://redketchup.io/icon-converter>

<br><br>