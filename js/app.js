// ==========================================
// TỆP THỰC THI CHÍNH: app.js
// ==========================================
// Nhiệm vụ: Khởi tạo ứng dụng, kết nối dữ liệu với giao diện và xử lý sự kiện.

// 1. KHỞI TẠO VÀ RENDER SLIDE
// Các biến myConfig, myLessonData, và class SlideDeck đã được trình duyệt 
// tải vào bộ nhớ từ các file JS nhúng trước đó.

document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo đối tượng app từ class SlideDeck
    // Kết nối với thẻ div có id 'presentation-container' và truyền vào cấu hình myConfig
    const app = new SlideDeck('presentation-container', myConfig);
    
    // Nạp mảng dữ liệu bài giảng vào hệ thống
    app.loadData(myLessonData);
    
    // In toàn bộ slide ra màn hình
    app.renderAll();
});


// 2. HÀM XỬ LÝ SỰ KIỆN IN TÀI LIỆU (Xuất PDF)
// Hàm này được gọi khi người dùng bấm vào nút "In Tài Liệu" trên giao diện
function safePrint() {
    const printBtn = document.getElementById('btn-print-doc');
    
    // Lưu lại nội dung gốc của nút để khôi phục sau khi in xong
    const originalHTML = printBtn.innerHTML;
    printBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Đang chuẩn bị...';

    // Đảm bảo MathJax đã render xong mọi công thức trước khi gọi hộp thoại in
    if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise().then(() => {
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
