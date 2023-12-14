export class Timer {
    #start
    #end
    #stopped
    #frequency
    constructor() {
        this.#start = 0; // Valor de início da contagem
        this.#end = 0; // Valor de fim da contagem
        this.#stopped = false; // Estado da contagem
        this.#frequency = performance.now(); // Frequência de marcação de tempo inicial
    }

    startTimer() {
        if (this.#stopped) {
            const elapsed = this.#end - this.#start;
            this.#start = performance.now() - elapsed;
            this.#stopped = false;
        } else {
            this.#start = performance.now();
        }
    }

    stopTimer() {
        this.#end = performance.now(); 
        this.#stopped = true;
    }

    resetTimer() {
        let elapsed = 0;

        if (this.#stopped) {
            elapsed = this.#end - this.#start; 
            this.#start = performance.now();
            this.#stopped = false;
        } else {
            this.#end = performance.now(); 
            elapsed = this.#end - this.#start; 
            this.#start = this.#end; 
        }

        return elapsed / 1000; // Retorna o tempo decorrido em segundos
    }

    getElapsedSeconds() {
        let elapsed = 0;

        if (this.#stopped) {
            elapsed = this.#end - this.#start;
        } else {
            this.#end = performance.now();
            elapsed = this.#end - this.#start; 
        }

        return (elapsed / 1000).toFixed(3);
    }

    getElapsedMiliSeconds() {
        let elapsed = 0;

        if (this.#stopped) {
            elapsed = this.#end - this.#start;
        } else {
            this.#end = performance.now();
            elapsed = this.#end - this.#start; 
        }

        return elapsed.toFixed(2);
    }
}
