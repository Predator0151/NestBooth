(() => {
  const photos = {
    'NESLO': 'assets/01-Neslo.png',
    'Nestea Lemon Tea': 'assets/02-Nestea.png',
    'Nestlé Lemonade': 'assets/03-Lemonade.png',
    'Nestlé Blackcurrant': 'assets/04-Blackcurrant.png',
    'Nestlé Milo': 'assets/05-Milo.png',
    'Nescafé Caffe Latte': 'assets/06-Coffee.png',
    'Nescafé Ice Roast': 'assets/07-Ice-Roast.png'
  };
  const style = document.createElement('style');
  style.textContent = '.product{padding:0;overflow:hidden}.product-photo{display:block;width:100%;height:128px;object-fit:cover;background:#eef3f8}.product-details{padding:11px 12px 12px}.product .pname{line-height:1.3}';
  document.head.appendChild(style);
  renderProducts = function () {
    const keyword = search.value.toLowerCase();
    const visible = products.filter(product => (filter === 'Semua' || product[1] === filter) && product[0].toLowerCase().includes(keyword));
    productsEl.innerHTML = visible.map(product => {
      const index = products.indexOf(product);
      const photo = photos[product[0]];
      return `<div class="product" onclick="add(${index})">${photo ? `<img class="product-photo" src="${photo}" alt="${product[0]}">` : ''}<div class="product-details"><div class="pname">${product[0]}</div><div class="price">${money(product[2])}</div><div class="stock">Menggunakan bahan baku</div></div></div>`;
    }).join('') || '<p class="muted">Produk tidak ditemukan.</p>';
  };
  search.oninput = renderProducts;
  renderProducts();
})();
