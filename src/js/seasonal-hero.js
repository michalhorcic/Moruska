(() => {
  try {
    // Use the Czech calendar month even when the visitor is in another time zone.
    const month = Number(new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Prague',
      month: 'numeric',
    }).format(new Date()));

    // December–February: winter; March–August: summer; September–November: mist.
    const photo = month === 12 || month <= 2
      ? 'chata-v-zime'
      : month <= 8
        ? 'chata-v-lete'
        : 'rano-nad-mlhou';

    document.documentElement.style.setProperty(
      '--hero-photo',
      `url('/img/gallery/web/${photo}.webp')`,
    );
  } catch {
    // CSS keeps the summer photo when time-zone support or JavaScript is unavailable.
  }
})();
