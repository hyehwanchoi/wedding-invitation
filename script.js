// ==================== 설정 ====================
// 결혼식 날짜 설정 (YYYY, MM-1, DD)
const weddingDate = new Date(2026, 8, 19); // 2026년 9월 19일 (월은 0부터 시작)

// ==================== D-Day 계산 ====================
function updateDday() {
    const today = new Date();
    const timeDiff = weddingDate - today;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    const ddayElement = document.getElementById('dday-count');
    if (ddayElement) {
        if (dayDiff > 0) {
            ddayElement.textContent = `D-${dayDiff}`;
        } else if (dayDiff === 0) {
            ddayElement.textContent = 'D-Day';
        } else {
            ddayElement.textContent = `D+${Math.abs(dayDiff)}`;
        }
    }
}

// 페이지 로드 시 D-Day 업데이트
document.addEventListener('DOMContentLoaded', function() {
    updateDday();
    loadGuestbook();

    // 공유 버튼 이벤트 리스너 추가
    const kakaoBtn = document.getElementById('kakao-share-btn');
    const urlBtn = document.getElementById('url-copy-btn');

    if (kakaoBtn) {
        kakaoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('카카오톡 공유 버튼 클릭됨');
            shareKakao();
        });
    }

    if (urlBtn) {
        urlBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('링크 복사 버튼 클릭됨');
            copyUrl();
        });
    }
});

// ==================== 계좌번호 복사 ====================
function copyAccount(accountNumber) {
    // 계좌번호에서 하이픈 제거
    const cleanNumber = accountNumber.replace(/-/g, '');

    // 클립보드에 복사
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cleanNumber)
            .then(() => {
                alert('계좌번호가 복사되었습니다!\n' + accountNumber);
            })
            .catch(err => {
                console.error('복사 실패:', err);
                fallbackCopy(accountNumber);
            });
    } else {
        fallbackCopy(accountNumber);
    }
}

// 구형 브라우저용 복사 함수
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text.replace(/-/g, '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        alert('계좌번호가 복사되었습니다!\n' + text);
    } catch (err) {
        alert('계좌번호: ' + text);
    }

    document.body.removeChild(textarea);
}

// ==================== 카카오톡 공유 ====================
function shareKakao() {
    console.log('shareKakao 함수 실행됨');
    console.log('Kakao 객체:', typeof Kakao);

    // 카카오톡 SDK가 로드되어 있는지 확인
    if (typeof Kakao !== 'undefined') {
        console.log('Kakao 초기화 상태:', Kakao.isInitialized());

        if (!Kakao.isInitialized()) {
            alert('카카오톡 SDK 초기화 실패. 페이지를 새로고침해주세요.');
            return;
        }

        try {
            // 공유할 URL 설정 (GitHub Pages URL 사용)
            const shareUrl = 'https://hyehwanchoi.github.io/wedding-invitation/';
            console.log('공유 URL:', shareUrl);

            Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: '💍 최혜환 ♥ 박희진 결혼합니다',
                    description: '2026년 9월 19일 (토) 오후 1시\n저희 두 사람의 소중한 순간에 함께해주세요',
                    imageUrl: 'https://hyehwanchoi.github.io/wedding-invitation/images/main.jpg',
                    link: {
                        mobileWebUrl: shareUrl,
                        webUrl: shareUrl,
                    },
                },
                buttons: [
                    {
                        title: '모바일 청첩장 보기',
                        link: {
                            mobileWebUrl: shareUrl,
                            webUrl: shareUrl,
                        },
                    },
                ],
            });
            console.log('카카오톡 공유 창 열림');
        } catch (error) {
            console.error('카카오톡 공유 오류:', error);
            alert('카카오톡 공유 오류: ' + error.message);
            // 오류 발생 시 대체 공유 방법 사용
            fallbackShare();
        }
    } else {
        console.log('Kakao SDK 없음, 대체 공유 방법 사용');
        fallbackShare();
    }
}

// 대체 공유 방법
function fallbackShare() {
    const message = '💍 최혜환 ♥ 박희진 결혼합니다\n2026년 9월 19일 (토) 오후 1시\n\n' + window.location.href;

    if (navigator.share) {
        navigator.share({
            title: '최혜환 ♥ 박희진 결혼식 초대장',
            text: message,
            url: window.location.href
        }).then(() => {
            console.log('공유 성공');
        }).catch(err => {
            console.log('공유 취소 또는 실패:', err);
            copyUrl();
        });
    } else {
        console.log('navigator.share 지원 안 함, URL 복사');
        copyUrl();
    }
}

// ==================== URL 복사 ====================
function copyUrl() {
    const url = window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url)
            .then(() => {
                alert('초대장 링크가 복사되었습니다!\n친구들에게 공유해보세요 😊');
            })
            .catch(err => {
                console.error('복사 실패:', err);
                fallbackCopy(url);
            });
    } else {
        fallbackCopy(url);
    }
}

