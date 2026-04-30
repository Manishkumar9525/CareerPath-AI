export const roadmapData = {
  steps: [
    {
      title: "Month 1",
      description: "Frontend basics",
      skills: ["HTML", "CSS", "JavaScript"],
      tools: ["VS Code"],
      resources: ["MDN Web Docs"],
      projectIdeas: ["Todo App"],

      weeks: [
        {
          week: "Week 1",
          tasks: [
            {
              title: "Learn HTML",
              description: "Understand structure of web pages",
              completed: false,
              courses: [
                "HTML Crash Course - freeCodeCamp",
                "HTML Basics - Traversy Media",
              ],
              resources: [
                "MDN HTML Guide",
                "HTML Reference",
              ],
              docs: [
                "W3Schools HTML",
                "WHATWG HTML Spec",
              ],
            },
            {
              title: "Build HTML page",
              description: "Create a simple static webpage",
              completed: false,
              courses: [
                "Build Landing Page - YouTube",
              ],
              resources: [
                "HTML Templates",
              ],
              docs: [
                "HTML Forms Guide",
              ],
            },
          ],
        },

        {
          week: "Week 2",
          tasks: [
            {
              title: "Learn CSS basics",
              description: "Styling and layout fundamentals",
              completed: false,
              courses: [
                "CSS Crash Course - freeCodeCamp",
              ],
              resources: [
                "MDN CSS",
              ],
              docs: [
                "CSS Flexbox Guide",
              ],
            },
          ],
        },
      ],
    },
  ],
};