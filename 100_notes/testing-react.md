# Testing React

## JEST: Testing a Componentes de React
  - Enzyme: Requiere config en el   setupTesting.js
    - Facilita el trabajo al simular clicks, obtener el Componente renderizado y demas tareas que con  @testing-library/react  se torna complejo
    - A Marzo 2022 enzyme NO tiene soporte para la version de React 17
    
  - Enzyme: Testing a Functional Components de React.
  - Enzyme to JSON: Generar el SnapShot del Componente en formato JSON
        npm i -D enzyme enzyme-to-json
        npm install --save-dev @wojtekmaj/enzyme-adapter-react-17

  - @testing-library/react-hooks: Libreria muy utilizada para testear HOOKS
    - NO requiere configuracion en el  setupTesting.js
        npm install --save-dev @testing-library/react-hooks
    - Docs: 
        https://github.com/testing-library/react-hooks-testing-library






### Setup Tests V17:  setupTests.js
```js
import '@testing-library/jest-dom';

// Enzyme
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// Enzyme to JSON
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
```






### Testing with JEST / enzyme:
  - shallow para generar snapshots de FC simples, FC q NO sean Hight Order Components
  - mount()   <-  FC mas complejos
      - Renderizar higth order component
      - Renderizar Parent Components
      ```js
      import { shallow } from 'enzyme';
      import { mount } from 'enzyme';

      const wrapper = shallow(<FC {...obj} />);
      const wrapper = mount(<FC {...obj} />);
      ```
  
  - Podemos usar varios methods:
      - .find()   =   document.querySelector()   de JS
      - .text()   =   .textContent  de JS
      - .html()   =   .innerHTML  de JS

    - wrapper.find('SELECTOR')
      - Clases de CSS: '.class'
      - ID:             '#id'
      - HTML TAG:       'tagName'  <- 'form'
      - FC:             'FCName'   <- 'AddTodo'
      - Saber si existe:  .exists()
          ```js
          expect(wrapper.find('.loading').exists()).toBe(false);
          ```
  
  - Simular eventos:
    -  .simulate('EVENT_NAME' [, {Event_Obj}])
          - {}    <-    Si se simula el  onSubmit()  y este recibe al  e
    -  .prop('EVENT_NAME')({})
          - {}    <-    Si se requiere enviar Argumentos/e

  - Acceder a Properties del HTML:
      - .prop('HTML Attribute'))
          ```js
          wrapper.find('form').prop('onSubmit')({
            preventDefault() {},
          });
          ```

  - Verificar si tiene una clase CSS:
    - .hasClass('class')  <-  Retorna  true/false






### Testing a Hooks
  - Para testear hooks usamos:  @testing-library/react-hooks
          renderHook( () => useHook(Args) )
    - renderHook( () => usemHook(Args) )
      - Podemos destructuring del resultado de ejecutar el Hook
      - A este resultamos debemos hacerle el  destructuring  del  CURRENT. Q es el resultado del Hook en ese momento dado.
      - Podemos desestructurar     waitForNextUpdate()    para esperar a un cambio de state producto de usar el hook <- peticiones async/useEffect

    - act()   <-  Para f(x) q modifican el state ( setState() / dispatch - useReducer )
      - dispatch del useReducer   <-  Para Redux se hace el mock del  dispatch  del   store

      ```js
        const { result } = renderHook(() => useCounter(Args));
        const { increment } = result.current;

        act(() => {
          increment();
        });
      ```
    
  

  - Simular la respusta de un Hook: Esta respuesta es usada automatic x el FC testeado que hacemos   wrapper
    - Primero se hace un mock del hook y luego se usa mockReturnValue(RESP_FALSA)
      ```js
        // Mock de un hook:
        jest.mock('path_hook')

        // Falsear el return del hook mockeado
        useHook.mockReturnValue({
          counter: 10,
          increment: () => {},
        });
      ```
      



  --- Testear un  Reducer - useReducer()
    - Como los Reducers son simples f(x) Puras q reciben un state y un action testearlos es facil, como a un f(x) normal
      ```js
        test('should delete a todo', () => {
          const state = todoReducer(demoTodos, {
            type: 'remove',
            payload: todoToRemove.id,
          });

          expect(state).toEqual(
            [...demoTodos].filter(todo => todo.id !== todoToRemove.id)
          );
        });
      ```


      - dispatch()  
        - Si queremos ver los efectos de un dispatch simplemente lo usamos dentro de un  act(cb)
        - Si queremos saber si el dispatch fue llamado, quien lo llamo y con q args se lo llamo usamo una  jes.fn()
          - Todo    dispatch    de un   useReducer   debe ser testeado con un  mock ???
              const dispatch = jest.fn();


    - Esperar q lo q se espera sea de 1 tipo: En este caso str
      ```js
        expect(handleAddTodo).toHaveBeenCalledWith({
          id: expect.any(String),
          desc: value,
          done: false,
        });
      ```


    - Testear Funciones dentro del Component  /  Hooks
      - jest.fn()
        - Mantengo la Referencia a esa f(x) de Jest y asi YA puedo evaluar ciertas cosas
          - Cuantas veces fue llamada la f(x), quien llamo a la f(x), con q Arg fue llamada, etc.
            - .toHaveBeenCalledTimes(NUM)
            - .toHaveBeenCalledWith(ARGS_QUE_DEBIERON_LLAMAR_FX)
              - Con cualquier data type:
                - .toHaveBeenCalledWith(expect.any(Data_Type));
      ```js
        const handleToggle = jest.fn();
        ...
        expect(handleToggle).toHaveBeenCalledTimes(1);
        expect(handleToggle).toHaveBeenCalledWith(todo.id);
      ```


    - Hacer un mock del  localStorage
      ```js 
      Storage.prototype.setItem = jest.fn();
      ```




  --- Testear un  useContext()
    - Si la App W con un Context.Provider, en los Tests, a cada Children debo proveerle ese context provider
    - SI el FC es un Child del Hight Order Component al q se le aplico el Context se le deve proveer dicho Context:
      - Solo se lo importa y ya, NO hace falta hacer mas nada.
      - Se lo usa normalmente como en codigo normal
      - Si los FC/Routers/Children usan datos del  Context  debo proveerlo, tal cual se lo hace en la App.
    ```js
      const wrapper = mount(
        <UserContext.Provider value={{ user, setUser }}>
          <LoginScreen />
        </UserContext.Provider>
      );
    ```

   
   
   
   
   
   
