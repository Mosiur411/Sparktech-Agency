export interface IAnalytic {
    course: string;
    views: number;
    engagement: {
        student: string;
        lastViewed: Date;
      }[];
  }


