/**
 * 1.render songs
 * 2. Scroll top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */

/*
        <div class="song">
          <div class="thumb" style="background-image: url('./assets/img/song1.png')">
          </div>
          <div class="body">
            <h3 class="title">Music name</h3>
            <p class="author">Singer</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
*/
const PLAYER_STORAGE_KEY = 'T_REX_PLAYER';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2');
const headingAuthor = $('header h5');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play')
const player = $('.player');
const progress = $('#progress');
const btnPrev = $('.btn-prev');
const btnNext = $('.btn-next');
const btnRandom = $('.btn-random');
const btnRepeat = $('.btn-repeat');
const playlist = $('.playlist');
const cdThumbAnimate = cdThumb.animate([
    {transform: 'rotate(360deg)'}
], {
    duration: 12000,
    iterations: Infinity
})



const app = {
    currentIndex : 0,
    isRandom : false,
    isRepeat : false,
    playedSongs : [],
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) ||{},
    setConfig(key,value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    songs: [
        {
            name: 'Nụ hôn Bisou',
            singer: 'Mikelodic',
            path: './assets/music/song19.mp3',
            image: './assets/img/song19.png'
        },
        {
            name: 'Young Dumb & Broke',
            singer: 'Khalid',
            path: './assets/music/song20.mp3',
            image: './assets/img/song20.png'
        },
        {
            name: 'Vì Anh Đâu Có Biết',
            singer: 'Madihu, Vũ',
            path: './assets/music/song1.mp3',
            image: './assets/img/song1.png'
        },
        {
            name: 'bao tiền một mớ bình yên?',
            singer: '14 Casper, Bon Nghiêm',
            path: './assets/music/song2.mp3',
            image: './assets/img/song2.png'
        },
        {
            name: 'Waiting For You',
            singer: 'MONO, Onionn',
            path: './assets/music/song3.mp3',
            image: './assets/img/song3.png'
        },
        {
            name: 'Chìm Sâu',
            singer: 'RPT MCK, Trung Trần',
            path: './assets/music/song4.mp3',
            image: './assets/img/song4.png'
        },
        {
            name: '3107 3',
            singer: 'W/N, Duongg, Nau, titie',
            path: './assets/music/song5.mp3',
            image: './assets/img/song5.png'
        },
        {
            name: 'Không còn em',
            singer: 'Madihu',
            path: './assets/music/song6.mp3',
            image: './assets/img/song6.png'
        },
        {
            name: 'Chuyện Đôi Ta',
            singer: 'Emcee L (Da LAB), Muộii (Starry Night)',
            path: './assets/music/song7.mp3',
            image: './assets/img/song7.png'
        },
        {
            name: 'Sinh Ra Đã Là Thứ Đối Lập Nhau',
            singer: 'Da LAB, Badbies',
            path: './assets/music/song8.mp3',
            image: './assets/img/song8.png'
        },
        {
            name: 'vaicaunoicokhiennguoithaydoi ㅤ',
            singer: 'GREY D, tlinh',
            path: './assets/music/song9.mp3',
            image: './assets/img/song9.png'
        },
        {
            name: 'tiny love',
            singer: 'Thịnh Suy',
            path: './assets/music/song10.mp3',
            image: './assets/img/song10.png'
        },
        {
            name: 'Có Em',
            singer: 'Madihu, Low G',
            path: './assets/music/song11.mp3',
            image: './assets/img/song11.png'
        },
        {
            name: 'Đợi',
            singer: 'Vũ.',
            path: './assets/music/song12.mp3',
            image: './assets/img/song12.png'
        },
        {
            name: 'Xin lỗi',
            singer: 'Thắng',
            path: './assets/music/song13.mp3',
            image: './assets/img/song13.png'
        },
        {
            name: 'Về Quê',
            singer: 'Mikelodic, Đặng Thái Bình - RV mùa 3',
            path: './assets/music/song14.mp3',
            image: './assets/img/song14.png'
        },
        {
            name: 'đôi mình',
            singer: 'Chuột Sấm Sét',
            path: './assets/music/song15.mp3',
            image: './assets/img/song15.png'
        },
        {
            name: 'Anh Đã Ổn Hơn',
            singer: 'RPT MCK',
            path: './assets/music/song16.mp3',
            image: './assets/img/song16.png'
        },
        {
            name: 'Chẳng Nói Nên Lời',
            singer: 'Hoàng Dũng',
            path: './assets/music/song17.mp3',
            image: './assets/img/song17.png'
        },
	    {
            name: 'Chắc Vì Mình Chưa Tốt',
            singer: 'Thanh Hưng',
            path: './assets/music/song18.mp3',
            image: './assets/img/song18.png'
        }
        
    ],

    render () {
        const htmls = this.songs.map((song, index) => {
            return `<div class="song">
                        <div class="thumb" style="background-image: url(${song.image})">
                        </div>
                        <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>`
        });

        const html = htmls.join('\n');

        playlist.innerHTML = html;

        //onclick all song when render
        const _this = this;
        const allSong = $$('.song');
        allSong.forEach((song, index) => {
            song.onclick = function() {
                if (index !== _this.currentIndex) {
                    _this.currentIndex = index;
                    _this.activeSong();
                    _this.loadCurrentSong();
                    cdThumbAnimate.cancel();
                    if (!player.classList.contains('playing')) {
                        player.classList.add('playing');
                    }
                    audio.play();
                    cdThumbAnimate.play();
                    }
                }
        });

    },

    definedProperties() {
        Object.defineProperty(this, 'currentSong', {
          get() {
            return this.songs[this.currentIndex];
          }
        });
    },

    loadConfig() {
        this.isRandom = this.config.isRandom || false;
        btnRandom.classList.toggle('btn-active', this.isRandom);
        
        this.isRepeat = this.config.isRepeat || false;
        btnRepeat.classList.toggle('btn-active', this.isRepeat);

        this.currentIndex = this.config.activeSong || 0;
    },

    handleEvents () {
        //CD handle event
        const cdHeight = cd.offsetHeight;
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdHeight = cdHeight - scrollTop;

            cd.style.height = newCdHeight > 0 ? newCdHeight +'px' : 0;
            cd.style.opacity = newCdHeight / cdHeight  *1.5;
        }

        cdThumbAnimate.pause();
        //Play handle event
        playBtn.onclick = function() {
            player.classList.toggle('playing');
            if (!audio.paused) {
                audio.pause();
                cdThumbAnimate.pause();
            }
            else {
                audio.play();
                cdThumbAnimate.play();
            } 
        }

        //Seek handle event
        audio.ontimeupdate = function() {
            if (audio.duration) {
                progress.value = (audio.currentTime/audio.duration) * 100;
            }
            else progress.value = 0;
        };
        progress.oninput = function() {
            if (audio.duration) {
                const seekTo = this.value/this.max * audio.duration;
                audio.currentTime = seekTo;
            }
            else progress.value = 0;
        };

        //Next/ Prev handle event
        _this = this;
        btnNext.onclick = function() {
            if (!_this.isRandom) _this.nextSong()
            else _this.randomSong();

            cdThumbAnimate.cancel();
            if (!player.classList.contains('playing')) {
                player.classList.add('playing');
            }
            audio.play();
            cdThumbAnimate.play();

        };
        btnPrev.onclick = function() {
            if (!_this.isRandom) _this.prevSong()
            else _this.randomSong();

            cdThumbAnimate.cancel();
            if (!player.classList.contains('playing')) {
                player.classList.add('playing');
            }
            audio.play();
            cdThumbAnimate.play();

        }

        // Random, Repeat / Next when ended handle event
        btnRandom.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            btnRandom.classList.toggle('btn-active');
            if (_this.isRepeat && _this.isRandom) {
                _this.isRepeat = false;
                _this.setConfig('isRepeat', _this.isRepeat)
                btnRepeat.classList.remove('btn-active');
            }
        }

        btnRepeat.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            btnRepeat.classList.toggle('btn-active');
            if (_this.isRandom && _this.isRepeat) {
                _this.isRandom = false;
                _this.setConfig('isRandom', _this.isRandom)
                btnRandom.classList.remove('btn-active');
            }
        }

        audio.onended = function(){
            if (_this.isRandom) {
                _this.randomSong();
                cdThumbAnimate.cancel();
                if (!player.classList.contains('playing')) {
                    player.classList.add('playing');
                }
                audio.play();
                cdThumbAnimate.play();
            }
            else if (_this.isRepeat) {
                _this.repeatSong();
                cdThumbAnimate.cancel();
                if (!player.classList.contains('playing')) {
                    player.classList.add('playing');
                }
                audio.play();
                cdThumbAnimate.play();
            }
            else {
                _this.nextSong();
                cdThumbAnimate.cancel();
                if (!player.classList.contains('playing')) {
                    player.classList.add('playing');
                }
                audio.play();
                cdThumbAnimate.play();
            }
        }

        //Active Song
        

    },

    //Handle songs
    loadCurrentSong() {
        heading.textContent = `${this.currentSong.name}`;
        headingAuthor.textContent = `${this.currentSong.singer}`;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = `${this.currentSong.path}`;

        if (this.isRandom) {
            this.playedSongs.push(this.currentIndex);
        }

        this.activeSong();
        
    },
    nextSong() {
        if (this.currentIndex >= this.songs.length - 1 ) {
            this.currentIndex = 0;
        }
        else this.currentIndex++;
        this.loadCurrentSong();
    },
    prevSong() {
        if (this.currentIndex === 0 ) {
            this.currentIndex = this.songs.length - 1;
        }
        else this.currentIndex--;
        this.loadCurrentSong();
    },
    randomSong() {
        let oldIndex = this.currentIndex;
        if (this.playedSongs.length === this.songs.length) this.playedSongs.length = 0;
        do {
            this.currentIndex = Math.floor(Math.random() * this.songs.length);
        }  while (this.playedSongs.includes(this.currentIndex) || oldIndex === this.currentIndex);
        this.loadCurrentSong();
    },
    repeatSong() {
        this.loadCurrentSong();
    },
    activeSong() {
        const activedSong = $(`.song.song-active`);
        const newActiveSong = $(`.song:nth-child(${this.currentIndex + 1})`);
        
        if (activedSong) {
            activedSong.classList.remove('song-active');
        }

        newActiveSong.classList.add('song-active');
        newActiveSong.scrollIntoView({
            behavior: "smooth",
            block: "end", 
            inline: "nearest" 
        });

        this.setConfig('activeSong', this.currentIndex);
    },


    start () {
        //Gán cấu hình lấy từ config
        this.loadConfig();

        //Định nghĩa các thuộc tính cho object
        this.definedProperties();
        
        //Lắng nghe và xử lí các sự kiện
        this.handleEvents();
        
        //Render playlist
        this.render();
        
        //Tải bài hát đầu tiên lên khi tải ứng dụng
        this.loadCurrentSong()
        
        
    }


}

app.start();