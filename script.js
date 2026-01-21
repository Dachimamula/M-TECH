// burger bar
const burger = document.getElementById('burger');
const nav = document.getElementById('nav-menu');

if (burger && nav) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });
}


// API
async function getApiData() {
    const container = document.querySelector('.cont1');
    if (!container) return;

    container.innerHTML = "<p style='color: white;'>იტვირთება ტექნიკა...</p>";

    try {
        const response = await fetch("https://fakestoreapi.com/products/category/electronics");
        const data = await response.json();

        container.innerHTML = ""; 

        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('box3');

            card.innerHTML = `
                <div class="box-image-container">
                    <img class="box-pic" src="${item.image}" alt="${item.title}">
                </div>
                <div class="box-text">
                    <h3>${item.title}</h3>
                    <p class="price">${item.price} USD</p>
                    <span class="category">Electronics</span>
                    <button class="buy-btn">Add to Cart</button>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error:", error);
        container.innerHTML = "<p style='color: red;'>შეცდომა მონაცემების წამოღებისას.</p>";
    }
}
getApiData();


// LocalStorage / Cookies Notification
function checkCookies() {
    if (!localStorage.getItem('cookieAccepted')) {
        const banner = document.createElement('div');
        banner.id = "cookie-banner";
        banner.style = "position: fixed; bottom: 0; width: 100%; background: #1a1a2e; color: white; padding: 15px; text-align: center; z-index: 2000;";
        banner.innerHTML = `
            <p>We use cookies to improve your experience. By continuing, you agree to our use of cookies. <button id="accept" style="margin-left: 15px; cursor: pointer; padding: 5px 10px; border-radius: 5px; border: none; background: white; color: #1a1a2e;">Accept</button></p>
        `;
        document.body.appendChild(banner);

        document.getElementById('accept').addEventListener('click', () => {
            localStorage.setItem('cookieAccepted', 'true');
            banner.remove();
        });
    }
}
checkCookies();


// ფორმის ვალიდაცია და Password Show/Hide
const toggleBtn = document.getElementById('toggleBtn');
const passwordInput = document.getElementById('reg-password');
const regForm = document.getElementById('registration-form');

if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        toggleBtn.textContent = isPassword ? 'Hide' : 'Show';
    });
}

if (regForm) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = passwordInput.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!username || !email || !password) {
            alert("შეცდომა: ყველა ველი უნდა იყოს შევსებული!");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("გთხოვთ შეიყვანოთ სწორი Email ფორმატი!");
            return;
        }

        if (!passRegex.test(password)) {
            alert("პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო, შეიცავდეს 1 დიდ ასოს და 1 ციფრს!");
            return;
        }

        alert("რეგისტრაცია წარმატებით დასრულდა!");
        regForm.reset();
        if (toggleBtn) toggleBtn.textContent = 'Show';
    });
}

// Search
const searchInput = document.getElementById('search');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const text = e.target.value.toLowerCase();
        const boxes = document.querySelectorAll('.box1, .box2, .box3');
        
        boxes.forEach(box => {
            const title = box.querySelector('h3')?.innerText.toLowerCase() || "";
            if (title.includes(text)) {
                box.style.display = 'flex';
            } else {
                box.style.display = 'none';
            }
        });
    });
}


// Scroll To Top
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = "↑";
scrollToTopBtn.id = "scrollTopBtn";
scrollToTopBtn.style = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    display: none;
    background: #e44d26;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 15px;
    z-index: 1000;
`;
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Checkbox-ების მიხედვით ფასის გამოთვლა
const checkboxes = document.querySelectorAll('.service-check');
const totalPriceDisplay = document.getElementById('total-price');

if (checkboxes.length > 0) {
    checkboxes.forEach(check => {
        check.addEventListener('change', () => {
            let total = 0;
            checkboxes.forEach(c => {
                if (c.checked) {
                    total += parseInt(c.getAttribute('data-price'));
                }
            });
            totalPriceDisplay.textContent = total;
            
            totalPriceDisplay.style.color = total > 0 ? '#e44d26' : '#000';
        });
    });
}