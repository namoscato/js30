(() => {
    const BOARD_SCALE = .5;
    const MAGNETIC_RADIUS = 1000;

    const image = new Image();
    const imagePadding = .05 * window.innerHeight;
    const magneticRadisSquare = MAGNETIC_RADIUS * MAGNETIC_RADIUS;

    class Board {

        constructor(hairCount) {
            const hairs = [];

            this._canvas = document.getElementById('draw');
            this._context = this._canvas.getContext('2d');

            this._canvas.height = window.innerHeight * BOARD_SCALE;
            this._canvas.width = window.innerWidth * BOARD_SCALE;
            this._canvas.style.height = `${window.innerHeight}px`;
            this._canvas.style.width = `${window.innerWidth}px`;

            image.onload = () => {
                image.style.height = `${window.innerHeight - (2 * imagePadding)}px`;
                image.style.marginLeft = `${window.innerWidth / 2 - image.width / 2}px`;
                image.style.marginTop = `${imagePadding}px`;
            };

            image.id = 'willy';
            image.src = 'willy.jpg';

            this._canvas.parentNode.insertBefore(image, this._canvas);

            for (let i = 0; i < hairCount; i++) {
                hairs.push(new Hair(this));
            }

            document.onmousedown = (e) => {
                this._mouseX = e.clientX * BOARD_SCALE;
                this._mouseY = e.clientY * BOARD_SCALE;
                this._isDragging = true;
            }

            document.onmouseup = () => {
                this._isDragging = false;
            }

            document.onmousemove = (e) => {
                if (!this._isDragging) {
                    return;
                }

                const mouseX = e.clientX * BOARD_SCALE;
                const mouseY = e.clientY * BOARD_SCALE;
                const deltaX = mouseX - this._mouseX;
                const deltaY = mouseY - this._mouseY;

                this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

                hairs.forEach((hair) => {
                    hair.draw(mouseX, mouseY, deltaX, deltaY);
                });

                this._mouseX = mouseX;
                this._mouseY = mouseY;
            };
        }

        isDragging() {
            return this._isDragging;
        }

        getWidth() {
            return this._canvas.width;
        }

        getHeight() {
            return this._canvas.height;
        }

        getContext() {
            return this._context;
        }
    }

    class Hair {

        constructor(board, x, y) {
            this._board = board;

            this._x = this.getRandomNumber(0, this._board.getWidth());
            this._y = this.getRandomNumber(0, this._board.getHeight());

            this.draw();
        }

        draw(mouseX, mouseY, deltaX, deltaY) {
            const diffX = this._x - mouseX;
            const diffY = this._y - mouseY;
            const sum = (diffX * diffX) + (diffY * diffY);
            const radius = this.getRandomNumber(MAGNETIC_RADIUS * .1, MAGNETIC_RADIUS);

            if ((sum * sum) < (radius * radius)) {
                this._x += deltaX;
                this._y += deltaY;

                // if (sum > MAGNETIC_RADIUS) {
                    this._x += this.getRandomNumber(0, (mouseX - this._x) * .1);
                    this._y += this.getRandomNumber(0, (mouseY - this._y) * .1);
                // }
            }

            this._board.getContext().fillRect(this._x, this._y, 2, 2);
        }

        getRandomNumber(min, max) {
            return (Math.random() * (max - min)) + min;
        }
    }

    const board = new Board(10000);

})();
