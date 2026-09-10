import c4d, sys, os, json, subprocess
import threading

CASE = 1 # от 1 до 5
EXE_PATH = "G:\\Projects\\eloader\\VRAM Folder Crunch.exe"
TEX_PATH = "G:\\Projects\\eloader\\tex_folder"

def subprocessCases(case=1):

    process = None

    configs = {
        "algo": "DRIVE",
        "raw_val": 333,
        "unit": "MB",
        "exclude": ('.psd', '.hdr'),
        "input_dir": TEX_PATH,
    }

    config_json = json.dumps(configs, ensure_ascii=False)
    command = [EXE_PATH, "--mode", "silent", "--config", config_json]
    
    # Case 1     ==============================================================
    # Эмуляция дабл клика по файлу
    # Здесь в качестве этого файла выбран .exe
    # =========================================================================
    if CASE == 1:
        print("[RUNNING] Case 1")
        if os.path.exists(EXE_PATH):
            os.startfile(EXE_PATH)
        return True


    # Case 2     ==============================================================
    # Запуск процесса в отдельном независимом от Cinema4D окне
    # Можно передать аргументы командной строки (command)
    # в creationflags добавлен флаг открытия консольного вывода, но 
    # если инструмент был собран noconsole - флаг может не сработать
    # =========================================================================
    elif CASE == 2:
        print("[RUNNING] Case 2")

        if sys.version_info >= (3, 0):
            process = subprocess.Popen(command, creationflags=subprocess.CREATE_NEW_CONSOLE)
        else:
            process = subprocess.Popen(command, creationflags=0x00000010)

        # b = process.poll() # запрос на текущий статус
        # a = process.wait() # ожидает завершения (фриз GUI C4D)
        # c = process.kill() # убийство

        return True


    # Case 3     ==============================================================
    # Запуск окна с флагом скрытия. Интерфейс C4D зависнет на 
    # строке communicate() - т.к метод синхронный на уровне ядра ОС
    
    # используя a = process.stdout.readline() 
    # C4D зависнет точно так же, как на communicate()


    # Вывод идет в трубы ( а не в консоль C4D)
    # Весь консольынй вывод по завершению выплюнется в консоль, но
    # с ограничением в 944 символа в строке
    # по сути копия/переписанный subprocess.run()
    # =========================================================================
    elif CASE == 3:
        print("[RUNNING] Case 3")
        startupinfo = subprocess.STARTUPINFO()
        startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW

        process = subprocess.Popen(command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            startupinfo=startupinfo
        )

        stdout_bytes, stderr_bytes = process.communicate()

        stdout_text = stdout_bytes.decode("utf-8", "replace")
        stderr_text = stderr_bytes.decode("utf-8", "replace")
        return_code = process.returncode

        if stdout_text:
            print("--- STDOUT ---")
            print(stdout_text)
        if stderr_text:
            print("--- STDERR ---")
            print(stderr_text)

        if return_code != 0:
            c4d.gui.MessageDialog("Error: {}\n"
                "{}".format(return_code, stderr_text)
            )
        return True


    # Case 4     ==============================================================
    # Case 4: Асинхронный запуск (C4D GUI не зависнет), но exe/утилита может,
    # если забьёт буфер труб в 64кб ? В конце вывед в логе сам объект "трубы"
    # =========================================================================
    elif CASE == 4:
        print("[RUNNING] Case 4")
        process = subprocess.Popen(command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8",
            errors="replace"
        )

        print("start subprocess.Popen:", process.stdout)
        print("print stdout:", process.stdout)

        current_status = process.poll()
        if current_status is not None and current_status != 0:
            c4d.gui.MessageDialog("Error: {}".format(current_status))
        return True


    # Case 5     ==============================================================
    # Синхронная функция-обертка run(). Полная блокировка C4D
    # Окно утилиты скрыто по умолчанию. Текст перехвачен в память
    # =========================================================================
    elif CASE == 5:
        print("[RUNNING] Case 5 / subprocess.run")
        process = subprocess.run(command,
            capture_output=True, # Глушит вывод, направляя его в буфер process.stdout
            text=True,           # Автоматически декодирует байты в текст
            encoding="utf-8",
            errors="replace"
        )

        # Текст напечатается в консоль C4D только после того, как C4D отвиснет 
        # процесс завершит свою работу и будет закрыто
        print(process.stdout)

        if process.stderr:
            print("--- STDERR ---")
            print(process.stderr)

        if process.returncode != 0:
            c4d.gui.MessageDialog("Error: {}\n"
                "{}".format(process.returncode, process.stderr)
            )
            return False

        return True


    # Case 7     ==============================================================
    # Попытка получить чтение лога в реальном времени, 
    # через асинхронный метод и threading
    # 
    # альтернатиы в alternative.txt

    # print("Start folder analytics...")
    # sys.stdout.flush() # <- СБРОС БУФЕРА

    #
    #
    # Пока тут завис...
    # =========================================================================
    elif CASE == 6:

        def read_pipe_background(pipe):
            """Функция выполняется в отдельном фоновом потоке."""
            for line in iter(pipe.readline, ""):
                text_to_print = "Утилита пишет: " + line.strip()
                c4d.GePrint(text_to_print)
            
            pipe.close()

        process = subprocess.Popen(command, 
            stdout=subprocess.PIPE,  # Направляем вывод в трубу
            stderr=subprocess.PIPE,
            text=True, 
            encoding="utf-8", 
            errors="replace"
        )

        # Создаем фоновый поток
        thread = threading.Thread(target=read_pipe_background, args=(process.stdout,))
        thread.daemon = True  # Поток сам умрет при закрыти c4d
        thread.start()
        
        return True


if __name__=='__main__':
    subprocessCases()