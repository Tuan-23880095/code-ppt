class SlideDeck {
    constructor(slidesData, containerId) {
        // Chuyển đổi dữ liệu thô từ API thành các đối tượng Slide
        this.slides = slidesData.map(data => new Slide(data));
        this.currentIndex = 0;
        this.container = document.getElementById(containerId);
    }

    renderCurrentSlide() {
        if (this.slides.length === 0) {
            this.container.innerHTML = '<p>Không có dữ liệu slide.</p>';
            return;
        }

        const currentSlideHTML = this.slides[this.currentIndex].render();
        const controlsHTML = `
            <div class="controls">
                <button class="btn" onclick="app.slideDeck.prev()" ${this.currentIndex === 0 ? 'disabled' : ''}>Trang Trước</button>
                <span>Trang ${this.currentIndex + 1} / ${this.slides.length}</span>
                <button class="btn" onclick="app.slideDeck.next()" ${this.currentIndex === this.slides.length - 1 ? 'disabled' : ''}>Trang Sau</button>
            </div>
        `;

        this.container.innerHTML = currentSlideHTML + controlsHTML;
    }

    next() {
        if (this.currentIndex < this.slides.length - 1) {
            this.currentIndex++;
            this.renderCurrentSlide();
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.renderCurrentSlide();
        }
    }
}
