export default class LCG {
  private state: number;

  constructor(seed: number | null = null) {
    if (seed === null) {
      this.state = this.getDailySeed();
    } else {
      this.state = seed;
    }
  }

  // Generate the next integer in the sequence
  nextInt(): number {
    const a = 1664525;
    const c = 1013904223;
    const m = 2 ** 32;

    this.state = (a * this.state + c) % m;
    return this.state;
  }

  // Generate the next floating-point number in [0, 1)
  nextFloat(): number {
    return this.nextInt() / 2 ** 32;
  }

  // Get the seed based on the current date (YYYYMMDD)
  private getDailySeed(): number {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 1–12
    const day = now.getDate(); // 1–31

    // Format as YYYYMMDD (e.g., 20260108)
    const dateStr = `${year}${month.toString().padStart(2, "0")}${day
      .toString()
      .padStart(2, "0")}`;
    return parseInt(dateStr, 10);
  }
}
