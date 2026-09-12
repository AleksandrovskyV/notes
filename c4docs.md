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

Чтобы кнопочка растягивались по ширине панельки/группы, нужно закинуть<br>в позиционный аргумент конкретную константу, как пример:<br>
<pre><code>
self.AddStaticText(666, <a href="https://developers.maxon.net/docs/py/2026_3_0/consts/BF_Layout.html" style="font-style: italic; text-decoration: underline; color: black;">c4d.BFH_SCALEFIT</a>, name="кнопка")
</code></pre>

666 - это ID элемента, который должен быть \~всегда уникальным целочисленным int, иначе<br>можешь словить <a href="https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B3%D0%B3%D0%B8" style="text-decoration: underline; color: black;">багги</a>. Чтобы не вступить в кал, используют циклы, чтобы фармить эти offset`ы<br>

Ты спросишь у меня:  <strong>&£%!</strong>, позиционный аргумент?<br>
\- Отвечу честно, что не знаю о них ничего, кроме факта:<br>без них метод на выполнится, так как писатель посчитал<br>вынести их обязательными на вызове, и что идут они в строгом порядке друг за другом... <br>

name="кнопка" - это именной аргумент, который может быть,<br> а может и не быть. Такая вот неопределённость ~

<br><br><br><br>