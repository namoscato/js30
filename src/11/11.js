(() => {
    const VOLUME_BAR_COUNT = 9;
    const VOLUME_BAR_SPACE = 3;
    const VOLUME_BAR_WIDTH = 4;

    const video = document.querySelector('.player-video');
    const playButton = document.querySelector('.player-button-play');
    const progress = document.querySelector('.player-progress');
    const skipButtons = document.querySelectorAll('[data-skip]');
    const volume = document.querySelector('.player-volume');
    const volumeRange = document.querySelector('.player-volume-range');
    const volumeBars = [];
    // eslint-disable-next-line max-len
    const volumeWidth = ((VOLUME_BAR_COUNT * VOLUME_BAR_WIDTH) + ((VOLUME_BAR_COUNT - 1) * VOLUME_BAR_SPACE));

    function resetVolumeBars() {
        volumeBars.forEach(bar => bar.classList.remove('is-active'));
    }

    function setVolume(value) {
        video.volume = value;

        volumeBars.forEach((bar, i) => {
            const fillValue = (value * volumeWidth) - (i * (VOLUME_BAR_WIDTH + VOLUME_BAR_SPACE));

            bar.classList.toggle('is-active', fillValue >= 0 && fillValue <= VOLUME_BAR_WIDTH);
            bar.style.setProperty('--fill', `${fillValue < 0 ? 0 : fillValue}px`);
        });
    }

    function togglePlay() {
        video[video.paused ? 'play' : 'pause']();
    }

    function updatePlayButton(isPlaying) {
        playButton.classList.toggle('is-playing', isPlaying);
        playButton.title = isPlaying ? 'Pause' : 'Play';
    }

    // Create volume bars
    volume.style.setProperty('--bar-space', `${VOLUME_BAR_SPACE}px`);
    volume.style.setProperty('--bar-width', `${VOLUME_BAR_WIDTH}px`);
    volume.style.setProperty('--width', `${volumeWidth}px`);

    for (let i = 0; i < VOLUME_BAR_COUNT; i += 1) {
        const div = document.createElement('div');
        div.draggable = false;
        volume.appendChild(div);
        volumeBars.push(div);
    }

    setVolume(0.5);
    resetVolumeBars();

    // Toggle play
    playButton.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    // Update play button
    video.addEventListener('play', () => updatePlayButton(true));
    video.addEventListener('pause', () => updatePlayButton(false));

    // Skip backwards and forwards
    skipButtons.forEach((button) => {
        button.addEventListener('click', () => {
            video.currentTime += Number(button.dataset.skip);
        });
    });

    // Volume
    volumeRange.addEventListener('input', () => setVolume(Number(volumeRange.value)));
    volumeRange.addEventListener('change', resetVolumeBars);

    video.addEventListener('timeupdate', () => {
        progress.style.setProperty('width', `${(video.currentTime / video.duration) * 100}%`);
    });
})();
