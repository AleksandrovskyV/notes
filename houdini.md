## Wrangles

Весь написанный код внутри этих ребят "вроде" обёрнут в функцию  
Поэтому оперировать в них нужно простыми выражениями.  
И да, struct объект (как я понял) нельзя. Поэтому брось идею писать внутри них  
 огромную простыню - ты потерпишь такое же фиаско как ия.  



### Rand Color based on Attr Class
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
В первый вход геометрия с X и Y между 0 до 1  
Во второй - то, на что планируешь натягивать

```c
vector target_pos = uvsample(1, "P", "uv", u@uv);
v@P = target_pos;
```

восстановить глубину можно...  
как и всегда, через нормаль   



### Set String Attr over pts
Записав текст в первые три точки (длина первого списка)  
\- сразу прервёт операцию при помощи return

```c
string abc[] = {
"my",
"new",
"work",
};

string abc_ru[] = {
"моя",
"новая",
"работа",
"вот",
};


if (@ptnum >= len(abc)) return;
s@name_en = abc[@ptnum];
s@name_ru = abc_ru[@ptnum];
```

