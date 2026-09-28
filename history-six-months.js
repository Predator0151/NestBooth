(() => {
  const historyPage = document.getElementById('transaksi');
  if (!historyPage) return;
  const money = value => 'Rp' + Number(value || 0).toLocaleString('id-ID');
  const safe = text => String(text ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const isoDate = date => date.toLocaleDateString('sv-SE');
  const today = new Date();
  const sixMonthsAgo = new Date(); sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  historyPage.innerHTML = `<div class="card table-card"><h2>Riwayat Transaksi</h2><p class="muted">Lihat transaksi yang tersimpan dalam enam bulan terakhir.</p><div style="display:flex;gap:10px;flex-wrap:wrap;align-items:end;margin:18px 0"><label class="field">Dari tanggal<input id="historyFrom" type="date" min="${isoDate(sixMonthsAgo)}" max="${isoDate(today)}" value="${isoDate(sixMonthsAgo)}"></label><label class="field">Sampai tanggal<input id="historyTo" type="date" min="${isoDate(sixMonthsAgo)}" max="${isoDate(today)}" value="${isoDate(today)}"></label><button id="applyHistory" class="btn" type="button">Tampilkan</button></div><div id="historySummary" class="dash-grid" style="margin:0 0 18px"></div><table><thead><tr><th>No. Struk</th><th>Tanggal & Waktu</th><th>Item</th><th>Pembayaran</th><th>Total</th><th>Status</th></tr></thead><tbody id="transactions"></tbody></table></div>`;
  const getSales = () => { try { return JSON.parse(localStorage.getItem('nestbooth-sales-history')) || []; } catch { return []; } };
  function render() {
    const fromValue = document.getElementById('historyFrom').value;
    const toValue = document.getElementById('historyTo').value;
    if (!fromValue || !toValue || fromValue > toValue) { window.show?.('Pilih rentang tanggal yang valid.'); return; }
    const from = new Date(fromValue + 'T00:00:00');
    const to = new Date(toValue + 'T23:59:59');
    const sales = getSales().filter(sale => { const date = new Date(sale.timestamp); return date >= from && date <= to; }).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
    const total = sales.reduce((sum,sale) => sum + Number(sale.total || 0), 0);
    document.getElementById('historySummary').innerHTML = `<div class="card stat"><div class="label">Total Penjualan</div><div class="value">${money(total)}</div></div><div class="card stat"><div class="label">Jumlah Transaksi</div><div class="value">${sales.length}</div></div><div class="card stat"><div class="label">Rata-rata Transaksi</div><div class="value">${money(sales.length ? total / sales.length : 0)}</div></div>`;
    document.getElementById('transactions').innerHTML = sales.length ? sales.map(sale => `<tr><td>${safe(sale.receiptNumber)}</td><td>${new Date(sale.timestamp).toLocaleString('id-ID',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'})}</td><td>${(sale.items || []).reduce((sum,item) => sum + Number(item.qty || 0),0)} produk</td><td>${safe(sale.method)}</td><td>${money(sale.total)}</td><td><span class="badge ready">Selesai</span></td></tr>`).join('') : '<tr><td colspan="6" style="text-align:center;color:#718096;padding:30px">Belum ada transaksi pada periode ini.</td></tr>';
  }
  document.getElementById('applyHistory').onclick = render;
  document.querySelector('[data-page="transaksi"]')?.addEventListener('click', render);
  render();
})();
