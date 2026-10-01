(() => {
  const box = document.querySelector('#dashboard .two-col .card.section:last-child');
  if (!box) return;
  function renderLowStock() {
    const lowStock = materials.filter(material => Number(material.stock) <= Number(material.min));
    box.innerHTML = `<h2>Stok Bahan Menipis</h2><table><tr><th>Bahan Baku</th><th>Stok</th></tr>${lowStock.length ? lowStock.map(material => `<tr><td>${material.name}</td><td><span class="badge wait">${Number(material.stock).toLocaleString('id-ID')} ${material.unit}</span></td></tr>`).join('') : '<tr><td colspan="2" class="muted" style="padding:18px 4px">Tidak ada bahan baku yang stoknya menipis.</td></tr>'}</table>`;
  }
  const originalRefreshStockAdmin = refreshStockAdmin;
  refreshStockAdmin = function () { originalRefreshStockAdmin(); renderLowStock(); };
  renderLowStock();
})();
