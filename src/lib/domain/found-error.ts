export default class SequenceFound extends Error {
  start: number;

  end: number;

  constructor(message: string, start: number, end: number) {
    super(message);
    this.start = start;
    this.end = end;
  }
}
