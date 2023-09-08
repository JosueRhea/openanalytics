function sendDataToServer(e) {
    fetch("http://localhost:3000/api/insights", {
        body: JSON.stringify(e),
        method: "POST",
    })
        .then((res) => res.json()).then(data => console.log(data))
        .catch((e) => { });
}
function trackPageView() {
    sendDataToServer({
        path: window.location.pathname,
        referer: document.referrer,
        site_id: "dc4a6513-daf5-49b9-a478-56b52a90d21b",
    })
}
trackPageView();
