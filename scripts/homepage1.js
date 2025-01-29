// JavaScript version of the HTML structure

const root = document.createElement('div');
root.innerHTML = `
<header>
    <h1>Martin Tennis Academy</h1>
    <nav>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#schedule">Schedule Lessons</a>
        <a href="#blog">Blog</a>
        <a href="#contact">Contact</a>
        <a href="#login" class="login-link">Login</a>
    </nav>
</header>

<div class="hero">
    <video autoplay muted loop>
        <source src="tennis-highlight.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <div class="hero-content">
        <h2>Achieve Your Best in Tennis</h2>
        <p>Join our expert-led programs designed for players of all levels. Let’s work together to reach your goals!</p>
        <a href="#quiz">Take the Quiz to Determine My Level</a>
    </div>
</div>

<section class="features">
    <div class="feature">
        <img src="testimonial-icon.png" alt="Testimonials Icon">
        <h3>Testimonials</h3>
        <p>Hear from players and parents about their success stories.</p>
    </div>
    <div class="feature">
        <img src="training-icon.png" alt="Training Icon">
        <h3>High-Performance Training</h3>
        <p>Elite programs for college scholarships or pro ranks.</p>
        <a href="#">Watch Training Videos</a>
    </div>
    <div class="feature">
        <img src="facility-icon.png" alt="Facility Icon">
        <h3>Our Facilities</h3>
        <p>Tour our courts and advanced fitness centers.</p>
    </div>
</section>

<section class="features">
    <div class="feature">
        <img src="coach-icon.png" alt="Coach Icon">
        <h3>Meet Your Coach</h3>
        <p>Learn about our head coach's experience and watch training highlights.</p>
    </div>
    <div class="feature">
        <img src="event-icon.png" alt="Events Icon">
        <h3>Events & Tournaments</h3>
        <p>Join our workshops and attend the Miami Open yearly.</p>
    </div>
    <div class="feature">
        <img src="scholarship-icon.png" alt="Scholarship Icon">
        <h3>Scholarships</h3>
        <p>Learn about financial aid and online education programs.</p>
    </div>
</section>

<section class="features">
    <div class="feature">
        <img src="blog-icon.png" alt="Blog Icon">
        <h3>Our Blog</h3>
        <p>Read tips on training, nutrition, and mental conditioning.</p>
    </div>
    <div class="feature">
        <img src="gallery-icon.png" alt="Gallery Icon">
        <h3>Gallery</h3>
        <p>View photos and videos of our training and players.</p>
    </div>
    <div class="feature">
        <img src="achievement-icon.png" alt="Achievements Icon">
        <h3>Achievements</h3>
        <p>Discover our affiliations, awards, and milestones.</p>
    </div>
    <div class="feature">
        <img src="international-icon.png" alt="International Icon">
        <h3>International Junior Tennis Player Program</h3>
        <p>Live, remote camera feeds for parents both on court and in the home environment.</p>
        <a href="#">Application for Junior Tennis Player – Europe</a><br>
        <a href="#">Application for Junior Tennis Player – Rest of the World</a>
    </div>
</section>

<footer class="footer">
    <p>&copy; 2025 Martin Tennis Academy. All rights reserved.</p>
</footer>`;

document.body.appendChild(root);
