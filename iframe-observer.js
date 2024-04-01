// Use mutation observer to remake profiles as they are loaded to limit flashing
const iframeObserver = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
		for(added_node of mutation.addedNodes) {
			if(added_node.nodeType != 1)
				continue;
			if(!added_node.matches('.pcom-guide .s-lg-widget iframe'))
				continue;
			processIframe(added_node);
		}
	});
});
if(document.querySelector('main'))
	iframeObserver.observe(document.querySelector('main'), { subtree: true, childList: true });

/* Adjust CSS of iframe to be consistent */
function processIframe(iframe) {
	let widget = iframe.closest('.s-lg-widget');
	if(widget == null)
		return;
	
	// set widget CSS
	widget.style.display = 'block';
	widget.style.width = '80%';
	widget.style.maxWidth = '500px';
	widget.style.margin = '.5rem auto 1rem';
	widget.style.position = 'relative';

	// get height/width and set aspect ratio
	let h = iframe.getAttribute('height');
	let w = iframe.getAttribute('width');
	iframe.setAttribute('width', '100%'); 
	iframe.setAttribute('height', '100%');
	widget.style.aspectRatio = w + ' / ' + h;

	// iframe CSS
	iframe.style.position = 'absolute';
	iframe.style.top = '0';
	iframe.style.left = '0';
}

window.addEventListener('DOMContentLoaded', function(evt) {
	try {
		iframeObserver.disconnect();
	} catch(e) {
		console.error('Attempted to disconnect non-existent iframeObserver');
	}
});