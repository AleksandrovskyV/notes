# Cinema 4D и Houdini _: Пайплайн_ 

## 🔹 Коротко:

&nbsp;

Best Format for Transferring: Alembic (.abc) 

Export From C4D to Houdini: Alembic Scale – 0.05 Millimeters   / _Или Transform Node с Uniform Scale = 0.005_  
Import From Houdini to C4D: Alembic Scale – 2 Meters  

И не забывай, что в программах должен быть одинаковый FPS проекта, а STARTFRAME у них отличается на 1 кадр

&nbsp;

## 🔹 Детально:

Если просто экспортировать сцену из Cinema 4D через Alembic со стандартными параметрами и импортировать в Houdini,  
получишь гигантскую сцену. Если выгнать сцену из Houdini в Cinema 4D через .abc — наоборот, она будет очень маленькой.  
Если экспортируешь секвенцию из C4D в Houdini, то нулевой кадр пропадёт, так как таймлайн Houdini начинается с первого кадра.  
Если экспортируешь секвенцию из Houdini в C4D, при загрузке .abc будет установлен стандартный фреймрейт C4D = 30 FPS.  
Если оставить как есть, программа будет интерполировать анимацию, и первый кадр будет, как пример: 1.25F  
(если в Houdini проект на 24 FPS, а при импорте в Cinema 4D указать 30 FPS).  

📏 Size Values Project Defaults

| Soft	    | Project Scale | Default Cube | Def Import .abc  |
| --------- | ------------- | ------------ | ---------------- |
| Cinema 4D | 1 = CM        | 200 cm       | 1 cm             |
| Houdini   | 1 = M         | 1 m          | —                |


⏱ Time Values Project Defaults

| Soft      | STARTFRAME | FPS |
| --------- | ---------- | --- |
| Cinema 4D | 0          | 30  |
| Houdini   | 1          | 24  |

С импортом в Houdini проблем нет, т.к. можно просто закинуть следующей нодой - Transform со значением Uniform Scale = 0.005  
В таком случае, стандартный куб из C4D станет равным кубу в Houdini. Несмотря на то, что они всё равно будут разными по абсолютному размеру (C4D CUBE – 200 cm, HOUDINI CUBE – 1 m), ощущаться в сцене они будут одинаково  

Можно сопоставить значения в обоих программах, если такой "пайплайн" присутствует, но лично я просто запомнил нюанс  
первого/нулевого кадра и стараюсь не трогать стандартные значения в обеих программах, чтобы не запутаться.  
К примеру, Houdini чувствителен к размерам, а также ноды DOP/VELLUM часто ссылаются на первый кадр.  

&nbsp;

## 🔹 Мой воркфлоу:

Я всегда проверяю FPS в обеих программах, чтобы он не отличался:

|            |                                          |
|------------|------------------------------------------|
| Cinema 4D  | Mode > Project > FPS                     |
| Houdini    | Alt+Shift+G или Global Animation Options |



Чаще корректирую FPS в Houdini, так как сцену собираю преимущественно в Cinema 4D.  
При импорте сцены в Houdini в ноде Alembic в параметре Frame я "чаще" отнимаю единицу: $F-1, но  
способ $F-1 с использованием ноды Timeshift в параметре Frame тоже хороший.  

Экспортируя сцену из C4D в Houdini:  
Я один раз выставил значение в окне C4D Alembic Export, Scale = 0.05 Millimeters,  
и программа запоминает его, пока снова не изменишь. Далее не нужно думать об этом — сразу  
получаешь корректный размер в Houdini без дополнительных трансформаций.  

Экспортируя сцену из Houdini в C4D:  
Я один раз выставил значение в окне C4D Alembic Import, Scale = 2 Meters,   
и получаю ту же сцену в тех же размерах. То есть:  
Cube из C4D > Houdini > обратно в C4D = размер куба совпадает с оригиналом.  

Самое приятное, что значение из окон Import/Export не влияет на внутренний бейкинг .abc в Cinema 4D — тот, 
что по правому клику по объекту "Bake as Alembic". В таком случае размеры берутся из проекта Cinema 4D, 
а не из окон Export/Import.  

&nbsp;

## 🔹 Дополнительно:

#### Экспорт иерархии из Houdini в C4D:  
По умолчанию Alembic ROP-нода в Houdini экспортирует всю сцену как единый цельный меш.  
Чтобы разделить объекты и получить иерархию в Cinema 4D, нужно,  чтобы каждый объект сохранял свой Path атрибут на примитивах.
Если импортировать Alembic в Houdini, можно заметить, что этот атрибут всегда присутствует. Чтобы включить экспорт с иерархией
в Alembic ROP-ноде, нужно включить опцию "Build Hierarchy From Attribute".  Если требуется, чтобы объекты анимировались  по PSR, то  
есть  перемещался их Centroid/Origin, а не все точки) — тогда нужно упаковать геометрию (Pack Geometry) и во вкладке Geometry Alembic ROP включить Transform Geometry.


#### Импорт сплайнов из Houdini в C4D:  
Сплайн в Houdini = это polyline, просто напоминание (:  
Alembic в Cinema 4D стал нативным, и лучше работать со сплайнами без дополнительных привязок.  В C4D cразу накидывай    
Rendering Spline Tags (RS / Arnold / Octane и т.п.) или Sweep-объекты.  По сути, это обычный сплайн Cinema 4D, который  
можно сделать редактируемым (клавишей "C"),  но скорее всего он нужен тебе уже анимированным в Cinema 4D 🤡


#### Импорт точек из Houdini в C4D (частицы):   
В Alembic реализована поддержка как poly-points, так и particle geometry.  
Супер-ссылка 1 – _[Houdini Alembic particles to C4D](https://vimeo.com/393436800)_ by Pixel Ninja  
Супер-ссылка 2 – _[Read particle attributes from .abc sequences in RS](https://vimeo.com/269503540)_ by Paolo Rava   


&nbsp;

Заметка, since 2016 👌


&nbsp;


### 🏷 Tags

`cinema-4d` `c4d` `houdini` `alembic` `pipeline` `houdini-to-c4d`  
`export` `import` `fps` `scale` `animation` `workflow`  `c4d-to-houdini`  

<!-- SEO: cinema4d houdini alembic pipeline export import fps scale animation 3d workflow dynamics vellum dop -->

