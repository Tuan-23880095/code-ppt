class AppController {
    constructor(api) {
        this.api = api;
        this.slideDeck = null;
    }

    async initMenu(containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = 'Đang tải danh sách bài giảng...';
        try {
            const data = await this.api.getMenu();
            container.innerHTML = '';
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';
                // Truyền ID sang trang ppt.html
                card.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <button onclick="window.location.href='ppt.html?id=${item.id}'" class="btn">Mở Bài</button>
                `;
                container.appendChild(card);
            });
        } catch (e) {
            container.innerHTML = '<p style="color:red">Lỗi tải dữ liệu.</p>';
        }
    }

    async initSlideShow(containerId) {
        const container = document.getElementById(containerId);
        const urlParams = new URLSearchParams(window.location.search);
        const baiId = urlParams.get('id');

        if (!baiId) {
            container.innerHTML = 'Lỗi: Không tìm thấy ID bài giảng.';
            return;
        }

        try {
            const slidesData = await this.api.getSlides(baiId);
            // Khởi tạo model SlideDeck
            this.slideDeck = new SlideDeck(slidesData, containerId);
            this.slideDeck.renderCurrentSlide();
        } catch (e) {
            container.innerHTML = '<p style="color:red">Lỗi tải slide.</p>';
        }
    }
}

// Khởi tạo global app
const app = new AppController(apiInstance);

// Tự động chạy logic tương ứng khi trang load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('menu-container')) {
        app.initMenu('menu-container');
    }
    if (document.getElementById('slide-container')) {
        app.initSlideShow('slide-container');
    }
});
