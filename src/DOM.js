/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const el = document.createElement(tag);
        el.textContent = content;
        document.body.appendChild(el);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    if (level <= 0) {
        return null;
    }
    const div = document.createElement('div');
    function build(currentLevel, maxLevel) {
        if (currentLevel > maxLevel) return null;
        const el = document.createElement('div');
        el.className = `item_${currentLevel}`;
        for (let i = 0; i < childrenCount; i++) {
            const child = build(currentLevel + 1, maxLevel);
            if (child) {
                el.appendChild(child);
            }
        }
        return el;
    }
    return build(1, level);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const tree = generateTree(2, 3);
    const item2Nodes = tree.querySelectorAll('.item_2');
    item2Nodes.forEach((div) => {
        const section = document.createElement('section');
        section.className = div.className;
        while (div.firstChild) {
            section.appendChild(div.firstChild);
        }
        div.parentNode.replaceChild(section, div);
    });
    return tree;
}
