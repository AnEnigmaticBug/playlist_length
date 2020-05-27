function durationSpanSelector(index) {
    return `ytd-playlist-video-renderer.style-scope:nth-child(${index}) ytd-thumbnail-overlay-time-status-renderer span`;
}

function videoListLoadedFully() {
    return document.querySelector('yt-page-navigation-progress') != null;
}

const observer = new MutationObserver((_, __) => {
    if (!videoListLoadedFully()) {
        return;
    }

    observer.disconnect();

    const durations = [];

    for (let i = 1; true; ++i) {
        let durationSpan = document.querySelector(durationSpanSelector(i));

        if (durationSpan == null) {
            break;
        }

        durations.push(Duration.fromString(durationSpan.innerHTML));
    }

    console.log(`Considered ${durations.length} videos`);

    const destnSelector = 'yt-formatted-string.style-scope.ytd-playlist-sidebar-primary-info-renderer';
    const totalDuration = durations.reduce((prev, curr) => curr.add(prev), Duration.zero);

    document.querySelectorAll(destnSelector)[1].innerHTML += ` • ${totalDuration.toString()}`;
});

observer.observe(document, { childList: true, subtree: true });
