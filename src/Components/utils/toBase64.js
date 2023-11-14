

export default function imageUploaded() {
    let base64String = "";
    let file = document.querySelector(
        'input[type=file]')['files'][0];

    let reader = new FileReader();
    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
    }
    reader.readAsDataURL(file);
}

function displayString() {
    var image = new Image();
    image.src = 'data:image/png;base64,iVBORw0K...';
}

