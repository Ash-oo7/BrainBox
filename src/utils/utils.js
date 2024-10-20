export const setNewOffset = (element, mouseMoveDir = { x: 0, y: 0 }) => {
    const rect = element.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    let newX = rect.left - mouseMoveDir.x;
    let newY = rect.top - mouseMoveDir.y;

    // Ensure the card stays within the left boundary
    newX = Math.max(10, newX);

    // Ensure the card stays within the right boundary
    newX = Math.min(newX, windowWidth - rect.width - 20);
    // Ensure the card doesn't go above the top of the window
    newY = Math.max(10, newY);

    return { x: newX, y: newY };
};



export function autoGrow(textAreaRef) {
    const { current } = textAreaRef;
    current.style.height = "auto"; // Reset the height
    current.style.height = textAreaRef.current.scrollHeight + "px"; // Set the new height
}


export function setZIndex(selectedCard) {
    selectedCard.style.zIndex = 999;

    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    })
}


export function bodyParser(value) {
    try {
        return JSON.parse(value)
    } catch (error) {
        return value;
    }
}