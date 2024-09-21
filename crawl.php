<?php
function crawlQuotes() {
    $url = "http://quotes.toscrape.com/";

    // Khởi tạo phiên cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Gửi yêu cầu và lưu kết quả
    $response = curl_exec($ch);
    curl_close($ch);

    if ($response !== false) {
        // Tạo đối tượng DOMDocument và nạp nội dung HTML
        $dom = new DOMDocument;
        
        // Tắt cảnh báo khi phân tích HTML không hợp lệ
        libxml_use_internal_errors(true);
        $dom->loadHTML($response);
        libxml_clear_errors();

        // Sử dụng XPath để tìm kiếm các thẻ chứa câu trích dẫn và tên tác giả
        $xpath = new DOMXPath($dom);

        // Lấy tất cả các câu trích dẫn
        $quotes = $xpath->query('//span[@class="text"]');
        // Lấy tất cả tên tác giả
        $authors = $xpath->query('//small[@class="author"]');

        // Tạo một mảng để lưu trữ dữ liệu crawl
        $data = [];

        // Kiểm tra và lưu kết quả
        if ($quotes->length > 0 && $authors->length > 0) {
            for ($i = 0; $i < $quotes->length; $i++) {
                $data[] = [
                    'quote' => $quotes->item($i)->nodeValue,
                    'author' => $authors->item($i)->nodeValue
                ];
            }
        }

        return $data;
    } else {
        return null;
    }
}
?>
