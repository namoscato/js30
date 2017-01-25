/* eslint-disable no-console */

(() => {
    const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];
    const p = document.querySelector('p');

    window.makeGreen = () => {
        p.style.color = '#BADA55';
        p.style.fontSize = '50px';
    };

    // Regular
    console.log('hello world!');

    // Interpolated
    console.log('hello %s!', 'world');

    // Styled
    console.log('%chello world!', 'font-weight: bold; font-size: 2em;');

    // warning!
    console.warn('hello world!');

    // Error :|
    console.error('hello world!');

    // Info
    console.info('hello world!');

    // Testing
    console.assert(1 === 2, 'one does not equal two');

    // clearing
    console.clear();

    // Viewing DOM Elements
    console.log(p);
    console.dir(p);

    // Grouping together

    dogs.forEach((dog) => {
        console.groupCollapsed(dog.name);
        console.log(`Name: ${dog.name}`);
        console.log(`Age: ${dog.age}`);
        console.groupEnd(dog.name);
    });

    // counting
    console.count('hello');
    console.count('hello');
    console.count('hello');

    // timing
    console.time('fetching data');
    console.timeEnd('fetching data');

    console.table(dogs);
})();
