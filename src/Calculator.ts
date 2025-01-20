import { readFileSync, writeFileSync } from 'fs';

export class Calculator {
  sum(...args: number[]): number {
    return args.reduce((acc, curr) => acc + curr, 0);
  }

  subtract(n1: number, n2: number): number {
    return n1 - n2;
  }

  multiply(...args: number[]): number {
    return args.reduce((acc, curr) => acc * curr, 1);
  }

  divide(n1: number, n2: number): number {
    if (n2 === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return n1 / n2;
  }

  sumFromFile(filePath: string): number {
    try {
      const content = readFileSync(filePath, 'utf-8');
      const numbers = content.split(/\s+/).map(Number).filter(n => !isNaN(n));
      return this.sum(...numbers);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error reading file: ${error.message}`);
      }
      throw new Error('Error reading file: Unknown error');
    }
  }

  static writeToFile(filePath: string, data: any): void {
    try {
      writeFileSync(filePath, `результат: ${data}`, 'utf-8');
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error writing to file: ${error.message}`);
      }
      throw new Error('Error writing to file: Unknown error');
    }
  }
} 