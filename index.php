<?php
// Import file crawl để sử dụng hàm crawlQuotes()
include('crawl.php');

// Lấy dữ liệu crawl
$data = crawlQuotes();
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quotes Crawl</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1 {
            text-align: center;
        }
        .quote-container {
            background-color: white;
            padding: 20px;
            margin: 10px auto;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
        }
        .quote {
            font-size: 18px;
            font-style: italic;
        }
        .author {
            font-size: 16px;
            text-align: right;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <h1>Các Câu Trích Dẫn Đã Crawl</h1>

    <?php if ($data && count($data) > 0): ?>
        <?php foreach ($data as $quoteData): ?>
            <div class="quote-container">
                <p class="quote">"<?php echo $quoteData['quote']; ?>"</p>
                <p class="author">- <?php echo $quoteData['author']; ?></p>
            </div>
        <?php endforeach; ?>
    <?php else: ?>
        <p>Không thể lấy dữ liệu hoặc không có dữ liệu nào được tìm thấy.</p>
    <?php endif; ?>
</body>
</html>
