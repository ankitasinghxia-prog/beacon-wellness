// ===== BEACON TYPING SOUNDS & TAGLINE =====
document.addEventListener('DOMContentLoaded', function() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;
    
    function playTypingSound() {
        if (!audioCtx) audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
    }
    
    const beaconTagline = document.querySelector('.beacon-tagline');
    if (beaconTagline) {
        beaconTagline.style.opacity = '0';
        beaconTagline.style.animation = 'none';
    }
    
    function startTypingAnimation() {
        const beaconLetters = document.querySelectorAll('.beacon-letter');
        
        if (beaconLetters.length > 0) {
            beaconLetters.forEach(letter => {
                letter.style.opacity = '0';
                letter.style.animation = 'none';
            });
            
            beaconLetters.forEach((letter, index) => {
                const delay = 300 + (index * 200);
                setTimeout(() => {
                    playTypingSound();
                    letter.style.animation = 'typeLetter 0.15s ease-out forwards';
                    
                    setTimeout(() => {
                        if (audioCtx) {
                            const popOsc = audioCtx.createOscillator();
                            const popGain = audioCtx.createGain();
                            popOsc.connect(popGain);
                            popGain.connect(audioCtx.destination);
                            popOsc.type = 'sine';
                            popOsc.frequency.setValueAtTime(1200, audioCtx.currentTime);
                            popGain.gain.setValueAtTime(0.05, audioCtx.currentTime);
                            popGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
                            popOsc.start();
                            popOsc.stop(audioCtx.currentTime + 0.03);
                        }
                    }, 30);
                }, delay);
            });
            
            const lastLetterDelay = 300 + (5 * 200) + 300;
            setTimeout(() => {
                if (audioCtx) {
                    const dingOsc = audioCtx.createOscillator();
                    const dingGain = audioCtx.createGain();
                    dingOsc.connect(dingGain);
                    dingGain.connect(audioCtx.destination);
                    dingOsc.type = 'sine';
                    dingOsc.frequency.setValueAtTime(600, audioCtx.currentTime);
                    dingOsc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.1);
                    dingGain.gain.setValueAtTime(0.1, audioCtx.currentTime);
                    dingGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
                    dingOsc.start();
                    dingOsc.stop(audioCtx.currentTime + 0.3);
                }
                
                if (beaconTagline) {
                    beaconTagline.style.opacity = '1';
                    beaconTagline.style.animation = 'fadeInTagline 1.5s ease-in-out forwards';
                }
            }, lastLetterDelay);
        }
    }
    
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (preloader.classList.contains('hide')) {
                        setTimeout(startTypingAnimation, 300);
                        observer.disconnect();
                    }
                }
            });
        });
        observer.observe(preloader, { attributes: true });
        
        setTimeout(() => {
            if (preloader && !preloader.classList.contains('hide')) {
                startTypingAnimation();
                observer.disconnect();
            }
        }, 6000);
    } else {
        startTypingAnimation();
    }
    
    function enableAudio() {
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }
    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
    document.addEventListener('touchstart', enableAudio);
});

// ===== BEAM HIGHLIGHT EFFECT =====
document.addEventListener('DOMContentLoaded', function() {
    const beam = document.querySelector('.vertical-beam');
    const cards = document.querySelectorAll('.coach-card-horizontal');
    if (beam && cards.length) {
        setInterval(() => {
            const beamRect = beam.getBoundingClientRect();
            const beamX = beamRect.left + beamRect.width / 2;
            cards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                if (Math.abs(cardCenter - beamX) < 50) {
                    card.classList.add('passing-beam');
                    setTimeout(() => card.classList.remove('passing-beam'), 500);
                }
            });
        }, 500);
    }
});

// ===== NAVIGATION BAR =====
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('mainNavbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (navToggle) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
            const sectionId = this.getAttribute('data-section');
            switch(sectionId) {
                case 'practice': document.querySelector('.container')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
                case 'yoga': document.getElementById('cosmicSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
                case 'trek': document.getElementById('mountainSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
                case 'cycle': document.getElementById('cyclingSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
                case 'schedule': document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
                case 'team': document.querySelector('.coach-carousel-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
                case 'contact': document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
            }
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 150;
        const sections = [
            { id: 'practice', element: document.querySelector('.container') },
            { id: 'yoga', element: document.getElementById('cosmicSection') },
            { id: 'trek', element: document.getElementById('mountainSection') },
            { id: 'cycle', element: document.getElementById('cyclingSection') },
            { id: 'schedule', element: document.getElementById('schedule') },
            { id: 'team', element: document.querySelector('.coach-carousel-section') },
            { id: 'contact', element: document.getElementById('contact') }
        ];
        let currentSection = '';
        sections.forEach(section => {
            if (section.element) {
                const sectionTop = section.element.offsetTop;
                const sectionBottom = sectionTop + section.element.offsetHeight;
                if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom - 100) {
                    currentSection = section.id;
                }
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) link.classList.add('active');
        });
    });
});

