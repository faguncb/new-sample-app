import { Buffer } from 'buffer';
import process from 'process';

// Extend Window interface for TypeScript
declare global {
    interface Window {
        Buffer: typeof Buffer;
        global: typeof globalThis;
        process: typeof process;
    }
}

// Make Buffer available globally
window.Buffer = Buffer;
window.global = globalThis;
window.process = process;

