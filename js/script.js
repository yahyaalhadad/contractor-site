/**
 * ملف JavaScript الرئيسي لموقع أبو أحمد للمقاولات
 * يحتوي على جميع الوظائف التفاعلية والتأثيرات
 * 
 * الإصدار: 1.0.0
 * التاريخ: 2023-10-15
 */
// إعداد المتغيرات

document.addEventListener('DOMContentLoaded', function () {
    /* ====================== */
    /* 1. القائمة التفاعلية للجوال */
    /* ====================== */
    // وظيفة التهيئة
    // إعداد المتغيرات
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // التأكد من وجود العناصر
    if (!slides.length || !slider) {
        console.error('لم يتم العثور على العناصر المطلوبة');
        return;
    }

    // حساب عدد الصور
    const totalSlides = slides.length;
    let currentIndex = 0;
    let sliderInterval;

    // دالة لتغيير الصورة
    function changeSlide(n) {
        // إزالة الكلاس النشط من جميع الصور
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // تحديد الصورة الحالية
        currentIndex = (n + totalSlides) % totalSlides;

        // إضافة الكلاس النشط للصورة الحالية
        slides[currentIndex].classList.add('active');
    }

    // التحكم بالتنقل اليدوي
    prevBtn.addEventListener('click', () => {
        changeSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        changeSlide(currentIndex + 1);
    });

    // التحكم بالتوقف عند التمرير
    slider.addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });

    slider.addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    // التشغيل التلقائي
    function startAutoPlay() {
        sliderInterval = setInterval(() => {
            changeSlide(currentIndex + 1);
        }, 3000);
    }

    // إضافة دعم التمرير (Swipe) للهواتف
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;

        const minSwipeDistance = 50;
        if (touchStartX - touchEndX > minSwipeDistance) {
            nextBtn.click(); // تمرير إلى اليسار
        } else if (touchEndX - touchStartX > minSwipeDistance) {
            prevBtn.click(); // تمرير إلى اليمين
        }
    }, { passive: true });

    // بدء التشغيل التلقائي عند التحميل
    startAutoPlay();

    // التأكد من أن الصور مُحمَّلة
    window.addEventListener('load', () => {
        // إظهار الصورة الأولى
        slides[0].classList.add('active');
    });



    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            // تغيير أيقونة القائمة عند الفتح والإغلاق
            this.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
        });
    }
    // إعداد المتغيرات

    /* ====================== */
    /* 2. وظيفة عرض المزيد من الخدمات */
    /* ====================== */

    const showMoreBtn = document.getElementById('showMoreBtn');
    const additionalServicesContainer = document.querySelector('.additional-services-container');

    if (showMoreBtn && additionalServicesContainer) {
        showMoreBtn.addEventListener('click', function () {
            const isExpanded = this.getAttribute('data-expanded') === 'true';

            if (!isExpanded) {
                // عرض الخدمات الإضافية في المكان الفارغ
                additionalServicesContainer.style.display = 'block';
                this.setAttribute('data-expanded', 'true');
                this.textContent = 'عرض أقل';
            } else {
                // إخفاء الخدمات الإضافية
                additionalServicesContainer.style.display = 'none';
                this.setAttribute('data-expanded', 'false');
                this.textContent = 'عرض المزيد';
            }
        });
    }

    /* ====================== */
    /* 3. تأثيرات الظهور عند التمرير */
    /* ====================== */

    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .feature-item');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    };

    // تفعيل تأثيرات الظهور
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // استدعاء الدالة عند التحميل

    /* ====================== */
    /* 4. تمرير سلس للروابط الداخلية */
    /* ====================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // إغلاق قائمة الجوال إذا كانت مفتوحة
            if (mainNav) {
                mainNav.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.textContent = '☰';
                }
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // تمرير سلس مع تعديل لحساب ارتفاع الهيدر
                const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 80;
                const offsetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ====================== */
    /* 5. إغلاق القائمة عند تغيير حجم الشاشة */
    /* ====================== */

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && mainNav) {
            mainNav.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.textContent = '☰';
            }
        }
    });

    /* ====================== */
    /* 6. تأثيرات تتابع عند التمرير */
    /* ====================== */

    const sections = document.querySelectorAll('section');

    const handleScroll = function () {
        const scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - window.innerHeight * 0.7;

            if (scrollPosition > sectionTop && !section.classList.contains('animated')) {
                section.classList.add('animated');

                // تأثير تتابع للعناصر داخل القسم
                const elements = section.querySelectorAll('.service-card, .portfolio-item, .feature-item');
                elements.forEach((el, i) => {
                    // تأكد من أن العنصر لا يحتوي على الكلاس visible
                    if (!el.classList.contains('visible')) {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(20px)';
                    }

                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 100 * i);
                });
            }
        });
    };

    // إعداد العناصر للتأثير
    document.querySelectorAll('.service-card, .portfolio-item, .feature-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // استدعاء دالة التمرير
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // استدعاء الدالة عند التحميل

    /* ====================== */
    /* 7. وظيفة البحث (إذا كانت موجودة) */
    /* ====================== */

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase().trim();

            if (searchTerm.length > 0) {
                searchResults.style.display = 'block';

                // هنا يمكنك إضافة كود للبحث في المحتوى
                // مثال بسيط:
                const services = [
                    { name: 'دهانات داخلية وخارجية', url: 'services/service-painting.html' },
                    { name: 'تركيب مظلات وسواتر', url: 'services/service-shelters.html' },
                    { name: 'أعمال الجبس بورد', url: 'services/service-gypsum.html' },
                    { name: 'دهانات الإيبوكسي', url: 'services/service-epoxy.html' },
                    { name: 'أعمال الترميم', url: 'services/service-renovation.html' }
                ];

                let resultsHTML = '';
                let found = false;

                services.forEach(service => {
                    if (service.name.toLowerCase().includes(searchTerm)) {
                        resultsHTML += `<a href="${service.url}" class="search-result-item">${service.name}</a>`;
                        found = true;
                    }
                });

                if (!found) {
                    resultsHTML = '<div class="no-results">لم يتم العثور على نتائج</div>';
                }

                searchResults.innerHTML = resultsHTML;
            } else {
                searchResults.style.display = 'none';
            }
        });

        // إخفاء نتائج البحث عند النقر خارج مربع البحث
        document.addEventListener('click', function (e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    /* ====================== */
    /* 8. وظيفة النموذج (إذا كان موجودًا) */
    /* ====================== */

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // جمع بيانات النموذج
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // إنشاء رسالة واتساب
            const whatsappMessage = `السلام عليكم، أنا ${name}، أرغب في استشارة حول خدمة: ${service}.\nالرسالة: ${message}\nرقم الجوال: ${phone}`;

            // تحويل الرسالة إلى تنسيق URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/966500969894?text=${encodedMessage}`;

            // فتح واتساب مع الرسالة
            window.open(whatsappUrl, '_blank');

            // إعادة تعيين النموذج
            contactForm.reset();

            // إظهار رسالة تأكيد
            alert('تم إرسال رسالتك بنجاح! سيتم تحويلك إلى واتساب للتحدث معي مباشرة.');
        });
    }

    /* ====================== */
    /* 9. وظيفة عرض تفاصيل الخدمة (إذا كانت موجودة) */
    /* ====================== */

    const serviceDetailsButtons = document.querySelectorAll('.service-detail-btn');

    serviceDetailsButtons.forEach(button => {
        button.addEventListener('click', function () {
            const serviceId = this.getAttribute('data-service');
            const serviceDetails = document.getElementById(`service-${serviceId}-details`);

            if (serviceDetails) {
                // تبديل إظهار/إخفاء التفاصيل
                if (serviceDetails.style.display === 'block') {
                    serviceDetails.style.display = 'none';
                    this.textContent = 'عرض التفاصيل';
                } else {
                    serviceDetails.style.display = 'block';
                    this.textContent = 'إخفاء التفاصيل';
                }
            }
        });
    });

    /* ====================== */
    /* 10. وظيفة التحقق من تحميل الصور */
    /* ====================== */

    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('load', function () {
            // إزالة مؤشر التحميل عند تحميل الصورة
            const loader = this.parentElement.querySelector('.image-loader');
            if (loader) {
                loader.style.display = 'none';
            }
        });

        img.addEventListener('error', function () {
            // عرض صورة بديلة في حالة فشل التحميل
            this.src = 'images/placeholder.jpg';
            console.log('فشل تحميل الصورة:', this.src);
        });
    });

    /* ====================== */
    /* 11. وظيفة التأثيرات البصرية */
    /* ====================== */

    // تأثير تكبير الصور عند المرور عليها
    const zoomableImages = document.querySelectorAll('.service-image img, .portfolio-item img');

    zoomableImages.forEach(img => {
        img.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });

        img.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });

    /* ====================== */
    /* 12. وظيفة تغيير لون الهيدر عند التمرير */
    /* ====================== */

    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(13, 59, 102, 0.95)';
                header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.backgroundColor = '';
                header.style.boxShadow = '';
            }
        });
    }

    /* ====================== */
    /* 13. وظيفة حساب الوقت المتبقي لعرض عروض محددة */
    /* ====================== */

    const countdownElements = document.querySelectorAll('.countdown-timer');

    countdownElements.forEach(countdown => {
        const endTime = new Date(countdown.getAttribute('data-end-time')).getTime();

        const updateCountdown = function () {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                countdown.innerHTML = 'العرض انتهى';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdown.innerHTML = `${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`;
        };

        // تحديث العداد كل ثانية
        updateCountdown();
        setInterval(updateCountdown, 1000);
    });

    /* ====================== */
    /* 14. وظيفة إضافة إلى المفضلة (إذا كانت موجودة) */
    /* ====================== */

    const favoriteButtons = document.querySelectorAll('.favorite-btn');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('favorited');

            if (this.classList.contains('favorited')) {
                this.innerHTML = '❤️ المفضلة';
                alert('تمت إضافة الخدمة إلى المفضلة!');
            } else {
                this.innerHTML = '♡ المفضلة';
            }
        });
    });

    /* ====================== */
    /* 15. وظيفة التأثيرات على أزرار التواصل */
    /* ====================== */

    const contactButtons = document.querySelectorAll('.btn-call, .btn-wts, .floating-call, .floating-whatsapp');

    contactButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // إضافة تأثير النقر
            this.style.transform = 'scale(0.95)';

            // استعادة الحجم بعد 100ms
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });

    /* ====================== */
    /* 16. وظيفة التأثيرات على أزرار الخدمة */
    /* ====================== */

    const serviceButtons = document.querySelectorAll('.btn-sm, .btn-primary');

    serviceButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // إضافة تأثير النقر
            this.style.transform = 'scale(0.95)';

            // استعادة الحجم بعد 100ms
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });

    /* ====================== */
    /* 17. وظيفة التأثيرات على أزرار المشاريع */
    /* ====================== */

    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // تجنب التأثير على الروابط داخل العنصر
            if (e.target.tagName !== 'A' && e.target.tagName !== 'IMG') {
                // إضافة تأثير النقر
                this.style.transform = 'scale(0.98)';

                // استعادة الحجم بعد 100ms
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            }
        });
    });

    /* ====================== */
    /* 18. وظيفة التأثيرات على أزرار الخدمات */
    /* ====================== */

    const serviceCards = document.querySelectorAll('.service-card, .feature-item');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    /* ====================== */
    /* 19. وظيفة التأثيرات على أزرار التواصل العائمة */
    /* ====================== */

    const floatingButtons = document.querySelectorAll('.floating-call, .floating-whatsapp');

    floatingButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    /* ====================== */
    /* 20. وظيفة التأثيرات على أزرار القائمة */
    /* ====================== */

    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.color = '#f95738';
        });

        link.addEventListener('mouseleave', function () {
            if (!this.classList.contains('active')) {
                this.style.color = 'white';
            }
        });
    });

    /* ====================== */
    /* 21. وظيفة التأثيرات على أزرار التواصل في الهيدر */
    /* ====================== */

    const headerContactButtons = document.querySelectorAll('.btn-call, .btn-wts');

    headerContactButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    /* ====================== */
    /* 22. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const detailButtons = document.querySelectorAll('.btn-sm');

    detailButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.backgroundColor = '#e04a2f';
        });

        button.addEventListener('mouseleave', function () {
            this.style.backgroundColor = '';
        });
    });

    /* ====================== */
    /* 23. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const primaryButtons = document.querySelectorAll('.btn-primary');

    primaryButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.backgroundColor = '#e04a2f';
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.backgroundColor = '';
            this.style.transform = '';
        });
    });

    /* ====================== */
    /* 24. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const secondaryButtons = document.querySelectorAll('.btn-secondary');

    secondaryButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.backgroundColor = 'white';
            this.style.color = '#0d3b66';
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.backgroundColor = '';
            this.style.color = '';
            this.style.transform = '';
        });
    });

    /* ====================== */
    /* 25. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');

    whatsappButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.backgroundColor = '#128C7E';
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.backgroundColor = '';
            this.style.transform = '';
        });
    });

    /* ====================== */
    /* 26. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const callButtons = document.querySelectorAll('.btn-call');

    callButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.backgroundColor = '#1565c0';
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.backgroundColor = '';
            this.style.transform = '';
        });
    });

    /* ====================== */
    /* 27. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const showMoreButton = document.getElementById('showMoreBtn');

    if (showMoreButton) {
        showMoreButton.addEventListener('mouseenter', function () {
            this.style.backgroundColor = '#e04a2f';
            this.style.transform = 'translateY(-2px)';
        });

        showMoreButton.addEventListener('mouseleave', function () {
            this.style.backgroundColor = '';
            this.style.transform = '';
        });
    }

    /* ====================== */
    /* 28. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const portfolioOverlay = document.querySelectorAll('.portfolio-overlay');

    portfolioOverlay.forEach(overlay => {
        overlay.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(0)';
        });

        overlay.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(100%)';
        });
    });

    /* ====================== */
    /* 29. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const portfolioItemsHover = document.querySelectorAll('.portfolio-item');

    portfolioItemsHover.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
            }
        });

        item.addEventListener('mouseleave', function () {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(100%)';
            }
        });
    });

    /* ====================== */
    /* 30. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const featureItems = document.querySelectorAll('.feature-item');

    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    /* ====================== */
    /* 31. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const serviceCardsHover = document.querySelectorAll('.service-card');

    serviceCardsHover.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    /* ====================== */
    /* 32. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const aboutImage = document.querySelector('.about-image img');

    if (aboutImage) {
        aboutImage.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.03)';
        });

        aboutImage.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    }

    /* ====================== */
    /* 33. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const ctaSection = document.querySelector('.cta-section');

    if (ctaSection) {
        ctaSection.addEventListener('mouseenter', function () {
            this.style.background = 'linear-gradient(135deg, #0a2d4f 0%, #153f5c 100%)';
        });

        ctaSection.addEventListener('mouseleave', function () {
            this.style.background = 'linear-gradient(135deg, #0d3b66 0%, #1a5276 100%)';
        });
    }

    /* ====================== */
    /* 34. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const ctaButtons = document.querySelectorAll('.contact-methods .btn-call, .contact-methods .btn-whatsapp');

    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    /* ====================== */
    /* 35. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const footerSocialIcons = document.querySelectorAll('.social-icons img');

    footerSocialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        icon.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    /* ====================== */
    /* 36. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const footerServicesLinks = document.querySelectorAll('.footer-services a');

    footerServicesLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.color = '#f95738';
            this.style.opacity = '1';
        });

        link.addEventListener('mouseleave', function () {
            this.style.color = 'white';
            this.style.opacity = '0.8';
        });
    });

    /* ====================== */
    /* 37. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const heroButtons = document.querySelectorAll('.hero-buttons a');

    heroButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    /* ====================== */
    /* 38. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        heroSection.addEventListener('mousemove', function (e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

            this.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        heroSection.addEventListener('mouseenter', function () {
            this.style.transition = 'none';
        });

        heroSection.addEventListener('mouseleave', function () {
            this.style.transition = 'transform 0.5s ease';
            this.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }

    /* ====================== */
    /* 39. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const logo = document.querySelector('.logo img');

    if (logo) {
        logo.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });

        logo.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    }

    /* ====================== */
    /* 40. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const headerContainer = document.querySelector('header .container');

    if (headerContainer) {
        headerContainer.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });

        headerContainer.addEventListener('mouseleave', function () {
            this.style.boxShadow = '';
        });
    }

    /* ====================== */
    /* 41. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const headerElements = document.querySelectorAll('header h1, header nav, header .contact-options');

    headerElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            this.style.opacity = '0.9';
        });

        element.addEventListener('mouseleave', function () {
            this.style.opacity = '1';
        });
    });

    /* ====================== */
    /* 42. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const footerContainer = document.querySelector('footer .container');

    if (footerContainer) {
        footerContainer.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 -5px 15px rgba(0, 0, 0, 0.1)';
        });

        footerContainer.addEventListener('mouseleave', function () {
            this.style.boxShadow = '';
        });
    }

    /* ====================== */
    /* 43. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const footerElements = document.querySelectorAll('footer .footer-about, footer .footer-contact, footer .footer-services');

    footerElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        element.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    /* ====================== */
    /* 44. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const footerBottom = document.querySelector('.footer-bottom');

    if (footerBottom) {
        footerBottom.addEventListener('mouseenter', function () {
            this.style.opacity = '0.9';
        });

        footerBottom.addEventListener('mouseleave', function () {
            this.style.opacity = '0.7';
        });
    }

    /* ====================== */
    /* 45. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const portfolioGrid = document.querySelector('.portfolio-grid');

    if (portfolioGrid) {
        portfolioGrid.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.1)';
            this.style.borderRadius = '15px';
        });

        portfolioGrid.addEventListener('mouseleave', function () {
            this.style.boxShadow = '';
            this.style.borderRadius = '';
        });
    }

    /* ====================== */
    /* 46. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const servicesGrid = document.querySelector('.services-grid');

    if (servicesGrid) {
        servicesGrid.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.1)';
            this.style.borderRadius = '15px';
        });

        servicesGrid.addEventListener('mouseleave', function () {
            this.style.boxShadow = '';
            this.style.borderRadius = '';
        });
    }

    /* ====================== */
    /* 47. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const aboutPreview = document.querySelector('.about-preview');

    if (aboutPreview) {
        aboutPreview.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.1)';
            this.style.borderRadius = '15px';
        });

        aboutPreview.addEventListener('mouseleave', function () {
            this.style.boxShadow = '';
            this.style.borderRadius = '';
        });
    }

    /* ====================== */
    /* 48. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const ctaSectionElement = document.querySelector('.cta-section');

    if (ctaSectionElement) {
        ctaSectionElement.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.1)';
            this.style.borderRadius = '15px';
        });

        ctaSectionElement.addEventListener('mouseleave', function () {
            this.style.boxShadow = '';
            this.style.borderRadius = '';
        });
    }

    /* ====================== */
    /* 49. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const featuresSection = document.querySelector('.features');

    if (featuresSection) {
        featuresSection.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.1)';
            this.style.borderRadius = '15px';
        });

        featuresSection.addEventListener('mouseleave', function () {
            this.style.boxShadow = '';
            this.style.borderRadius = '';
        });
    }

    /* ====================== */
    /* 50. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const servicesSection = document.querySelector('.services-section');

    if (servicesSection) {
        servicesSection.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.1)';
            this.style.borderRadius = '15px';
        });

        servicesSection.addEventListener('mouseleave', function () {
            this.style.boxShadow = '';
            this.style.borderRadius = '';
        });
    }

    /* ====================== */
    /* 51. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const heroSectionElement = document.querySelector('.hero');

    if (heroSectionElement) {
        heroSectionElement.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.2)';
        });

        heroSectionElement.addEventListener('mouseleave', function () {
            this.style.boxShadow = '';
        });
    }

    /* ====================== */
    /* 52. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const allSections = document.querySelectorAll('section');

    allSections.forEach(section => {
        section.addEventListener('mouseenter', function () {
            this.style.zIndex = '10';
        });

        section.addEventListener('mouseleave', function () {
            this.style.zIndex = '';
        });
    });

    /* ====================== */
    /* 53. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const allCards = document.querySelectorAll('.service-card, .feature-item, .portfolio-item');

    allCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.zIndex = '20';
        });

        card.addEventListener('mouseleave', function () {
            this.style.zIndex = '';
        });
    });

    /* ====================== */
    /* 54. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const allButtons = document.querySelectorAll('button, a');

    allButtons.forEach(button => {
        button.addEventListener('mousedown', function () {
            this.style.transform = 'scale(0.98)';
        });

        button.addEventListener('mouseup', function () {
            this.style.transform = '';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    /* ====================== */
    /* 55. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const allLinks = document.querySelectorAll('a');

    allLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.href && this.href.startsWith('#')) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 80;
                    const offsetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ====================== */
    /* 56. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const allImages = document.querySelectorAll('img');

    allImages.forEach(img => {
        img.addEventListener('dragstart', function (e) {
            e.preventDefault();
        });
    });

    /* ====================== */
    /* 57. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const allText = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');

    allText.forEach(text => {
        text.addEventListener('selectstart', function (e) {
            e.preventDefault();
        });
    });

    /* ====================== */
    /* 58. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const allInputs = document.querySelectorAll('input, textarea, select');

    allInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.borderColor = '#f95738';
            this.style.boxShadow = '0 0 0 2px rgba(249, 87, 56, 0.2)';
        });

        input.addEventListener('blur', function () {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = '';
        });
    });

    /* ====================== */
    /* 59. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const allForms = document.querySelectorAll('form');

    allForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#f95738';
                    field.style.boxShadow = '0 0 0 2px rgba(249, 87, 56, 0.2)';
                } else {
                    field.style.borderColor = '#ddd';
                    field.style.boxShadow = '';
                }
            });

            if (isValid) {
                // هنا يمكنك إضافة كود إرسال النموذج
                console.log('النموذج صالح للإرسال');
            } else {
                alert('يرجى ملء جميع الحقول المطلوبة');
            }
        });
    });

    /* ====================== */
    /* 60. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-theme');
            this.textContent = document.body.classList.contains('dark-theme') ? 'الوضع النهاري' : 'الوضع الليلي';
        });
    }

    /* ====================== */
    /* 61. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const languageToggle = document.getElementById('languageToggle');

    if (languageToggle) {
        languageToggle.addEventListener('click', function () {
            const currentLang = document.documentElement.lang;
            document.documentElement.lang = currentLang === 'ar' ? 'en' : 'ar';
            this.textContent = currentLang === 'ar' ? 'English' : 'العربية';
        });
    }

    /* ====================== */
    /* 62. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ====================== */
    /* 63. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const cookieConsent = document.getElementById('cookieConsent');

    if (cookieConsent) {
        const acceptCookies = document.getElementById('acceptCookies');

        if (acceptCookies) {
            acceptCookies.addEventListener('click', function () {
                cookieConsent.style.display = 'none';
                localStorage.setItem('cookiesAccepted', 'true');
            });
        }

        // التحقق من قبول ملفات تعريف الارتباط
        if (localStorage.getItem('cookiesAccepted') === 'true') {
            cookieConsent.style.display = 'none';
        }
    }

    /* ====================== */
    /* 64. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('newsletterEmail').value;

            if (email && email.includes('@')) {
                alert('تم الاشتراك في النشرة الإخبارية بنجاح!');
                newsletterForm.reset();
            } else {
                alert('يرجى إدخال بريد إلكتروني صحيح');
            }
        });
    }

    /* ====================== */
    /* 65. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const shareButtons = document.querySelectorAll('.share-btn');

    shareButtons.forEach(button => {
        button.addEventListener('click', function () {
            const pageUrl = encodeURIComponent(window.location.href);
            const pageTitle = encodeURIComponent(document.title);

            let shareUrl = '';

            switch (this.dataset.platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${pageTitle}%20${pageUrl}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
                    break;
            }

            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });

    /* ====================== */
    /* 66. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const zoomButtons = document.querySelectorAll('.zoom-btn');

    zoomButtons.forEach(button => {
        button.addEventListener('click', function () {
            const image = this.parentElement.querySelector('img');
            image.style.transform = image.style.transform === 'scale(1.5)' ? 'scale(1)' : 'scale(1.5)';
            this.textContent = image.style.transform === 'scale(1.5)' ? 'تصغير' : 'تكبير';
        });
    });

    /* ====================== */
    /* 67. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // إزالة الفئة النشطة من جميع الأزرار واللوحات
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // إضافة الفئة النشطة للزر واللوحة المحددة
            this.classList.add('active');
            const panelId = this.getAttribute('data-tab');
            document.getElementById(panelId).classList.add('active');
        });
    });

    /* ====================== */
    /* 68. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', function () {
            item.classList.toggle('active');

            const content = item.querySelector('.accordion-content');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    /* ====================== */
    /* 69. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('carouselPrev');
    const nextButton = document.getElementById('carouselNext');
    let currentSlide = 0;

    if (carouselItems.length > 0) {
        const showSlide = function (n) {
            carouselItems.forEach(item => item.style.display = 'none');
            carouselItems[n].style.display = 'block';
        };

        const nextSlide = function () {
            currentSlide = (currentSlide + 1) % carouselItems.length;
            showSlide(currentSlide);
        };

        const prevSlide = function () {
            currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
            showSlide(currentSlide);
        };

        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }

        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }

        // بدء العرض الآلي
        setInterval(nextSlide, 5000);

        // عرض الشريحة الأولى
        showSlide(currentSlide);
    }

    /* ====================== */
    /* 70. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const ratingStars = document.querySelectorAll('.rating-star');

    ratingStars.forEach(star => {
        star.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            const container = this.parentElement;

            // تحديث القيمة
            container.setAttribute('data-rating', value);

            // تحديث عرض النجوم
            ratingStars.forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= value) {
                    s.classList.add('filled');
                } else {
                    s.classList.remove('filled');
                }
            });

            // هنا يمكنك إرسال القيمة إلى الخادم
            console.log(`تم التقييم: ${value} نجوم`);
        });

        star.addEventListener('mouseenter', function () {
            const value = this.getAttribute('data-value');

            ratingStars.forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= value) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });

        star.parentElement.addEventListener('mouseleave', function () {
            ratingStars.forEach(s => {
                s.classList.remove('hover');
            });
        });
    });

    /* ====================== */
    /* 71. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function () {
            priceValue.textContent = this.value + ' ريال';
        });
    }

    /* ====================== */
    /* 72. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const serviceFilter = document.getElementById('serviceFilter');

    if (serviceFilter) {
        serviceFilter.addEventListener('change', function () {
            const filter = this.value;
            const services = document.querySelectorAll('.service-card, .feature-item');

            services.forEach(service => {
                if (filter === 'all' || service.getAttribute('data-category') === filter) {
                    service.style.display = 'block';
                } else {
                    service.style.display = 'none';
                }
            });
        });
    }

    /* ====================== */
    /* 73. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const scrollToTop = document.getElementById('scrollToTop');

    if (scrollToTop) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                scrollToTop.style.display = 'block';
            } else {
                scrollToTop.style.display = 'none';
            }
        });

        scrollToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ====================== */
    /* 74. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenu) {
        const menuToggle = document.getElementById('menuToggle');

        if (menuToggle) {
            menuToggle.addEventListener('click', function () {
                mobileMenu.classList.toggle('active');
                this.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
            });
        }

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function (e) {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    }

    /* ====================== */
    /* 75. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const searchButton = document.getElementById('searchButton');
    const searchBox = document.getElementById('searchBox');

    if (searchButton && searchBox) {
        searchButton.addEventListener('click', function () {
            searchBox.style.display = searchBox.style.display === 'block' ? 'none' : 'block';
            if (searchBox.style.display === 'block') {
                searchBox.focus();
            }
        });
    }

    /* ====================== */
    /* 76. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const modalButtons = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    modalButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    /* ====================== */
    /* 77. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const videoThumbnails = document.querySelectorAll('.video-thumbnail');

    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const videoId = this.getAttribute('data-video');
            const videoPlayer = this.nextElementSibling;

            if (videoPlayer) {
                videoPlayer.style.display = 'block';
                this.style.display = 'none';

                // هنا يمكنك إضافة كود لبدء تشغيل الفيديو
                console.log(`بدء تشغيل الفيديو: ${videoId}`);
            }
        });
    });

    /* ====================== */
    /* 78. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */
    // إظهار العناصر تدريجيًا عند التحميل والتمرير
    document.addEventListener('DOMContentLoaded', function () {
        const galleryItems = document.querySelectorAll('.gallery-item');

        // تأكد من وجود عناصر قبل المتابعة
        if (!galleryItems.length) return;

        // دالة لفحص العناصر المرئية
        function checkVisibleItems() {
            const windowHeight = window.innerHeight;
            galleryItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                if (
                    rect.top < windowHeight * 0.8 &&   // يظهر عندما تدخل الصورة 80% في الشاشة
                    rect.bottom > 0 &&
                    !item.classList.contains('visible')
                ) {
                    item.classList.add('visible');
                }
            });
        }

        // فحص العناصر عند التحميل
        checkVisibleItems();

        // فحص العناصر عند التمرير
        window.addEventListener('scroll', checkVisibleItems);
    });
    const imageGallery = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('galleryModal');
    const galleryImage = document.getElementById('galleryImage');

    if (imageGallery.length > 0 && galleryModal && galleryImage) {
        imageGallery.forEach(item => {
            item.addEventListener('click', function () {
                const imgSrc = this.querySelector('img').src;
                galleryImage.src = imgSrc;
                galleryModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        galleryModal.addEventListener('click', function (e) {
            if (e.target === galleryModal) {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    /* ====================== */
    /* 79. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const notificationBell = document.getElementById('notificationBell');
    const notificationDropdown = document.getElementById('notificationDropdown');

    if (notificationBell && notificationDropdown) {
        notificationBell.addEventListener('click', function (e) {
            e.stopPropagation();
            notificationDropdown.style.display = notificationDropdown.style.display === 'block' ? 'none' : 'block';
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function (e) {
            if (!notificationDropdown.contains(e.target) && !notificationBell.contains(e.target)) {
                notificationDropdown.style.display = 'none';
            }
        });
    }

    /* ====================== */
    /* 80. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const chatButton = document.getElementById('chatButton');
    const chatBox = document.getElementById('chatBox');

    if (chatButton && chatBox) {
        chatButton.addEventListener('click', function () {
            chatBox.style.display = chatBox.style.display === 'block' ? 'none' : 'block';
        });

        // إغلاق مربع الدردشة عند النقر على زر الإغلاق
        const closeChat = document.getElementById('closeChat');
        if (closeChat) {
            closeChat.addEventListener('click', function () {
                chatBox.style.display = 'none';
            });
        }
    }

    /* ====================== */
    /* 81. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const progressBar = document.querySelector('.progress-bar');

    if (progressBar) {
        const updateProgress = function () {
            const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrollPercentage + '%';
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress(); // استدعاء الدالة عند التحميل
    }

    /* ====================== */
    /* 82. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const colorSchemeToggle = document.getElementById('colorSchemeToggle');

    if (colorSchemeToggle) {
        colorSchemeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-theme');
            this.textContent = document.body.classList.contains('dark-theme') ? 'الوضع النهاري' : 'الوضع الليلي';

            // حفظ التفضيل في localStorage
            localStorage.setItem('colorScheme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });

        // تحميل التفضيل المحفوظ
        const savedScheme = localStorage.getItem('colorScheme');
        if (savedScheme === 'dark') {
            document.body.classList.add('dark-theme');
            colorSchemeToggle.textContent = 'الوضع النهاري';
        }
    }

    /* ====================== */
    /* 83. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const fontIncrease = document.getElementById('fontIncrease');
    const fontDecrease = document.getElementById('fontDecrease');

    if (fontIncrease && fontDecrease) {
        fontIncrease.addEventListener('click', function () {
            const currentFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            document.documentElement.style.fontSize = (currentFontSize + 2) + 'px';
        });

        fontDecrease.addEventListener('click', function () {
            const currentFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            document.documentElement.style.fontSize = (currentFontSize - 2) + 'px';
        });
    }

    /* ====================== */
    /* 84. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const contrastToggle = document.getElementById('contrastToggle');

    if (contrastToggle) {
        contrastToggle.addEventListener('click', function () {
            document.body.classList.toggle('high-contrast');
            this.textContent = document.body.classList.contains('high-contrast') ? 'الوضع العادي' : 'الوضع عالي التباين';

            // حفظ التفضيل في localStorage
            localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
        });

        // تحميل التفضيل المحفوظ
        if (localStorage.getItem('highContrast') === 'true') {
            document.body.classList.add('high-contrast');
            contrastToggle.textContent = 'الوضع العادي';
        }
    }

    /* ====================== */
    /* 85. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const languageSelector = document.getElementById('languageSelector');

    if (languageSelector) {
        languageSelector.addEventListener('change', function () {
            const selectedLang = this.value;
            document.documentElement.lang = selectedLang;

            // هنا يمكنك إضافة كود لتغيير النصوص إلى اللغة المحددة
            console.log(`تم تغيير اللغة إلى: ${selectedLang}`);
        });
    }

    /* ====================== */
    /* 86. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const themeButtons = document.querySelectorAll('.theme-btn');

    themeButtons.forEach(button => {
        button.addEventListener('click', function () {
            // إزالة الفئة النشطة من جميع الأزرار
            themeButtons.forEach(btn => btn.classList.remove('active'));

            // إضافة الفئة النشطة للزر المحدد
            this.classList.add('active');

            // تغيير السمة بناءً على الزر المحدد
            const theme = this.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', theme);

            // حفظ التفضيل في localStorage
            localStorage.setItem('theme', theme);
        });
    });

    // تحميل السمة المحفوظة
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        const activeButton = document.querySelector(`.theme-btn[data-theme="${savedTheme}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }

    /* ====================== */
    /* 87. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const accessibilityMenuToggle = document.getElementById('accessibilityMenuToggle');
    const accessibilityMenu = document.getElementById('accessibilityMenu');

    if (accessibilityMenuToggle && accessibilityMenu) {
        accessibilityMenuToggle.addEventListener('click', function () {
            accessibilityMenu.style.display = accessibilityMenu.style.display === 'block' ? 'none' : 'block';
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function (e) {
            if (!accessibilityMenu.contains(e.target) && !accessibilityMenuToggle.contains(e.target)) {
                accessibilityMenu.style.display = 'none';
            }
        });
    }

    /* ====================== */
    /* 88. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const textToSpeechButton = document.getElementById('textToSpeech');

    if (textToSpeechButton) {
        textToSpeechButton.addEventListener('click', function () {
            const text = document.body.innerText;

            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'ar-SA';
                speechSynthesis.speak(utterance);

                this.textContent = 'إيقاف القراءة';
                this.classList.add('speaking');

                utterance.onend = () => {
                    this.textContent = 'قراءة النص';
                    this.classList.remove('speaking');
                };
            } else {
                alert('متصفحك لا يدعم ميزة تحويل النص إلى كلام');
            }
        });
    }

    /* ====================== */
    /* 89. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const printButton = document.getElementById('printButton');

    if (printButton) {
        printButton.addEventListener('click', function () {
            window.print();
        });
    }

    /* ====================== */
    /* 90. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const pdfDownload = document.getElementById('pdfDownload');

    if (pdfDownload) {
        pdfDownload.addEventListener('click', function () {
            // هنا يمكنك إضافة كود لتنزيل PDF
            alert('سيتم إضافة ميزة تنزيل PDF قريبًا');
        });
    }

    /* ====================== */
    /* 91. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const socialShare = document.getElementById('socialShare');

    if (socialShare) {
        socialShare.addEventListener('click', function () {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                }).catch(console.error);
            } else {
                // طريقة بديلة لمشاركة المحتوى
                const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(document.title)} ${encodeURIComponent(window.location.href)}`;
                window.open(shareUrl, '_blank');
            }
        });
    }

    /* ====================== */
    /* 92. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const liveChat = document.getElementById('liveChat');

    if (liveChat) {
        liveChat.addEventListener('click', function () {
            // هنا يمكنك إضافة كود لفتح نافذة الدردشة الحية
            alert('سيتم فتح نافذة الدردشة الحية قريبًا');
        });
    }

    /* ====================== */
    /* 93. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const whatsappFloating = document.querySelector('.floating-whatsapp');
    const callFloating = document.querySelector('.floating-call');

    if (whatsappFloating && callFloating) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                whatsappFloating.style.animation = '';
                callFloating.style.animation = '';
            } else {
                whatsappFloating.style.animation = 'pulse 2s infinite';
                callFloating.style.animation = 'pulse-call 2s infinite';
            }
        });
    }

    /* ====================== */
    /* 94. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ====================== */
    /* 95. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;

    if (testimonialDots.length > 0) {
        const showTestimonial = function (n) {
            testimonials.forEach(testimonial => testimonial.style.display = 'none');
            testimonialDots.forEach(dot => dot.classList.remove('active'));

            testimonials[n].style.display = 'block';
            testimonialDots[n].classList.add('active');
            currentTestimonial = n;
        };

        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function () {
                showTestimonial(index);
            });
        });

        // عرض الشهادة الأولى
        showTestimonial(currentTestimonial);

        // الانتقال التلقائي بين الشهادات
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    /* ====================== */
    /* 96. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const serviceCategories = document.querySelectorAll('.service-category');

    serviceCategories.forEach(category => {
        category.addEventListener('click', function () {
            // إزالة الفئة النشطة من جميع الفئات
            serviceCategories.forEach(cat => cat.classList.remove('active'));

            // إضافة الفئة النشطة للفئة المحددة
            this.classList.add('active');

            // عرض الخدمات المقابلة
            const categoryType = this.getAttribute('data-category');
            const services = document.querySelectorAll('.service-card, .feature-item');

            services.forEach(service => {
                if (categoryType === 'all' || service.getAttribute('data-category') === categoryType) {
                    service.style.display = 'block';
                } else {
                    service.style.display = 'none';
                }
            });
        });
    });

    /* ====================== */
    /* 97. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const portfolioCategories = document.querySelectorAll('.portfolio-category');

    portfolioCategories.forEach(category => {
        category.addEventListener('click', function () {
            // إزالة الفئة النشطة من جميع الفئات
            portfolioCategories.forEach(cat => cat.classList.remove('active'));

            // إضافة الفئة النشطة للفئة المحددة
            this.classList.add('active');

            // عرض المشاريع المقابلة
            const categoryType = this.getAttribute('data-category');
            const projects = document.querySelectorAll('.portfolio-item');

            projects.forEach(project => {
                if (categoryType === 'all' || project.getAttribute('data-category') === categoryType) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    /* ====================== */
    /* 98. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const formInputs = document.querySelectorAll('input, textarea');

    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // تحقق من القيم المدخلة
        input.addEventListener('input', function () {
            if (this.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.setCustomValidity('يرجى إدخال بريد إلكتروني صحيح');
                } else {
                    this.setCustomValidity('');
                }
            }

            if (this.type === 'tel') {
                const phoneRegex = /^[\d+\s()-]{7,}$/;
                if (this.value && !phoneRegex.test(this.value)) {
                    this.setCustomValidity('يرجى إدخال رقم هاتف صحيح');
                } else {
                    this.setCustomValidity('');
                }
            }
        });
    });

    /* ====================== */
    /* 99. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const passwordToggle = document.querySelectorAll('.password-toggle');

    passwordToggle.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const passwordField = this.previousElementSibling;
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                this.textContent = 'إخفاء';
            } else {
                passwordField.type = 'password';
                this.textContent = 'إظهار';
            }
        });
    });

    /* ====================== */
    /* 100. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const countdownTimers = document.querySelectorAll('.countdown-timer');

    countdownTimers.forEach(timer => {
        const endTime = new Date(timer.getAttribute('data-end-time')).getTime();

        const updateTimer = function () {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                timer.innerHTML = 'العرض انتهى';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timer.innerHTML = `${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`;
        };

        // تحديث العداد كل ثانية
        updateTimer();
        setInterval(updateTimer, 1000);
    });

    /* ====================== */
    /* 101. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const lazyImages = document.querySelectorAll('img.lazy');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // طريقة بديلة للتنزيل البطيء (Lazy Loading)
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }

    /* ====================== */
    /* 102. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', function () {
        const scrollPosition = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed') || 0.5);
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });

    /* ====================== */
    /* 103. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const notificationCount = document.getElementById('notificationCount');

    if (notificationCount) {
        // مثال على تحديث عدد الإشعارات
        setTimeout(() => {
            notificationCount.textContent = '3';
            notificationCount.style.display = 'flex';
        }, 3000);
    }

    /* ====================== */
    /* 104. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const itemName = this.getAttribute('data-name');
            const itemPrice = this.getAttribute('data-price');

            // إضافة العنصر إلى سلة التسوق
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ name: itemName, price: itemPrice });
            localStorage.setItem('cart', JSON.stringify(cart));

            // تحديث عرض سلة التسوق
            const cartCount = document.getElementById('cartCount');
            if (cartCount) {
                cartCount.textContent = cart.length;
                cartCount.style.display = 'flex';
            }

            // عرض رسالة تأكيد
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.textContent = `تمت إضافة ${itemName} إلى السلة!`;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 3000);
        });
    });

    /* ====================== */
    /* 105. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const cartCount = document.getElementById('cartCount');

    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.length;
        if (cart.length > 0) {
            cartCount.style.display = 'flex';
        }
    }

    /* ====================== */
    /* 106. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const searchInputField = document.getElementById('searchInput');

    if (searchInputField) {
        searchInputField.addEventListener('keyup', function (e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    // هنا يمكنك إضافة كود للبحث
                    console.log(`جارٍ البحث عن: ${searchTerm}`);
                    // مثال: window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }

    /* ====================== */
    /* 107. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const scrollToSection = document.querySelectorAll('a[href^="#"]');

    scrollToSection.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 80;
                const offsetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ====================== */
    /* 108. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            if (href === '#') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 80;
                const offsetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ====================== */
    /* 109. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const formValidation = document.querySelectorAll('form[data-validate="true"]');

    formValidation.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;

            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }

                if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (field.value && !emailRegex.test(field.value)) {
                        isValid = false;
                        field.classList.add('is-invalid');
                    }
                }

                if (field.type === 'tel') {
                    const phoneRegex = /^[\d+\s()-]{7,}$/;
                    if (field.value && !phoneRegex.test(field.value)) {
                        isValid = false;
                        field.classList.add('is-invalid');
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('يرجى ملء جميع الحقول المطلوبة بشكل صحيح');
            }
        });
    });

    /* ====================== */
    /* 110. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const themeSwitcher = document.getElementById('themeSwitcher');

    if (themeSwitcher) {
        themeSwitcher.addEventListener('change', function () {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });

        // تحميل السمة المحفوظة
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeSwitcher.checked = true;
        }
    }

    /* ====================== */
    /* 111. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const cookieBanner = document.getElementById('cookieBanner');

    if (cookieBanner) {
        const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');

        if (acceptCookiesBtn) {
            acceptCookiesBtn.addEventListener('click', function () {
                cookieBanner.style.display = 'none';
                localStorage.setItem('cookiesAccepted', 'true');
            });
        }

        // عرض بنر ملفات تعريف الارتباط إذا لم يتم قبوله مسبقًا
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieBanner.style.display = 'block';
        }
    }

    /* ====================== */
    /* 112. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const newsletterFormElement = document.getElementById('newsletterForm');

    if (newsletterFormElement) {
        newsletterFormElement.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(email)) {
                    // هنا يمكنك إضافة كود لإرسال البريد الإلكتروني
                    alert('تم الاشتراك في النشرة الإخبارية بنجاح!');
                    this.reset();
                } else {
                    alert('يرجى إدخال بريد إلكتروني صحيح');
                    emailInput.focus();
                }
            } else {
                alert('يرجى إدخال بريد إلكتروني');
                emailInput.focus();
            }
        });
    }

    /* ====================== */
    /* 113. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const shareButtonsElements = document.querySelectorAll('[data-share]');

    shareButtonsElements.forEach(button => {
        button.addEventListener('click', function () {
            const platform = this.getAttribute('data-share');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);

            let shareUrl = '';

            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${title}%20${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${title}&body=${url}`;
                    break;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    /* ====================== */
    /* 114. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const backToTopButtonElement = document.getElementById('backToTop');

    if (backToTopButtonElement) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButtonElement.style.display = 'block';
            } else {
                backToTopButtonElement.style.display = 'none';
            }
        });

        backToTopButtonElement.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ====================== */
    /* 115. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenuElement = document.getElementById('mobileMenu');

    if (mobileMenuButton && mobileMenuElement) {
        mobileMenuButton.addEventListener('click', function () {
            mobileMenuElement.classList.toggle('active');
            this.textContent = mobileMenuElement.classList.contains('active') ? '✕' : '☰';
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function (e) {
            if (!mobileMenuElement.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenuElement.classList.remove('active');
                mobileMenuButton.textContent = '☰';
            }
        });
    }

    /* ====================== */
    /* 116. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const testimonialSlider = document.querySelector('.testimonial-slider');

    if (testimonialSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialSlider.classList.add('active');
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });

        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialSlider.classList.remove('active');
        });

        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
            testimonialSlider.classList.remove('active');
        });

        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
    }

    /* ====================== */
    /* 117. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceTabPanes = document.querySelectorAll('.service-tab-pane');

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // إزالة الفئة النشطة من جميع الأزرار
            serviceTabs.forEach(t => t.classList.remove('active'));

            // إضافة الفئة النشطة للزر المحدد
            this.classList.add('active');

            // إخفاء جميع الألواح
            serviceTabPanes.forEach(pane => pane.classList.remove('active'));

            // عرض اللوحة المطلوبة
            const paneId = this.getAttribute('data-tab');
            document.getElementById(paneId).classList.add('active');
        });
    });

    /* ====================== */
    /* 118. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            item.classList.toggle('active');

            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    /* ====================== */
    /* 119. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const priceSliders = document.querySelectorAll('.price-slider');

    priceSliders.forEach(slider => {
        const priceValue = slider.nextElementSibling;
        const minValue = parseInt(slider.min);
        const maxValue = parseInt(slider.max);

        slider.addEventListener('input', function () {
            const value = (this.value - minValue) / (maxValue - minValue) * 100;
            this.style.background = `linear-gradient(to right, #f95738 0%, #f95738 ${value}%, #ddd ${value}%, #ddd 100%)`;

            if (priceValue) {
                priceValue.textContent = `${this.value} ريال`;
            }
        });

        // تعيين القيمة الافتراضية
        slider.dispatchEvent(new Event('input'));
    });

    /* ====================== */
    /* 120. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const imageComparisons = document.querySelectorAll('.image-comparison');

    imageComparisons.forEach(comparison => {
        const slider = comparison.querySelector('.image-comparison-slider');
        const beforeImage = comparison.querySelector('.image-comparison-before');

        slider.addEventListener('mousedown', function (e) {
            e.preventDefault();
            comparison.classList.add('dragging');
        });

        document.addEventListener('mousemove', function (e) {
            if (!comparison.classList.contains('dragging')) return;

            const rect = comparison.getBoundingClientRect();
            let x = e.clientX - rect.left;

            // الحد من الموضع داخل المقارنة
            x = Math.max(0, Math.min(x, rect.width));

            // تحديث موضع الشريحة
            slider.style.left = `${x}px`;
            beforeImage.style.width = `${x / rect.width * 100}%`;
        });

        document.addEventListener('mouseup', function () {
            comparison.classList.remove('dragging');
        });
    });

    /* ====================== */
    /* 121. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const videoPlayers = document.querySelectorAll('.video-player');

    videoPlayers.forEach(player => {
        const playButton = player.querySelector('.play-button');
        const video = player.querySelector('video');

        playButton.addEventListener('click', function () {
            video.play();
            player.classList.add('playing');
            playButton.style.display = 'none';
        });

        video.addEventListener('ended', function () {
            player.classList.remove('playing');
            playButton.style.display = 'block';
        });
    });

    /* ====================== */
    /* 122. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const countdownTimersElements = document.querySelectorAll('.countdown-timer');

    countdownTimersElements.forEach(timer => {
        const endTime = new Date(timer.getAttribute('data-end-time')).getTime();

        const updateCountdown = function () {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                timer.innerHTML = 'العرض انتهى';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timer.innerHTML = `${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`;
        };

        // تحديث العداد كل ثانية
        updateCountdown();
        setInterval(updateCountdown, 1000);
    });

    /* ====================== */
    /* 123. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const parallaxSections = document.querySelectorAll('.parallax-section');

    window.addEventListener('scroll', function () {
        const scrollPosition = window.pageYOffset;

        parallaxSections.forEach(section => {
            const speed = parseFloat(section.getAttribute('data-speed') || 0.5);
            const yPos = -(scrollPosition * speed);
            section.style.backgroundPosition = `center ${yPos}px`;
        });
    });

    /* ====================== */
    /* 124. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        const items = accordion.querySelectorAll('.accordion-item');

        items.forEach(item => {
            const header = item.querySelector('.accordion-header');

            header.addEventListener('click', function () {
                // إغلاق جميع العناصر الأخرى
                items.forEach(i => {
                    if (i !== item) {
                        i.classList.remove('active');
                        const content = i.querySelector('.accordion-content');
                        content.style.maxHeight = null;
                    }
                });

                // تبديل العنصر الحالي
                item.classList.toggle('active');
                const content = item.querySelector('.accordion-content');

                if (item.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = null;
                }
            });
        });
    });

    /* ====================== */
    /* 125. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const tabs = document.querySelectorAll('.tabs');

    tabs.forEach(tabGroup => {
        const tabButtons = tabGroup.querySelectorAll('.tab-button');
        const tabPanes = tabGroup.querySelectorAll('.tab-pane');

        tabButtons.forEach(button => {
            button.addEventListener('click', function () {
                // إزالة الفئة النشطة من جميع الأزرار
                tabButtons.forEach(btn => btn.classList.remove('active'));

                // إضافة الفئة النشطة للزر المحدد
                this.classList.add('active');

                // إخفاء جميع الألواح
                tabPanes.forEach(pane => pane.classList.remove('active'));

                // عرض اللوحة المطلوبة
                const paneId = this.getAttribute('data-tab');
                document.getElementById(paneId).classList.add('active');
            });
        });
    });

    /* ====================== */
    /* 126. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const modalsElements = document.querySelectorAll('[data-modal-target]');

    modalsElements.forEach(button => {
        button.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const modalCloseButtons = document.querySelectorAll('.modal-close');

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    window.addEventListener('click', function (e) {
        const modals = document.querySelectorAll('.modal');

        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    /* ====================== */
    /* 127. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */
    // إظهار العناصر تدريجيًا عند التحميل والتمرير
    document.addEventListener('DOMContentLoaded', function () {
        const galleryItems = document.querySelectorAll('.gallery-item');

        // تأكد من وجود عناصر قبل المتابعة
        if (!galleryItems.length) return;

        // دالة لفحص العناصر المرئية
        function checkVisibleItems() {
            const windowHeight = window.innerHeight;
            galleryItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                if (
                    rect.top < windowHeight * 0.8 &&   // يظهر عندما تدخل الصورة 80% في الشاشة
                    rect.bottom > 0 &&
                    !item.classList.contains('visible')
                ) {
                    item.classList.add('visible');
                }
            });
        }

        // فحص العناصر عند التحميل
        checkVisibleItems();

        // فحص العناصر عند التمرير
        window.addEventListener('scroll', checkVisibleItems);
    });
    const imageGalleryItems = document.querySelectorAll('.gallery-item');
    const galleryModalElement = document.getElementById('gallery-modal');
    const galleryModalImage = document.getElementById('gallery-modal-image');

    if (imageGalleryItems.length > 0 && galleryModalElement && galleryModalImage) {
        imageGalleryItems.forEach(item => {
            item.addEventListener('click', function () {
                const imgSrc = this.querySelector('img').src;
                galleryModalImage.src = imgSrc;
                galleryModalElement.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        galleryModalElement.addEventListener('click', function (e) {
            if (e.target === galleryModalElement) {
                galleryModalElement.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    /* ====================== */
    /* 128. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const notificationBellElement = document.getElementById('notification-bell');
    const notificationDropdownElement = document.getElementById('notification-dropdown');

    if (notificationBellElement && notificationDropdownElement) {
        notificationBellElement.addEventListener('click', function (e) {
            e.stopPropagation();
            notificationDropdownElement.style.display = notificationDropdownElement.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', function (e) {
            if (!notificationDropdownElement.contains(e.target) && !notificationBellElement.contains(e.target)) {
                notificationDropdownElement.style.display = 'none';
            }
        });
    }

    /* ====================== */
    /* 129. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const chatToggleButton = document.getElementById('chat-toggle');
    const chatBoxElement = document.getElementById('chat-box');

    if (chatToggleButton && chatBoxElement) {
        chatToggleButton.addEventListener('click', function () {
            chatBoxElement.style.display = chatBoxElement.style.display === 'block' ? 'none' : 'block';
        });

        const chatCloseButton = document.getElementById('chat-close');
        if (chatCloseButton) {
            chatCloseButton.addEventListener('click', function () {
                chatBoxElement.style.display = 'none';
            });
        }
    }

    /* ====================== */
    /* 130. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const progressBarElement = document.querySelector('.progress-bar-fill');

    if (progressBarElement) {
        const updateProgressBar = function () {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100;
            progressBarElement.style.width = scrolled + '%';
        };

        window.addEventListener('scroll', updateProgressBar);
        updateProgressBar(); // استدعاء الدالة عند التحميل
    }

    /* ====================== */
    /* 131. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const themeToggleElement = document.getElementById('theme-toggle');

    if (themeToggleElement) {
        themeToggleElement.addEventListener('click', function () {
            document.body.classList.toggle('dark-theme');
            this.textContent = document.body.classList.contains('dark-theme') ? 'الوضع النهاري' : 'الوضع الليلي';

            // حفظ التفضيل في localStorage
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });

        // تحميل التفضيل المحفوظ
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggleElement.textContent = 'الوضع النهاري';
        }
    }

    /* ====================== */
    /* 132. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const fontIncreaseButton = document.getElementById('font-increase');
    const fontDecreaseButton = document.getElementById('font-decrease');

    if (fontIncreaseButton && fontDecreaseButton) {
        fontIncreaseButton.addEventListener('click', function () {
            const currentFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            document.documentElement.style.fontSize = (currentFontSize + 2) + 'px';
        });

        fontDecreaseButton.addEventListener('click', function () {
            const currentFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            document.documentElement.style.fontSize = (currentFontSize - 2) + 'px';
        });
    }

    /* ====================== */
    /* 133. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const contrastToggleElement = document.getElementById('contrast-toggle');

    if (contrastToggleElement) {
        contrastToggleElement.addEventListener('click', function () {
            document.body.classList.toggle('high-contrast');
            this.textContent = document.body.classList.contains('high-contrast') ? 'الوضع العادي' : 'الوضع عالي التباين';

            // حفظ التفضيل في localStorage
            localStorage.setItem('high-contrast', document.body.classList.contains('high-contrast'));
        });

        // تحميل التفضيل المحفوظ
        if (localStorage.getItem('high-contrast') === 'true') {
            document.body.classList.add('high-contrast');
            contrastToggleElement.textContent = 'الوضع العادي';
        }
    }

    /* ====================== */
    /* 134. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const languageSelectorElement = document.getElementById('language-selector');

    if (languageSelectorElement) {
        languageSelectorElement.addEventListener('change', function () {
            const selectedLang = this.value;
            document.documentElement.lang = selectedLang;

            // هنا يمكنك إضافة كود لتغيير النصوص إلى اللغة المحددة
            console.log(`تم تغيير اللغة إلى: ${selectedLang}`);
        });
    }

    /* ====================== */
    /* 135. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const themeButtonsElements = document.querySelectorAll('.theme-button');

    themeButtonsElements.forEach(button => {
        button.addEventListener('click', function () {
            // إزالة الفئة النشطة من جميع الأزرار
            themeButtonsElements.forEach(btn => btn.classList.remove('active'));

            // إضافة الفئة النشطة للزر المحدد
            this.classList.add('active');

            // تغيير السمة بناءً على الزر المحدد
            const theme = this.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', theme);

            // حفظ التفضيل في localStorage
            localStorage.setItem('theme', theme);
        });
    });

    // تحميل السمة المحفوظة
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        const activeButton = document.querySelector(`.theme-button[data-theme="${savedTheme}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }

    /* ====================== */
    /* 136. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const accessibilityMenuToggleElement = document.getElementById('accessibility-menu-toggle');
    const accessibilityMenuElement = document.getElementById('accessibility-menu');

    if (accessibilityMenuToggleElement && accessibilityMenuElement) {
        accessibilityMenuToggleElement.addEventListener('click', function () {
            accessibilityMenuElement.style.display = accessibilityMenuElement.style.display === 'block' ? 'none' : 'block';
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function (e) {
            if (!accessibilityMenuElement.contains(e.target) && !accessibilityMenuToggleElement.contains(e.target)) {
                accessibilityMenuElement.style.display = 'none';
            }
        });
    }

    /* ====================== */
    /* 137. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const textToSpeechButtonElement = document.getElementById('text-to-speech');

    if (textToSpeechButtonElement) {
        textToSpeechButtonElement.addEventListener('click', function () {
            const text = document.body.innerText;

            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'ar-SA';
                speechSynthesis.speak(utterance);

                this.textContent = 'إيقاف القراءة';
                this.classList.add('speaking');

                utterance.onend = () => {
                    this.textContent = 'قراءة النص';
                    this.classList.remove('speaking');
                };
            } else {
                alert('متصفحك لا يدعم ميزة تحويل النص إلى كلام');
            }
        });
    }

    /* ====================== */
    /* 138. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const printButtonElement = document.getElementById('print-button');

    if (printButtonElement) {
        printButtonElement.addEventListener('click', function () {
            window.print();
        });
    }

    /* ====================== */
    /* 139. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const pdfDownloadButton = document.getElementById('pdf-download');

    if (pdfDownloadButton) {
        pdfDownloadButton.addEventListener('click', function () {
            // هنا يمكنك إضافة كود لتنزيل PDF
            alert('سيتم إضافة ميزة تنزيل PDF قريبًا');
        });
    }

    /* ====================== */
    /* 140. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const socialShareButton = document.getElementById('social-share');

    if (socialShareButton) {
        socialShareButton.addEventListener('click', function () {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                }).catch(console.error);
            } else {
                // طريقة بديلة لمشاركة المحتوى
                const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(document.title)} ${encodeURIComponent(window.location.href)}`;
                window.open(shareUrl, '_blank');
            }
        });
    }

    /* ====================== */
    /* 141. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const liveChatButton = document.getElementById('live-chat');

    if (liveChatButton) {
        liveChatButton.addEventListener('click', function () {
            // هنا يمكنك إضافة كود لفتح نافذة الدردشة الحية
            alert('سيتم فتح نافذة الدردشة الحية قريبًا');
        });
    }

    /* ====================== */
    /* 142. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const whatsappFloatingElement = document.querySelector('.floating-whatsapp');
    const callFloatingElement = document.querySelector('.floating-call');

    if (whatsappFloatingElement && callFloatingElement) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                whatsappFloatingElement.style.animation = '';
                callFloatingElement.style.animation = '';
            } else {
                whatsappFloatingElement.style.animation = 'pulse 2s infinite';
                callFloatingElement.style.animation = 'pulse-call 2s infinite';
            }
        });
    }

    /* ====================== */
    /* 143. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const backToTopButtonElement2 = document.getElementById('back-to-top');

    if (backToTopButtonElement2) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopButtonElement2.style.display = 'block';
            } else {
                backToTopButtonElement2.style.display = 'none';
            }
        });

        backToTopButtonElement2.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ====================== */
    /* 144. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const testimonialsElements = document.querySelectorAll('.testimonial');
    const testimonialDotsElements = document.querySelectorAll('.testimonial-dot');
    let currentTestimonialIndex = 0;

    if (testimonialDotsElements.length > 0) {
        const showTestimonial = function (n) {
            testimonialsElements.forEach(testimonial => testimonial.style.display = 'none');
            testimonialDotsElements.forEach(dot => dot.classList.remove('active'));

            testimonialsElements[n].style.display = 'block';
            testimonialDotsElements[n].classList.add('active');
            currentTestimonialIndex = n;
        };

        testimonialDotsElements.forEach((dot, index) => {
            dot.addEventListener('click', function () {
                showTestimonial(index);
            });
        });

        // عرض الشهادة الأولى
        showTestimonial(currentTestimonialIndex);

        // الانتقال التلقائي بين الشهادات
        setInterval(() => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialsElements.length;
            showTestimonial(currentTestimonialIndex);
        }, 5000);
    }

    /* ====================== */
    /* 145. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const serviceCategoriesElements = document.querySelectorAll('.service-category');

    serviceCategoriesElements.forEach(category => {
        category.addEventListener('click', function () {
            // إزالة الفئة النشطة من جميع الفئات
            serviceCategoriesElements.forEach(cat => cat.classList.remove('active'));

            // إضافة الفئة النشطة للفئة المحددة
            this.classList.add('active');

            // عرض الخدمات المقابلة
            const categoryType = this.getAttribute('data-category');
            const services = document.querySelectorAll('.service-card, .feature-item');

            services.forEach(service => {
                if (categoryType === 'all' || service.getAttribute('data-category') === categoryType) {
                    service.style.display = 'block';
                } else {
                    service.style.display = 'none';
                }
            });
        });
    });

    /* ====================== */
    /* 146. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const portfolioCategoriesElements = document.querySelectorAll('.portfolio-category');

    portfolioCategoriesElements.forEach(category => {
        category.addEventListener('click', function () {
            // إزالة الفئة النشطة من جميع الفئات
            portfolioCategoriesElements.forEach(cat => cat.classList.remove('active'));

            // إضافة الفئة النشطة للفئة المحددة
            this.classList.add('active');

            // عرض المشاريع المقابلة
            const categoryType = this.getAttribute('data-category');
            const projects = document.querySelectorAll('.portfolio-item');

            projects.forEach(project => {
                if (categoryType === 'all' || project.getAttribute('data-category') === categoryType) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    /* ====================== */
    /* 147. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const formInputsElements = document.querySelectorAll('input, textarea');

    formInputsElements.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // تحقق من القيم المدخلة
        input.addEventListener('input', function () {
            if (this.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.setCustomValidity('يرجى إدخال بريد إلكتروني صحيح');
                } else {
                    this.setCustomValidity('');
                }
            }

            if (this.type === 'tel') {
                const phoneRegex = /^[\d+\s()-]{7,}$/;
                if (this.value && !phoneRegex.test(this.value)) {
                    this.setCustomValidity('يرجى إدخال رقم هاتف صحيح');
                } else {
                    this.setCustomValidity('');
                }
            }
        });
    });

    /* ====================== */
    /* 148. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const passwordToggleElements = document.querySelectorAll('.password-toggle');

    passwordToggleElements.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const passwordField = this.previousElementSibling;
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                this.textContent = 'إخفاء';
            } else {
                passwordField.type = 'password';
                this.textContent = 'إظهار';
            }
        });
    });

    /* ====================== */
    /* 149. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const countdownTimersElements2 = document.querySelectorAll('.countdown-timer');

    countdownTimersElements2.forEach(timer => {
        const endTime = new Date(timer.getAttribute('data-end-time')).getTime();

        const updateTimer = function () {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                timer.innerHTML = 'العرض انتهى';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timer.innerHTML = `${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`;
        };

        // تحديث العداد كل ثانية
        updateTimer();
        setInterval(updateTimer, 1000);
    });

    /* ====================== */
    /* 150. وظيفة التأثيرات على أزرار العرض التفصيلي */
    /* ====================== */

    const lazyImagesElements = document.querySelectorAll('img.lazy');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImagesElements.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // طريقة بديلة للتنزيل البطيء (Lazy Loading)
        lazyImagesElements.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
});