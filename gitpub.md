<br><br><br>

\[ blogger > tumblr > wordpress > bepage > webflow > github \]

Всё ради возможности выделения текста курсором...

<br><br>

<pre>
AleksandrovskyV (github аккаунт) и его "репозитории":
    │
    ├─ aleksandrovskyv.github.io/
    │   │  * GitHub Pages 
    │   │    - source: deploy from a branch 
    │   │    - branch: main, folder: /root
    │   │    - custom domain: vsky.space, enforce https: on (купленный через reg.ru)
    │   │
    │   ├─ flipbook/
    │   │    └─ index.html 
    │   ├─ графика/
    │   │    └─ index.html 
    │   │
    │   ├─ 404.html   (заглушка на ошибке)
    │   ├─ CNAME      (файл содержащий vsky.space)
    │   └─ index.html (main page)
    │
    │
    ├─ files/ (2.24 GB static content img, sound, etc) > тяжёлые файлы
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
    │   │                       и при заходе на <https://aleksandrovskyv.github.io/notes/>
    │   │                                или на <https://vsky.space/notes/>
    │   │                  
    │   │                       можно увидеть стандартный шаблон
    │   │                       создаваемой страницы 
    │   │    
    │   ├─ gitpub.md            По каждому файлу ".md" в репе Jekyll создаст отдельную страницу, пример:
    │   └─ chrome_surfer.md  >  <href>https://aleksandrovskyv.github.io/notes/chrome_surfer></href>
    │
    │
    │   * репозитории отдельных проектов
    ├─ chat/   ссылка > https://vsky.space/chat/
    ├─ fe/     ссылка > https://vsky.space/fe/
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
    ├─ c4d/                    https://github.com/AleksandrovskyV/c4d/
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
    │   │          └─  main.yml 
    │   │              * документ кастомной инструкции сборки конкретно этой репы
    │   │                т.к. нужно было "по особенному" собирать index.html из README.md
    │   ├─ /assets
    │   │    ├─ css/
    │   │    │   └─ style.css 
    │   │    │       * Базовый шаблон белой темы github(jekyll), создаваемый по шаблону README.md
    │   │    │         из которого я вырезал всё, что только можно было вырезать
    │   │    │   
    │   │    └─ svg/ (экспортировал "Export Selection" через Adobe Illustrator)
    │   │        │  
    │   │        │  * просто бэкапы, их [минифицированные]() версии зашиты в style.css
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