// ===== VIDEO PLAYBACK =====
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.infra');
    videos.forEach(video => {
        video.play().catch(error => console.log('Auto-play prevented:', error));
        video.setAttribute('controls', 'true');
        video.controls = true;
    });
    function playAllVideos() {
        videos.forEach(video => video.play().catch(e => console.log('Play failed:', e)));
        document.removeEventListener('click', playAllVideos);
        document.removeEventListener('scroll', playAllVideos);
        document.removeEventListener('keydown', playAllVideos);
    }
    document.addEventListener('click', playAllVideos);
    document.addEventListener('scroll', playAllVideos);
    document.addEventListener('keydown', playAllVideos);
});

// ===== TWO-PHASE SCROLL TRANSITION (YOGA, TREKKING & CYCLING) =====
document.addEventListener('DOMContentLoaded', function() {
    const yogaFigureWrapper = document.getElementById('yogaFigureWrapper');
    const yogaFigure = document.getElementById('yogaFigure');
    const trekkingFigureWrapper = document.getElementById('trekkingFigureWrapper');
    const trekkingFigure = document.getElementById('trekkingFigure');
    const cyclingFigureWrapper = document.getElementById('cyclingFigureWrapper');
    const cyclingFigure = document.getElementById('cyclingFigure');
    const cyclingSection = document.getElementById('cyclingSection');
    const bgCosmic = document.getElementById('bgCosmic');
    const bgMountain = document.getElementById('bgMountain');
    const cosmicSection = document.getElementById('cosmicSection');
    const mountainSection = document.getElementById('mountainSection');
    const scrollHint = document.getElementById('scrollHint');
    
    let yogaRevealed = false, cosmicSectionRevealed = false, trekkingRevealed = false, mountainRevealed = false;
    let yogaZoomCompleted = false, trekkingZoomCompleted = false;
    let cyclingRevealed = false, cyclingZoomCompleted = false, cyclingSectionRevealed = false;
    const coachSection = document.querySelector('.coach-carousel-section');
    
    window.addEventListener('scroll', () => {
        const s = window.scrollY;
        let coachBottom = 0;
        if (coachSection) {
            const coachRect = coachSection.getBoundingClientRect();
            coachBottom = coachRect.bottom + window.scrollY;
        }
        
        if (!yogaZoomCompleted) {
            const incentivesSection = document.querySelector('.incentives-section');
            let triggerBottom = 0;
            if (incentivesSection) {
                const incentivesRect = incentivesSection.getBoundingClientRect();
                triggerBottom = incentivesRect.bottom + window.scrollY;
            } else {
                const testimonialsSection = document.querySelector('.testimonials-section');
                if (testimonialsSection) {
                    const testimonialsRect = testimonialsSection.getBoundingClientRect();
                    triggerBottom = testimonialsRect.bottom + window.scrollY;
                } else {
                    const membershipSection = document.querySelector('.membership-section');
                    if (membershipSection) {
                        const membershipRect = membershipSection.getBoundingClientRect();
                        triggerBottom = membershipRect.bottom + window.scrollY;
                    } else {
                        triggerBottom = coachBottom;
                    }
                }
            }
            
            if (s > triggerBottom - 100 && !yogaRevealed) {
                yogaFigureWrapper.classList.add('visible');
                yogaRevealed = true;
            }
            
            if (yogaRevealed && yogaFigure) {
                const figureStart = triggerBottom - 100;
                let progress = (s - figureStart) / (window.innerHeight * 1.2);
                if (progress < 0) progress = 0;
                if (progress > 1) progress = 1;
                
                const scale = 0.8 + (progress * 12);
                const translateY = -progress * 250;
                yogaFigure.style.transform = `translateY(${translateY}px) scale(${scale})`;
                
                if (progress > 0.7) {
                    yogaFigure.style.opacity = Math.max(0, 1 - (progress - 0.7) * 3);
                } else {
                    yogaFigure.style.opacity = 1;
                }
                
                if (progress > 0.4 && bgCosmic) {
                    bgCosmic.style.opacity = Math.max(0, 1 - (progress - 0.4) * 1.5);
                }
                
                if (progress >= 0.8 && !cosmicSectionRevealed && cosmicSection) {
                    cosmicSection.classList.add('revealed');
                    cosmicSectionRevealed = true;
                }
                
                if (progress >= 0.95) {
                    yogaZoomCompleted = true;
                }
            }
        }
        
        if (yogaZoomCompleted && !trekkingZoomCompleted) {
            let cosmicEnd = 0;
            if (cosmicSection) {
                const cosmicRect = cosmicSection.getBoundingClientRect();
                cosmicEnd = cosmicRect.bottom + window.scrollY;
            }
            if (s > cosmicEnd - 300 && !trekkingRevealed) {
                trekkingFigureWrapper.classList.add('visible');
                trekkingRevealed = true;
            }
            if (trekkingRevealed && trekkingFigure) {
                const figureStart = cosmicEnd - 300;
                let progress = (s - figureStart) / (window.innerHeight * 1.2);
                if (progress < 0) progress = 0;
                if (progress > 1) progress = 1;
                const scale = 0.8 + (progress * 12);
                const translateY = -progress * 250;
                trekkingFigure.style.transform = `translateY(${translateY}px) scale(${scale})`;
                if (progress > 0.7) trekkingFigure.style.opacity = Math.max(0, 1 - (progress - 0.7) * 3);
                else trekkingFigure.style.opacity = 1;
                if (progress > 0.3 && bgMountain) bgMountain.style.opacity = Math.min(1, (progress - 0.3) * 1.5);
                if (progress >= 0.8 && !mountainRevealed && mountainSection) {
                    mountainSection.classList.add('revealed');
                    mountainRevealed = true;
                    if (scrollHint) setTimeout(() => scrollHint.style.opacity = '0', 500);
                }
                if (progress >= 0.95) trekkingZoomCompleted = true;
            }
        }
        
        if (trekkingZoomCompleted && !cyclingZoomCompleted) {
            let mountainEnd = 0;
            if (mountainSection) {
                const mountainRect = mountainSection.getBoundingClientRect();
                mountainEnd = mountainRect.bottom + window.scrollY;
            }
            
            if (s > mountainEnd - 300 && !cyclingRevealed) {
                cyclingFigureWrapper.classList.add('visible');
                cyclingRevealed = true;
            }
            
            if (cyclingRevealed && cyclingFigure) {
                const figureStart = mountainEnd - 300;
                let progress = (s - figureStart) / (window.innerHeight * 1.2);
                if (progress < 0) progress = 0;
                if (progress > 1) progress = 1;
                
                const scale = 0.8 + (progress * 12);
                const translateY = -progress * 250;
                cyclingFigure.style.transform = `translateY(${translateY}px) scale(${scale})`;
                
                if (progress > 0.7) {
                    cyclingFigure.style.opacity = Math.max(0, 1 - (progress - 0.7) * 3);
                } else {
                    cyclingFigure.style.opacity = 1;
                }
                
                if (progress >= 0.8 && !cyclingSectionRevealed && cyclingSection) {
                    cyclingSection.classList.add('revealed');
                    cyclingSectionRevealed = true;
                }
                
                if (progress >= 0.95) {
                    cyclingZoomCompleted = true;
                }
            }
        }
    });
});

