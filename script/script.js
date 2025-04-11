document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('main section[id]'); // Ambil semua section di main yg punya id

    // Toggle Menu Mobile
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        // Ganti ikon burger/close (opsional)
        const icon = menuToggle.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Tutup menu mobile saat link diklik
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // Highlight Nav Link on Scroll
    function highlightNavLink() {
        let currentSectionId = 'home'; // Default ke home
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 50; // Offset sedikit
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

         // Jika scroll paling bawah dan section terakhir tidak memenuhi layar
         if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
             currentSectionId = sections[sections.length - 1].getAttribute('id');
         }


        navLinks.forEach(link => {
            link.classList.remove('active');
            // Cek jika href link (tanpa #) cocok dengan id section saat ini
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    // Tambahkan event listener untuk scroll
    window.addEventListener('scroll', highlightNavLink);

    // Panggil sekali saat load untuk highlight link awal
    highlightNavLink();

    // (Opsional) Ubah background header saat scroll
    // window.addEventListener('scroll', () => {
    //     if (window.scrollY > 50) {
    //         header.style.backgroundColor = 'rgba(10, 35, 66, 0.9)'; // Background sedikit transparan
    //         header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
    //     } else {
    //         header.style.backgroundColor = '#0A2342'; // Kembali solid
    //         header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    //     }
    // });

});