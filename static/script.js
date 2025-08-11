// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Navbar animation
const navbar = document.getElementById('navbar');
ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { className: 'bg-white shadow-md', targets: navbar }
});

// Roadmap generation and animation
function generateRoadmap() {
    const roadmapSteps = [
        { title: 'Fundamentals', duration: '2 weeks' },
        { title: 'Core Concepts', duration: '3 weeks' },
        { title: 'Advanced Topics', duration: '4 weeks' },
        { title: 'Projects', duration: '3 weeks' }
    ];

    const roadmapTimeline = document.getElementById('roadmapTimeline');
    if (roadmapTimeline) {
        roadmapTimeline.innerHTML = '';
        roadmapSteps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'roadmap-step';
            stepElement.innerHTML = `
                <div class="roadmap-step-number">${index + 1}</div>
                <div class="roadmap-step-content">
                    <h3  class="text-lg sm:text-xl font-semibold">${step.title}</h3>
                    <p class="text-sm sm:text-base text-gray-600">${step.duration}</p>
                </div>
            `;
            roadmapTimeline.appendChild(stepElement);

            // Animate roadmap steps
            gsap.from(stepElement, {
                opacity: 0,
                x: -50,
                duration: 0.5,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: stepElement,
                    start: 'top 80%',
                    onEnter: () => stepElement.classList.add('animate')
                }
            });
        });
    }
}

// Course recommendations generation and animation
function generateCourseRecommendations() {
    const courses = [
        { title: 'Introduction to Web Development', category: 'Web Development', duration: '6 weeks', difficulty: 'Beginner' },
        { title: 'Advanced JavaScript Concepts', category: 'Web Development', duration: '8 weeks', difficulty: 'Intermediate' },
        { title: 'Machine Learning Fundamentals', category: 'Data Science', duration: '10 weeks', difficulty: 'Intermediate' },
    ];

    const courseList = document.getElementById('courseList');
    if (courseList) {
        courseList.innerHTML = '';
        courses.forEach((course, index) => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <h3>${course.title}</h3>
                <p>Category: ${course.category}</p>
                <p>Duration: ${course.duration}</p>
                <p>Difficulty: ${course.difficulty}</p>
                <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                    View Course
                </button>
            `;
            courseList.appendChild(courseCard);

            // Animate course cards
            gsap.from(courseCard, {
                opacity: 0,
                y: 50,
                duration: 0.5,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: courseCard,
                    start: 'top 80%',
                    onEnter: () => courseCard.classList.add('animate')
                }
            });
        });
    }
}

// Initialize roadmap and course recommendations
document.addEventListener('DOMContentLoaded', () => {
    generateRoadmap();
    generateCourseRecommendations();
});

// Download Roadmap PDF (placeholder function)
const downloadRoadmapBtn = document.getElementById('downloadRoadmap');
if (downloadRoadmapBtn) {
    downloadRoadmapBtn.addEventListener('click', () => {
        alert('Downloading roadmap PDF... (This is a placeholder action)');
    });
}

// Micro-interactions
document.querySelectorAll('button, .nav-link').forEach(element => {
    element.addEventListener('mouseenter', () => {
        gsap.to(element, { scale: 1.05, duration: 0.2 });
    });
    element.addEventListener('mouseleave', () => {
        gsap.to(element, { scale: 1, duration: 0.2 });
    });
});

// Fade-in animation for elements with 'fade-in' class
gsap.utils.toArray('.fade-in').forEach(element => {
    gsap.from(element, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            onEnter: () => element.classList.add('animate')
        }
    });
});

// Form animation
gsap.from('#courseForm', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '#courseForm',
        start: 'top 80%',
    }
});

// Duration slider
const durationSlider = document.getElementById('duration');
const durationValue = document.getElementById('durationValue');

if (durationSlider && durationValue) {
    const updateDurationValue = () => {
        const weeks = durationSlider.value;
        const date = new Date();
        date.setDate(date.getDate() + weeks * 7);
        durationValue.textContent = `${weeks} ${weeks == 1 ? 'week' : 'weeks'} (${date.toLocaleDateString()})`;
    };

    durationSlider.addEventListener('input', updateDurationValue);

    // Set initial value
    updateDurationValue();
}

// Form validation and submission
const courseForm = document.getElementById('courseForm');
if (courseForm) {
    courseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const category = document.getElementById('category').value;
        const difficulty = document.querySelector('input[name="difficulty"]:checked')?.value;
        const duration = document.getElementById('duration').value;

        if (!category || !difficulty) {
            alert('Please fill out all required fields.');
            return;
        }

        // Simulate API call for course recommendations
        setTimeout(() => {
            showRecommendations();
        }, 1000);
    });
}

// Show course recommendations
function showRecommendations() {
    const recommendationSection = document.getElementById('course-recommendations');
    const courseList = document.getElementById('courseList');
    recommendationSection.classList.remove('hidden');

    // Sample course data (replace with actual API response)
    const courses = [
        { title: 'Introduction to Web Development', category: 'Web Development', duration: '6 weeks', difficulty: 'Beginner' },
        { title: 'Advanced JavaScript Concepts', category: 'Web Development', duration: '8 weeks', difficulty: 'Intermediate' },
        { title: 'Machine Learning Fundamentals', category: 'Data Science', duration: '10 weeks', difficulty: 'Intermediate' },
    ];

    courseList.innerHTML = '';
    courses.forEach((course, index) => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <h3>${course.title}</h3>
            <p>Category: ${course.category}</p>
            <p>Duration: ${course.duration}</p>
            <p>Difficulty: ${course.difficulty}</p>
            <button>Enroll Now</button>
        `;
        courseList.appendChild(courseCard);

        // Animate course cards
        gsap.from(courseCard, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // Scroll to recommendations
    gsap.to(window, {
        duration: 1,
        scrollTo: {
            y: recommendationSection,
            offsetY: 80
        },
        ease: 'power3.inOut'
    });

    // Show roadmap section
    const roadmapSection = document.getElementById('roadmap');
    roadmapSection.classList.remove('hidden');

    // Create and animate roadmap steps
    const roadmapTimeline = document.getElementById('roadmapTimeline');
    const roadmapSteps = [
        'Complete Introduction to Web Development',
        'Learn Advanced JavaScript Concepts',
        'Study Machine Learning Fundamentals',
        'Work on Personal Projects',
        'Prepare for Job Interviews'
    ];

    roadmapSteps.forEach((step, index) => {
        const roadmapStep = document.createElement('div');
        roadmapStep.className = 'roadmap-step';
        roadmapStep.innerHTML = `<p class="font-semibold">${step}</p>`;
        roadmapTimeline.appendChild(roadmapStep);

        gsap.from(roadmapStep, {
            opacity: 0,
            x: -20,
            duration: 0.5,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: roadmapStep,
                start: 'top 80%',
            }
        });
    });
}

// Animate elements on scroll
gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
    gsap.from(element, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
        }
    });
});

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Sample roadmap data
const roadmapSteps = [
    {
        title: "Getting Started",
        duration: "2 weeks",
        description: "Learn the fundamentals and core concepts",
        status: "completed"
    },
    {
        title: "Building Foundations",
        duration: "3 weeks",
        description: "Master essential techniques and principles",
        status: "in-progress"
    },
    {
        title: "Advanced Concepts",
        duration: "4 weeks",
        description: "Dive deep into complex topics and applications",
        status: "upcoming"
    },
    {
        title: "Real-world Projects",
        duration: "3 weeks",
        description: "Apply your knowledge to practical scenarios",
        status: "upcoming"
    }
];