// ===== INTERSECTION OBSERVER FOR SEQUENTIAL REVEALS =====
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = { threshold: 0.25, rootMargin: "0px 0px -100px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    const elementsToObserve = ['yogaMantra', 'yogaCards', 'yogaPortals', 'yogaQuote', 'yogaFooter', 'mountainMantra', 'mountainCards', 'mountainPortals', 'mountainQuote', 'mountainFooter', 'cyclingMantra', 'cyclingCards', 'cyclingPortals', 'cyclingQuote', 'cyclingFooter'];
    elementsToObserve.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
});

// ===== MODAL SYSTEM =====
document.addEventListener('DOMContentLoaded', function() {
    const modalContentMap = {
        pulse: { title: "🌀 Cosmic Pulse", body: "<div style='text-align:center'><div style='width:150px;height:150px;margin:1rem auto;background:radial-gradient(circle,rgba(212,175,100,0.3),rgba(100,80,180,0.1));border-radius:50%;animation:breathPulse 8s infinite;border:2px solid rgba(212,175,100,0.6)'></div><p>Pranayama Breath: Inhale 4 sec → Hold 7 sec → Exhale 8 sec</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        chakra: { title: "🌌 Stellar Path", body: "<div style='text-align:center'><div style='display:grid;grid-template-columns:repeat(4,1fr);gap:10px'><div>🔴 Root</div><div>🟠 Sacral</div><div>🟡 Solar</div><div>🟢 Heart</div><div>🔵 Throat</div><div>🟣 Third Eye</div><div>⚪ Crown</div></div><p>\"I am aligned with cosmic energy\"</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        mandala: { title: "✨ Sacred Visions", body: "<div style='text-align:center'><div style='font-size:4rem;animation:pulseGlow 3s infinite'>🕉️🌀✨</div><p>Sacred geometry meditation. Close your eyes and visualize.</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        eternal: { title: "🕉️ Eternal Circle", body: "<div style='text-align:center'><p>\"The only way out is in.\" — Rumi</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        intuition: { title: "🌙 Intuition Portal", body: "<div style='text-align:center'><span style='font-size:3rem'>🌙✨</span><p>Trust the whispers of your soul.</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        radiance: { title: "☀️ Radiance Portal", body: "<div style='text-align:center'><span style='font-size:3rem'>☀️🕉️</span><p>Sun Salutation: 3 rounds with conscious breath.</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        wisdom: { title: "⭐ Wisdom Portal", body: "<div style='text-align:center'><div id='dynamicMantra'>ॐ Shanti Shanti Shanti</div><div class='button-group'><button class='modal-button' onclick='generateNewMantra()'>🔄 New Mantra</button><button class='modal-close-btn' onclick='closeModal()'>✨ Return</button></div></div>" },
        awakening: { title: "🪷 Awakening Portal", body: "<div style='text-align:center'><span style='font-size:3rem'>🪷🌅</span><p>\"I am not the body. I am not the mind. I am eternal awareness.\"</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        basecamp: { title: "🏔️ Base Camp", body: "<div style='text-align:center'><span style='font-size:3rem'>🏕️⛺</span><p>Preparation checklist: Physical training, mental resilience, proper gear.</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        ascent: { title: "⛰️ The Ascent", body: "<div style='text-align:center'><span style='font-size:3rem'>🧗‍♂️</span><p>\"The climb is not about reaching the top. It's about who you become.\"</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        peak: { title: "🏔️ Peak Moment", body: "<div style='text-align:center'><span style='font-size:3rem'>🏔️✨</span><p>You've reached the summit. Pause. Breathe. Witness the vastness.</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        descent: { title: "🌄 Descent Wisdom", body: "<div style='text-align:center'><span style='font-size:3rem'>🌅</span><p>Coming down requires more strength than going up. Integrate what you've learned.</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        altitude: { title: "❄️ Altitude", body: "<div style='text-align:center'><span style='font-size:3rem'>⛰️❄️</span><p>Acclimatization is key. Climb high, sleep low.</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        navigation: { title: "🧭 Navigation", body: "<div style='text-align:center'><span style='font-size:3rem'>🧭🗺️</span><p>Trust your map, your compass, and your intuition.</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        endurance: { title: "💪 Endurance", body: "<div style='text-align:center'><span style='font-size:3rem'>💪⛰️</span><p>Physical strength fades. Mental endurance remains.</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        summitmind: { title: "🧘 Summit Mind", body: "<div style='text-align:center'><span style='font-size:3rem'>🧘🏔️</span><p>High-altitude meditation: Focus on the breath. Be present with each step.</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        weeklyrides: { title: "🚴 Weekly Rides", body: "<div style='text-align:center'><span style='font-size:3rem'>🚴‍♂️</span><p>Join our weekend cycling group! Every Saturday 6:00 AM. All levels welcome.</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        pace: { title: "🏁 Pace Challenges", body: "<div style='text-align:center'><span style='font-size:3rem'>📊</span><p>Track your speed, distance, and improvement. Compete on our leaderboard!</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        races: { title: "🏆 Race Events", body: "<div style='text-align:center'><span style='font-size:3rem'>🏁</span><p>Monthly cycling competitions with medals, smartwatches, and earbuds as prizes!</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        club: { title: "👥 Cycling Club", body: "<div style='text-align:center'><span style='font-size:3rem'>👥</span><p>Join 500+ members. Group rides, social events, and cycling community.</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        gear: { title: "🛞 Gear Guide", body: "<div style='text-align:center'><span style='font-size:3rem'>🛠️</span><p>Bike maintenance tips, safety gear recommendations, and essential accessories.</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        routes: { title: "📊 Route Maps", body: "<div style='text-align:center'><span style='font-size:3rem'>🗺️</span><p>Curated scenic routes: 10km, 25km, 50km, and 100km challenges.</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        training: { title: "💪 Training Plans", body: "<div style='text-align:center'><span style='font-size:3rem'>📋</span><p>8-week training programs: Beginner, Intermediate, and Racer levels.</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
        community: { title: "🎽 Community", body: "<div style='text-align:center'><span style='font-size:3rem'>👥</span><p>Connect with fellow cyclists. Share routes, tips, and celebrate achievements!</p><button class='modal-close-btn' onclick='closeModal()'>Return</button></div>" },
    };
    
    const mantras = ["ॐ Namah Shivaya", "So Hum (I am That)", "ॐ Mani Padme Hum", "Sat Chit Ananda", "Lokah Samastah Sukhino Bhavantu", "Om Shanti Om"];
    window.generateNewMantra = function() {
        const mantraEl = document.getElementById('dynamicMantra');
        if (mantraEl) mantraEl.textContent = mantras[Math.floor(Math.random() * mantras.length)];
    };
    
    window.openModal = function(type) {
        const content = modalContentMap[type];
        if (!content) return;
        const modalHTML = `<div class="modal-overlay" id="activeModal"><div class="modal-container"><div class="modal-header"><h2>${content.title}</h2><button class="modal-close" onclick="closeModal()">✕</button></div><div class="modal-content">${content.body}</div></div></div>`;
        const existing = document.getElementById('activeModal');
        if (existing) existing.remove();
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modal = document.getElementById('activeModal');
        setTimeout(() => modal.classList.add('active'), 10);
        if (type === 'wisdom') {
            setTimeout(() => {
                const genBtn = document.querySelector('#activeModal .modal-button');
                if (genBtn) genBtn.onclick = (e) => { e.preventDefault(); generateNewMantra(); };
            }, 50);
        }
    };
    
    window.closeModal = function() {
        const modal = document.getElementById('activeModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 400);
        }
    };
    
    document.querySelectorAll('.cosmic-card, .mountain-card, .cycling-card, .portal').forEach(el => {
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            const modalType = el.getAttribute('data-modal');
            if (modalType && modalContentMap[modalType]) window.openModal(modalType);
        });
    });
    document.addEventListener('click', (e) => {
        if (e.target.classList && e.target.classList.contains('modal-overlay')) closeModal();
    });
});

// ===== FULLSCREEN VIDEO DIGITAL LIBRARY =====
document.addEventListener('DOMContentLoaded', function() {
    const videoWrapper = document.getElementById('fullscreenVideoWrapper');
    const video = document.getElementById('mainBookVideo');
    const booksGrid = document.getElementById('booksGridFinal');
    
    let videoStarted = false;
    let videoEnded = false;
    let gridShown = false;
    
    const whoWeServeSection = document.querySelector('.who-we-serve-section');
    
    window.addEventListener('scroll', function() {
        const s = window.scrollY;
        let serveBottom = 0;
        if (whoWeServeSection) {
            const serveRect = whoWeServeSection.getBoundingClientRect();
            serveBottom = serveRect.bottom + window.scrollY;
        }
        
        if (s > serveBottom - 200 && !videoStarted) {
            videoWrapper.classList.add('visible');
            video.play().catch(e => console.log('Video play failed:', e));
            videoStarted = true;
        }
    });
    
    video.addEventListener('ended', function() {
        if (!videoEnded) {
            videoEnded = true;
            videoWrapper.style.opacity = '0';
            videoWrapper.style.transition = 'opacity 0.6s ease';
            setTimeout(() => {
                videoWrapper.style.display = 'none';
                if (!gridShown) {
                    booksGrid.classList.add('show');
                    gridShown = true;
                }
            }, 600);
        }
    });
    
    setTimeout(function() {
        if (!videoEnded && videoStarted) {
            videoEnded = true;
            videoWrapper.style.opacity = '0';
            setTimeout(() => {
                videoWrapper.style.display = 'none';
                if (!gridShown) {
                    booksGrid.classList.add('show');
                    gridShown = true;
                }
            }, 600);
        }
    }, 8000);
});

window.readBookFinal = function(bookType) {
    showFinalToast(`📖 Opening "${bookType}" book...`);
};
window.downloadBookFinal = function(bookType) {
    showFinalToast(`⬇️ Downloading "${bookType}" book...`);
};

function showFinalToast(msg) {
    const oldToast = document.querySelector('.final-toast');
    if (oldToast) oldToast.remove();
    const toast = document.createElement('div');
    toast.className = 'final-toast';
    toast.textContent = msg;
    toast.style.cssText = `position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.95); backdrop-filter: blur(10px); color: #f2e0bc; padding: 12px 28px; border-radius: 50px; border: 1px solid #dbb86b; z-index: 10000; font-family: 'Montserrat', sans-serif; font-size: 0.9rem; animation: finalToastFade 3s ease forwards; white-space: nowrap;`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

const finalToastStyle = document.createElement('style');
finalToastStyle.textContent = `@keyframes finalToastFade { 0% { opacity: 1; transform: translateX(-50%) translateY(0); } 70% { opacity: 1; } 100% { opacity: 0; transform: translateX(-50%) translateY(-20px); visibility: hidden; } }`;
document.head.appendChild(finalToastStyle);

// ===== MEMBERSHIP PLAN SELECTION =====
function selectPlan(planType) {
    const planNames = { basic: "Basic Plan", pro: "Pro Plan", family: "Family Plan" };
    showMembershipToast(`✨ You selected the ${planNames[planType]}. We'll contact you soon! ✨`);
}

function showMembershipToast(message) {
    const existingToast = document.querySelector('.membership-toast');
    if (existingToast) existingToast.remove();
    const toast = document.createElement('div');
    toast.className = 'membership-toast';
    toast.textContent = message;
    toast.style.cssText = `position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.95); backdrop-filter: blur(12px); color: #f2e0bc; padding: 14px 28px; border-radius: 50px; border: 1px solid #dbb86b; z-index: 10001; font-family: 'Montserrat', sans-serif; font-size: 0.9rem; white-space: nowrap; animation: membershipToastFade 3s ease forwards; box-shadow: 0 0 30px rgba(212,175,100,0.3);`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

if (!document.querySelector('#membershipToastStyle')) {
    const toastStyle = document.createElement('style');
    toastStyle.id = 'membershipToastStyle';
    toastStyle.textContent = `@keyframes membershipToastFade { 0% { opacity: 1; transform: translateX(-50%) translateY(0); } 70% { opacity: 1; } 100% { opacity: 0; transform: translateX(-50%) translateY(-20px); visibility: hidden; } }`;
    document.head.appendChild(toastStyle);
}

// ===== TESTIMONIALS INTERACTION =====
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('click', function() {
            const author = this.querySelector('.author-name')?.innerText || 'A member';
            showTestimonialToast(`💬 Thank you, ${author}! Share your story too. 💬`);
        });
    });
});

function showTestimonialToast(message) {
    const existingToast = document.querySelector('.testimonial-toast');
    if (existingToast) existingToast.remove();
    const toast = document.createElement('div');
    toast.className = 'testimonial-toast';
    toast.textContent = message;
    toast.style.cssText = `position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.95); backdrop-filter: blur(12px); color: #f2e0bc; padding: 12px 28px; border-radius: 50px; border: 1px solid #dbb86b; z-index: 10001; font-family: 'Montserrat', sans-serif; font-size: 0.9rem; white-space: nowrap; animation: testimonialToastFade 3s ease forwards; box-shadow: 0 0 30px rgba(212,175,100,0.3);`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

if (!document.querySelector('#testimonialToastStyle')) {
    const toastStyle = document.createElement('style');
    toastStyle.id = 'testimonialToastStyle';
    toastStyle.textContent = `@keyframes testimonialToastFade { 0% { opacity: 1; transform: translateX(-50%) translateY(0); } 70% { opacity: 1; } 100% { opacity: 0; transform: translateX(-50%) translateY(-20px); visibility: hidden; } }`;
    document.head.appendChild(toastStyle);
}

// ===== INCENTIVES & CHALLENGES INTERACTION =====
document.addEventListener('DOMContentLoaded', function() {
    const incentiveCards = document.querySelectorAll('.incentive-card');
    incentiveCards.forEach(card => {
        card.addEventListener('click', function() {
            const incentiveName = this.querySelector('.incentive-name')?.innerText || 'this activity';
            showIncentiveToast(`🎉 Join ${incentiveName}! Ask our front desk for details. 🎉`);
        });
    });
});

function showIncentiveToast(message) {
    const existingToast = document.querySelector('.incentive-toast');
    if (existingToast) existingToast.remove();
    const toast = document.createElement('div');
    toast.className = 'incentive-toast';
    toast.textContent = message;
    toast.style.cssText = `position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.95); backdrop-filter: blur(12px); color: #f2e0bc; padding: 12px 28px; border-radius: 50px; border: 1px solid #dbb86b; z-index: 10001; font-family: 'Montserrat', sans-serif; font-size: 0.9rem; white-space: nowrap; animation: incentiveToastFade 3s ease forwards; box-shadow: 0 0 30px rgba(212,175,100,0.3);`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

if (!document.querySelector('#incentiveToastStyle')) {
    const toastStyle = document.createElement('style');
    toastStyle.id = 'incentiveToastStyle';
    toastStyle.textContent = `@keyframes incentiveToastFade { 0% { opacity: 1; transform: translateX(-50%) translateY(0); } 70% { opacity: 1; } 100% { opacity: 0; transform: translateX(-50%) translateY(-20px); visibility: hidden; } }`;
    document.head.appendChild(toastStyle);
}

// ===== NEWSLETTER SUBSCRIBE HANDLER =====
function handleNewsletterMain(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (!email) {
        showFooterToast('⚠️ Please enter your email');
        return;
    }
    
    fetch('/subscribe.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showFooterToast('✅ ' + data.message);
            emailInput.value = '';
        } else {
            showFooterToast('❌ ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFooterToast('❌ Network error. Please try again.');
    });
}

function showFooterToast(message) {
    const existingToast = document.querySelector('.footer-toast');
    if (existingToast) existingToast.remove();
    const toast = document.createElement('div');
    toast.className = 'footer-toast';
    toast.textContent = message;
    toast.style.cssText = `position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.95); backdrop-filter: blur(12px); color: #f2e0bc; padding: 14px 28px; border-radius: 50px; border: 1px solid #dbb86b; z-index: 10002; font-family: 'Montserrat', sans-serif; font-size: 0.85rem; white-space: nowrap; animation: footerToastFade 3s ease forwards; box-shadow: 0 0 30px rgba(212,175,100,0.3);`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

if (!document.querySelector('#footerToastStyle')) {
    const toastStyle = document.createElement('style');
    toastStyle.id = 'footerToastStyle';
    toastStyle.textContent = `@keyframes footerToastFade { 0% { opacity: 1; transform: translateX(-50%) translateY(0); } 70% { opacity: 1; } 100% { opacity: 0; transform: translateX(-50%) translateY(-20px); visibility: hidden; } }`;
    document.head.appendChild(toastStyle);
}

// ===== BACK TO TOP BUTTON =====
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) backToTopBtn.classList.add('show');
        else backToTopBtn.classList.remove('show');
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ===== WHATSAPP CHAT BUTTON =====
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (!whatsappBtn) return;
    
    whatsappBtn.addEventListener('click', function() {
        const phoneNumber = '919876543210';
        const message = 'Hello BEACON! I\'m interested in learning more about your wellness programs.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
});

// ===== PRELOADER ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progressBar');
    const percentDisplay = document.getElementById('preloaderPercent');
    const messageElement = document.getElementById('preloaderMessage');
    
    const loadingMessages = ["Awakening your journey...", "Aligning your chakras...", "Preparing the path ahead...", "Summoning cosmic energy...", "Almost there..."];
    let progress = 0;
    let messageIndex = 0;
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 2;
        if (progress >= 100) { progress = 100; clearInterval(interval); }
        
        progressBar.style.width = progress + '%';
        percentDisplay.textContent = progress + '%';
        
        if (progress >= 15 && messageIndex === 0) {
            messageIndex = 1;
            messageElement.style.opacity = '0';
            setTimeout(() => { messageElement.textContent = loadingMessages[1]; messageElement.style.opacity = '1'; }, 300);
        } else if (progress >= 35 && messageIndex === 1) {
            messageIndex = 2;
            messageElement.style.opacity = '0';
            setTimeout(() => { messageElement.textContent = loadingMessages[2]; messageElement.style.opacity = '1'; }, 300);
        } else if (progress >= 60 && messageIndex === 2) {
            messageIndex = 3;
            messageElement.style.opacity = '0';
            setTimeout(() => { messageElement.textContent = loadingMessages[3]; messageElement.style.opacity = '1'; }, 300);
        } else if (progress >= 85 && messageIndex === 3) {
            messageIndex = 4;
            messageElement.style.opacity = '0';
            setTimeout(() => { messageElement.textContent = loadingMessages[4]; messageElement.style.opacity = '1'; }, 300);
        }
    }, 250);
    
    window.addEventListener('load', function() {
        const finalInterval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(finalInterval);
                setTimeout(() => {
                    preloader.classList.add('hide');
                    setTimeout(() => { preloader.style.display = 'none'; }, 1000);
                }, 2000);
            } else {
                progress = Math.min(progress + 3, 100);
                progressBar.style.width = progress + '%';
                percentDisplay.textContent = progress + '%';
            }
        }, 150);
    });
    
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hide')) {
            preloader.classList.add('hide');
            setTimeout(() => { preloader.style.display = 'none'; }, 1000);
        }
    }, 8000);
});

