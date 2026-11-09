/**
 * Gekko Runner - Web Audio API Sound Synthesizer
 * 100% Offline, Zero dipendenze, Sintesi procedurale in tempo reale a 8-bit.
 * Buffer di rumore bianco pre-allocato per zero-allocation sul main thread.
 */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.noiseBuffer = null;
        this.muted = localStorage.getItem('kasuality_gekko_muted') === 'true';
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();

                // Pre-alloca un unico buffer di rumore bianco riutilizzabile (0.25s) a 48kHz
                const bufferSize = Math.floor(this.ctx.sampleRate * 0.25);
                this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
                const data = this.noiseBuffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }

                this.initialized = true;
            }
        } catch (e) {
            console.warn('Web Audio API non supportata:', e);
        }
    }

    resume() {
        if (!this.initialized) this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('kasuality_gekko_muted', this.muted);
        return this.muted;
    }

    // Suono Salto: arpeggio rapido verso l'alto
    playJump() {
        if (this.muted) return;
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.14);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.16);
    }

    // Suono Chinata / Scivolata: fruscio rapido (Zero-Allocation)
    playSlide() {
        if (this.muted) return;
        this.resume();
        if (!this.ctx || !this.noiseBuffer) return;

        const now = this.ctx.currentTime;
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, now);
        filter.frequency.exponentialRampToValueAtTime(200, now + 0.12);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
        noise.stop(now + 0.12);
    }

    // Suono Spray Bomboletta: "pssshh" pressurizzato (Zero-Allocation)
    playSpray() {
        if (this.muted) return;
        this.resume();
        if (!this.ctx || !this.noiseBuffer) return;

        const now = this.ctx.currentTime;
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(3200, now);
        filter.Q.setValueAtTime(1.8, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
        noise.stop(now + 0.22);
    }

    // Suono Colore Esplosione: accordo armonico brillante
    playColorSplash() {
        if (this.muted) return;
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // Do, Mi, Sol, Do (C Major)

        freqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.025);

            gain.gain.setValueAtTime(0.06, now + idx * 0.025);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.025 + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.025);
            osc.stop(now + idx * 0.025 + 0.25);
        });
    }

    // Suono Traguardo 100 Punti: squillo acuto rétro
    playMilestone() {
        if (this.muted) return;
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const freqs = [587.33, 880.00]; // Re, La

        freqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.07);

            gain.gain.setValueAtTime(0.12, now + idx * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.18);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.07);
            osc.stop(now + idx * 0.07 + 0.18);
        });
    }

    // Suono Game Over: discesa dissonante
    playGameOver() {
        if (this.muted) return;
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(65, now + 0.38);

        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.42);
    }
}

// Istanza globale accessibile
window.soundEngine = new SoundEngine();
