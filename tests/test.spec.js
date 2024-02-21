import { Selector } from 'testcafe';
//prueba de buscar h1 con el texto de Welcome to your Angular App
fixture `Example Page`
    .page `http://localhost:4200`;

test('should display welcome message', async t => {
    await t
    .expect(Selector('h1').withText('Welcome to your Angular App!').exists).ok();
});

//prueba de buscar boton por clase login-button

test('should have a login button', async t => {
    await t
        .expect(Selector('.login-button').exists).ok();
});


//prueba de buscar a y h2 con texto 

test('should navigate to about page', async t => {
    await t
        .click(Selector('a').withText('About'))
        .expect(Selector('h2').withText('About Us').exists).ok();
});
