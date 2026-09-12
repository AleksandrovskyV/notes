<br><br><br>


# python scripting

<br>

## imports:

<pre><code>
<strong>import</strong> sys        <span style="font-style: italic; color: #555555;"># системные \@\_\@</span>
<strong>import</strong> urllib     <span style="font-style: italic; color: #555555;"># для запросов в интернет (скачать файл как пример)</span>
<strong>import</strong> <a href="./c4d/subprocess" style="text-decoration: underline; color: black;">subprocess</a> <span style="font-style: italic; color: #555555;"># запускать сторонние windows.exe</span>
</code></pre>


<br>

## разница между 27 / 37

<br>

#### для проверки версии:

```python
if sys.version_info >= (3, 0):
    import urllib.request as urllib_req
else:
    import urllib2 as urllib_req
```

<br>

#### "f-строки" до 37 не работают 

```python
#python 37

a = c4d.gui.MessageDialog(f"Failed download: {str(e)}")
b = os.path.join(SCRIPT_DIR, f"{SHORT_NAME}_config.json")


# можно заменить на:


#python 27

a = c4d.gui.MessageDialog("Failed download: {}\n".format(str(e)))

config_filename = SHORT_NAME + "_config.json"
b = os.path.join(SCRIPT_DIR, config_filename)

```

<br>

#### "аналогично с \n"
```python
#python 27

about_text = (
    "Горит...\n\n"
    "Горит...\n"
    "Горит...\n"
)

# можно решить так:

for i, line in enumerate(about_text.split('\n')):
    self.AddStaticText(ID_ABOUT + i, c4d.BFH_SCALEFIT, name=line, borderstyle=0, initw=0, inith=0)
```

<br>

...

<br>

## Прямые наводки:

Выбор системного файла/директории > [link](https://developers.maxon.net/docs/py/2024_3_0/modules/c4d.storage/index.html?highlight=loaddialog#c4d.storage.LoadDialog)

#### Интерфейс скриптового [окна](https://developers.maxon.net/docs/py/2026_3_0/modules/c4d.gui/GeDialog/index.html?highlight=gedialog#c4d.gui.GeDialog):

Чтобы кнопочка растягивалась по ширине панельки/группы, нужно закинуть<br>в позиционный аргумент конкретную константу, как пример:<br>
<pre><code>
self.AddStaticText(666, <a href="https://developers.maxon.net/docs/py/2026_3_0/consts/BF_Layout.html" style="font-style: italic; text-decoration: underline; color: black;">c4d.BFH_SCALEFIT</a>, name="кнопка")
</code></pre>

666 - это ID элемента, который должен быть \~всегда уникальным целочисленным int, иначе<br>можешь словить <a href="https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B3%D0%B3%D0%B8" style="text-decoration: underline; color: black;">багги</a>. Чтобы не вступить в кал, используют циклы, чтобы фармить эти offset`ы<br>

Если ты задашься вопросом: "<strong>&£%!</strong>, позиционный аргумент?"<br>
То честно отвечу тебе, что знаю лишь факт: без их записи метод на выполнится,<br>так как писатель посчитал нужным их вынести обязательными при вызове, добавив в шапку (сигнатуру).<br>Идут они в строгом `друг за другом` порядке после открывающей скобки(<br>

А в конце примера идёт именной и необязательный аргумент вида: <strong>name="кнопка"</strong>, что отличается от первых двух наличием <strong>"="</strong>, говорящим о его происхождении.<br>Внезапно, именные могут стоять в разном относительно `друг от друга` порядке и попросту отсутствовать. <br>Такие вот они, неопределённые типы...<br><br><br><strong>AI:</strong> Термин "тип" был взят тобой опрометчиво к такому типу абзаца... <br>

<br><br><br><br><br><br>