// ==================== 방명록 ====================
// LocalStorage를 사용한 간단한 방명록 (실제로는 서버가 필요함)
function submitGuestbook() {
    const nameInput = document.getElementById('guest-name');
    const messageInput = document.getElementById('guest-message');

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) {
        alert('이름을 입력해주세요.');
        return;
    }

    if (!message) {
        alert('메시지를 입력해주세요.');
        return;
    }

    // 방명록 데이터 생성
    const guestbookEntry = {
        id: Date.now(),
        name: name,
        message: message,
        date: new Date().toLocaleDateString('ko-KR')
    };

    // LocalStorage에 저장
    let guestbook = JSON.parse(localStorage.getItem('guestbook') || '[]');
    guestbook.unshift(guestbookEntry); // 최신순으로 추가
    localStorage.setItem('guestbook', JSON.stringify(guestbook));

    // 입력 필드 초기화
    nameInput.value = '';
    messageInput.value = '';

    // 방명록 다시 로드
    loadGuestbook();

    alert('축하 메시지가 등록되었습니다!\n감사합니다 😊');
}

function loadGuestbook() {
    const guestbookList = document.getElementById('guestbook-list');
    if (!guestbookList) return;

    const guestbook = JSON.parse(localStorage.getItem('guestbook') || '[]');

    if (guestbook.length === 0) {
        guestbookList.innerHTML = '<p style="color: #999; padding: 40px 0;">아직 작성된 메시지가 없습니다.<br>첫 번째 축하 메시지를 남겨주세요!</p>';
        return;
    }

    guestbookList.innerHTML = guestbook.map(entry => `
        <div class="guestbook-item">
            <div class="name">${escapeHtml(entry.name)}</div>
            <div class="message">${escapeHtml(entry.message).replace(/\n/g, '<br>')}</div>
            <div class="date">${entry.date}</div>
        </div>
    `).join('');
}

// HTML 이스케이프 함수 (XSS 방지)
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ==================== 갤러리 모달 ====================
// 갤러리 이미지 클릭 시 크게 보기
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal-close');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    // 갤러리 이미지 클릭 시 모달 열기
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
        });
    });

    // 닫기 버튼 클릭 시 모달 닫기
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // 모달 배경 클릭 시 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// ==================== 스크롤 애니메이션 ====================
// Intersection Observer를 사용한 섹션 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(section);
    });
});

// ==================== 카카오맵 연동 (선택사항) ====================
// 카카오맵 API 키가 있다면 아래 주석을 해제하고 사용하세요
/*
function initMap() {
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 좌표를 실제 장소로 변경
        level: 3
    };

    const map = new kakao.maps.Map(container, options);

    const markerPosition = new kakao.maps.LatLng(37.5665, 126.9780);
    const marker = new kakao.maps.Marker({
        position: markerPosition
    });

    marker.setMap(map);
}

// 카카오맵 SDK 로드 후 실행
if (typeof kakao !== 'undefined' && kakao.maps) {
    kakao.maps.load(initMap);
}
*/

// ==================== 캘린더에 일정 추가 ====================
function addToGoogleCalendar() {
    // 결혼식 정보
    const eventTitle = '최혜환 ♥ 박희진 결혼식';
    const eventLocation = 'OO웨딩홀 OO층 OO홀, 서울특별시 OO구 OO동 000-00';
    const eventDetails = '최혜환과 박희진의 결혼식에 초대합니다.\n\n초대장: https://hyehwanchoi.github.io/wedding-invitation/';

    // 날짜/시간 설정 (2026년 9월 19일 오후 1시 ~ 3시)
    const startDate = '20260919T130000'; // 2026-09-19 13:00
    const endDate = '20260919T150000';   // 2026-09-19 15:00

    // 구글 캘린더 URL 생성
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(eventLocation)}`;

    // 새 창에서 구글 캘린더 열기
    window.open(googleCalendarUrl, '_blank');
}

function addToAppleCalendar() {
    // .ics 파일 생성
    const eventTitle = '최혜환 ♥ 박희진 결혼식';
    const eventLocation = 'OO웨딩홀 OO층 OO홀, 서울특별시 OO구 OO동 000-00';
    const eventDetails = '최혜환과 박희진의 결혼식에 초대합니다.\\n\\n초대장: https://hyehwanchoi.github.io/wedding-invitation/';

    // 날짜/시간 설정 (UTC 형식)
    const startDate = '20260919T040000Z'; // 2026-09-19 13:00 KST = 04:00 UTC
    const endDate = '20260919T060000Z';   // 2026-09-19 15:00 KST = 06:00 UTC

    // .ics 파일 내용
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//KR
BEGIN:VEVENT
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${eventTitle}
DESCRIPTION:${eventDetails}
LOCATION:${eventLocation}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    // Blob 생성 및 다운로드
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = '최혜환_박희진_결혼식.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

console.log('Wedding Invitation Script Loaded ✨');
