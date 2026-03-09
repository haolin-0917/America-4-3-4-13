import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CONFIG = {
    URL: "https://aivhigrhfipanyjgwcsv.supabase.co",
    KEY: "sb_publishable_GVV6yg88ibHN5i9ZAnHOyw_ew0Z3O-V",
    TRIP_ID: "2026-freedom-usa-trip-master",
    EXPENSE_ID: "expense",
    TICKET_ID: "ticket",
    BUCKET_ID: "Americiaimg",
    EXCHANGE_RATE: 32.5,
    MEMBERS: ["Zoey", "Jess", "Zhe", "Sunny"],
    CAT_COLORS: {'交通':'#007AFF','餐飲':'#FF3B30','小費':'#34C759','門票活動':'#FFCC00','購物':'#FF9500','其他':'#8E8E93','機票':'#AF52DE','住宿':'#5856D6'},
    CAT_ICONS: {'交通':'car','餐飲':'utensils','小費':'dollar-sign','門票活動':'ticket','購物':'shopping-bag','其他':'credit-card','機票':'plane','住宿':'bed'}
};

const supabase = createClient(CONFIG.URL, CONFIG.KEY);

let state = {
    itinerary: {}, expenses: [], tickets: [], currentDay: 1, 
    selectedPayer: "Zoey", selectedParticipants: ["Zoey", "Jess", "Zhe", "Sunny"], 
    activeView: 'itinerary', editingExpenseId: null, editingTicketId: null, 
    balances: {}, tempImageUrl: null, statsChart: null
};

const logic = {
    async loadAll() {
        try {
            const res = await Promise.all([
                supabase.from('trips').select('data').eq('trip_id', CONFIG.TRIP_ID).maybeSingle(),
                supabase.from('trips').select('data').eq('trip_id', CONFIG.EXPENSE_ID).maybeSingle(),
                supabase.from('trips').select('data').eq('trip_id', CONFIG.TICKET_ID).maybeSingle()
            ]);
            state.itinerary = res[0].data?.data || {};
            state.expenses = Array.isArray(res[1].data?.data) ? res[1].data.data : [];
            state.tickets = Array.isArray(res[2].data?.data) ? res[2].data.data : [];
            ui.renderAll(); 
            document.getElementById('loading-screen').style.display = 'none';
        } catch(e) { console.error(e); }
    },
    async saveExpenses() {
        ui.showStatus("Saving...", 0);
        await supabase.from('trips').upsert({ trip_id: CONFIG.EXPENSE_ID, data: state.expenses, updated_at: new Date().toISOString() }, { onConflict: 'trip_id' });
        ui.showStatus("同步成功 ✅", 1500); ui.renderExpenses();
    },
    async saveTickets() {
        ui.showStatus("Saving...", 0);
        await supabase.from('trips').upsert({ trip_id: CONFIG.TICKET_ID, data: state.tickets, updated_at: new Date().toISOString() }, { onConflict: 'trip_id' });
        ui.showStatus("票券同步成功 ✅", 1500); ui.renderTickets();
    },
    extractFileName(url) {
        if (!url) return null;
        const parts = url.split('/');
        return parts[parts.length - 1];
    },
    async deleteCloudImage(url) {
        const fileName = this.extractFileName(url);
        if (!fileName) return;
        try { await supabase.storage.from(CONFIG.BUCKET_ID).remove([fileName]); } catch (e) { console.error("Cloud delete failed:", e); }
    },
    submitExpense() {
        const title = document.getElementById('exp-title').value.trim();
        const amount = Number(document.getElementById('exp-amount').value);
        const category = document.getElementById('exp-category').value;
        if (!title || isNaN(amount)) return;
        if (state.editingExpenseId) {
            state.expenses = state.expenses.map(e => e.id === state.editingExpenseId ? { ...e, title, amount, category, payer: state.selectedPayer, participants: [...state.selectedParticipants] } : e);
        } else {
            state.expenses.unshift({ id: Date.now(), title, amount, currency: 'USD', category, payer: state.selectedPayer, participants: [...state.selectedParticipants], date: new Date().toISOString() });
        }
        this.saveExpenses(); ui.closeModal('expense-modal');
    },
    async deleteExpense() {
        if (!state.editingExpenseId) return;
        state.expenses = state.expenses.filter(e => e.id !== state.editingExpenseId);
        await this.saveExpenses(); ui.closeModal('expense-modal');
    },
    async submitTicket() {
        const title = document.getElementById('tk-title').value.trim();
        if (!title) return;
        const note = document.getElementById('tk-note').value.trim();
        const attachment = document.getElementById('tk-attachment').value.trim();
        if (state.editingTicketId) {
            const oldTicket = state.tickets.find(t => t.id === state.editingTicketId);
            if (oldTicket && oldTicket.image && oldTicket.image !== state.tempImageUrl) await this.deleteCloudImage(oldTicket.image);
            state.tickets = state.tickets.map(t => t.id === state.editingTicketId ? { ...t, title, note, attachment, image: state.tempImageUrl } : t);
        } else {
            state.tickets.unshift({ id: Date.now(), title, note, attachment, image: state.tempImageUrl });
        }
        await this.saveTickets(); ui.closeModal('ticket-edit-modal');
    },
    async deleteTicket() {
        if (!state.editingTicketId) return;
        const target = state.tickets.find(t => t.id === state.editingTicketId);
        if (target && target.image) await this.deleteCloudImage(target.image);
        state.tickets = state.tickets.filter(t => t.id !== state.editingTicketId);
        await this.saveTickets(); ui.closeModal('ticket-edit-modal');
    }
};

