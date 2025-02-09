export enum Direction {
  Left = "left",
  Right = "right",
}

export type PageProps = {
  heading: string;
  paragraph: string;
  imageName: string;
  direction: Direction;
};
