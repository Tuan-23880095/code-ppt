// ==========================================
// CLASS: Slide
// ==========================================
// Nhiệm vụ: Đại diện cho một slide độc lập, nhận dữ liệu và xuất ra HTML.

class Slide {
    /**
     * @param {Object} data - Dữ liệu riêng của slide (title, content, imageUrl, pageNumber)
     * @param {Object} globalConfig - Cấu hình chung của bộ slide (author, lessonName)
     */
    constructor(data, globalConfig) {
        // Dữ liệu nội dung
        this.pageNumber = data.pageNumber;
        this.title = data.title;
        this.content = data.content;
        this.imageUrl = data.imageUrl;
        
        // Dữ liệu chân trang (cấu hình chung)
        this.author = globalConfig.author;
        this.lessonName = globalConfig.lessonName;
    }

    /**
     * Phương thức renderHTML() 
     * @returns {string} - Chuỗi HTML đại diện cho slide
     */
    renderHTML() {
        // Xử lý ảnh: Nếu dữ liệu có link ảnh thì tạo thẻ div chứa ảnh, nếu không thì để trống.
        // Cấu trúc flexbox bên CSS sẽ tự động dãn khung chữ ra nếu không có ảnh.
        const imageHTML = this.imageUrl 
            ? `<div class="image-box"><img src="${this.imageUrl}" alt="Slide Image"></div>` 
            : '';

        // Trả về bộ khung HTML hoàn chỉnh cho 1 slide
        return `
            <div class="slide">
                <div class="slide-title">${this.title}</div>
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
