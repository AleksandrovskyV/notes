<br><br><br>


## scripting


### imports:

- sys - системные \@\_\@
- urllib - для запросов в интернет (скачать файл как пример)
- subprocess - запускать сторонние windows.exe 


### Разница в python между 27 / 37

> *Для проверки версий можно вызвать:*

```python
if sys.version_info >= (3, 0):
    import urllib.request as urllib_req
else:
    import urllib2 as urllib_req
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