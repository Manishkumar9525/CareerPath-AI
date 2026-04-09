// Mock Gemini API - Returns realistic roadmaps (works without valid API key!)
// This is perfect for testing! Replace with real Gemini API later

const mockRoads = {
  'Full Stack Developer': {
    career: 'Full Stack Developer',
    steps: [
      {
        title: 'Master JavaScript Fundamentals',
        description: 'Learn core JavaScript including ES6+, async/await, promises, and modern syntax',
        skills: ['Variables & Data Types', 'Functions & Scope', 'Async/Await', 'ES6+ Features', 'DOM Manipulation'],
        tools: ['VS Code', 'Node.js', 'Chrome DevTools', 'Postman'],
        resources: ['MDN Web Docs', 'JavaScript.info', 'Codecademy'],
        projectIdeas: ['Calculator App', 'Todo List', 'Weather App', 'Quiz Game']
      },
      {
        title: 'Learn React Framework',
        description: 'Master React for building interactive UIs with components, hooks, and state management',
        skills: ['React Components', 'Hooks (useState, useEffect)', 'Props & State', 'React Router', 'Redux'],
        tools: ['React', 'Create React App', 'Redux DevTools', 'React Developer Tools'],
        resources: ['React Official Docs', 'Scrimba React Course', 'React Patterns'],
        projectIdeas: ['Product Page', 'Social Media Feed', 'E-commerce Cart', 'Dashboard']
      },
      {
        title: 'Node.js & Express Backend',
        description: 'Build scalable backend servers using Node.js and Express framework',
        skills: ['Express.js', 'RESTful APIs', 'Middleware', 'Authentication', 'Error Handling'],
        tools: ['Node.js', 'Express', 'Postman', 'Nodemon'],
        resources: ['Express Docs', 'REST API Best Practices', 'Backend Patterns'],
        projectIdeas: ['Blog API', 'User Auth System', 'E-commerce API', 'Task Manager API']
      },
      {
        title: 'Database with MongoDB',
        description: 'Learn MongoDB NoSQL database for storing and managing application data',
        skills: ['MongoDB Basics', 'CRUD Operations', 'Mongoose ODM', 'Indexing', 'Aggregation'],
        tools: ['MongoDB', 'MongoDB Atlas', 'Mongoose', 'MongoDB Compass'],
        resources: ['MongoDB Docs', 'Mongoose Guide', 'Database Design'],
        projectIdeas: ['User Database', 'Blog System', 'Inventory DB', 'Social Network DB']
      },
      {
        title: 'MERN Stack Integration',
        description: 'Combine MongoDB, Express, React, and Node.js into complete applications',
        skills: ['Full Stack Architecture', 'API Integration', 'State Management', 'Deployment'],
        tools: ['Git', 'GitHub', 'Heroku', 'Vercel'],
        resources: ['MERN Stack Tutorial', 'Full Stack Patterns', 'DevOps Basics'],
        projectIdeas: ['Social Network', 'Project Manager', 'Learning Platform', 'Task App']
      }
    ]
  },
  'Data Scientist': {
    career: 'Data Scientist',
    steps: [
      {
        title: 'Python Fundamentals',
        description: 'Master Python basics, data structures, and OOP concepts',
        skills: ['Variables & Functions', 'Data Structures', 'OOP', 'File Handling', 'Error Handling'],
        tools: ['Python 3', 'VS Code', 'Jupyter Notebook', 'PyCharm'],
        resources: ['Python.org Docs', 'Real Python', 'Codecademy'],
        projectIdeas: ['ATM System', 'Calculator', 'File Manager', 'Quiz Game']
      },
      {
        title: 'Data Analysis with Pandas & NumPy',
        description: 'Learn data manipulation and numerical computing libraries',
        skills: ['Pandas DataFrames', 'NumPy Arrays', 'Data Cleaning', 'Data Exploration'],
        tools: ['Pandas', 'NumPy', 'Jupyter', 'Matplotlib'],
        resources: ['Pandas Docs', 'NumPy Guide', 'Real Python'],
        projectIdeas: ['COVID-19 Analysis', 'Sales Analysis', 'Weather Analysis', 'Stock Analysis']
      },
      {
        title: 'Data Visualization',
        description: 'Create compelling visualizations with Matplotlib, Seaborn, and Plotly',
        skills: ['Matplotlib', 'Seaborn', 'Plotly', 'Dashboard Creation', 'Storytelling'],
        tools: ['Matplotlib', 'Seaborn', 'Plotly', 'Tableau'],
        resources: ['Matplotlib Tutorial', 'Seaborn Gallery', 'Plotly Docs'],
        projectIdeas: ['Sales Dashboard', 'Market Analysis', 'Trend Visualization', 'Report Creation']
      },
      {
        title: 'Machine Learning Basics',
        description: 'Learn supervised and unsupervised learning algorithms',
        skills: ['Scikit-learn', 'Regression', 'Classification', 'Clustering', 'Feature Engineering'],
        tools: ['Scikit-learn', 'TensorFlow', 'Keras', 'Jupyter'],
        resources: ['Scikit-learn Docs', 'ML Mastery', 'Kaggle'],
        projectIdeas: ['House Price Prediction', 'Customer Segmentation', 'Iris Classification', 'Titanic Dataset']
      },
      {
        title: 'Advanced ML & Deep Learning',
        description: 'Build neural networks and deep learning models',
        skills: ['Neural Networks', 'Deep Learning', 'NLP', 'Computer Vision', 'Model Deployment'],
        tools: ['TensorFlow', 'PyTorch', 'Keras', 'Flask'],
        resources: ['TensorFlow Docs', 'Fast.ai', 'Deep Learning Book'],
        projectIdeas: ['Image Recognition', 'NLP Sentiment', 'Chatbot', 'Recommendation System']
      }
    ]
  },
  'UI/UX Designer': {
    career: 'UI/UX Designer',
    steps: [
      {
        title: 'Design Fundamentals',
        description: 'Master design principles, color theory, and typography',
        skills: ['Color Theory', 'Typography', 'Layout Design', 'Visual Hierarchy', 'Spacing'],
        tools: ['Figma', 'Adobe XD', 'Sketch', 'Pencil & Paper'],
        resources: ['Design Principles', 'The Design of Everyday Things', 'Dribbble'],
        projectIdeas: ['Logo Design', 'Business Card', 'Brand Kit', 'Style Guide']
      },
      {
        title: 'UI Design Essentials',
        description: 'Learn wireframing, prototyping, and interface design',
        skills: ['Wireframing', 'Prototyping', 'Component Design', 'Design Systems', 'Responsive Design'],
        tools: ['Figma', 'Adobe XD', 'Protopie', 'Principle'],
        resources: ['Figma Tutorials', 'UI Design Patterns', 'Design System Course'],
        projectIdeas: ['App Wireframes', 'Website Design', 'Design System', 'Mobile App Design']
      },
      {
        title: 'UX Research & Testing',
        description: 'Conduct user research and testing to validate designs',
        skills: ['User Research', 'Usability Testing', 'Analytics', 'Heatmaps', 'Surveys'],
        tools: ['Figma', 'Maze', 'Hotjar', 'UserTesting'],
        resources: ['UX Research Methods', 'Don Norman UX', 'Nielsen Group'],
        projectIdeas: ['User Research Report', 'Testing Plan', 'Research Synthesis', 'Persona Creation']
      },
      {
        title: 'Interaction Design',
        description: 'Create engaging micro-interactions and animations',
        skills: ['Micro-interactions', 'Animation Principles', 'Transitions', 'Motion Design', 'Accessibility'],
        tools: ['Figma', 'Lottie', 'Framer', 'After Effects'],
        resources: ['Animation Principles', 'Material Design', 'Framer Guide'],
        projectIdeas: ['Loading Animation', 'Button Interactions', 'Page Transitions', 'App Prototypes']
      },
      {
        title: 'Design to Development Handoff',
        description: 'Collaborate with developers and implement designs',
        skills: ['Design Specs', 'Developer Communication', 'HTML/CSS Basics', 'Design QA', 'Performance'],
        tools: ['Figma Dev Mode', 'Zeplin', 'Penpot', 'VS Code'],
        resources: ['Design QA Guide', 'CSS for Designers', 'Dev Collaboration'],
        projectIdeas: ['Design System', 'Component Library', 'Full Product Design', 'Design Documentation']
      }
    ]
  }
};

const generateMockRoadmap = (goal) => {
  // Try to find matching roadmap
  for (const [key, value] of Object.entries(mockRoads)) {
    if (goal.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(goal.toLowerCase().split(' ')[0])) {
      return {
        career: value.career,
        duration: '6-12 months',
        steps: value.steps
      };
    }
  }
  
  // If no exact match, return Full Stack Developer as default
  return {
    career: 'Full Stack Developer',
    duration: '6-12 months',
    steps: mockRoads['Full Stack Developer'].steps
  };
};

module.exports = {
  generateMockRoadmap,
  mockRoads
};
