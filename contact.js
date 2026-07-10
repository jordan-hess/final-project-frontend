// This page has no backend to actually send a message to (no checkout/
// account/order-history backend anywhere on this site either — see the
// design spec's explicit scope notes), so the form's <form action=""> with
// no submit handler meant clicking "Send" triggered a full, real page
// navigation: a GET request back to contact.html with every field appended
// as a query string (e.g. contact.html?contact-name=...), reloading the
// page and discarding whatever the visitor typed. Prevent that and
// acknowledge the submission the same way the rest of the site
// acknowledges actions with no real backend effect (showToast), instead of
// silently doing nothing (this file was previously empty).
function handleContactSubmit(form) {
    form.reset();
    showToast("Thanks! Your message has been sent — we'll get back to you soon.");
}
