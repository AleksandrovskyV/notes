<br><br><br>


## scripting


### imports:

```python
import sys        # системные \@\_\@
import urllib     # для запросов в интернет (скачать файл как пример)
import subprocess # запускать сторонние windows.exe 
```

### Разница в python между 27 / 37

- Для проверки версий можно вызвать:

```python
if sys.version_info >= (3, 0):
    import urllib.request as urllib_req
else:
    import urllib2 as urllib_req
```

#### f-строки в 27 не работают 

```python
#python 37

a = c4d.gui.MessageDialog(f"Failed download: {str(e)}")

b = os.path.join(SCRIPT_DIR, f"{SHORT_NAME}_config.json")

```

- ...можно заменить на:

```python
#python 27

a = c4d.gui.MessageDialog("Failed download: {}\n".format(str(e)))

config_filename = SHORT_NAME + "_config.json"
b = os.path.join(SCRIPT_DIR, config_filename)
```

#### "\n" в 27 не работают , но можно так:
```python
#python 27

about_text = (
    "Горит...\n\n"
    "Горит...\n"
    "Горит...\n"
)

for i, line in enumerate(about_text.split('\n')):
    self.AddStaticText(ID_ABOUT + i, c4d.BFH_SCALEFIT, name=line, borderstyle=0, initw=0, inith=0)
```

### А какая вообще ОС ?

```python
if sys.platform == "win32":
    # Команда для Windows
    subprocess.run(["dir"], shell=True)
elif sys.platform == "darwin":
    # Команда для macOS
    subprocess.run(["ls"])
```

## Прямые наводки:

Выбор системного файла/директории > [link](https://developers.maxon.net/docs/py/2024_3_0/modules/c4d.storage/index.html?highlight=loaddialog#c4d.storage.LoadDialog)