// ===== REGISTRATION/LOGIN MODAL =====
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('authModal');
    const closeBtn = document.getElementById('closeAuthModal');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const tabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    
    function openModal(tabName) {
        modal.classList.add('active');
        tabs.forEach(tab => {
            if (tab.getAttribute('data-tab') === tabName) tab.classList.add('active');
            else tab.classList.remove('active');
        });
        if (tabName === 'login') {
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        } else {
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
        }
    }
    
    function closeModalFunc() { modal.classList.remove('active'); }
    
    if (loginBtn) loginBtn.addEventListener('click', (e) => { e.preventDefault(); openModal('login'); });
    if (signupBtn) signupBtn.addEventListener('click', (e) => { e.preventDefault(); openModal('signup'); });
    if (closeBtn) closeBtn.addEventListener('click', closeModalFunc);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModalFunc(); });
    tabs.forEach(tab => { tab.addEventListener('click', () => { openModal(tab.getAttribute('data-tab')); }); });
    if (switchToSignup) switchToSignup.addEventListener('click', (e) => { e.preventDefault(); openModal('signup'); });
    if (switchToLogin) switchToLogin.addEventListener('click', (e) => { e.preventDefault(); openModal('login'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModalFunc(); });
});

// ===== LOGIN HANDLER (Connected to PHP Backend) =====
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showAuthToast('⚠️ Please fill in all fields');
        return;
    }
    
    fetch('/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAuthToast('✅ ' + data.message);
            document.getElementById('closeAuthModal').click();
            // Reload page to update login state
            setTimeout(() => location.reload(), 1500);
        } else {
            showAuthToast('❌ ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAuthToast('❌ Network error. Please try again.');
    });
}


