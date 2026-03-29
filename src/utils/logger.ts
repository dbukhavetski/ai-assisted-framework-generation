/**
 * Provides a minimal typed logger for test lifecycle and diagnostics.
 */
export class Logger {
  /**
   * Logs an informational message.
   */
  public info(message: string): void {
    this.write('INFO', message);
  }

  /**
   * Logs a warning message.
   */
  public warn(message: string): void {
    this.write('WARN', message);
  }

  /**
   * Logs an error message.
   */
  public error(message: string): void {
    this.write('ERROR', message);
  }

  /**
   * Logs a debug message.
   */
  public debug(message: string): void {
    this.write('DEBUG', message);
  }

  private write(level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG', message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}] ${message}`);
  }
}

export const logger = new Logger();