declare module 'handtrackjs' {
    export interface Detection {
      bbox: [number, number, number, number];
      class: string;
      score: number;
    }
  
    export interface ObjectDetection {
      load: (options?: any) => Promise<ObjectDetection>;
      detect: (video: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement) => Promise<Detection[]>;
    }
  
    const handTrack: {
      load: (options?: any) => Promise<ObjectDetection>;
      startVideo: (video: HTMLVideoElement) => Promise<boolean>;
      stopVideo: (video: HTMLVideoElement) => void;
    };
  
    export default handTrack;
  }
  