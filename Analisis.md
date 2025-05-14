#Análisis

Proyecto : Tienda Ecommerce

**Clases:**
- Observando la página fallabela, he notado que tiene varias clases necesarias, las principales que he llegado a identificar serían las de **Producto**, **Tipo de Producto**, **Categoría** y **Subcategoría**. Creo que estas clases son obligatorías para poder lograr la separación y filtrado necesario de cada producto que se venda dentro del ecommerce. Tambien he notado que filtran categorías por marcas, por lo que considero que sería tal vez necesario una clase Marca.

- La clase **Tipo de Producto** debe de tener bastantes atributos ya que creo que con esa clase manejariamos los filtros de los productos, se va a jugar bastante con eso ya que son totalmente necesarias en tiendas Ecommerce.

- Tambien he notado que hay muchas imágenes, por lo que tal vez se podría crear una clase llamada **Imagen** donde se haga referencia al url de la imagen y el producto al que está relacionado. 

- Considero que es necesario una clase **Usuario** para poder manejar el login y tambien preferencias del usuario.

- Yendo a los pedidos, es necesaria la clase **Pedido** para manejar las compras y los montos totales.

- Las clases **Pago** y **Método Pago** son necesarias para que el administrador pueda verificar todos los pagos realizados.

- La clase **Envío** va a servir para poder manejar el tipo de envío que selecciona el usuario y sus tarifas.

- La clase **Cupones** es opcional, será util para aplicar descuentos a los productos seleccionados en el carrito

- La clase **Inventario** es necesaria para el manejo de stock de los productos. 

**Base de Datos:**
Una base de datos es indispensable en este proyecto, ya que ahí almacenaremos todos los datos de las clases que creemos; nos servirá para poder crear nuestar apis y realizar las peticiones de la información.

**Módulos**

**Autenticación y Usuarios**

- Formulario de Inicio de Sesión: Va a ser necesario un login, donde se maneje el ingreso de sesión y el registro.

- Formulario de Recuperación de Contraseña: Un pequeño formulario donde se podrá recuperar la contraseña con el correo. 

- Menú de Usuario: Es necesario un Menú donde el usuario podrá visualizar sus datos y actualizarlos. Tambien podrá desactivar su cuenta si lo ve necesario.

- Validación de roles: El sistema validará la cuenta con la que se registra el usuario y ofrecerá experiencias distintas dependiendo del rol que sea.

**Productos**
- Menú de Producto: El administrador tiene que poder ingresar al formulario de creación y actualización de producto.

- Desactivación de Producto: El administrador podrá desactivar el producto que seleccione.

- Barra de Navegación: Es obligatoría una barra de navegación para que el usuario pueda ir navegando por las distintas opciones que ofrece la web.

- Hamburguer menu (Opcional): Este menú es el que tiene Falabella, va en el lateral y tiene la imagen de 3 lineas, lo presionas y te muestra el menú lateral, donde puedes seleccionar las categorías que desees y los tipo de producto que estes buscando.

- Lista de Productos: El sistema debe listar los productos cuando se entre a la categoría elegida.

- Barra lateral de Filtros o Menú de Filtros: Esta barra considero que es fundamental, ya que ayuda al usuario a buscar con mayor precisión el producto que desea.

- Carrusel de Imágenes: Esto es decorativo y tambien una manera de promocionar artículos en tendencia o nuevos productos que han llegado a la tienda. 

**Categorías y Subcategorias**

- Menú de Categoria/SubCategoría: El administrador tiene que poder ingresar al menú de Categoría/Subcategria y poder listar, crear, actualizar y desactivar.

- Barra de Navegación

- Hamburguer menu (Opcional)

**Pedidos**
- Crear Orden desde carrito: El usuario podrá crear su orden desde el carrito al seguir el proceso de "pagar"

- Lista de Pedidos: El usuario podrá listar sus pedidos realizados, en cambio, el administrador podrá listar pedidos en general o de alguien es específico.

- Detalle de Pedido: El usuario y administrador podrá visualizar el detalle de su pedido e información importante.

