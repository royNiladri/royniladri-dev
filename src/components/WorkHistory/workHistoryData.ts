import { WorkHistoryData } from "./workHistoryTypes";

export const workHistoryData: WorkHistoryData[] = [
  {
    company: "Informatica",
    positions: [
      {
        title: "Lead Software Engineer",
        team: "Master Data Management, R&D",
        location: "Bangalore, India",
        startDate: new Date(2020, 3, 9),
        projects: [
          {
            title: "2023 AI Hackathon",
            description: `Mentored three teams, across text, image and audio, and developed a Chat GPT
                integration into the MDM platform, reaching the finals. This experience allowed me to educate engineers
                on Machine Learning concepts and interact with experienced teams.`,
            skills: ["AI/ML", "Mentorship", "Full Stack Web Development"],
            technologies: ["Python", "Tensorflow", "Java", "React", "NodeJs"],
          },
          {
            title: "AI Enrichment Integration",
            description: `Enhanced the MDM platform by integrating AI-generated enrichment
                into the product lifecycle, which was showcased at Informatica World 2023. Contributions spanned
                across UI, backend service, Model Serve, business process (BPEL), and ElasticSearch optimization. ML contributions included parallelization
                in prediction to support batch processing.`,
            skills: [
              "Full Stack Web Development",
              "AI/ML",
              "Business Process Execution Language (BPEL)",
            ],
            technologies: [
              "Java",
              "Spring",
              "Python",
              "Tensorflow",
              "MongoDB",
              "ElasticSearch",
              "React",
              "TypeScript",
            ],
          },
          {
            title: "DAAS Enrichment Enablement",
            description: `Developed a UI framework for configurable DAAS services to
            enrich records on demand. It is now a platform feature, used across teams.`,
            skills: ["Full Stack Web Development"],
            technologies: ["React", "TypeScript", "Java", "Spring"],
          },
          {
            title: "Enrichment Service Initiation",
            description: `Created and onboarded a new MDM platform microservice for handling 
            record enrichments. The whole process involved multiple teams (DevOps, feature, Security, 
            Platform Integration) and tools (Bitbucket, Perforce, Jenkins), and was documented 
            in detail for future reference. One new service was recently onboarded using the same 
            wiki in less than half our time, demonstrating the business value of precise and 
            actionable documentation.`,
            skills: ["Backend Web Development", "CI/CD"],
            technologies: [
              "Java",
              "Spring",
              "Maven",
              "Docker",
              "Kubernetes",
              "Jenkins",
              "BitBucket",
            ],
          },
          {
            title: "Sequential Edit Stabilization",
            description: `Post-COVID, I joined the team working on the Sequential Edit feature in the UI, which was initially bug-prone. 
            I made architectural changes and fostered collaboration, leading to the feature's successful release within months. The main 
            challenges were the absence of a focused design and technical guidance. To expedite the process, I involved the owners of the component 
            libraries early on, significantly reducing the time spent on Pull Request reviews.`,
            skills: ["Frontend Web Development", "Frontend Architechture", "Mentorship"],
            technologies: ["React", "TypeScript"],
          },
          {
            title: "Germany Office Collaboration",
            description: `Engaged in discussions and meetings during an on-site visit to our
            German office, contributing to the planning and development of key features like Dynamic Fields and
            Claire Platform.`,
            skills: ["Frontend Architechture", "Mentorship"],
            technologies: ["React", "TypeScript", "Java"],
          },
          {
            title: "Audit Trail Performance Enhancement",
            description: `Improved Audit trail by introducing batching in
            ElasticSearch for import jobs and generating performance metrics for A/B testing. This enhancement
            introduced state of the art features like searchability, lifecycle management, disaster recovery, eventual
            consistency, leading to a more resilient system and reduced operation cost.`,
            skills: [
              "BackEnd Development",
              "Full Text Search",
              "Performance optimization",
            ],
            technologies: ["Java", "ElasticSearch"],
          },
          {
            title: "Crystal Theme upgrade",
            description: `Delivered a theme upgrade for on-premise P360, enhancing customer
            experience. Collaborated with PM and UX engineers.`,
            skills: ["Frontend Development"],
            technologies: ["CSS3"],
          },
          {
            title: "Interview Panel Membership",
            description: `Participated in interview panels for new hires, assessing technical
            skills, teamwork, and learning ability.`,
            skills: ["Interviewing", "Mentorship"],
            technologies: [],
          },
          {
            title: "Operational Excellence",
            description: `Maintained software integrity by resolving bugs, leading the team, and
            providing on-call support for production issues.`,
            skills: ["Customer support", "Teamwork", "Bug analysis"],
            technologies: [],
          },
        ],
      },
    ],
  },
  {
    company: "Visa Inc",
    positions: [
      {
        title: "Sr. Software Engineer",
        team: "Engineering Application and Analytics, Corporate IT",
        location: "Bangalore, India",
        startDate: new Date(2018, 3, 15),
        endDate: new Date(2020, 1, 21),
        projects: [
          {
            title: "VOIP Tech Upgrade",
            description: `Led the migration of VOIP frontend to Angular 6, ensuring improved
                performance, compatibility, and security, validated through comprehensive testing`,
            skills: [
              "Self driven",
              "Frontend Web Development",
              "Modernization",
            ],
            technologies: ["Angular", "TypeScript", "SASS", "NodeJS"],
          },
          {
            title: "Internal Projects",
            description: `Pioneered the development of Visa Tech Forum, a platform for technical
            discussions, drawing data from multiple sources, currently undergoing enhancements with ongoing
            business reviews. Contributed significantly to One Intake a comprehensive wrapper application for
            initiating and tracking vendor/project requests`,
            skills: ["Full Stack Web Development"],
            technologies: [
              "Angular",
              "React",
              "TypeScript",
              "NodeJS",
              "Express",
              "MongoDB",
            ],
          },
          {
            title: "Global OpCerts",
            description: `Played a key role in Global OpCerts, a major and well-funded EAA application,
            focusing on UI enhancements, performance improvements, and code quality monitoring.`,
            skills: ["Frontend Web Development", "Performance optimization"],
            technologies: ["React", "TypeScript", "SASS"],
          },
          {
            title: "Mentoring Program and Diversity",
            description: `Actively participated in the Ready to Return (RTR) mentoring
            program, guiding women in technology through their transition back into the workplace`,
            skills: ["Mentorship", "Diversity"],
            technologies: [],
          },
          {
            title: "Tech Talks",
            description: `Conducted several Tech Talks at the organizational level, covering topics such as Angular,
            React with Redux, SCSS, and NodeJS with Express.`,
            skills: ["Public Speaking", "Mentoship"],
            technologies: ["Angular", "React", "NodeJS", "Express", "SASS"],
          },
        ],
      },
      {
        title: "Software Engineer",
        team: "Revenue & Pricing Systems, Corporate IT",
        location: "Bangalore, India",
        startDate: new Date(2015, 7, 1),
        endDate: new Date(2018, 3, 15),
        projects: [
          {
            title: "Visa Online Invoice Portal (VOIP)",
            description: `Contributed to the development of Visa Online Invoice Portal
            (VOIP), generating global invoices for member banks. Established a CI/CD pipeline using Jenkins,
            optimizing performance with a dedicated server for efficient build processes. Addressed backward
            compatibility issues for legacy browsers starting from IE7. As of 2020, it is live across the globe.`,
            skills: ["Full Stack Web Development", "CI/CD"],
            technologies: ["AngularJS", "JavaScript", "Java", "Jenkins"],
          },
          {
            title: "js-big-decimal",
            description: `Published a NPM package for handling accurate floating-point computations in
              JavaScript for small and large numbers. The package has over 3.5 Million downloads till now.`,
            links: [
                {
                    title: "JS Big Decimal (NPM Package)",
                    url: "https://www.npmjs.com/package/js-big-decimal",
                }
            ],
            skills: ["Open Source Contribution"],
            technologies: ["TypeScript", "NodeJS", "Webpack"],
          },
        ],
      },
    ],
  },
];
