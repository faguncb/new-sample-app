export function logToUI(message: string) {
    console.log(message);
    const logDiv = document.getElementById('log') as HTMLDivElement;
    logDiv.innerHTML += `<p>${new Date().toISOString()}: ${message}</p>`;
    logDiv.scrollTop = logDiv.scrollHeight;
}

export function updateOutput(element: HTMLElement, content: string) {
    element.textContent = content;
}