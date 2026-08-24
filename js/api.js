/**
 * ============================================================================
 * FILE: js/api.js
 * CHỨC NĂNG: Giao tiếp với Google Apps Script (Backend) để tải dữ liệu bài giảng
 * ============================================================================
 */

const API_CONFIG = {
    // THAY THẾ ĐƯỜNG LINK DƯỚI ĐÂY BẰNG URL WEB APP CỦA BẠN (Lấy từ Google Apps Script sau khi Deploy)
    // Ví dụ: "https://script.google.com/macros/s/AKfycb.../exec"
    BASE_URL: "https://script.google.com/macros/s/AKfycbwj9U_4bDiVWbU1489q_wh8y06KlNKaXPjK46uMg7itUQ6NdCA_cAixtiz_WGfzm0lf/exec" 
};

const SlideAPI = {
    /**
     * Hàm gọi dữ liệu bài giảng từ Google Sheets thông qua Apps Script
     * @param {string} lessonName - Tên tab (Sheet) cần tải. Nếu để trống, GAS sẽ lấy tab đầu tiên.
     * @returns {Promise<Object>} - Trả về Object chứa { config, data (slides) }
     */
    async fetchLessonData(lessonName = "") {
        try {
            // 1. Khởi tạo URL với tham số bài học
            let requestUrl = API_CONFIG.BASE_URL;
            if (lessonName) {
                // Mã hóa URI để tránh lỗi tiếng Việt có dấu hoặc khoảng trắng trong tên Tab
                requestUrl += `?lesson=${encodeURIComponent(lessonName)}`;
            }

            console.log(`[API] Đang tải dữ liệu bài giảng: ${lessonName || 'Mặc định (Tab 1)'}...`);

            // 2. Gửi yêu cầu GET đến Google Apps Script
            const response = await fetch(requestUrl, {
                method: 'GET',
                // redirect: 'follow' rất quan trọng khi làm việc với GAS vì Google thường chuyển hướng nội bộ
                redirect: 'follow' 
            });

            // 3. Kiểm tra trạng thái HTTP
            if (!response.ok) {
                throw new Error(`Lỗi kết nối máy chủ (HTTP ${response.status})`);
            }

            // 4. Parse dữ liệu JSON trả về
            const responseData = await response.json();

            // 5. Kiểm tra xem backend có trả về lỗi (như không tìm thấy tab) hay không
            if (responseData.error) {
                throw new Error(responseData.error);
            }

            console.log("[API] Tải dữ liệu thành công!", responseData);
            
            // Trả về dữ liệu hợp lệ (gồm config và mảng slide)
            return responseData;

        } catch (error) {
            console.error("[API Error] Quá trình tải dữ liệu thất bại:", error.message);
            // Ném lỗi ra ngoài để app.js bắt và hiển thị thông báo lên màn hình cho sinh viên
            throw error; 
        }
    }
};
