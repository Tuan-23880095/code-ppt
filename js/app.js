/**
 * ============================================================================
 * TỆP THỰC THI CHÍNH: js/app.js
 * CHỨC NĂNG: Khởi tạo ứng dụng, gọi API tải dữ liệu, và lắng nghe phím bấm.
 * ============================================================================
 */

// Biến toàn cục lưu trữ đối tượng SlideDeck để các hàm bên ngoài (như bấm phím) có thể gọi được
let appDeck = null;

// 1. KHỞI TẠO VÀ RENDER SLIDE (Chạy ngay khi tải xong trang)
document.addEventListener('DOMContentLoaded', async () => {
    
    // a. Đọc tham số URL xem người dùng đang mở bài học nào
    // Ví dụ URL: domain.com/index.html?lesson=DC-MonA-Bai1
    const urlParams = new URLSearchParams(window.location.search);
    const lessonName = urlParams.get('lesson') || ''; 

    // Các phần tử giao diện
    const loadingScreen = document.getElementById('loading-screen');
    const container = document.getElementById('presentation-container');

    try {
        // b. Gọi API lấy dữ liệu từ Google Apps Script (Bất đồng bộ)
        const response = await SlideAPI.fetchLessonData(lessonName);
        
        // Tách dữ liệu JSON thành 2 phần: Cấu hình và Mảng Slide
        const { config, data } = response;

        // c. Tắt màn hình chờ Loading (nếu có)
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }

        // d. Khởi tạo đối tượng quản lý SlideDeck
        appDeck = new SlideDeck('presentation-container', config);
        
        // Nạp mảng dữ liệu bài giảng vào hệ thống và in ra màn hình
        appDeck.loadData(data);
        appDeck.renderAll();

        // e. Bật tính năng lắng nghe phím bấm (PowerPoint mode)
        setupKeyboardNavigation();

    } catch (error) {
        // Xử lý lỗi nếu API thất bại hoặc không tìm thấy bài
        if (loadingScreen) {
            loadingScreen.innerHTML = `
                <div style="color: #e11d48; text-align: center;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 40px; margin-bottom: 10px;"></i>
                    <h3 style="font-weight: bold;">LỖI TẢI BÀI GIẢNG</h3>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }
});


// 2. HÀM XỬ LÝ ĐIỀU HƯỚNG BẰNG BÀN PHÍM (POWERPOINT MODE)
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (!appDeck) return; // Nếu chưa tải xong data thì không làm gì

        if (e.key === 'ArrowRight' || e.key === ' ') {
            // Bấm Mũi tên Phải hoặc Phím Cách (Space) -> Tới slide tiếp theo
            appDeck.next();
        } else if (e.key === 'ArrowLeft') {
            // Bấm Mũi tên Trái -> Lùi về slide trước
            appDeck.prev();
        }
    });
}

// Hàm gắn cho các nút bấm (Button) trên màn hình HTML (nếu người dùng dùng chuột)
window.nextSlide = () => { if (appDeck) appDeck.next(); };
window.prevSlide = () => { if (appDeck) appDeck.prev(); };


// 3. HÀM XỬ LÝ SỰ KIỆN IN TÀI LIỆU (Xuất PDF)
function safePrint() {
    const printBtn = document.getElementById('btn-print-doc');
    if (!printBtn) {
        window.print();
        return;
    }
    
    // Lưu lại nội dung gốc của nút để khôi phục sau khi in xong
    const originalHTML = printBtn.innerHTML;
    printBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Đang chuẩn bị...';

    // Đảm bảo MathJax đã render xong mọi công thức trước khi gọi hộp thoại in
    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise().then(() => {
            printBtn.innerHTML = originalHTML; // Trả lại text cũ
            window.print(); // Gọi lệnh in của trình duyệt
        });
    } else {
        // Fallback (dự phòng) nếu trang web không có công thức toán học
        setTimeout(() => {
            printBtn.innerHTML = originalHTML;
            window.print();
        }, 500);
    }
}
