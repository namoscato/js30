(() => {
    const body = document.querySelector('body');
    const styleControls = [
        {
            element: document.getElementById('spacing'),
            property: '--spacing',
            getValue: value => `${value}px`,
        },
        {
            element: document.getElementById('blur'),
            property: '--blur',
            getValue: value => `${value}px`,
        },
        {
            element: document.getElementById('base'),
            property: '--base-color',
            getValue: value => value,
        },
    ];

    function setControlStyle(control) {
        body.style.setProperty(control.property, control.getValue(control.element.value));
    }

    styleControls.forEach((control) => {
        setControlStyle(control);
        control.element.addEventListener('input', () => setControlStyle(control));
    });
})();
