import { Selector } from 'testcafe';

fixture `Example Page`
    .page `http://localhost:4200`;

test('should display welcome message', async t => {
    await t
    .expect(Selector('h1').withText('Welcome to your Angular App!').exists).ok();
});
