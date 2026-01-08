const { createApp } = Vue;

createApp({
    data() {
        return {
            name: 'Qelvin Joszeler D. Nagales',
            tagline: 'Web Developer | IT Student | Tech Enthusiast',
            about: 'I am a passionate web developer and IT student with a keen interest in cybersecurity and modern web technologies. I enjoy creating interactive web applications using Vue.js and exploring new programming concepts.',
            skills: [
                'HTML & CSS',
                'JavaScript',
                'Vue.js',
                'Web Development',
                'Git & GitHub',
                'Flutter (Dart)',
                'Cybersecurity Basics',
                'Responsive Design'
            ],
            interests: [
                'Web Development',
                'Cybersecurity',
                'Programming',
                'UI/UX Design',
                'Open Source',
                'Learning New Technologies',
                'Creating Projects',
                'Problem Solving'
            ],
            email: 'qdnagales@student.apc.edu.ph',
            location: 'Manila, Metro Manila, Philippines'
        }
    },
    mounted() {
        console.log('Profile page loaded successfully!');
        console.log(`Welcome to ${this.name}'s profile!`);
    }
}).mount('#app');
