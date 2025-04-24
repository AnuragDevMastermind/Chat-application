import { ConversationResponse } from "@repo/datamodel/conversation";

export class SortedMap extends Map<string, ConversationResponse> {
  private sortedKeys: string[];

  constructor() {
    super();
    this.sortedKeys = [];
  }

  private compareFn(a: string, b: string): number {
    const convA = this.get(a);
    const convB = this.get(b);
    if (!convA || !convB) return 0;
    return Number(convB.lastMessageTime) - Number(convA.lastMessageTime);
  }

  set(key: string, value: ConversationResponse): this {
    if (!this.has(key)) {
      this.sortedKeys.push(key);
      this.sortedKeys.sort(this.compareFn.bind(this));
    }
    super.set(key, value);
    this.sortedKeys.sort(this.compareFn.bind(this)); // Ensure keys are sorted after setting a new value
    return this;
  }

  delete(key: string): boolean {
    if (super.delete(key)) {
      this.sortedKeys = this.sortedKeys.filter((k) => k !== key);
      return true;
    }
    return false;
  }

  clear(): void {
    super.clear();
    this.sortedKeys = [];
  }

  keys(): IterableIterator<string> {
    return this.sortedKeys.values();
  }

  values(): IterableIterator<ConversationResponse> {
    const values: ConversationResponse[] = this.sortedKeys.map(
      (key) => this.get(key)!
    );
    return values.values();
  }

  entries(): IterableIterator<[string, ConversationResponse]> {
    const entries: [string, ConversationResponse][] = this.sortedKeys.map(
      (key) => [key, this.get(key)!]
    );
    return entries.values();
  }
}
