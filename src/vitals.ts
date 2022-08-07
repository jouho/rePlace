// From https://github.com/vercel/vercel/blob/main/examples/create-react-app/src/vitals.js

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed() {
    return 'connection' in navigator &&
        navigator['connection'] &&
        'effectiveType' in navigator['connection']
        ? navigator['connection']['effectiveType' as keyof NetworkInformation]
        : '';
}

export function sendToVercelAnalytics(metric: any) {
    const analyticsId = process.env.REACT_APP_VERCEL_ANALYTICS_ID;
    if (!analyticsId) {
        return;
    }

    const body: any = {
        dsn: analyticsId,
        id: metric.id,
        page: window.location.pathname,
        href: window.location.href,
        event_name: metric.name,
        value: metric.value.toString(),
        speed: getConnectionSpeed(),
    };

    const blob = new Blob([new URLSearchParams(body).toString()], {
        // This content type is necessary for `sendBeacon`
        type: 'application/x-www-form-urlencoded',
    });
    if (navigator.sendBeacon) {
        navigator.sendBeacon(vitalsUrl, blob);
    } else
        fetch(vitalsUrl, {
            body: blob,
            method: 'POST',
            credentials: 'omit',
            keepalive: true,
        });
}
