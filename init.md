<br><br>

## \[ naming drives \]
В Windows предпочитаю давать имена жёстким дискам вклачая<br>
в них букву "letter", на которую они ссылаются. Пример:<br>
Вместо `MySummer311 (E:)`<br> 
именую типа `DiskE (E:)`<br><br>

Переподключая ясно знаешь, кем он был...<br>

<br>

## \[ cmd.exe \] - быстро
Вызвать терминал<!-- командной строки\\консоли--> по текущей директории в Windows,<br>можно просто вбив в строку проводника `cmd`<!-- в адресную строку, путь-->...<br>_\* easy-peasy_<br>

<br>

## \[ mobile.html \] - local preview 

> Вместо бесконечных пушей в <a style="color: black; text-decoration: underline;" href="https://desktop.github.com/download/">Github Desktop</a>, вечно забываю,   
> что можно смотреть мобильную версию .html с телефона - локально...  
> \* *разумеется, если установить себе на Windows - <a style="color: black; text-decoration: underline;" href="https://www.python.org">python</a>* 

Для этого в <strong>cmd.exe</strong> ввожу ( *копируя отсюда* ) команду
<pre><code>python -m http.server</code></pre>

Страница `index.html`  
из папки где был запущен сервер  
станет дооступна в браузере
<table>
  <tr>
    <td> ПК по адресу</td>
    <td align="right"><strong>localhost:8000</strong></td>
  </tr>
  <tr>
    <td> Мобилы по ip ПК</td>
    <td align="right"><strong>192.168.0.10:8000</strong></td>
  </tr>
</table>

<details><summary>А если вбить:</summary>
<pre><code>python -m http.server 963</code></pre>
<p>Внезапно станет доступна в ПК по адресу: <code>localhost:963</code></p>

<details><summary>Есть ещё...</summary>
<pre><code>python -m http.server 963 --bind 0.0.0.0</code></pre>
<p>Но я не знаю что она делает...</p>

<details markdown="1"><summary>....</summary>

только не пытайся автоматизировать <a style="color: black; text-decoration: underline;" href="https://github.com/AleksandrovskyV/svg_viewer">это</a><br>
используя упомянутый выше модуль `http.server`<br> 
ведь есть `flask` \ `fastapi`, с приятными вызовами <br> 
и кучей бонусов в придачу<br> 

</details>

</details>

</details>

<br>

## \[ make.ico \]
Одной ссылкой -\
<https://redketchup.io/icon-converter>

<br><br>

