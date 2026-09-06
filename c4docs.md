<br><br><br>


# python scripting

<br>

## imports:

```python
import sys        # системные \@\_\@
import urllib     # для запросов в интернет (скачать файл как пример)
import subprocess # запускать сторонние windows.exe 
```

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

#### f-строки в 27 не работают 

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

#### а "\n" в уже 27 не cрабатывают
```python
#python 27

about_text = (
    "Горит...\n\n"
    "Горит...\n"
    "Горит...\n"
)

# можно исправить так:

for i, line in enumerate(about_text.split('\n')):
    self.AddStaticText(ID_ABOUT + i, c4d.BFH_SCALEFIT, name=line, borderstyle=0, initw=0, inith=0)
```

<br>

#### А какая вообще ОС ?

```python

if sys.platform == "win32": # Windows

    subprocess.run(["dir"], shell=True) 

elif sys.platform == "darwin": # macOS

    subprocess.run(["ls"]) 

```

<br><br>

## Прямые наводки:

Выбор системного файла/директории > [link](https://developers.maxon.net/docs/py/2024_3_0/modules/c4d.storage/index.html?highlight=loaddialog#c4d.storage.LoadDialog)