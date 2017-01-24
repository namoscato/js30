(() => {
    const BOARD_SCALE = 0.5;
    const MAGNETIC_RADIUS = 4000;

    const image = new window.Image();
    const imagePadding = 0.05 * window.innerHeight;

    function getRandomNumber(min, max) {
        return (Math.random() * (max - min)) + min;
    }

    class Hair {

        constructor(board) {
            this.board = board;

            this.x = getRandomNumber(0, this.board.getWidth());
            this.y = getRandomNumber(0, this.board.getHeight());

            this.draw();
        }

        move(mouseX, mouseY, deltaX, deltaY) {
            const diffX = this.x - mouseX;
            const diffY = this.y - mouseY;
            const sum = (diffX * diffX) + (diffY * diffY);
            const radius = getRandomNumber(MAGNETIC_RADIUS * 0.1, MAGNETIC_RADIUS);

            let x = this.x;
            let y = this.y;

            if ((sum * sum) < (radius * radius)) {
                x += deltaX + getRandomNumber(0, (mouseX - x) * 0.06);
                y += deltaY + getRandomNumber(0, (mouseY - y) * 0.06);
            }

            if (this.board.isPositionAvailable(x, y)) {
                this.x = x;
                this.y = y;
            }

            this.draw();
        }

        draw() {
            this.board.getContext().fillRect(this.x, this.y, 1, 1);
        }
    }

    class Board {

        constructor(hairCount) {
            const hairs = [];

            this.canvas = document.getElementById('draw');
            this.context = this.canvas.getContext('2d');
            this.contents = {};

            this.canvas.height = window.innerHeight * BOARD_SCALE;
            this.canvas.width = window.innerWidth * BOARD_SCALE;
            this.canvas.style.height = `${window.innerHeight}px`;
            this.canvas.style.width = `${window.innerWidth}px`;

            image.onload = () => {
                image.style.height = `${window.innerHeight - (2 * imagePadding)}px`;
                image.style.marginLeft = `${(window.innerWidth / 2) - (image.width / 2)}px`;
                image.style.marginTop = `${imagePadding}px`;
            };

            image.id = 'willy';
            image.src = 'willy.jpg';

            this.canvas.parentNode.insertBefore(image, this.canvas);

            for (let i = 0; i < hairCount; i += 1) {
                hairs.push(new Hair(this));
            }

            document.onmousedown = (e) => {
                this.mouseX = e.clientX * BOARD_SCALE;
                this.mouseY = e.clientY * BOARD_SCALE;
                this.draggingState = true;
            };

            document.onmouseup = () => {
                this.draggingState = false;
            };

            document.onmousemove = (e) => {
                if (!this.draggingState) {
                    return;
                }

                const mouseX = e.clientX * BOARD_SCALE;
                const mouseY = e.clientY * BOARD_SCALE;
                const deltaX = mouseX - this.mouseX;
                const deltaY = mouseY - this.mouseY;

                this.contents = {};
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

                hairs.forEach((hair) => {
                    hair.move(mouseX, mouseY, deltaX, deltaY);
                });

                this.mouseX = mouseX;
                this.mouseY = mouseY;
            };
        }

        isDragging() {
            return this.draggingState;
        }

        isPositionAvailable(x, y) {
            const xInteger = Math.floor(x);
            const yInteger = Math.floor(y);

            if (typeof this.contents[xInteger] === 'undefined') {
                this.contents[xInteger] = {};
            }

            if (typeof this.contents[xInteger][yInteger] === 'undefined') {
                this.contents[xInteger][yInteger] = true;
                return true;
            }

            return false;
        }

        getWidth() {
            return this.canvas.width;
        }

        getHeight() {
            return this.canvas.height;
        }

        getContext() {
            return this.context;
        }
    }

    new Board(10000); // eslint-disable-line no-new
})();