// ===== SIGNUP HANDLER (Connected to PHP Backend) =====
function handleSignup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (!name || !email || !phone || !password || !confirmPassword) {
        showAuthToast('⚠️ Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        showAuthToast('⚠️ Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        showAuthToast('⚠️ Password must be at least 6 characters');
        return;
    }
    
    fetch('/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAuthToast('✅ ' + data.message);
            // Switch to login tab after successful signup
            setTimeout(() => {
                document.querySelector('.auth-tab[data-tab="login"]').click();
            }, 1500);
        } else {
            showAuthToast('❌ ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAuthToast('❌ Network error. Please try again.');
    });
}

function showAuthToast(message) {
    const existingToast = document.querySelector('.auth-toast');
    if (existingToast) existingToast.remove();
    const toast = document.createElement('div');
    toast.className = 'auth-toast';
    toast.textContent = message;
    toast.style.cssText = `position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.95); backdrop-filter: blur(10px); color: #f2e0bc; padding: 12px 24px; border-radius: 50px; border: 1px solid #dbb86b; z-index: 10000; font-family: 'Montserrat', sans-serif; font-size: 0.9rem; animation: authToastFade 3s ease forwards; white-space: nowrap;`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

if (!document.querySelector('#authToastStyle')) {
    const toastStyle = document.createElement('style');
    toastStyle.id = 'authToastStyle';
    toastStyle.textContent = `@keyframes authToastFade { 0% { opacity: 1; transform: translateX(-50%) translateY(0); } 70% { opacity: 1; } 100% { opacity: 0; transform: translateX(-50%) translateY(-20px); visibility: hidden; } }`;
    document.head.appendChild(toastStyle);
}

// ===== CONTACT FORM HANDLER =====
function showContactToast(message) {
    const existingToast = document.querySelector('.contact-toast');
    if (existingToast) existingToast.remove();
    const toast = document.createElement('div');
    toast.className = 'contact-toast';
    toast.textContent = message;
    toast.style.cssText = `position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.95); backdrop-filter: blur(10px); color: #f2e0bc; padding: 12px 24px; border-radius: 50px; border: 1px solid #dbb86b; z-index: 10000; font-family: 'Montserrat', sans-serif; font-size: 0.9rem; animation: contactToastFade 3s ease forwards; white-space: nowrap;`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function handleContactSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    const message = document.getElementById('contactMessage').value;
    
    if (!name || !email || !phone || !message) {
        showContactToast('⚠️ Please fill in all fields');
        return;
    }
    
    fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showContactToast('✅ ' + data.message);
            document.getElementById('contactForm').reset();
        } else {
            showContactToast('❌ ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showContactToast('❌ Network error. Please try again.');
    });
}

