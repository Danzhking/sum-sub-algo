document.getElementById("startBtn").addEventListener("click", () => {
    const A = Number(document.getElementById("inputA").value);
    const B = Number(document.getElementById("inputB").value);
    const log = document.getElementById("log");
    log.textContent = "";

    if (isNaN(A) || isNaN(B)) {
        log.textContent = "Ошибка: введите два числа.";
        return;
    }

    // вспомогательные функции
    function toBinary(num, bits = 8) {
        const abs = Math.abs(num);
        const bin = abs.toString(2).padStart(bits, "0");
        const sign = num < 0 ? "1" : "0";
        return `${sign},${bin}`;
    }

    function write(line) {
        log.textContent += line + "\n";
    }

    // === Алгоритм ===

    // Блок 5
    write(`Введённые числа: A=${A}, B=${B}`);
    write(`Преобразование в прямой код: A=${toBinary(A)}, B=${toBinary(B)}`);

    // Блок 6
    const signA = A < 0 ? 1 : 0;
    const signB = B < 0 ? 1 : 0;
    const SV = (signA + signB) % 2; // XOR по модулю 2
    write(`Определение признака операции: СВ=${SV} (${SV === 0 ? "сумма" : "разность"})`);

    // Блок 7
    write(`Подача A и B в компаратор.`);
    const comparison = A > B ? "A > B" : (A < B ? "A < B" : "A = B");
    write(`Результат сравнения: ${comparison}`);

    // Блоки 8–14: логика ветвления
    if (A === B) {
        write(`Числа равны. Переход на блок 9.`);
        write(`СВ=${SV}. Если СВ=1 — результат 0, если 0 — сумма равных чисел.`);
        write(`Результат = 0`);
    } else {
        write(`Числа не равны. Переход на блоки 12–15.`);

        let greater, lesser;
        if (Math.abs(A) > Math.abs(B)) {
            greater = A;
            lesser = B;
            write(`Загрузка большего числа: ${greater}, меньшего: ${lesser}.`);
        } else {
            greater = B;
            lesser = A;
            write(`Загрузка большего числа: ${greater}, меньшего: ${lesser}.`);
        }

        // Блок 15: анализ СВ
        if (SV === 0) {
            write(`СВ=0 → одинаковые знаки → выполняется сложение.`);
            const result = A + B;
            write(`Сложение: ${A} + ${B} = ${result}`);
            write(`Преобразование результата в прямой код: ${toBinary(result)}`);
        } else {
            write(`СВ=1 → разные знаки → выполняется вычитание.`);
            const result = greater - lesser;
            write(`Вычитание: ${greater} - ${lesser} = ${result}`);
            write(`Преобразование результата в прямой код: ${toBinary(result)}`);
        }
    }

    // Блок 27–28
    write(`Запись результата в регистр.`);
    write(`Завершение работы алгоритма.`);
});
