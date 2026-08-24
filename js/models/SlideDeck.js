// ==========================================
// CLASS: SlideDeck
// ==========================================
// Nhiệm vụ: Quản lý danh sách các Slide, nạp dữ liệu và render tất cả ra trình duyệt.

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
     * Duyệt qua toàn bộ đối tượng Slide, gọi hàm renderHTML() của chúng 
     * và in tất cả ra màn hình.
     */
    renderAll() {
        let allHtml = '';
        
        // Nối tất cả chuỗi HTML của từng slide lại với nhau
        this.slides.forEach(slide => {
            allHtml += slide.renderHTML();
        });
        
        // Đổ toàn bộ mã HTML đã nối vào thẻ chứa trên giao diện
        this.container.innerHTML = allHtml;
    }
}
