class GoogleSheetAPI {
    constructor(scriptUrl) {
        this.scriptUrl = scriptUrl;
    }

    async fetchData(action, params = '') {
        try {
            const url = `${this.scriptUrl}?action=${action}${params}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error("Lỗi API:", error);
            throw error;
        }
    }

    getMenu() {
        return this.fetchData('getMenu');
    }

    getSlides(baiId) {
        return this.fetchData('getSlides', `&id=${baiId}`);
    }
}

// Thay bằng URL từ Google Apps Script của bạn
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzMBXpuOtP8ruqETROSKu9cE82wR8-R6qU8r4CBvfvoARWfo0iEaW7le61lg8_EcbM6/exec';
const apiInstance = new GoogleSheetAPI(SCRIPT_URL);
