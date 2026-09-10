\[ .exe \] run from \[ .c4d \] betweeen \[ .py \]

<br><br>

### Case 1
Эмуляция дабл клика по файлу, где\
в качестве примера выбран cmd.exe

```python

import os
EXE_PATH = "C:\\WINDOWS\\system32\\cmd.exe"
os.startfile(EXE_PATH)

```

<br>

### Case 2
Запуск полностью независимого для Cinema 4D\
.exe файла через модуль subprocess.Popen\
С поддержкой аргументов...

```python

import c4d, json, subprocess

exe_path = "G:\\Projects\\eloader\\VRAM Folder Crunch Beta.exe"
tex_path = "G:\\Projects\\eloader\\tex_folder"

configs = {"input_dir": tex_path}
config_json = json.dumps(config, ensure_ascii=False)

command = [exe_path, "--mode","silent", "--config", config_json]

try:

    proc = subprocess.Popen(command, creationflags=0x00000010)
    #creationflags на консольный режим открытия

    # b = proc.poll() # запрос на текущий статус
    # a = proc.wait() # ожидает завершения (фриз GUI C4D)
    # c = proc.kill() # убийство 

    return True

except Exception as e:
    c4d.gui.MessageDialog("Error:\n{}".format(e))
    return False

```

Обернутый в диалоговое окно 
вариант доступен [тут](./files/subprocess_a_test.py), а 

<br>

### Case 3-7 

вот [здесь](./files/subprocess_b_test.py)


<br><br><br>