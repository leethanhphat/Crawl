<?php
// URL của trang demo để crawl
$url = "http://quotes.toscrape.com/";

// cURL - DOMDocument - XPath
//Sau khi làm quen với DOMDocument, 
//có thể thử các thư viện mạnh hơn như simple_html_dom hoặc Guzzle.

// Khởi tạo phiên cURL
$ch = curl_init();
//curl_setopt(): Thiết lập các tùy chọn, bao gồm URL và yêu cầu trả về nội dung thay vì in ra màn hình.
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Gửi yêu cầu và lưu kết quả
$response = curl_exec($ch);
curl_close($ch);

if ($response !== false) {
    // Tạo đối tượng DOMDocument và nạp nội dung HTML
    $dom = new DOMDocument;
    
    // Tắt cảnh báo khi phân tích HTML không hợp lệ
    libxml_use_internal_errors(true); // bỏ qua lỗi cú pháp HTML
    $dom->loadHTML($response);
    libxml_clear_errors();

    // Sử dụng XPath để tìm kiếm các thẻ chứa câu trích dẫn và tên tác giả
    $xpath = new DOMXPath($dom);

    // Lấy tất cả các câu trích dẫn
    $quotes = $xpath->query('//span[@class="text"]');
    // Lấy tất cả tên tác giả
    $authors = $xpath->query('//small[@class="author"]');

    // Kiểm tra và in kết quả
    if ($quotes->length > 0 && $authors->length > 0) {
        for ($i = 0; $i < $quotes->length; $i++) {
            echo "Câu trích dẫn: " . $quotes->item($i)->nodeValue . "\n";
            echo "Tác giả: " . $authors->item($i)->nodeValue . "\n";
            echo "----------------------------------------\n";
        }
    } else {
        echo "Không tìm thấy dữ liệu.";
    }
} else {
    echo "Không thể truy cập trang web.";
}
?>
