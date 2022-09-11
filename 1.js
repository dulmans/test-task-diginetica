'use strict';

{
    try {
        if(!(window.location.pathname.indexOf('/product/') === 0)) throw new Error('Открытая страница не является карточкой товара');
        // Проверяем, что скрипт выполняется на карточке товара

        const priceElements = document.querySelectorAll('.price');
        // Получаем список элементов, в которых содержатся цены (вкл. цену со скидкой и основную цену)
        if(!(priceElements.length > 0)) throw new Error('Элементы с ценами не были найдены');
        // Проверяем, найдены ли элементы в DOM

        const priceArray = [];
        // Объявляем переменную с массивом, который будет содержать ТОЛЬКО цены
        priceElements.forEach(element => {
        // Перебираем полученный массив HTML-элементов и заносим в массив отпарсенные цены из карточки товара
            const elementPriceContent = getOnlyNumberFromString(element.textContent);
            if(!(elementPriceContent > 0)) throw new Error('Было передано некорректное значение цены');
            // Ставим проверку на случай некорректного значения цены
            priceArray.push(elementPriceContent);
        });
        if(!(priceArray.length > 0)) throw new Error('Значения с ценами не были найдены в DOM');
        // Проверяем, чтобы в массиве был хотя-бы один элемент

        const mainPrice = Math.max(...priceArray);
        // Определяем значение переменной как максимальная цена в массиве цен
        if(!(mainPrice <= 30000)) throw new Error('Значение цены не должно быть больше 30000');
        // Проверяем, чтобы цена была не больше 30к

        {
            const pricesNodeElement = document.querySelector('product-price');
            const newPriceElem = document.createElement('div');
            newPriceElem.textContent = `test price: ${Math.ceil(mainPrice / 4).toLocaleString()} ₽`;
            newPriceElem.style.margin = '-20px 20px 20px';
            // Создаём необходимый элемент и задаём ему стили и текстовый контент

            pricesNodeElement.insertAdjacentElement('afterend', newPriceElem);
            // Вставляем элемент в DOM
        };

        function getOnlyNumberFromString(str) {
        // Функция, которая в качестве аргумента принимает строку и возвращает все цифры из этой строки
            const regex = /\d+/g;
            return Number((str.match(regex) ?? []).join(''));
        };
    } catch (error) {
        console.error(error);
    };
};