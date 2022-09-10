'use strict';

console.log(getMaxBlockNesting());

function getMaxBlockNesting(startBlock = document.body) {
    let returnResult = 0;
    // Переменная, которая будет содержать максимальную вложенность элементов
    findLongestNesting(startBlock);
    // Вызываем функцию, которая переберет весь элемент и сама обновит returnResult
    return returnResult;

    function findLongestNesting(currentBlock, currentNesting = 0) {
    // Рекурсивная функция, которая в качестве аргумента принимает элемент, который нужно перебрать И (необязательно) текущую вложенность
        if(currentBlock.children.length > 0) {
        // Если блок имеет ХОТЬ ОДИН дочерний элемент (т.е., блок не конечный в текущей вложенности)
            for(let i = 0; i < currentBlock.children.length; i++) {
                findLongestNesting(currentBlock.children[i], currentNesting + 1);
                // Вызываем саму себя с необходимыми аргументами
            };
        }
        else currentNesting > returnResult ? returnResult = currentNesting : null;
        // Если блок оказался конечным, то проверяем, что текущая вложенность была максимальная из ранее определённых и обновляем переменную максимальной вложенности ИЛИ ничего не делаем
    };
};