if (!document.querySelector('#contactToastStyle')) {
    const toastStyle = document.createElement('style');
    toastStyle.id = 'contactToastStyle';
    toastStyle.textContent = `@keyframes contactToastFade { 0% { opacity: 1; transform: translateX(-50%) translateY(0); } 70% { opacity: 1; } 100% { opacity: 0; transform: translateX(-50%) translateY(-20px); visibility: hidden; } }`;
    document.head.appendChild(toastStyle);
}

// ===== COOKIE CONSENT BANNER =====
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');
    
    const cookieChoice = localStorage.getItem('cookieConsent');
    if (!cookieChoice) {
        setTimeout(() => { cookieConsent.classList.add('show'); }, 1000);
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieConsent.classList.remove('show');
            showCookieToast('✨ Thank you! Your preferences have been saved.');
        });
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            cookieConsent.classList.remove('show');
            showCookieToast('🔒 Your privacy choices have been saved.');
        });
    }
    
    function showCookieToast(message) {
        const existingToast = document.querySelector('.cookie-toast');
        if (existingToast) existingToast.remove();
        const toast = document.createElement('div');
        toast.className = 'cookie-toast';
        toast.textContent = message;
        toast.style.cssText = `position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.95); backdrop-filter: blur(10px); color: #f2e0bc; padding: 10px 20px; border-radius: 50px; border: 1px solid #dbb86b; z-index: 10000; font-family: 'Montserrat', sans-serif; font-size: 0.85rem; animation: cookieToastFade 3s ease forwards; white-space: nowrap;`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
    
    if (!document.querySelector('#cookieToastStyle')) {
        const toastStyle = document.createElement('style');
        toastStyle.id = 'cookieToastStyle';
        toastStyle.textContent = `@keyframes cookieToastFade { 0% { opacity: 1; transform: translateX(-50%) translateY(0); } 70% { opacity: 1; } 100% { opacity: 0; transform: translateX(-50%) translateY(-20px); visibility: hidden; } }`;
        document.head.appendChild(toastStyle);
    }
});
