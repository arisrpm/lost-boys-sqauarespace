// SquareSpace Video Landing Page Script
// Place this in Settings > Advanced > Code Injection > Footer

(function() {
    // Configuration - Update the base URL with your SquareSpace file storage URL
    const VIDEO_CONFIG = {
        desktopVideo: 'https://cdn.jsdelivr.net/gh/arisrpm/lost-boys-sqauarespace@latest/TLB-Teaser-Desktop.mp4',  // Update path if needed
        mobileVideo: 'https://cdn.jsdelivr.net/gh/arisrpm/lost-boys-sqauarespace@latest/TLB-Teaser-Mobile.mp4',    // Update path if needed
        posterImageDesktop: 'https://images.squarespace-cdn.com/content/688ce397c945bf4718d5ae12/0e49b5f5-4790-416c-8f8a-d1aeee3584b9/TLB-Teaser-16x9-1.jpg',  // Desktop poster
        posterImageMobile: 'https://images.squarespace-cdn.com/content/688ce397c945bf4718d5ae12/d6d37b5d-a1f2-4a3e-93f9-325b3c40d141/TLB-Teaser-9x16-1.jpg',    // Mobile poster
        mobileBreakpoint: 768
    };

    // CSS Styles
    const styles = `
        <style>
            .lbm-video-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                overflow: hidden;
                z-index: -1;
            }
            
            #lbmBgVideo {
                position: absolute;
                top: 50%;
                left: 50%;
                min-width: 100%;
                min-height: 100%;
                width: auto;
                height: auto;
                transform: translate(-50%, -50%);
                object-fit: cover;
            }
            
            .lbm-video-poster {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                opacity: 0;
                transition: opacity 0.5s ease;
                pointer-events: none;
                z-index: 1;
            }
            
            .lbm-video-poster.show {
                opacity: 1;
            }
            
            .lbm-video-controls {
                position: fixed;
                bottom: 40px;
                right: 40px;
                display: flex;
                gap: 20px;
                z-index: 1000;
                align-items: center;
            }
            
            .lbm-control-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.5);
                border: 2px solid rgba(255, 255, 255, 0.8);
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                font-size: 20px;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }
            
            .lbm-control-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }
            
            .lbm-control-btn svg {
                width: 24px;
                height: 24px;
                fill: white;
            }
            
            /* Make SquareSpace sections transparent */
            .page-section:first-child {
                background: transparent !important;
            }
            
            .page-section:first-child .section-background {
                background: transparent !important;
            }
            
            @media (max-width: 768px) {
                .lbm-video-controls {
                    bottom: 20px;
                    gap: 15px;
                }
                
                .lbm-control-btn {
                    width: 40px;
                    height: 40px;
                    font-size: 16px;
                }
                
                .lbm-control-btn svg {
                    width: 20px;
                    height: 20px;
                }
            }
        </style>
    `;

    // HTML Structure
    const createVideoHTML = () => {
        return `
            <div class="lbm-video-container">
                <video id="lbmBgVideo" playsinline preload="auto" muted>
                    <source id="lbmVideoSource" src="" type="video/mp4">
                </video>
                <div class="lbm-video-poster" id="lbmVideoPoster"></div>
            </div>
            
            <div class="lbm-video-controls">
                <button class="lbm-control-btn" id="lbmPlayPauseBtn" aria-label="Play/Pause">
                    <svg class="play-icon" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                    <svg class="pause-icon" style="display:none" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  
                </button>
                
                <button class="lbm-control-btn" id="lbmMuteBtn" aria-label="Mute/Unmute">
                    <svg class="mute-icon" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                        <line x1="20" y1="9" x2="23" y2="12" stroke="white" stroke-width="2"/>
                        <line x1="23" y1="9" x2="20" y2="12" stroke="white" stroke-width="2"/>
                    </svg>
                    <svg class="unmute-icon" style="display:none" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                </button>
                
                <button class="lbm-control-btn" id="lbmReplayBtn" aria-label="Replay">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                    </svg>
                </button>
            </div>
        `;
    };

    // Video Controller Class
    class LBMVideoController {
        constructor() {
            this.video = null;
            this.videoSource = null;
            this.poster = null;
            this.playPauseBtn = null;
            this.muteBtn = null;
            this.replayBtn = null;
            this.isVideoEnded = false;
            
            this.init();
        }
        
        init() {
            // Wait for page to load
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }
        
        setup() {
            // Inject styles
            document.head.insertAdjacentHTML('beforeend', styles);
            
            // Create and inject video HTML
            document.body.insertAdjacentHTML('afterbegin', createVideoHTML());
            
            // Get elements
            this.video = document.getElementById('lbmBgVideo');
            this.videoSource = document.getElementById('lbmVideoSource');
            this.poster = document.getElementById('lbmVideoPoster');
            this.playPauseBtn = document.getElementById('lbmPlayPauseBtn');
            this.muteBtn = document.getElementById('lbmMuteBtn');
            this.replayBtn = document.getElementById('lbmReplayBtn');
            
            // Set initial video source and poster
            this.setVideoSource();
            
            // Bind events
            this.bindEvents();
            
            // Auto-play video
            setTimeout(() => {
                this.playVideo();
            }, 500);
            
            // Handle window resize
            this.handleResize();
        }
        
        setVideoSource() {
            const isMobile = window.innerWidth <= VIDEO_CONFIG.mobileBreakpoint;
            const videoUrl = isMobile ? VIDEO_CONFIG.mobileVideo : VIDEO_CONFIG.desktopVideo;
            const posterUrl = isMobile ? VIDEO_CONFIG.posterImageMobile : VIDEO_CONFIG.posterImageDesktop;
            
            this.videoSource.src = videoUrl;
            this.video.load();
            
            // Update poster image based on device
            if (posterUrl) {
                this.poster.style.backgroundImage = `url(${posterUrl})`;
            }
        }
        
        bindEvents() {
            // Play/Pause button
            this.playPauseBtn.addEventListener('click', () => {
                this.togglePlayPause();
            });
            
            // Mute/Unmute button
            this.muteBtn.addEventListener('click', () => {
                this.toggleMute();
            });
            
            // Replay button
            this.replayBtn.addEventListener('click', () => {
                this.replayVideo();
            });
            
            // Video events
            this.video.addEventListener('ended', () => {
                this.onVideoEnded();
            });
            
            this.video.addEventListener('play', () => {
                this.updatePlayPauseIcon(true);
                this.poster.classList.remove('show');
                this.isVideoEnded = false;
            });
            
            this.video.addEventListener('pause', () => {
                this.updatePlayPauseIcon(false);
            });
            
            // Click on video to play/pause
            this.video.addEventListener('click', () => {
                this.togglePlayPause();
            });
        }
        
        togglePlayPause() {
            if (this.video.paused || this.video.ended) {
                if (this.isVideoEnded) {
                    this.replayVideo();
                } else {
                    this.playVideo();
                }
            } else {
                this.pauseVideo();
            }
        }
        
        playVideo() {
            const playPromise = this.video.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Video started playing
                }).catch(error => {
                    console.log('Auto-play prevented:', error);
                    // Show play button prominently if autoplay fails
                    this.updatePlayPauseIcon(false);
                });
            }
        }
        
        pauseVideo() {
            this.video.pause();
        }
        
        toggleMute() {
            this.video.muted = !this.video.muted;
            this.updateMuteIcon(this.video.muted);
        }
        
        replayVideo() {
            this.video.currentTime = 0;
            this.playVideo();
        }
        
        onVideoEnded() {
            this.isVideoEnded = true;
            this.poster.classList.add('show');
            this.updatePlayPauseIcon(false);
        }
        
        updatePlayPauseIcon(isPlaying) {
            const playIcon = this.playPauseBtn.querySelector('.play-icon');
            const pauseIcon = this.playPauseBtn.querySelector('.pause-icon');
            
            if (isPlaying) {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            } else {
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        }
        
        updateMuteIcon(isMuted) {
            const muteIcon = this.muteBtn.querySelector('.mute-icon');
            const unmuteIcon = this.muteBtn.querySelector('.unmute-icon');
            
            if (isMuted) {
                muteIcon.style.display = 'block';
                unmuteIcon.style.display = 'none';
            } else {
                muteIcon.style.display = 'none';
                unmuteIcon.style.display = 'block';
            }
        }
        
        handleResize() {
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    const currentTime = this.video.currentTime;
                    const wasPaused = this.video.paused;
                    const wasMuted = this.video.muted;
                    
                    this.setVideoSource();
                    
                    this.video.addEventListener('loadedmetadata', () => {
                        this.video.currentTime = currentTime;
                        this.video.muted = wasMuted;
                        if (!wasPaused) {
                            this.playVideo();
                        }
                    }, { once: true });
                }, 250);
            });
        }
    }
    
    // Initialize the video controller
    new LBMVideoController();
    
    // SquareSpace specific: Hide first section background
    if (window.Squarespace) {
        window.Squarespace.onInitialize(Y, function() {
            const firstSection = document.querySelector('.page-section:first-child');
            if (firstSection) {
                firstSection.style.background = 'transparent';
                const sectionBg = firstSection.querySelector('.section-background');
                if (sectionBg) {
                    sectionBg.style.background = 'transparent';
                }
            }
        });
    }
})();