import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('SW registered!', reg))
            .catch(err => console.log('SW registration failed: ', err));
    });
}

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
    itinerary: {},
    expenses: [],
    tickets: [],
    currentDay: 1,
    selectedPayer: "Zoey",
    selectedParticipants: ["Zoey", "Jess", "Zhe", "Sunny"],
    activeView: 'itinerary',
    editingExpenseId: null,
    editingTicketId: null,
    balances: {},
    tempImageUrl: null,
    statsChart: null
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
    } catch (e) {
        console.error('loadAll failed:', e);

        state.itinerary = state.itinerary || {};
        state.expenses = state.expenses || [];
        state.tickets = state.tickets || [];

        try {
            ui.renderAll();
        } catch (renderErr) {
            console.error('render failed:', renderErr);
        }

        alert('資料載入失敗，先以空白資料開啟。你之後可以再檢查 Supabase 設定。');
    } finally {
        const loading = document.getElementById('loading-screen');
        if (loading) loading.style.display = 'none';
    }
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
    // 此處包含所有 UI.render 邏輯
    // 為了節省篇幅，這部分應與 Canvas 中原本的 ui 物件完全一致
    // 請複製 Canvas 中的完整 ui 內容至此
    renderAll() { this.renderItinerary(state.currentDay); this.renderExpenses(); this.renderTickets(); this.initDatePicker(); },
    // ... (其他 ui 函式)
    getIcon: (t) => ({ '起飛':'plane-takeoff','抵達':'map-pin','景點':'camera','美食':'utensils','飯店':'bed','🚗':'car','轉機攻略':'book-open', '準備': 'list-checks' }[t] || 'star')
};

// 系統初始化
window.onload = () => {
    window.ui = ui; window.logic = logic; window.state = state;
    logic.loadAll();
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (header) { if (window.scrollY > 50) header.classList.add('header-scrolled'); else header.classList.remove('header-scrolled'); }
    });

};
