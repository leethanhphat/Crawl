// API Key của bạn
const apiKey = 'AIzaSyCqNqeLoE4F8RlPJ49KkacUT9wtYP6nwvo';  // Thay YOUR_API_KEY bằng API Key của bạn

// Hàm gọi YouTube API để cập nhật thông tin video
async function fetchVideoData(videoId) {
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.items.length > 0) {
            // Lấy thông tin từ dữ liệu trả về
            const videoTitle = data.items[0].snippet.title;
            const viewCount = data.items[0].statistics.viewCount;
            const likeCount = data.items[0].statistics.likeCount;

            // Hiển thị thông tin lên trang
            document.getElementById('video-title').innerText = `Tiêu đề: ${videoTitle}`;
            document.getElementById('view-count').innerText = `Lượt xem: ${viewCount}`;
            document.getElementById('like-count').innerText = `Lượt thích: ${likeCount}`;
        } else {
            alert('Không tìm thấy thông tin video.');
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ YouTube API:', error);
    }
}

// Hàm để thay đổi video nhúng và cập nhật thông tin API
function loadVideo(videoId) {
    // Thay đổi video nhúng bằng cách thay đổi thuộc tính "src" của iframe
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    document.getElementById('youtube-embed').src = embedUrl;

    // Cập nhật thông tin video thông qua YouTube API
    fetchVideoData(videoId);
}

// Gọi hàm ban đầu để tải thông tin video đầu tiên khi trang được tải
window.onload = function() {
    fetchVideoData('tkC42vd9hSQ');  // Tải thông tin của video mặc định ban đầu
};
