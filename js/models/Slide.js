/**
 * ============================================================================
 * FILE: js/models/Slide.js
 * CHỨC NĂNG: Đại diện cho một slide độc lập, nhận dữ liệu và xuất ra khối HTML.
 * ============================================================================
 */

class Slide {
    /**
     * @param {Object} data - Dữ liệu riêng của slide (title, content, imageUrl, pageNumber)
     * @param {Object} globalConfig - Cấu hình chung của bộ slide (author, lessonName)
     */
    constructor(data, globalConfig) {
        // Dữ liệu nội dung (Sử dụng toán tử || để gán giá trị mặc định an toàn nếu thiếu dữ liệu)
        this.pageNumber = data.pageNumber || 1;
        this.title = data.title || 'Chưa có tiêu đề';
        this.content = data.content || '';
        this.imageUrl = data.imageUrl || '';
        
        // Dữ liệu chân trang (cấu hình chung)
        this.author = globalConfig.author || 'Giảng viên';
        this.lessonName = globalConfig.lessonName || 'Bài giảng';
    }

    /**
     * Phương thức renderHTML() 
     * @returns {string} - Chuỗi HTML đại diện cho toàn bộ slide
     */
    renderHTML() {
        // Xử lý ảnh: Bọc trong thẻ div.image-box. 
        // Nếu không có ảnh, chuỗi rỗng sẽ được trả về, CSS flexbox của .text-box sẽ tự động tràn viền 100%.
        const imageHTML = this.imageUrl 
            ? `<div class="image-box"><img src="${this.imageUrl}" alt="Minh họa trang ${this.pageNumber}"></div>` 
            : '';

        // Trả về bộ khung HTML hoàn chỉnh cho 1 slide, 
        // gắn thêm id="slide-X" để SlideDeck.js dễ dàng móc nối và chuyển trang.
        return `
            <div class="slide" id="slide-${this.pageNumber}">
                <h2 class="slide-title">${this.title}</h2>
                <div class="slide-body">
                    <div class="text-box">
                        ${this.content}
                    </div>
                    ${imageHTML}
                </div>
                <div class="slide-footer">
                    <span>${this.lessonName} | Người soạn: ${this.author}</span>
                    <span>Trang ${this.pageNumber}</span>
                </div>
            </div>
        `;
    }
}
