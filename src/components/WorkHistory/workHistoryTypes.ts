type Project = {
    title: string;
    description: string;
    skills: string[];
    technologies: string[];
  };
  
  type Position = {
    team: string;
    title: string;
    location: string;
    startDate: Date;
    endDate?: Date;
    projects: Project[];
  };
  
  export type WorkHistoryData = {
    company: string;
    positions: Position[];
  };