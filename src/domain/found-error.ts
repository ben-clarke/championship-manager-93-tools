export default class SequenceFound extends Error {
  start: number;

  constructor(message: string, index: number) {
    super(message);
    this.start = index;
  }
}
