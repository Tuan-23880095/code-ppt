// ==========================================
// TỆP DỮ LIỆU: lessonData.js
// ==========================================
// Nhiệm vụ: Chỉ chứa dữ liệu đầu vào (cấu hình chân trang và nội dung các slide).
// Tách biệt hoàn toàn khỏi logic code để dễ dàng cập nhật bài giảng.

// 1. Cấu hình cố định cho toàn bộ Slide (Sẽ hiển thị ở chân trang)
const myConfig = {
    author: "ThS. Đinh Quốc Tuấn",
    lessonName: "Thạch học Trầm tích - Bài 1: Môi trường Trầm tích"
};

// 2. Mảng dữ liệu nội dung chi tiết cho từng Slide
const myLessonData = [
    {
        title: "Tổng quan về Môi trường Trầm tích",
        content: `
            <ul>
                <li>Định nghĩa và phân loại các môi trường trầm tích chính.</li>
                <li>Ví dụ khảo sát thực tế: Cấu trúc trầm tích và quy trình lấy mẫu tại các mỏ cát khu vực sông Cái, Tây Khánh Vĩnh, Khánh Hòa.</li>
                <li>Tác động của cổ địa lý đến quá trình hình thành đá.</li>
            </ul>
        `,
        // URL ảnh minh họa (có thể dùng link online hoặc đường dẫn ảnh trong thư mục assets/)
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"
    },
    {
        title: "Đặc điểm Tướng đá & Trầm tích Biến chất",
        content: `
            <p>Tướng đá phản ánh các điều kiện thành tạo tại một thời điểm nhất định.</p>
            <p>Nghiên cứu thạch học, địa hóa và sự tiến hóa của các đá trầm tích biến chất (điển hình như phức hệ Khâm Đức) giúp xác định chính xác nguồn gốc trầm tích.</p>
        `,
        // Bỏ trống URL ảnh, CSS flexbox sẽ tự động mở rộng khung văn bản tràn viền
        imageUrl: "" 
    },
    {
        title: "Ứng dụng & Động lực học",
        content: `
            <ul>
                <li>Dự báo sự phân bố của các nhóm khoáng sản phi kim loại.</li>
                <li>Đánh giá tốc độ lắng đọng hạt trầm tích theo định luật Stokes (sử dụng MathJax để render): 
                    <br><br>
                    <div style="text-align: center; font-size: 26px;">
                        \\( v = \\frac{2}{9} \\frac{(\\rho_p - \\rho_f)}{\\mu} g R^2 \\)
                    </div>
                </li>
            </ul>
        `,
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80"
    }
];
