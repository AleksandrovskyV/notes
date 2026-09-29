## Wrangles

Весь код написанный внутри этих ребят "выше" и "вроде" обёрнут в функцию  
Поэтому лучше в них оперировать простыми выражениями.  
И да, создать struct объект (как я понял) нельзя. Поэтому брось идею писать внутри них  
огромную простыню - ты потерпишь такое же фиаско как ия.  

\* хотя разницу от простыней нод, ещё придётся познать...



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
Если нужно прервать текущий шаг итерации, шагнув дальше
```c
if (@ptnum >= len(abc)) return;
```


<br><br><br>