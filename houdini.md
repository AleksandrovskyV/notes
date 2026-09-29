<br>

_и начать предстоит c базы..._

Paste in HScript Textport from <strong>.hiplc</strong> project:  
_opscript -G -r / > $TEMP/temp.cmd_  

Paste in HScript Textport from <strong>.hip</strong> project:  
_cmdread $TEMP/temp.cmd_  

<br><br>

## Wrangles

Весь код написанный внутри этих ребят "выше" и "вроде" обёрнут в функцию

<details><summary>вброс...</summary>
Когда вы нажимаете кнопку и компилируете код в поле Expression внутри Attribute Wrangle, Houdini за кулисами оборачивает всё ваше текстовое поле в автоматическую функцию. Физически на диск для компилятора отправляется файл, который выглядит примерно так:

```c
// --- То, что Houdini генерирует сама автоматически ---
#include <voplib.h>
vop_execute( ... ) 
{
    // === НАЧАЛО ВАШЕГО ОКНА EXPRESSION ===
    #include <math.h> 

    struct basis {        // <-- ОШИБКА! Внутри функции vop_execute 
        vector i, j, k;   //     нельзя объявлять структуры!
    } 
    // === КОНЕЦ ВАШЕГО ОКНА EXPRESSION ===
}
```

</details><br>

Короче - лучше оперировать в них простыми выражениями и бросить идею  
писать внутри огромную простыню - а то потерпишь такое же фиаско как ия.  

\* хотя разницу от простыней нод, ещё придётся познать...



### Rand Color based on Attr Class
- run over: point\prims\edge?

Ведь нода "color" требует float fit0-1 в параметре "Ramp from Attribute",  
а так можно по int пустить (like "@class" from connectivity)

```c
float min_bright = 35.0 / 255.0; 
float max_bright = 120.0 / 255.0; 

float rand_val = rand(@class);
float grayscale = fit01(rand_val, min_bright, max_bright);

@Cd = set(grayscale, grayscale, grayscale);
```



### UV Transfer
- run over: point

В первый вход геометрия с X и Y между 0 до 1  
Во второй - то, на что планируешь натягивать

```c
vector target_pos = uvsample(1, "P", "uv", u@uv);
v@P = target_pos;
```

восстановить глубину можно...  
разумеется, через нормаль  



### Add text attr on pts 
- run over: detail  

Запишет в первые три точки строки,  
не тронув остальные...  

```c
string abc_en[] = {
"my",
"new",
};

string abc_ru[] = {
"моя",
"новая",
"работа",
};

int max_pts = max(len(abc_en), len(abc_ru));
for(int i = 0; i < max_pts; i++) {
    if(i < len(abc_en)) {
        setpointattrib(0, "name_en", i, abc_en[i], "set");
    }
    if(i < len(abc_ru)) {
        setpointattrib(0, "name_ru", i, abc_ru[i], "set");
    }
}
```



### Stop, Next...
Если внезапнуть нужно прервать  
текущий "over" и перейти к следующему  
```c
if (@ptnum >= len(abc)) return;
```


<br><br><br>

---

[origin note](https://www.dropbox.com/scl/fi/2s18iw15khdj9aua8ao3r/HDNI_MY.paper?rlkey=5ddchk9uzpekovretsmr4cliv&dl=0)