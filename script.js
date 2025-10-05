document.getElementById("startBtn").addEventListener("click", () => {
    const A = Number(document.getElementById("inputA").value);
    const B = Number(document.getElementById("inputB").value);
    const log = document.getElementById("log");
    log.textContent = "";

    if (isNaN(A) || isNaN(B)) {
        log.textContent = "Ошибка: введите два числа.";
        return;
    }

    function write(line) {
        log.textContent += line + "\n";
    }

    function toBinary(num, bits = 8) {
        const abs = Math.abs(num);
        const bin = abs.toString(2).padStart(bits, "0");
        const sign = num < 0 ? "1" : "0";
        return `${sign},${bin}`;
    }

    // === Блок 5 ===
    write(`Введённые числа: A=${A}, B=${B}`);
    write(`Прямой код: A=${toBinary(A)}, B=${toBinary(B)}`);

    // === Блок 6 ===
    const signA = A < 0 ? 1 : 0;
    const signB = B < 0 ? 1 : 0;
    const SV = (signA + signB) % 2; // XOR
    write(`Признак операции: СВ=${SV} (${SV === 0 ? "сумма" : "разность"})`);

    // === Блок 7–14 ===
    let greater, lesser;
    if (Math.abs(A) >= Math.abs(B)) {
        greater = A;
        lesser = B;
    } else {
        greater = B;
        lesser = A;
    }
    write(`Большее по модулю: ${greater}, меньшее: ${lesser}`);

    // Функция поразрядного сложения
    function addBinary(a, b, bits = 8) {
        const result = [];
        let carry = 0;
        const binA = Math.abs(a).toString(2).padStart(bits, "0").split("").reverse();
        const binB = Math.abs(b).toString(2).padStart(bits, "0").split("").reverse();
        write(`Начало побитового сложения:`);
        for (let i = 0; i < bits; i++) {
            const sum = parseInt(binA[i]) + parseInt(binB[i]) + carry;
            const bit = sum % 2;
            carry = Math.floor(sum / 2);
            result.push(bit);
            write(`Разряд ${i}: ${binA[i]} + ${binB[i]} + перенос ${carry} => бит=${bit}, новый перенос=${carry}`);
        }
        result.push(carry); // старший разряд
        return parseInt(result.reverse().join(""), 2) * (a >= 0 ? 1 : -1);
    }

    // Функция поразрядного вычитания (greater - lesser)
    function subtractBinary(greater, lesser, bits = 8) {
        const result = [];
        let borrow = 0;
        const binG = Math.abs(greater).toString(2).padStart(bits, "0").split("").reverse();
        const binL = Math.abs(lesser).toString(2).padStart(bits, "0").split("").reverse();
        write(`Начало побитового вычитания:`);
        for (let i = 0; i < bits; i++) {
            let diff = parseInt(binG[i]) - parseInt(binL[i]) - borrow;
            if (diff < 0) {
                diff += 2;
                borrow = 1;
            } else {
                borrow = 0;
            }
            result.push(diff);
            write(`Разряд ${i}: ${binG[i]} - ${binL[i]} - заём ${borrow} => бит=${diff}, новый заём=${borrow}`);
        }
        return parseInt(result.reverse().join(""), 2) * (greater >= 0 ? 1 : -1);
    }

    let finalResult;
    if (SV === 0) {
        write(`СВ=0 → одинаковые знаки → выполняется сложение.`);
        finalResult = addBinary(A, B);
    } else {
        write(`СВ=1 → разные знаки → выполняется вычитание из большего числа меньшего.`);
        finalResult = subtractBinary(greater, lesser);
    }

    write(`Результат: ${finalResult}`);
    write(`Прямой код результата: ${toBinary(finalResult)}`);
    write(`Запись результата в регистр. Конец работы алгоритма.`);
});
