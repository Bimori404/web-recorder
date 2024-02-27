let mdrdr;
const start = document.getElementById('btnStart');
const stop = document.getElementById('btnStop');

if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
    start.addEventListener('click', async () => {
        const media = await navigator.mediaDevices.getDisplayMedia({
            video: { frameRate: { ideal: 30 } },
            audio: true
        });
        mdrdr = new MediaRecorder(media, {
            mimeType: 'video/webm;codecs=vp8,opus'
        });
        mdrdr.start();

        const [video] = media.getVideoTracks();
        video.addEventListener("ended", () => {
            mdrdr.stop();
        });

        mdrdr.addEventListener("dataavailable", (e) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(e.data);
            link.download = "captura.webm";
            link.click();
        });
    });

    stop.addEventListener('click', async () => {
        if (mdrdr && mdrdr.state !== "inactive") {
            mdrdr.stop();
        }
    });

} else {
    // console.error('El método getDisplayMedia no está disponible');
    alert('Hubo un error inesperado, la grabacion de pantalla no está disponible');
}