// Generate timeline
function generateTimeline() {
    const timeline = document.getElementById('roadmapTimeline');
    if (timeline) {
        timeline.innerHTML = '';
        roadmapSteps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = `relative mb-16 ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'}`;
            
            const statusColor = {
                'completed': 'bg-green-500',
                'in-progress': 'bg-blue-500',
                'upcoming': 'bg-gray-300'
            }[step.status];

            stepElement.innerHTML = `
                <div class="transform ${index % 2 === 0 ? '-translate-x-1/2 left-1/2' : 'translate-x-1/2 left-1/2'} absolute flex items-center justify-center">
                    <div class="w-16 h-16 rounded-full ${statusColor} flex items-center justify-center text-white font-bold text-xl">
                        ${index + 1}
                    </div>
                </div>
                <div class="transform ${index % 2 === 0 ? 'translate-x-8 ml-1/2' : '-translate-x-8 mr-1/2'} bg-white p-6 rounded-xl shadow-sm max-w-md">
                    <h3 class="text-xl font-bold mb-2">${step.title}</h3>
                    <p class="text-gray-600 mb-2">${step.description}</p>
                    <div class="flex items-center text-sm text-gray-500">
                        <svg class="w-4  h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        ${step.duration}
                    </div>
                </div>
            `;
            timeline.appendChild(stepElement);

            // Animate timeline steps
            gsap.from(stepElement, {
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: stepElement,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
}

// Animate progress numbers
function animateProgress() {
    // Sample progress data
    const progress = {
        completedSteps: 5,
        totalHours: 45,
        completion: 60
    };

    // Animate completed steps
    gsap.to('#completedSteps', {
        innerText: progress.completedSteps,
        duration: 2,
        snap: { innerText: 1 },
        scrollTrigger: {
            trigger: '#completedSteps',
            start: 'top 80%'
        }
    });

    // Animate total hours
    gsap.to('#totalHours', {
        innerText: progress.totalHours,
        duration: 2,
        snap: { innerText: 1 },
        scrollTrigger: {
            trigger: '#totalHours',
            start: 'top 80%'
        }
    });

    // Animate completion percentage
    gsap.to('#completion', {
        innerText: progress.completion,
        duration: 2,
        snap: { innerText: 1 },
        scrollTrigger: {
            trigger: '#completion',
            start: 'top 80%'
        },
        onUpdate: function() {
            document.getElementById('completion').innerText = Math.round(this.targets()[0].innerText) + '%';
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateTimeline();
    animateProgress();

    // Micro-interactions
    document.querySelectorAll('button, .nav-link').forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(element, { scale: 1.05, duration: 0.2 });
        });
        element.addEventListener('mouseleave', () => {
            gsap.to(element, { scale: 1, duration: 0.2 });
        });
    });

    // Navbar scroll animation
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { className: 'shadow-md', targets: document.getElementById('navbar') }
    });
});

// Download Roadmap PDF (placeholder function)
document.getElementById('downloadRoadmap').addEventListener('click', () => {
    alert('Downloading roadmap PDF... (This is a placeholder action)');
});