## Testing al React Router DOM v6:
  - -- Memory Router:
    - Si algun Children utiliza el     useNavigate() / <Navigate/> / useLocation()      debo proveerlo con el   MemoryRouter

    ```js
      import { MemoryRouter } from 'react-router-dom';

      const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
          <MemoryRouter>
            <DashboardRoutes />
          </MemoryRouter>
        </AuthContext.Provider>
      );
    ```


    - Testear RUTAS ESPECIFICAS
        <MemoryRouter   initialEntries={['PATH']}  > ...


    - Testear Query params:    ' ?q=  & '
      - 1er query param:  ?
      - 2+  qery params:  &
        
        // Testear Path con Query params
        <MemoryRouter initialEntries={['PATH?q=batman']} > ....

        // Mas de 1 Qery params:
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
      
      


  - -- Mock de funciones y requireActual     <-   ...jest.requireActual('PATH')
    - Hacer un mock de una libreria y sobreescribir un f(x) en particular
      - Al hacer esto se debe usar el  .requireActual  para que se mantenga el resto de f(x) de la libreria y solo se haga el mock de un f(x) en concreto (la que sobrescribimos)
    - Testear funciones / Hooks propios de una Libreria Externa:
      - Redefinimos el  hook  de interes
        - Debe llevar el prefijo   mock   sino da error
      
      ```js
        const mockNavigate = jest.fn();

        jest.mock('react-router-dom', () => ({
          ...jest.requireActual('react-router-dom'),
          useNavigate: () => mockNavigate,
        }));

        ......
        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
      ```




  - -- Testear Rutas Privadas:
    - Se estrcutura el  wrapper:
      
      const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
          <MemoryRouter initialEntries={['/']}>
            <PrivateRoute>
              <h1 className="private-component">Private Component</h1>
            </PrivateRoute>
          </MemoryRouter>
        </AuthContext.Provider>
      );
      

    - Se puede hacer un  Mock del component  Navigate:
      - Para que No de error en el login
      ```js
        jest.mock('react-router-dom', () => ({
          ...jest.requireActual('react-router-dom'),
          Navigate: () => <span>Redireccionando al Login</span>,
        }));

        ......
        expect(wrapper.text().trim()).toBe('Redireccionando al Login');
      ```


  - W con el localStorage:
    - Se lo W normalmente, como en el code <- Si NO esta mocekado
  






## Testing a Redux:
  --- Hacer un mock del Store    <-   redux-mock-store
    - Para saber si se llamo el dispatch se hace 1 mock del dispatch del store
    - Siempre q se creen mocks se los debe limpiar con un   beforeEach(cb)
          beforeEach(() => {
            jest.clearAllMocks();
          });

  ```js
    import configureStore from 'redux-mock-store';
    import thunk from 'redux-thunk';

    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    const initState = {}
    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <FComponent />
      </Provider>
    );
  ```


  --- Pruebas de acciones Async - startNewNote
    - npm install redux-mock-store --save-dev
      - Nos permite hacer un mock del Store

    - NO hacer pruebas/testing en el ambiente de produccion
      - Crear un DB identico, pero solo para testing
        - La DB de testing debe ser igual a la de produccion
        - Se deberia W con 3 DB: Desarrollo, Testing y Produccion

    - Crear DB de testing
      - Crearla desde cero
      - Luego la configuramos con variables de entorno



  --- Verificar las Acciones que se dispararon con el    dispatch()    del store
    - En NINGUN test de Action se hace mock del  store.dispatch
    - Para acciones Async se hace await al store.dispatch(action())
      - Cuando se hace dispatch se puede ver las acciones disparadas con   .getActions()
        - Esto devuelve un Arr de las acciones disparadas

    ```js
      await store.dispatch(startLogout());

      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: types.logout });
    ```

    - Pruebas en las acciones de Auth
      - En este caso, nose xq, cuando se usa >1 vez el  store.dispatch()  se le debe colocar el comentario al incio para que sea un archivo de node.
          /**
          * @jest-environment node
          */

      - Si sehace esto, la forma de crear archivos cambia.
        /home/adrian/code/a_front/d_React/a_React-FH/19___testing_journal-app-v5/src/tests/actions/notes.test.js




  --- Pruebas en Componentes de Terceros
    - Se debe proveer el escenario de W, como es Redux se debe proveer el Store
    - Se hace mock de las f(x)/Actions que se disparan en el FC de 3ros
    
    - Haceer Mock de lo que sea necesario

     

  --- Solventar Error de NO tener espacio para Renderizar algo
    - Como estamos en testing no tiene espacio para dibujar el Modal
      - Por lo cual, usamos:       ariaHideApp      de forma condicional
            ariaHideApp={!process.env.NODE_ENV === 'test'}
      - Tambien va a fallar el HTML Cavas que usa el FC de 3ro:
        - En el  setupTests.js:
            HTMLCanvasElement.prototype.getContext = () => {};

 