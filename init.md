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

Страница "index.html" из папки где был запущен сервер<br>
станет дооступна в браузере ПК по адресу: localhost:8000<br><br>

Чтобы увидеть эту страницу с телефона, в его браузер нужно<br>
вбить ip адрес компьютера, где был запущен сервер.<br>
Мне пришлось вбивать `192.168.0.10:8000` \*порт обязателен<br>

<details><summary>А если вбить:</summary>
<pre><code>python -m http.server 8080</code></pre>
<p>Внезапно страница станет доступна по адресу: localhost:8080</p>

<details><summary>Есть ещё...</summary>
<pre><code>python -m http.server 8000 --bind 0.0.0.0</code></pre>
<p>Но я не знаю что она делает...</p>

<details><summary>....</summary>
только не пытайся автоматизировать <a style="color: black; text-decoration: underline;" href="https://github.com/AleksandrovskyV/svg_viewer">это</a><br>
используя упомянутый выше модуль "http.server"<br> 
ведь есть flask\fastapi, с приятными вызовами <br> 
и кучей бонусов<br> 


</details>
</details>

</details>

<br>

## \[ make.ico \]
Одной ссылкой -\
<https://redketchup.io/icon-converter>

<br><br>