let player;
const apiKey = 'AIzaSyCqNqeLoE4F8RlPJ49KkacUT9wtYP6nwvo'; // Thay YOUR_API_KEY bằng API Key của bạn
const keyword = 'NBA'; // Chủ đề bạn muốn tìm kiếm

// Khởi tạo API YouTube Iframe
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: 'tkC42vd9hSQ', // Video mặc định
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange // Lắng nghe trạng thái video
        }
    });
}

// Khi video sẵn sàng, tải thông tin video mặc định và tìm kiếm video theo chủ đề
function onPlayerReady(event) {
    fetchVideoData('tkC42vd9hSQ'); // Tải thông tin của video mặc định
    searchVideos(keyword); // Tìm kiếm video theo từ khóa 'NBA'
}

// Hàm tìm kiếm video theo từ khóa
async function searchVideos(query) {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}&maxResults=5`;

    try {
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.items.length > 0) {
            const videoList = data.items.map(item => item.id.videoId);
            console.log(videoList); // Kiểm tra danh sách video tìm kiếm

            // Hiển thị danh sách video từ kết quả tìm kiếm
            showSearchResults(videoList);
        } else {
            alert('Không tìm thấy video nào liên quan đến chủ đề.');
        }
    } catch (error) {
        console.error('Lỗi khi tìm kiếm video từ YouTube API:', error);
    }
}

// Hàm hiển thị video tìm kiếm trong danh sách tùy chỉnh
function showSearchResults(videoList) {
    const videoSelection = document.getElementById('video-selection');
    videoSelection.innerHTML = ''; // Xóa danh sách hiện tại

    videoList.forEach(videoId => {
        fetchVideoSnippet(videoId);
    });

    videoSelection.style.display = 'block'; // Hiển thị danh sách video
}

// Hàm lấy thông tin snippet của video và hiển thị trong danh sách
async function fetchVideoSnippet(videoId) {
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.items.length > 0) {
            const videoSnippet = data.items[0].snippet;
            const videoTitle = videoSnippet.title;
            const videoThumbnail = videoSnippet.thumbnails.default.url;

            const videoItem = document.createElement('div');
            videoItem.classList.add('video-item');
            videoItem.innerHTML = `
                <img src="${videoThumbnail}" alt="${videoTitle}">
                <p>${videoTitle}</p>
            `;
            videoItem.addEventListener('click', () => loadVideo(videoId));

            document.getElementById('video-selection').appendChild(videoItem);
        }
    } catch (error) {
        console.error('Lỗi khi lấy snippet video:', error);
    }
}

// Hàm để nhúng video được chọn
function loadVideo(videoId) {
    player.loadVideoById(videoId);
    fetchVideoData(videoId); // Cập nhật thông tin video
    document.getElementById('video-selection').style.display = 'none'; // Ẩn danh sách video sau khi chọn
}

// Hàm tải thông tin video
async function fetchVideoData(videoId) {
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.items.length > 0) {
            const videoTitle = data.items[0].snippet.title;
            const viewCount = data.items[0].statistics.viewCount;
            const likeCount = data.items[0].statistics.likeCount;

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

// Gọi hàm để tải thông tin video đầu tiên khi trang được tải
window.onload = function() {
    fetchVideoData('tkC42vd9hSQ'); // Tải thông tin của video mặc định ban đầu
};
