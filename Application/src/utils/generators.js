// src/utils/generators.js

export const generateProfiles = (role) => {
  const isLookingForMentors = role === 'mentee';
  const label = isLookingForMentors ? 'Mentor' : 'Mentee';
  const sectors = ['Technology', 'Finance', 'Healthcare', 'Marketing', 'Design'];
  const locations = ['New York, USA', 'Paris, France', 'London, UK', 'Tokyo, Japan'];
  const names = ['Alex', 'Sarah', 'Mike', 'Emma', 'James', 'Olivia', 'David', 'Sophie'];
  
  return Array.from({ length: 20 }, (_, i) => ({
    id: `profile-${i}`,
    name: `${names[i % names.length]} ${String.fromCharCode(65 + i)}`,
    photo: `https://i.pravatar.cc/300?img=${(i * 3) + 5}`,
    sector: sectors[i % sectors.length],
    role: label,
    experience: Math.floor(Math.random() * 15) + 2,
    location: locations[i % locations.length],
    bio: `${label} passionate about **${sectors[i % sectors.length]}** and focused on growth. I have ${Math.floor(Math.random() * 50) + 1} successful mentorship hours.`,
  }));
};

export const generatePosts = () => {
  const topics = [
    'Just completed a great session!',
    'Looking for advice on React Native.',
    'Networking tips needed.',
    'Hiring new juniors!'
  ];
  
  return Array.from({ length: 10 }, (_, i) => ({
    id: `post-${i}`,
    author: `User ${(i % 5) + 1}`,
    photo: `https://i.pravatar.cc/150?img=${(i % 10) + 20}`,
    content: topics[i % topics.length],
    image: i % 2 === 0 ? `https://picsum.photos/400/200?random=${i}` : null,
    likes: Math.floor(Math.random() * 50),
    liked: false,
    timestamp: new Date().toISOString(),
  }));
};

export const generateMockUser = (role) => ({
  id: 'user-me',
  name: 'Chris Taylor',
  photo: 'https://i.pravatar.cc/300?img=12',
  role: role,
  sector: 'Technology',
  experience: 8,
  location: 'New York, USA',
  bio: 'Experienced software engineer focused on scaling products and mentoring the next generation of developers. Ready to share knowledge in React Native and backend architecture.',
});