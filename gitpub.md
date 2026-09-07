\[ *blogger > tumblr > wordpress > bepage > webflow > github* \]
<br><br>
Всё ради возможности выделения текста курсором...<br><br>

<pre>
AleksandrovskyV ( <a style="color:black;text-decoration: underline;" href="https://github.com/AleksandrovskyV">github аккаунт</a> ) и его "репозитории":
    │
    ├─ <a style="color:black;text-decoration: underline;" href="https://github.com/AleksandrovskyV/aleksandrovskyv.github.io/">aleksandrovskyv.github.io/</a> # корень ?
    │   │  * GitHub Pages 
    │   │    - source: deploy from a branch 
    │   │    - branch: main, folder: /root
    │   │    - custom domain: vsky.space, enforce https: on ( купленный через <a href="https://reg.ru">reg.ru</a> )
    │   │
    │   ├─ flipbook/
    │   │    └─ index.html 
    │   ├─ графика/
    │   │    └─ index.html 
    │   │
    │   ├─ 404.html   ( заглушка страницы не найдено )
    │   ├─ CNAME      ( файл содержащий "vsky.space" )
    │   └─ index.html ( главная страница )
    │
    │
    ├─ <a style="color:black;text-decoration: underline;" href="https://github.com/AleksandrovskyV/files/">files/</a> # 2.24 GB static content img, sound, etc > тяжёлые файлы
    │   │  * GitHub Pages  
    │   │    - source: deploy from a branch 
    │   │    - branch: main, folder: /root
    │   │    - custom domain: none, enforce https: on
    │   │
    │   ├─ audio/
    │   │    └─ roll_gears_in.wav
    │   ├─ graphics/
    │   │    └─ g2.png
    │   │
    │   └─ .nojekyll (не трогаются при пересборке/комитах)
    │
    │
    │   * репозитории исключительно из .md файлов
    ├─ ae/ 
    ├─ notes/  
    │   ├─ README.md  >      *  Сборщик Jekyll превратит в index.html (c подкл. style.css)
    │   │                       и при заходе на <a href="https://aleksandrovskyv.github.io/notes/">https://aleksandrovskyv.github.io/notes/</a>
    │   │                                или на <a href="https://vsky.space/notes/">https://vsky.space/notes/</a>
    │   │                  
    │   │                       можно увидеть стандартный шаблон
    │   │                       создаваемой страницы 
    │   │    
    │   ├─ gitpub.md            По каждому файлу ".md" в репе Jekyll создаст отдельную страницу, пример:
    │   └─ chrome_surfer.md  >  <a href="https://aleksandrovskyv.github.io/notes/chrome_surfer">https://aleksandrovskyv.github.io/notes/chrome_surfer</a>
    │
    │
    │   * репозитории отдельных проектов
    ├─ chat/   ссылка > <a href="https://aleksandrovskyv.github.io/chat/">https://vsky.space/chat/</a>
    ├─ fe/     ссылка > <a href="https://aleksandrovskyv.github.io/fe/"  >https://vsky.space/fe/</a>
    │   │  * GitHub Pages 
    │   │    - source: deploy from a branch 
    │   │    - branch: main, folder: /root
    │   │    - custom domain: none, enforce https: off *думаю правила наследуются от рута, но это не точно
    │   │
    │   ├─ .gitignore (документ с перечнем директорий и файлов, которые не будут отправляться на сервер)
    │   ├─ README.md  (описание)
    │   ├─ style.css  (стиль страницы)
    │   └─ index.html
    │          * Заранее созданный файл index.html, поэтому 
    │            Jekyll игнорирует создание index.html по README.md
    │
    │
    │   * репозитория проекта с кастомным workflows
    ├─ c4d/                    <a href="https://github.com/AleksandrovskyV/c4d/">https://github.com/AleksandrovskyV/c4d/</a>
    │   │                         * ссылка на репозиторию
    │   │                      <a href="https://aleksandrovskyv.github.io/c4d">https://aleksandrovskyv.github.io/c4d</a>
    │   │                         * бесплатный домен от Github Pages для репы
    │   │                      <a href="https://vsky.space/c4d/">https://vsky.space/c4d/</a>
    │   │                         * а это подключенный custom domain
    │   │  * GitHub Pages 
    │   │    - source: GitHub Actions
    │   │    - branch: main, folder: /root
    │   │    - custom domain: none, enforce https: on
    │   │
    │   ├─ /.github
    │   │     └─ /workflows
    │   │          └─  <a style="color:black;text-decoration: underline;" href="https://github.com/AleksandrovskyV/c4d/blob/main/.github/workflows/main.yml">main.yml</a>
    │   │              * документ кастомной инструкции сборки конкретно этой репы
    │   │                т.к. нужно было "по особенному" собирать index.html из README.md
    │   ├─ /assets
    │   │    ├─ css/
    │   │    │   └─ <a style="color:black;text-decoration: underline;" href="https://github.com/AleksandrovskyV/c4d/tree/main/assets/css">style.css</a>
    │   │    │       * Базовый шаблон белой темы github(jekyll), создаваемый по шаблону README.md
    │   │    │         из которого я вырезал всё, что только можно было вырезать
    │   │    │   
    │   │    └─ svg/ # экспортировал "Export Selection" через Adobe Illustrator
    │   │        │  
    │   │        │  * просто бэкапы, их <a style="color:black;text-decoration: underline;" href="https://aleksandrovskyv.github.io/notes/html_plus#-svg-">минифицированные</a> версии зашиты в style.css
    │   │        ├─ SwapMats.svg
    │   │        ├─ MP4Vidoc.svg
    │   │        │ 
    │   │        │  * иконки для README.md, c extend зоной под иконкой, 
    │   │        │    чтобы текст справа был защищён и вёрстка README.md была чище
    │   │        ├─ gh_SwapMats.svg
    │   │        └─ gh_MP4Vidoc.svg
    │   │       
    │   └─ README.md < Из него GitHub Actions соберёт index.html по правилам описанным в main.yml 
    │
    │
    └─ ?
</pre>

<br><br><br>