const ui = {
    renderAll() { 
        this.renderItinerary(state.currentDay); 
        this.renderExpenses(); 
        this.renderTickets(); 
        this.initDatePicker(); 
    },

    switchView(v) {
        state.activeView = v;
        document.querySelectorAll('.view-section').forEach(s => s.classList.add('hidden'));
        const targetView = document.getElementById(`view-${v}`);
        if (targetView) targetView.classList.remove('hidden');
        
        document.querySelectorAll('.view-header').forEach(h => h.classList.add('hidden'));
        const targetHeader = document.getElementById(`header-${v}`);
        if (targetHeader) targetHeader.classList.remove('hidden');
        
        document.querySelectorAll('.nav-card').forEach(b => b.classList.toggle('active', b.id === `nav-${v}`));
        
        const fExp = document.getElementById('fab-expense'); 
        if (fExp) fExp.style.display = (v === 'expenses') ? 'flex' : 'none';
        
        const fTik = document.getElementById('fab-ticket'); 
        if (fTik) fTik.style.display = (v === 'tickets') ? 'flex' : 'none';
        
        lucide.createIcons(); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    renderItinerary(n) {
        const list = document.getElementById('itinerary-list');
        if(!list) return;
        const data = state.itinerary[n] || { items: [] };
        
        const titleEl = document.getElementById('day-title-inner');
        if (titleEl) { titleEl.innerText = data.title || '探索美國中...'; titleEl.style.display = 'block'; }
        
        const routeEl = document.getElementById('day-route-path');
        if (routeEl) { routeEl.innerHTML = data.route ? `<i data-lucide="navigation" class="w-3.5 h-3.5 text-blue-500"></i> ${data.route}` : ''; routeEl.style.display = data.route ? 'flex' : 'none'; }
        
        const badgeEl = document.getElementById('display-day-badge');
        if (badgeEl) badgeEl.innerText = `DAY ${n}`;

        let html = "";
        if (data.items?.length) {
            html += data.items.map(item => {
                if (item.type === '🚗' || item.type === '轉機攻略') {
                    const guideOnClick = (item.type === '轉機攻略' && item.guideSteps) ? `onclick="ui.showGuideModal('${encodeURIComponent(JSON.stringify(item.guideSteps))}')"` : '';
                    return `<div class="iti-transfer-container"><div class="iti-transfer-card shadow-sm ${item.type==='轉機攻略'?'clickable':''}" ${guideOnClick}><div class="flex items-center gap-3 flex-grow min-w-0"><div class="w-8 h-8 rounded-full bg-slate-200/40 flex items-center justify-center text-slate-400"><i data-lucide="${item.type==='轉機攻略'?'book-open':'car'}" class="w-4.5 h-4.5"></i></div><div class="flex flex-col min-w-0 text-left"><div class="flex items-center">${item.time ? `<span class="text-[14px] font-black text-slate-800 leading-tight">${item.time}</span>` : ''}${item.type==='轉機攻略'?'<span class="bg-blue-600 text-white px-1.5 py-0.5 rounded-lg text-[10px] ml-1">轉機攻略</span>':''}</div>${item.title ? `<span class="text-[11px] font-bold text-slate-500 mt-0.5">${item.title}</span>` : ''}${item.note ? `<span class="text-[10px] text-slate-400 mt-0.5 italic text-left">${item.note}</span>` : ''}</div></div><div class="flex items-center gap-2">${item.type==='轉機攻略'?'<i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-300"></i>':''}${(item.nav || item.link) ? `<a href="${item.nav||item.link}" target="_blank" onclick="event.stopPropagation()" class="nav-action-btn shadow-sm"><i data-lucide="map" class="w-4.5 h-4.5 text-white"></i></a>`:''}</div></div></div>`;
                }
                const iconStyle = (item.type === '準備') ? 'style="background: #D1D1D6; box-shadow: none;"' : '';
                return `<div class="iti-item-row"><div class="iti-timeline-col"><div class="iti-line-dashed"></div><div class="iti-icon-box" ${iconStyle}><i data-lucide="${this.getIcon(item.type)}" class="w-4.5 h-4.5"></i></div></div><div class="iti-content-col"><div class="iti-main-item-card"><div class="min-w-0 flex-grow text-left"><h4 class="font-black text-[17px] text-slate-900 mb-2 leading-tight truncate">${item.title || '未命名'}</h4><div class="flex items-center gap-3">${item.time?`<span class="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-lg text-[10px] font-black">${item.time}</span>`:''}${item.location?`<span class="text-slate-300 text-[11px] font-bold truncate uppercase flex items-center gap-1"><i data-lucide="map-pin" class="w-3 h-3"></i> ${item.location}</span>`:''}</div></div>${(item.nav||item.link)?`<a href="${item.nav||item.link}" target="_blank" onclick="event.stopPropagation()" class="nav-action-btn shadow-lg"><i data-lucide="map" class="w-4.5 h-4.5 text-white"></i></a>`:''}</div>${item.note ? `<div class="iti-sub-item-card">${item.note}</div>` : ''}</div></div>`;
            }).join('');
        } else html = `<div class="py-40 text-center text-slate-300 font-black tracking-widest opacity-40 text-xs uppercase">暫無行程紀錄</div>`;
        list.innerHTML = html; lucide.createIcons();
    },

    renderExpenses() {
        const summary = document.getElementById('settlement-summary');
        const list = document.getElementById('expense-list');
        if(!summary || !list) return;
        let balUSD = {}; let totalSpent = { USD: {}, TWD: {} };
        CONFIG.MEMBERS.forEach(m => { balUSD[m] = 0; totalSpent.USD[m] = 0; totalSpent.TWD[m] = 0; });
        state.expenses.forEach(e => {
            const amt = Number(e.amount) || 0; const curr = e.currency || 'USD';
            const participants = Array.isArray(e.participants) ? e.participants : [];
            const share = amt / (participants.length || 1);
            participants.forEach(p => { if (CONFIG.MEMBERS.includes(p)) { if (curr === 'USD') { totalSpent.USD[p] += share; balUSD[p] -= share; } else totalSpent.TWD[p] += share; } });
            if (curr === 'USD' && CONFIG.MEMBERS.includes(e.payer)) balUSD[e.payer] += amt;
        });
        state.balances.USD = balUSD;
        summary.innerHTML = CONFIG.MEMBERS.map(m => {
            const combinedTwd = Math.round(totalSpent.USD[m] * CONFIG.EXCHANGE_RATE + totalSpent.TWD[m]);
            const usdBal = balUSD[m];
            return `<div onclick="ui.openPersonalStats('${m}')" class="settlement-card-focus"><div class="text-[10px] font-black text-slate-400 mb-2 uppercase">${m}</div><div class="text-[22px] font-black text-slate-900 leading-none mb-1">NT$${combinedTwd.toLocaleString()}</div><div class="text-[9px] font-bold text-slate-400 mb-4">$${totalSpent.USD[m].toFixed(1)} Spent</div><div class="pt-2.5 border-t border-slate-100"><div class="text-[11px] font-bold ${usdColor(usdBal)}">${usdBal>=0?'+':''}$${usdBal.toFixed(1)}</div></div></div>`;
        }).join('');
        list.innerHTML = state.expenses.length ? state.expenses.map(e => `<div onclick="ui.showExpenseModal(${JSON.stringify(e).replace(/"/g, '&quot;')})" class="expense-card-compact"><div class="flex items-center gap-3"><div class="icon-box-mini"><i data-lucide="${CONFIG.CAT_ICONS[e.category]||'credit-card'}" class="w-4 h-4"></i></div><div><h4 class="font-black text-[14px] text-left text-slate-800 leading-none mb-1">${e.title||''}</h4><p class="text-[8px] text-slate-400 text-left uppercase font-bold">By ${e.payer}</p></div></div><div class="text-[15px] font-black text-slate-900 leading-none">$${Number(e.amount||0).toLocaleString()}</div></div>`).join('') : `<div class="py-40 text-center text-slate-300 uppercase tracking-widest text-xs">尚無支出紀錄</div>`;
        const tCount = document.getElementById('total-count'); if (tCount) tCount.innerText = `${state.expenses.length} 項紀錄`; lucide.createIcons();
    },

    renderTickets() {
        const list = document.getElementById('ticket-list');
        if(!list) return;
        list.innerHTML = state.tickets.length ? state.tickets.map(t => `<div onclick="ui.showTicketModal(${JSON.stringify(t).replace(/"/g, '&quot;')})" class="iti-main-item-card !p-4 mb-3 transition-all active:scale-[0.98] cursor-pointer"><div class="flex items-center justify-between w-full"><div class="flex items-center gap-3.5 min-w-0"><div style="width:36px; height:36px; border-radius:10px; background:#F4F7FF; color:#007AFF; display:flex; align-items:center; justify-content:center;"><i data-lucide="ticket" class="w-4.5 h-4.5"></i></div><div class="flex flex-col min-w-0 text-left"><h4 class="font-black text-slate-900 truncate text-sm">${t.title || '未命名'}</h4>${t.note ? `<p class="text-[10px] text-slate-400 truncate mt-0.5 text-left">${t.note}</p>` : ''}</div></div><div class="flex items-center gap-2">${t.image ? `<div onclick="event.stopPropagation(); ui.showTicketImagePopup(${t.id})" class="p-2 -m-2 text-blue-600 active:scale-90 transition-all"><i data-lucide="paperclip" class="w-4.5 h-4.5"></i></div>` : ''}${t.attachment ? `<i data-lucide="link" class="w-3.5 h-3.5 text-blue-400 opacity-60"></i>` : ''}<i data-lucide="chevron-right" class="w-4 h-4 text-slate-200"></i></div></div></div>`).join('') : `<div class="py-40 text-center text-slate-300 font-black opacity-30 text-xs tracking-widest uppercase">尚無票券</div>`;
        lucide.createIcons();
    },

    initDatePicker() {
        const startDate = new Date('2026-04-03'); const picker = document.getElementById('date-picker'); if(!picker) return;
        const weekDays = ["週日","週一","週二","週三","週四","週五","週六"];
        picker.innerHTML = Array.from({length: 11}, (_, i) => {
            const cur = new Date(startDate); cur.setDate(startDate.getDate() + i);
            return `<div onclick="ui.switchDay(${i+1})" class="date-card-new flex-shrink-0 ${i+1===state.currentDay?'active':''}">
                <span class="day-label">Day ${i+1}</span><span class="week-label">${weekDays[cur.getDay()]}</span><span class="date-val">${cur.getMonth()+1}/${cur.getDate()}</span>
            </div>`;
        }).join('');
    },

    showSettlementAdvice() {
        const results = []; const bal = { ...state.balances.USD };
        const creditors = CONFIG.MEMBERS.filter(m => bal[m] > 0.05).sort((a, b) => bal[b] - bal[a]);
        const debtors = CONFIG.MEMBERS.filter(m => bal[m] < -0.05).sort((a, b) => bal[a] - bal[b]);
        let dIdx = 0, cIdx = 0;
        while (dIdx < debtors.length && cIdx < creditors.length) {
            const d = debtors[dIdx], c = creditors[cIdx]; const amount = Math.min(Math.abs(bal[d]), bal[c]);
            results.push({ from: d, to: c, amount: amount.toFixed(1) });
            bal[d] += amount; bal[c] -= amount; if (Math.abs(bal[d]) < 0.05) dIdx++; if (Math.abs(bal[c]) < 0.05) cIdx++;
        }
        const container = document.getElementById('settlement-advice-content');
        if (container) {
            container.innerHTML = results.length ? results.map(r => `<div class="advice-item shadow-sm p-4 bg-white rounded-2xl mb-3 flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">${r.from}</div><i data-lucide="arrow-right" class="w-4 h-4 text-blue-400"></i><div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">${r.to}</div></div><div class="text-lg font-black text-slate-900">$${r.amount}</div></div>`).join('') : `<div class="py-20 text-center text-slate-300 uppercase tracking-widest text-xs">帳目已清</div>`;
        }
        this.openModal('settlement-advice-modal'); lucide.createIcons();
    },

    async handleTicketImage(e) {
        const file = e.target.files[0]; if (!file) return;
        const statusText = document.getElementById('upload-status-text');
        if (statusText) statusText.innerText = '處理中...';
        try {
            const fileName = `ticket_${Date.now()}.webp`;
            const { error } = await supabase.storage.from(CONFIG.BUCKET_ID).upload(fileName, file, { cacheControl: '86400', contentType: 'image/webp' });
            if (error) throw error;
            const { data: { publicUrl } } = supabase.storage.from(CONFIG.BUCKET_ID).getPublicUrl(fileName);
            state.tempImageUrl = publicUrl;
            const imgRender = document.getElementById('tk-image-render');
            if (imgRender) { imgRender.src = publicUrl; imgRender.classList.remove('hidden'); }
            if (statusText) statusText.innerText = '上傳成功 ✅';
        } catch (err) { console.error(err); if (statusText) statusText.innerText = '上傳失敗'; }
    },

    clearTicketImage(e) { e.stopPropagation(); state.tempImageUrl = null; document.getElementById('tk-image-render').classList.add('hidden'); },

    showExpenseModal(editingExp = null) {
        const catEl = document.getElementById('exp-category'); if(catEl && !catEl.innerHTML) catEl.innerHTML = Object.keys(CONFIG.CAT_COLORS).map(c => `<option value="${c}">${c}</option>`).join('');
        state.editingExpenseId = editingExp ? editingExp.id : null;
        document.getElementById('exp-title').value = editingExp ? editingExp.title : '';
        document.getElementById('exp-amount').value = editingExp ? editingExp.amount : '';
        document.getElementById('exp-category').value = editingExp ? editingExp.category : '其他';
        document.getElementById('delete-exp-btn').style.display = editingExp ? 'block' : 'none';
        this.updateChips(); this.openModal('expense-modal');
    },

    showTicketModal(editingTk = null) {
        state.editingTicketId = editingTk ? editingTk.id : null;
        state.tempImageUrl = editingTk ? editingTk.image : null;
        document.getElementById('tk-title').value = editingTk ? editingTk.title : '';
        document.getElementById('tk-note').value = editingTk ? editingTk.note : '';
        document.getElementById('tk-attachment').value = editingTk ? editingTk.attachment : '';
        const imgRender = document.getElementById('tk-image-render');
        if (imgRender) { if (state.tempImageUrl) { imgRender.src = state.tempImageUrl; imgRender.classList.remove('hidden'); } else imgRender.classList.add('hidden'); }
        document.getElementById('delete-tk-btn').style.display = editingTk ? 'block' : 'none';
        this.openModal('ticket-edit-modal');
    },

    openModal(id) { const m = document.getElementById(id); if (m) { m.style.display = 'flex'; setTimeout(() => m.classList.add('show'), 10); } },
    closeModal(id) { const m = document.getElementById(id); if (m) { m.classList.remove('show'); setTimeout(() => m.style.display = 'none', 300); } },
    showStatus(t, d) { const el = document.getElementById('save-status'); if (el) { el.innerText = t; el.style.display = 'block'; if (d) setTimeout(() => el.style.display = 'none', d); } },
    getIcon: (t) => ({ '起飛':'plane-takeoff','抵達':'map-pin','景點':'camera','美食':'utensils','飯店':'bed','🚗':'car','轉機攻略':'book-open', '準備': 'list-checks' }[t] || 'star'),
    switchDay(n) { state.currentDay = n; this.renderItinerary(n); this.initDatePicker(); window.scrollTo({ top: 0, behavior: 'smooth' }); },
    
    openPersonalStats(userName) {
        let usdTotal = 0; let catTotals = {}; Object.keys(CONFIG.CAT_COLORS).forEach(c => catTotals[c] = 0);
        const personalItems = state.expenses.filter(e => e.participants?.includes(userName));
        const itemListHtml = personalItems.map(e => {
            const shareAmt = (Number(e.amount) || 0) / (e.participants?.length || 1);
            usdTotal += shareAmt; catTotals[e.category] = (catTotals[e.category] || 0) + shareAmt;
            return `<div class="personal-item-card shadow-sm"><div class="flex items-center gap-3"><div class="icon-box-mini" style="color: ${CONFIG.CAT_COLORS[e.category]}"><i data-lucide="${CONFIG.CAT_ICONS[e.category] || 'credit-card'}" class="w-4 h-4"></i></div><div class="text-left"><h5 class="text-xs font-black truncate text-left w-32 text-slate-800 leading-tight">${e.title || '未命名'}</h5><p class="text-[8px] text-slate-400 text-left uppercase font-bold">${e.category}</p></div></div><div class="text-right"><span class="personal-item-share">$${shareAmt.toFixed(1)}</span></div></div>`;
        }).join('') || `<div class="py-10 text-center text-slate-300 font-bold text-xs uppercase">無消費紀錄</div>`;
        const combinedTwd = Math.round(usdTotal * CONFIG.EXCHANGE_RATE);
        document.getElementById('stat-totals-container').innerHTML = `<div class="text-center"><div class="text-[10px] font-black text-slate-400 uppercase mb-1">${userName} 個人總支出</div><div class="text-2xl font-black text-slate-900">NT$${combinedTwd.toLocaleString()} <span class="text-[14px] text-slate-400 font-bold">($${usdTotal.toFixed(1)})</span></div></div>`;
        document.getElementById('personal-item-list').innerHTML = itemListHtml;
        const ctxEl = document.getElementById('personal-chart');
        if (ctxEl) {
            const labels = Object.keys(catTotals).filter(c => catTotals[c] > 0);
            const dataValues = labels.map(c => catTotals[c]);
            const bgColors = labels.map(c => CONFIG.CAT_COLORS[c]);
            if (state.statsChart) state.statsChart.destroy();
            state.statsChart = new Chart(ctxEl.getContext('2d'), { type: 'doughnut', data: { labels, datasets: [{ data: dataValues, backgroundColor: bgColors, borderWidth: 0 }] }, options: { cutout: '75%', plugins: { legend: { display: false } } } });
        }
        this.openModal('personal-stats-modal'); lucide.createIcons();
    },

    updateChips() {
        const render = (id, list, sel, isSingle) => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = list.map(m => `<div onclick="ui.updateSel('${id}','${m}',${isSingle})" class="user-chip ${sel.includes(m)?'selected':''}">${m}</div>`).join('');
        };
        render('payer-list', CONFIG.MEMBERS, [state.selectedPayer], true);
        render('part-list', CONFIG.MEMBERS, state.selectedParticipants, false);
    },

    updateSel(id, m, isSingle) {
        if(isSingle) state.selectedPayer = m; else state.selectedParticipants.includes(m) ? state.selectedParticipants = state.selectedParticipants.filter(x=>x!==m) : state.selectedParticipants.push(m);
        this.updateChips();
    },

    showTicketImagePopup(id) {
        const tk = state.tickets.find(t => t.id === id); if (!tk || !tk.image) return;
        document.getElementById('td-title').innerText = tk.title || '圖片預覽';
        document.getElementById('td-note').innerText = tk.note || '無備註';
        const imgArea = document.getElementById('td-image-area'); const tdImg = document.getElementById('td-image');
        if (imgArea && tdImg) { imgArea.classList.remove('hidden'); tdImg.src = tk.image; }
        const attachBox = document.getElementById('td-attach-box'); const tdLink = document.getElementById('td-link');
        if (attachBox && tdLink) { if (tk.attachment) { attachBox.classList.remove('hidden'); tdLink.href = tk.attachment; } else attachBox.classList.add('hidden'); }
        this.openModal('ticket-detail-modal'); lucide.createIcons();
    },

    showGuideModal(encodedData) {
        const steps = JSON.parse(decodeURIComponent(encodedData));
        const content = document.getElementById('guide-modal-content');
        if (content && Array.isArray(steps)) {
            content.innerHTML = steps.map((s, i) => `<div class="strat-step-item"><div class="strat-step-num">${i + 1}</div><div class="strat-step-content">${s.title ? `<div class="strat-step-title text-slate-800 font-black">${s.title}</div>` : ''}<div class="strat-step-detail text-slate-500 font-medium">${s.detail || s}</div></div></div>`).join('');
        }
        this.openModal('guide-modal'); lucide.createIcons();
    }
};

// 輔助函式
const usdColor = (val) => val >= 0.05 ? 'text-green-500' : (val <= -0.05 ? 'text-slate-400' : 'text-slate-300');

window.onload = () => {
    window.ui = ui; window.logic = logic; window.state = state;
    logic.loadAll();
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (header) { if (window.scrollY > 50) header.classList.add('header-scrolled'); else header.classList.remove('header-scrolled'); }
    });
};
