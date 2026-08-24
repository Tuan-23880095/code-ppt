/**
 * ============================================================================
 * CLASS: SlideDeck
 * CHỨC NĂNG: Quản lý danh sách các Slide, trạng thái trình chiếu và điều hướng.
 * ============================================================================
 */

class SlideDeck {
    /**
     * @param {string} containerId - ID của thẻ HTML sẽ chứa các slide (VD: 'presentation-container')
     * @param {Object} globalConfig - Cấu hình chung sẽ được áp dụng cho mọi slide (chân trang)
     */
    constructor(containerId, globalConfig) {
        // Tìm và lưu lại thẻ <div> chứa slide trên giao diện
        this.container = document.getElementById(containerId);
        
        // Mảng chứa các đối tượng class Slide
        this.slides = [];
        
        // Lưu lại cấu hình chung
        this.globalConfig = globalConfig;

        // BIẾN TRẠNG THÁI: Lưu vị trí slide đang hiển thị (Bắt đầu từ 0)
        this.currentIndex = 0; 
    }

    /**
     * Nạp dữ liệu thô từ mảng (JSON/Object) và tạo thành các đối tượng Slide
     * @param {Array} slideDataArray - Mảng chứa các object nội dung slide
     */
    loadData(slideDataArray) {
        slideDataArray.forEach((data, index) => {
            // Tự động gán số trang dựa vào vị trí index trong mảng (index + 1)
            data.pageNumber = index + 1; 
            
            // Khởi tạo 1 đối tượng Slide mới và đẩy vào mảng quản lý
            const newSlide = new Slide(data, this.globalConfig);
            this.slides.push(newSlide);
        });
    }

    /**
     * Duyệt qua toàn bộ đối tượng Slide, nối mã HTML và in ra màn hình.
     */
    renderAll() {
        let allHtml = '';
        
        // Nối tất cả chuỗi HTML của từng slide lại với nhau
        this.slides.forEach(slide => {
            allHtml += slide.renderHTML();
        });
        
        // Đổ toàn bộ mã HTML đã nối vào thẻ chứa trên giao diện
        this.container.innerHTML = allHtml;

        // KÍCH HOẠT: Sau khi đổ HTML xong, tự động bật hiển thị slide đầu tiên
        if (this.slides.length > 0) {
            this.showSlide(0);
        }
    }

    /* ==========================================
       CÁC HÀM CHUYÊN DỤNG ĐIỀU KHIỂN TRÌNH CHIẾU
       ========================================== */

    /**
     * Bật hiển thị một slide cụ thể và ẩn các slide còn lại
     * @param {number} index - Vị trí của slide cần hiển thị (từ 0 đến length-1)
     */
    showSlide(index) {
        // Kiểm tra ranh giới an toàn: Không làm gì nếu index vượt quá số lượng slide
        if (index < 0 || index >= this.slides.length) return;

        // Lấy tất cả các thẻ HTML có class 'slide' đang nằm trong container
        const slideElements = this.container.querySelectorAll('.slide');

        // Xóa class 'active' ở tất cả các slide (ẩn hết đi)
        slideElements.forEach(el => el.classList.remove('active'));

        // Thêm class 'active' cho slide được chọn (hiển thị lên)
        slideElements[index].classList.add('active');

        // Cập nhật lại bộ nhớ trạng thái
        this.currentIndex = index;

        // Cập nhật giao diện bộ đếm trang (nếu có thẻ HTML hiển thị số trang ngoài màn hình)
        const counterEl = document.getElementById('page-counter');
        if (counterEl) {
            counterEl.innerText = `${this.currentIndex + 1} / ${this.slides.length}`;
        }
    }

    /**
     * Chuyển sang slide tiếp theo
     */
    next() {
        if (this.currentIndex < this.slides.length - 1) {
            this.showSlide(this.currentIndex + 1);
        }
    }

    /**
     * Lùi về slide trước đó
     */
    prev() {
        if (this.currentIndex > 0) {
            this.showSlide(this.currentIndex - 1);
        }
    }
}
