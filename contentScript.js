const groupName = 'Developers';

function findElementWithText(node) {

	if (node.nodeType === Node.TEXT_NODE) {
		const textContent = node.textContent.trim();

		if (textContent === groupName) {
			return node.parentNode;
		}
	}

	for (const childNode of node.childNodes) {
		const result = findElementWithText(childNode);

		if (result) {
			return result;
		}
	}

	return null;
}

function handleInputFocus(event) {
	const input = event.target;

	if (input.getAttribute("aria-label") === 'Comment area, start typing to enter text.' || input.placeholder === 'Add a comment…' || input.placeholder === '• You have an unsaved comment') {
		//set timeout to wait for 1 second
		setTimeout(function () {
		const button = document.querySelector('[data-testid="issue-comment-base.ui.comment.comment-visibility.comment-visibility-wrapper"] button');

		if (button) {
			button.click();
			const container = document.querySelector('.comment-visibility__menu-list');
			const elementWithText = findElementWithText(container);
			if (elementWithText) {
				elementWithText.click();
			}
		}
		}, 500);
	}
}

document.addEventListener('focus', handleInputFocus, true);
