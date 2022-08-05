function adaptive(
  listClass,
  listItemsClass,
  listLinkClass,
  adaptiveContainerClass,
  cross,
  crossActive,
  hidden,
  submenuClass,
  submenuItemClass,
  minWidthForWork) {

  if (document.documentElement.clientWidth < minWidthForWork) return;

  const list = document.querySelector(listClass),
    listItems = list.querySelectorAll(listItemsClass),
    adaptiveContainer = document.querySelector(adaptiveContainerClass),
    listItemsAdaptive = list.querySelector(cross);

  let countWidthItem = 200;

  function createSubmenu(item) {
    const submenuItem = document.createElement('li');
    const submenuLink = document.createElement('a');

    submenuItem.classList.add(`${submenuItemClass.replace(/\./, '')}`);
    submenuLink.classList.add(`${listLinkClass.replace(/\./, '')}`);

    submenuLink.href = item.querySelector('a').href;
    submenuLink.textContent = item.querySelector(listLinkClass).textContent;

    if (item.querySelector(submenuClass)) {
      const submenuSecond = document.createElement('ul');
      submenuSecond.classList.add(`${submenuClass.replace(/\./, '')}`);

      item.querySelectorAll(`${submenuClass} ${submenuItemClass}`).forEach(i => {
        const submenuSecondItem = document.createElement('li');
        const submenuSecondLink = document.createElement('a');

        submenuSecondItem.classList.add(`${submenuItemClass.replace(/\./, '')}`);
        submenuSecondLink.classList.add(`${listLinkClass.replace(/\./, '')}`);

        submenuSecondLink.textContent = i.querySelector(listLinkClass).textContent;
        submenuSecondLink.href = i.querySelector(listLinkClass).href;

        submenuSecondItem.append(submenuSecondLink);
        submenuSecond.append(submenuSecondItem);
      });

      submenuItem.append(submenuSecond);
    }

    submenuItem.append(submenuLink);
    adaptiveContainer.append(submenuItem);
  }

  for (let i = 0; i < listItems.length - 1; i++) {
    if (countWidthItem <= document.documentElement.clientWidth) {
      countWidthItem += listItems[i].offsetWidth;
      listItems[i].classList.remove(hidden);
    } else {
      listItems[i].classList.add(hidden);
      listItemsAdaptive.classList.add(crossActive);
      createSubmenu(listItems[i]);
    }

    if (!listItems[i].classList.contains(hidden)) listItemsAdaptive.classList.remove(crossActive);
  }

}

adaptive(
  '.list',
  '.list__item',
  '.list__link',
  '.submenu-adaptive',
  '.list__item_adaptive',
  'list__item_adaptive_active',
  'hidden',
  '.submenu',
  '.submenu__item',
  460
);