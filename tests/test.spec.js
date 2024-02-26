import { Selector } from 'testcafe';
fixture `Example Page`
    .page `http://localhost:4200`;

    test('Prueba de envío de formulario con datos válidos', async t => {
        // Establece un manejador para los cuadros de diálogo nativos (alert)
        await t.setNativeDialogHandler(() => true);
    
        // Ingresa datos válidos en el formulario
        await t
            .typeText('#nombre', 'Usuario de Prueba')
            .typeText('#email', 'usuario@example.com')
            .typeText('#contrasena', 'contraseña123')
            .click('button[type="submit"]');
    });
    
    test('Prueba de validación de campos requeridos', async t => {
        // Intenta enviar el formulario sin completar ningún campo
        await t
            .click('button[type="submit"]');
    
        // Verifica que se muestran los mensajes de error de campos requeridos
        await t
            .expect(Selector('span').withText('El nombre es requerido.').exists).ok()
            .expect(Selector('span').withText('El email es requerido.').exists).ok()
            .expect(Selector('span').withText('La contraseña es requerida.').exists).ok();
    });
    
    test('Prueba de validación de formato de email inválido', async t => {
        // Ingresa un email inválido en el campo de email
        await t
            .typeText('#email', 'usuariodeejemplo28@gmail.')
            .click('button[type="submit"]');
    
        // Verifica que se muestra el mensaje de error de formato de email inválido
        await t
            .expect(Selector('.error-message').withText('El email debe tener un formato válido.').exists).ok();
    });
    
    

    test('El nombre, apellido paterno y apellido materno solo contengan letras', async t => {
        await t
            .typeText('#nombre', '123') // Intenta ingresar números en el campo de nombre
            .typeText('#apellidoPaterno', 'Paterno123') // Intenta ingresar números en el campo de apellido paterno
            .typeText('#apellidoMaterno', 'Materno123') // Intenta ingresar números en el campo de apellido materno
            .click('button[type="submit"]');
    
        await t
            .expect(Selector('span').withText('El nombre solo debe contener letras.').exists).ok()
            .expect(Selector('span').withText('El apellido paterno solo debe contener letras.').exists).ok()
            .expect(Selector('span').withText('El apellido materno solo debe contener letras.').exists).ok();
    });
    
    test('El teléfono solo contenga números', async t => {
        await t
            .typeText('#telefono', 'abcdefghij') // Intenta ingresar letras en el campo de teléfono
            .click('button[type="submit"]');
    
        await t
            .expect(Selector('span').withText('El teléfono solo debe contener números.').exists).ok();
    });
    
    
    test('La contraseña y la confirmación de la contraseña sean iguales', async t => {
        await t
            .typeText('#contrasena', 'contraseña123')
            .typeText('#confirmarContrasena', 'contraseña456') // Intenta ingresar una confirmación de contraseña diferente
            .click('button[type="submit"]');
    
        await t
            .expect(Selector('span').withText('Las contraseñas no coinciden.').exists).ok();
    });