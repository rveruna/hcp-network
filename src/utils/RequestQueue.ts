// src/utils/requestQueue.ts
type Task = () => Promise<void>;

export class RequestQueue {
  private concurrency: number;
  private running: number = 0;
  private queue: Task[] = [];

  constructor(concurrency: number = 5) {
    this.concurrency = concurrency;
  }

  add(task: Task) {
    this.queue.push(task);
    this.runNext();
  }

  private runNext() {
    if (this.running >= this.concurrency || this.queue.length === 0) return;

    const task = this.queue.shift();
    if (!task) return;

    this.running++;
    task().finally(() => {
      this.running--;
      this.runNext();
    });
  }
}