- Actualizar estado de pedido: El administrador podrá actualizar el estado del pedido del cliente que elija (pendiente, en envío, entragado, cancelado).

- Cancelar Orden : El usuario podrá cancelar su pedido dentro del detalle de orden. 

**Pagos**

- Historial de Pagos: El usuario podrá ver sus pagos realizados. El adminstrador podrá ver los pagos realizados de los clientes que elija

- Registrar Pago: El sistema debe de registrar el pago realizado, sea mediante una api o simulado

- Validar estado de pago: El sistema debe de validar el estado del pago para asegurar que se haya hecho correctamente o rechazado.

- Asociar Pago con Orden: El sistema debe asociar el pago realizado con el pedido correspondiente.

**Envíos**
- Menú de Direcciones: Debe haber un menú donde se vena las direcciones registradas por el usuario. Se debe poder modificar y agregar envío.

- Método de Envío: Dentro del procedimieno donde el usuario va a pagar debe haber una sección donde se seleccione el método de envío (Contra entrega, recojo en tienda y delivery).

- Estado de Envío: Dentro de la lista de pedidos se debe de poder visualizar el estado del pedido.

**Inventario**
- Registrar ingreso de stock: El administrador debe de poder modificar el stock disponible de los productos

- Salida de stock: El sistema debe de disminuir el stock de los products de manera automática

- Historial de movimientos: El administrador debe poder acceder al historial de movimientos.

**Carrito de Compras**
- Carrito: Es necesario implementar el carrito de compras, donde el usuario va a poder agregar, eliminar todos sus productos y manipular la cantidad que desea. 

- Calcular total: El sistema calculará el total de la compra sumando el precio de los productos multiplicados por su cantidad.

#Requerimientos

**Funcionales:** 

Requerimiento 01:
ID: RF01
Nombre: Registro de usuario
Desc: TE debe permitir que nuevos usuarios se registres proporcionando sus datos personales como nombre, apellido, correo electronico, dni, fecha de nacimiento, etc.

Requermiento 02:
ID: RF02
Nombre: Inicio de Sesión de Usuario
Desc: TE debe permitir que el usuario registrado inicie sesión con correo electrónico y contraseña válidos

Requerimiento 03:
ID: RF03
Nombre: Recuperación de Contraseña
Desc: TE debe permitir que el usuario recupere su contraseña mediante un enlace enviado a su correo electrónico.

Requerimiento 04:
ID: RF04
Nombre: Filtros de producto
Desc: TE debe permitir que el usuario seleccione los atributos para filtrar los productos como marca, talla, color, etc.

Requerimientos 05
ID: FR05
Nombre: Añadir producto al carrito
Desc: TE debe permitir que el usuario agregue un producto al carrito de compras.

Requerimientos 06
ID: FR06
Nombre: Realizar una compra
Des: TE debe permitir que el usuario realice la compra de sus productos seleccionados, eligiendo un tipo de pago y dirección de envío.

Requerimientos 07
ID: FR07
Nombre: Ver historial de compra
desc: TE debe permitir consultar el historial de compras anteriores

Requerimientos 08
ID: FR08
Nombre: Lógica de filtrado de Producto
desc: TE debe filtrar los productos para mostrar únicamente los que coincidan con los criterios seleccionados por el usuario.

Requerimientos 09
ID: FR10
Nombre: Manejo de Stock
desc: TE debe permitir gestionar el stock de los productos, disminuyéndolos en cada compra.

Requerimientos 10
ID: FR10
Nombre: Cálculo de precios y descuentos
desc: TE debe calcular el precio total de la compra, aplicando correctamente descuentos y promociones.

**No Funcionales:**



#Lógica

**Iniciar Sesión:**
- El usuario ingresa su correo electrónico 
- El usuario ingresa su contraseña
- El sistema valida las credenciales comparandolas con la base de datos.
- Si son datos validos, ingresa el usuario a su cuenta
- Si no son datos validos, el sistema le señala el dato incorrecto. Tiene un numero máximo de intentos, sino se bloquea durante 5 minutos.

