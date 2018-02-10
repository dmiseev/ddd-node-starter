import { Kernel } from 'inversify';

let kernel: Kernel = new Kernel();

export function getKernel() {
    return kernel;
}

export function setKernel(k: Kernel) {
    kernel = k;
}

export function refreshKernel() {
    kernel = new Kernel();
}