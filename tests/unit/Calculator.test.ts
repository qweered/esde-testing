import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Calculator } from '../../src/Calculator';
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';
import { join } from 'path';

describe('Calculator', () => {
  let calculator: Calculator;
  const testFilePath = join(__dirname, 'test-numbers.txt');
  const resultFilePath = join(__dirname, 'result.txt');

  beforeEach(() => {
    calculator = new Calculator();
  });

  afterEach(() => {
    // Cleanup test files
    [testFilePath, resultFilePath].forEach(file => {
      if (existsSync(file)) {
        unlinkSync(file);
      }
    });
  });

  describe('sum', () => {
    it('should sum multiple numbers correctly', () => {
      expect(calculator.sum(1, 2, 3)).toBe(6);
      expect(calculator.sum(0, 0, 0)).toBe(0);
      expect(calculator.sum(-1, 1)).toBe(0);
      expect(calculator.sum()).toBe(0);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers correctly', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
      expect(calculator.subtract(1, 1)).toBe(0);
      expect(calculator.subtract(-1, -1)).toBe(0);
      expect(calculator.subtract(0, 5)).toBe(-5);
    });
  });

  describe('multiply', () => {
    it('should multiply multiple numbers correctly', () => {
      expect(calculator.multiply(2, 3, 4)).toBe(24);
      expect(calculator.multiply(1, 0, 5)).toBe(0);
      expect(calculator.multiply(-2, 3)).toBe(-6);
      expect(calculator.multiply()).toBe(1);
    });
  });

  describe('divide', () => {
    it('should divide two numbers correctly', () => {
      expect(calculator.divide(6, 2)).toBe(3);
      expect(calculator.divide(5, 2)).toBe(2.5);
      expect(calculator.divide(0, 5)).toBe(0);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(5, 0)).toThrow('Division by zero is not allowed');
    });
  });

  describe('sumFromFile', () => {
    it('should sum numbers from file correctly', () => {
      writeFileSync(testFilePath, '1 2 3 4 5', 'utf-8');
      expect(calculator.sumFromFile(testFilePath)).toBe(15);
    });

    it('should handle invalid numbers in file', () => {
      writeFileSync(testFilePath, '1 abc 3 def 5', 'utf-8');
      expect(calculator.sumFromFile(testFilePath)).toBe(9);
    });

    it('should throw error for non-existent file', () => {
      expect(() => calculator.sumFromFile('non-existent.txt')).toThrow('Error reading file');
    });
  });

  describe('writeToFile', () => {
    it('should write result to file correctly', () => {
      Calculator.writeToFile(resultFilePath, 42);
      const content = readFileSync(resultFilePath, 'utf-8');
      expect(content).toBe('результат: 42');
    });

    it('should throw error when writing to invalid path', () => {
      expect(() => Calculator.writeToFile('/invalid/path/file.txt', 42)).toThrow('Error writing to file');
    });
  });
}); 