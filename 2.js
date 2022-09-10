'use strict';

{
    if(window.location.pathname.indexOf('/checkout/') === 0) {
    // Проверяем, что скрипт выполняется в корзине
        const selectMethodElems = document.querySelector('checkout-payment');
        // Определяем в константу элемент окна с выбором метода оплаты

        if(selectMethodElems) {
        // Проверяем, что элемент окна с выбором метода был найден
            selectMethodElems.addEventListener('change', (e) => {
            // Определяем слушатель события на элементе с методами оплаты для вызова функции при смене метода оплаты
                if(e.target.parentNode.querySelector('.title').textContent === 'Долями') {
                // Если метод оплаты на сменили на "Долями"
                    const totalPrice = getOnlyNumberFromString(document.querySelector('.total > *:last-child').textContent);
                    // Объявляем в константу итоговую цену с типом number

                    setTimeout(() => {
                    // Костыль, который необходим, так как после каждой смены метода оплаты - элемент полностью перерисовывается (зачем?) и все слушатели событий теряются, поэтому, без доступа в основной файл скриптов сайта, необходим такой костыль :(
                        let currentElems = null;
                        // Объявляем переменную, в которую будет далее определен элемент Долями

                        for(const elems of selectMethodElems.querySelectorAll('input')) {
                        // Перебираем все инпуты и находим элемент Долями
                            if(elems.parentNode.querySelector('.title').textContent === 'Долями') {
                                currentElems = elems.parentNode.querySelector('a');
                                break;
                            };
                        };

                        if(currentElems) {
                        // Проверяем, что элемент Долями был найден
                            if(totalPrice > 0) {
                            // Проверяем, что значение итоговой цены корректное
                                const newElems = document.createElement('div');
                                const valueInElems = totalPrice <= 30000 ? `${Math.ceil(totalPrice / 4).toLocaleString()} ₽` : '25%';
                                newElems.textContent =
                                    `2 недели: ${valueInElems}, 4 недели: ${valueInElems}, 6 недель: ${valueInElems}, 8 недель: ${valueInElems}`;
                                // Создаём новый DIV-элемент с необходимой инфой

                                currentElems.insertAdjacentElement('beforebegin', newElems);
                                // Новый элемент вставляем ПЕРЕД линк-элементом "Подробнее"
                            }
                            else console.error('Некорректное значение итоговой цены');
                            // Если значение итоговой цены не корректное
                        }
                        else console.error('Не найден элемент Долями');
                        // Если элемент Долями не был найден
                    }, 2000); // Поставил среднее значение прогрузки элементов 2s., но если прогрузка будет дольше, то юзер не увидит наш элемент (такие вот костыли из-за ненужной перерисовки элементов, которые сайт делает каждый раз)

                    function getOnlyNumberFromString(str) {
                    // Функция, которая в качестве аргумента принимает строку и возвращает все цифры из этой строки
                        const regex = /\d+/g;
                        return Number((str.match(regex) ?? []).join(''));
                    };
                };
            });
        }
        else console.error('Не найден элемент выбора способа оплаты');
        // Если элемент не был найден
    }
    else console.error('Открытая страница не является корзиной');
    // Если скрипт выполняется НЕ в корзине
};