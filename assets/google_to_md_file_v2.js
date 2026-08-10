(async function() {

    /* Консольный скрипт (.js) для создания .md файла по переписке с google-ai-search

    Собран, чтобы прочитать все заданные мной вопросы подряд, скрывая ответы AI от видимости 
    Выгружает картинки отдельно, делая .md легче для пост-обработки текста
    Каждый блок разделён в .md под SublimeText - быстрое сворачивание по # символу для вопроса и #### для ответа
    Для предпросмотра в SublimeText - я использую MarkdownPreviewEnhanced
    Структура страницы чата с Google-AI описана в google_chat_struct.html

    */

    const chatBlocks = document.querySelectorAll('div[jsname="RH7zg"].tonYlb');
    
    if (chatBlocks.length === 0){alert('Nothing to parse'); return;}

    let rootDirHandle;
    try {
        rootDirHandle = await window.showDirectoryPicker({
            mode: 'readwrite',
            startIn: 'downloads'
        });
    } catch (err) {
        console.log('Folder Select cancel:', err);
        return;
    }

    const sourceDirHandle = await rootDirHandle.getDirectoryHandle('source', { create: true });
    let imageCounter = 1;

    // img base64 to jpeg
    async function processAndSaveImage(imgEl) {
        try {
            const src = imgEl.getAttribute('src') || '';
            if (!src || !src.startsWith('data:image')) return '';

            let base64Data = '';
            let extension = 'png';

            const matches = src.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
            if (matches && matches.length === 3) {
                extension = matches[1] === 'jpeg' ? 'jpg' : matches[1];
                base64Data = matches[2];
            }

            if (!base64Data) return '';

            const fileName = `image_${imageCounter}.${extension}`;
            
            // Быстрый бинарный парсинг без ручного выделения медленных JS-массивов
            const byteCharacters = atob(base64Data);
            const byteArray = new Uint8Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteArray[i] = byteCharacters.charCodeAt(i);
            }
            
            const blob = new Blob([byteArray], { type: `image/${extension}` });

            // Изолированная атомарная запись на диск
            const fileHandle = await sourceDirHandle.getFileHandle(fileName, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(blob);
            await writable.close();
            
            imageCounter++;
            return `<details><summary>USER IMG</summary>\n\n<img src="source/${fileName}" alt="image" />\n\n</details>\n\n`;
        } catch (fileErr) {
            // При ЛЮБОМ сбое с картинкой (atob, права папки, лимиты памяти) — просто пишем лог и не валим скрипт
            console.error('Критический сбой обработки картинки (пропущено):', fileErr);
            return '';
        }
    }

    // Чистка ответа, от поломки верстки файла .md
    const checkText = (str) => {
        if (!str) return '';

        return String(str)
            .replace(/^#/gm, '\\#')
            
            .replace(/<!--[\s\S]*?-->/g, (match) => {
                return match.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            })
            .replace(/<!DOCTYPE\b[^>]*>/gi, (match) => {
                return match.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            })
            .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, (match) => {
                return match.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            })
            .replace(/<\?[\s\S]*?\?>/g, (match) => {
                return match.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            })
            .replace(/<\/?[a-z][^>]*>/gi, (match) => {
                return match
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
            });
    };

    // Проверка пользовательских ссылок
    const makeLinksClickable = (str) => {
        const urlRegex = /https?:\/\/[^\s<]+/g;
        return str.replace(urlRegex, (url) => {
            const cleanUrl = url.replace(/[.,!?]+$/, '');
            const trailingPunctuation = url.slice(cleanUrl.length);
            return `[${cleanUrl}](${cleanUrl})${trailingPunctuation}`;
        });
    };


    // Парсинга контейнера вопрос-ответ (RH7zg или CKgc1d)
    async function parseSingleMessageBlock(container) {

        // --- 1. User Quest ---
        const userImg = container.querySelector('div.FSWZL img, img.taqkMe');

        let userImagesMarkdown = '';
        if (userImg) {
            try {
                userImagesMarkdown = await processAndSaveImage(userImg);
            } catch (outerImgErr) {
                console.error('Внешний перехват ошибки вызова картинки:', outerImgErr);
                userImagesMarkdown = '';
            }
        }

        const userTextSpan = container.querySelector('span[jsname="eFVkfb"] span[jsname="y5v2y"]');

        if (userTextSpan) {
            let text = userTextSpan.innerText.trim(); 
            // Оборачивания ссылок в Markdown-формат [URL](URL) [1]

            /* Определяем вставку пользователя
                Мы точно знаем, что Google превратит текст пользователя в plain и, вероятно, удалит перенос между основным вопросом и следующей вставкой
                Мы точно знаем, что вставка следует мгновенно после набора: пользователь нажимает Ctrl+V и тут же жмёт Enter
                Мы точно знаем, что вставка является завершающим действием пользователя, а значит этот ход будет единственным
                Мы предполагаем, что вставка может содержать код на английском, а значит — смену раскладки
                Пользователь может сам поставить перенос, поэтому дополнительно проверяем INSERT:
                в нём должно быть больше 7 токенов и практически не должно быть кириллицы.
                Это костыль для защиты от внезапного английского термина, после которого может следовать вставка
            */

            // 1. кириллица + знак + латиница  / без пробелов
            // 2. lowercase + знак + uppercase / без пробелов
            // 3. кириллица + знак + пробел(ы) или перенос + английское слово/переменная (f-строки и т.д.)
                
            const splitRegex = /(?<!https?:\/\/\S*)(?<!https?|ftp)(?<=\p{Script=Cyrillic}[.,!?:]*)(?!\/\/)(?=[a-zA-Z"'])|(?<!https?:\/\/\S*)(?<=\p{Ll}[.,!?:][.,!?:]*)(?=[^\n\r\s]*\p{Lu})|(?<!https?:\/\/\S*)(?<=[\p{Script=Cyrillic}.,!?:]+)[ \t\n\r]+(?<!https?:)(?=[a-z_][a-zA-Z0-9_]*\s*=|[a-z]+[A-Z0-9_]|\b(SyntaxError|def|class|const|let|var|function|if|for|print|f")\b)/u;
            const parts = text.split(splitRegex);

            let hasValidInsertion = false;
            let question = text;
            let codeInsertion = '';

            if (parts.length > 1) {
                for (let i = 1; i < parts.length; i++) {
                    const potentialCode = parts.slice(i).join('').trim();
                    const tokens = potentialCode.split(/\s+/).filter(t => t.length > 0);
                    const cyrillicTokens = tokens.filter(token => /\p{Script=Cyrillic}/u.test(token)).length;

                    // Проверяем пользовательский текст на наличие внешних ссылок
                    const containsUrlsOnly = tokens.every(t => 
                        t.includes('http') || 
                        t.includes('://') || 
                        t.startsWith('//') ||
                        /^[.,!?;:()\[\]{}<>\-\/\s]+$/.test(t)
                    );


                    if (tokens.length > 7 && cyrillicTokens <= 1 && !containsUrlsOnly) {
                        question = parts.slice(0, i).join('').trim();
                        codeInsertion = potentialCode;
                        hasValidInsertion = true;
                        break; 
                    }
                }
            }

            if (hasValidInsertion) {
                const clickableQuestion = makeLinksClickable(question);
                markdown += `#\n<br>\n${clickableQuestion}\n\n`;
                if (userImagesMarkdown) markdown += userImagesMarkdown;
                
                markdown += `<details><summary>INSERT</summary><br>\n\n${codeInsertion}\n\n</details>\n\n`; 
            } else {
                const clickableText = makeLinksClickable(text);
                markdown += `#\n<br>\n${clickableText}\n\n`; 
                if (userImagesMarkdown) markdown += userImagesMarkdown;
            }
        } else if (userImagesMarkdown) {
            markdown += `#\n<br>\n\n` + userImagesMarkdown;
        }


        // --- 2. AI Answer ---

        const aiContainer = container.querySelector('div[data-subtree="aimc"] div[jsname="KFl8ub"]');
        if (aiContainer) {
            markdown += `####\n<details><summary>AI ANSWER</summary><br>\n\n`;

            const allElements = aiContainer.querySelectorAll('.n6owBd, .awi2gc, .otQkpb, [role="heading"], .IaGLZe, ol, ul, .r1PmQe, ul.zO5mFe, hr.j3tEEe, div.FSWZL img, img');

            // стркутура описана в google_chat_struct.html

            // Параграф / Обычный текст
            // Заголовок
            // Межстрочная линия
            // Списки
            // Блок кода
            // Блок источников/ссылок
            
            for (const el of allElements) {
                if (el.closest('.r1PmQe') && !el.classList.contains('r1PmQe')) continue;
                if (el.closest('ul.zO5mFe') && !el.classList.contains('zO5mFe')) continue;

                if ((el.classList.contains('n6owBd') || el.classList.contains('awi2gc')) && !el.closest('.IaGLZe') && !el.closest('ol') && !el.closest('ul')) {
                    const txt = el.innerText.trim();
                    if (txt) markdown += `${checkText(txt)}\n\n`;
                }
                else if (el.getAttribute('role') === 'heading' || el.classList.contains('otQkpb')) {
                    const headingText = el.innerText.trim();
                    if (headingText) markdown += `${checkText(headingText)}\n\n`;
                }
                else if (el.tagName === 'HR' || el.classList.contains('j3tEEe')) {
                    markdown += `---\n\n`;
                }
                else if (el.classList.contains('IaGLZe') || el.tagName === 'OL' || el.tagName === 'UL') {
                    if (el.tagName === 'OL' && el.classList.contains('IaGLZe')) continue; 
                    
                    const items = el.querySelectorAll('li');
                    items.forEach((li, idx) => {
                        const targetSpan = li.querySelector('.iNqyIf') || li;
                        const liText = targetSpan.innerText.trim();

                        if (liText) {
                            const isNumbered = el.tagName === 'OL' || el.classList.contains('IaGLZe');
                            const prefix = isNumbered ? `${idx + 1}. ` : '* ';
                            markdown += `${prefix}${checkText(liText)}\n`;
                        }
                    });
                    markdown += `\n`;
                }
                else if (el.classList.contains('r1PmQe')) {
                    const langEl = el.querySelector('.z0e9Qd, .vVRw1d');
                    const lang = langEl ? langEl.innerText.trim().toLowerCase() : '';
                    const codeEl = el.querySelector('pre code');
                    if (codeEl) {
                        markdown += `\`\`\`${lang}\n${codeEl.innerText.trim()}\n\`\`\`\n\n`;
                    }
                }
                else if (el.tagName === 'UL' && el.classList.contains('zO5mFe')) {
                    const links = el.querySelectorAll('a.vIWmYe');
                    if (links.length > 0) {
                        markdown += `**Источники:**\n`;
                        links.forEach(a => {
                            const url = a.getAttribute('href');
                            let label = a.getAttribute('aria-label') || url;
                            label = label.replace(/\.\s*Страница откроется в новой вкладке\./i, '').trim();
                            if (url) markdown += `* [${label}](${url})\n`;
                        });
                        markdown += `\n`;
                    }
                }
            }
            markdown += `</details>\n\n`;
        }
    }

    let markdown = `<br><br><br>\n\n# Монолог\n_${new Date().toLocaleString()}_\n\n<br><br>\n\n`;
    console.log("TotalLength",chatBlocks.length);

    // Глобальный цикл по верхнеуровневым блокам RH7zg
    for (const topBlock of chatBlocks) {
        // вложенные блоки внутри текущего RH7zg
        const nestedBlocks = topBlock.querySelectorAll('div.CKgc1d[jsname="CS7uPe"]');

        if (nestedBlocks.length > 0) {
            console.log(`Найдена цепочка из ${nestedBlocks.length} вложенных блоков внутри RH7zg`);
            for (const nestedBlock of nestedBlocks) {
                parseSingleMessageBlock(nestedBlock);
            }
        } else {
            parseSingleMessageBlock(topBlock);
        }
    }

    markdown += `#\n\n<br><br><br>`;

    // Записываем .md файл в корень папки, где рядом изображения в подпапке ./source
    // Без внешнего и внутреннего zip контейнера, который будеь блокироваться google / перегружать скрипт

    const mdFileName = `google-ai-search-${new Date().toISOString().slice(0, 10)}.md`;
    const mdFileHandle = await rootDirHandle.getFileHandle(mdFileName, { create: true });
    const mdWritable = await mdFileHandle.createWritable();
    await mdWritable.write(new Blob([markdown], { type: 'text/markdown;charset=utf-8;' }));
    await mdWritable.close();

    console.log(`${mdFileName} создан!`);
})();
