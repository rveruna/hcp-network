// src/utils/fetchOrcidName.ts

const nameCache = new Map<string, string>();

export function extractOrcidId(input: string): string | null {
  const match = input.match(/\d{4}-\d{4}-\d{4}-\d{3}[\dX]/);
  return match ? match[0] : null;
}

class RequestQueue {
  private queue: (() => void)[] = [];
  private activeCount = 0;
  private readonly concurrency: number;

  constructor(concurrency: number) {
    this.concurrency = concurrency;
  }

  add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const run = async () => {
        this.activeCount++;
        try {
          const result = await fn();
          resolve(result);
        } catch (err) {
          reject(err);
        } finally {
          this.activeCount--;
          this.next();
        }
      };

      if (this.activeCount < this.concurrency) {
        run();
      } else {
        this.queue.push(run);
      }
    });
  }

  private next() {
    if (this.queue.length > 0 && this.activeCount < this.concurrency) {
      const task = this.queue.shift();
      task?.();
    }
  }
}

const queue = new RequestQueue(3);

export async function fetchOrcidName(input: string): Promise<string> {
  const orcidId = extractOrcidId(input);
  if (!orcidId) return 'Unknown';

  if (nameCache.has(orcidId)) {
    return nameCache.get(orcidId)!;
  }

  const ORCID_TOKEN = '16b908ac-9df5-48d4-8706-1ecf1dd09392';

  return queue.add(async () => {
    try {
      const res = await fetch(`/orcid-proxy/${orcidId}/personal-details`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${ORCID_TOKEN}`
        }
      });

      if (!res.ok) {
        nameCache.set(orcidId, 'Unknown');
        return 'Unknown';
      }

      const data = await res.json();
      const name = data?.name?.['given-names']?.value + ' ' + data?.name?.['family-name']?.value;

      if (name?.trim()) {
        nameCache.set(orcidId, name);
        return name;
      } else {
        nameCache.set(orcidId, 'Unknown');
        return 'Unknown';
      }
    } catch (e) {
      nameCache.set(orcidId, 'Unknown');
      return 'Unknown';
    }
  });
}