**Recuperar Contraseña:**
- El usuario selecciona la opción "No recuerdas tu contraseña?"
- El sistema lo dirije a una interfaz donde le pedirá su correo electrónico
- El sistema validará que sea un correo registrado
- El sistema enviará un correo donde estará la contraseña del usuario

**Registrarse:**
- El usuario ingresa los datos requeridos (nombre, apellido, celular, dni, fecha de nacimiento, sexo, dirección, departamento y distrito)
- El sistema valida los datos
- Si hay un error, se comunica al usuario con una alerta
- Si está todo válido, se procede con la creación de la cuenta
- El sistema registra el usuario en la base de datos

**Filtro de productos:**
- El usuario selecciona los criterios que desea aplicar a su filtro
- El sistema toma los parámetros
- Se realiza un for para recorrer todos los productos e ir comparando sus atributos con los que ha seleccionado el usuario
- Los productos que cumplan con los criterios seleccionados por el usuario se muestran.

**Selección de Productos en el Carrito:**
- El usuario selecciona el producto que desea
- El usuario pone añadir en el carrito y su cantidad
- El sistema agrega el producto en el carrito y calcula el total
- Si el usuario sigue añadiendo más productos, el sistema sigue agregandolo al carrito y sumando todo al total.

**Comprar Producto**
- El usuario selecciona en "Comprar" directamente o "Pagar" en el carrito de compras.
- El sistema lo lleva a las sección de pago
- El sistema le pide que valide que la dirección esté correcta o si quiere modificar o agregar otra dirección.
- El sistema le pide al usuario que valide los datos.
- El sistema le pide al usuario que elija el tipo de envío (Contra entrega, Recojo en tienda o delivery)
- Si el usuario elige delivery, el sistema lo hace elegir el envío normal o preferencial.
- Si el usuario elije recojo en tienda, el sistema procede a ponerle las fechas disponibles de recojo. El usuario elige y confirma la fecha.
- Si el usuario elige contra entrega, el sistema lo hace elegir el envío normal o preferencial (si o si se paga el envío para confirmar compra).
- El sistema le pide al usuario que seleccione el método de pago (yape, tarjeta de credito o debito)
- El usuario elige el metodo de pago y le da a pagar.
- El sistema abre la pasarela de pagos correspondiente
- El usuario completa todo lo requerido
- La pasarela procesa el pago
- El sistema valida que el pago no haya sido rechazado.
- Si todo está bien, el sistema guarda el pedido en la base de datos con todo validado y manda un correo con los datos necesarios al usuario. 
- Si hay un error en la pasarela, se devuelve al usuario a la sección de pago y se le informa que hubo un error.

**Manejo de Stock:**
- El usuario selecciona el producto a comprar
- El usuario selecciona la cantidad a comprar del producto
- El Sistema realiza una comparación con un if, donde pregunta si el stock del producto es mayor o igual que la cantidad solicitada
- Si el stock del producto es menor, se muestra una alerta que diga "Stock Insuficiente".
- Si el stock del producto es mayor, procede la compra y decuenta la cantidad seleccionada al stock.
- El usuario procede con la selección del método de pago
- Confirma la compra y listo.

**Cálculo de precios y descuentos:**
- El usuario selecciona la cantidad del producto seleccionado y le da a continuar con la compra
- El sistema comienza a realizar los cálculos. 
- Se crea una variable que va a almacenar el total.
- Se hace un for para recorrer todo el carrito y los precios de los productos dentro de este
- Se obtiene el precio y luego se realiza un if
- Si el producto del carrito tiene descuento, se le resta esa cantidad al precio del producto que esté recorriendo en ese momento.
- Si no tiene descuento, sigue con el ciclo.
- El sistema suma el precio del producto que está recorriendo a la variable total.
- Finalmente, luego de haber repetido esos pasos con todos los productos del carrito, se imprime en la web el total a pagar. 

#Pseudocódigo

#Algoritmos

#Diagramas

