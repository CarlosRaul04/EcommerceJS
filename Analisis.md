#Análisis

Proyecto : Tienda Ecommerce

**Clases:**
- Observando la página fallabela, he notado que tiene varias clases necesarias, las principales que he llegado a identificar serían las de **Producto**, **Tipo de Producto**, **Categoría** y **Subcategoría**. Creo que estas clases son obligatorías para poder lograr la separación y filtrado necesario de cada producto que se venda dentro del ecommerce. Tambien he notado que filtran categorías por marcas, por lo que considero que sería tal vez necesario una clase Marca.

- La clase **Tipo de Producto** debe de tener bastantes atributos ya que creo que con esa clase manejariamos los filtros de los productos, se va a jugar bastante con eso ya que son totalmente necesarias en tiendas Ecommerce.

- Tambien he notado que hay muchas imágenes, por lo que tal vez se podría crear una clase llamada **Imagen** donde se haga referencia al url de la imagen y el producto al que está relacionado. 

- Considero que es necesario una clase **Usuario** para poder manejar el login y tambien preferencias del usuario.

- Yendo a los pedidos, es necesaria la clase **Pedido** para manejar las compras y los montos totales.

- Una clase **Método Pago**

**Base de Datos:**
Una base de datos es indispensable en este proyecto, ya que ahí almacenaremos todos los datos de las clases que creemos; nos servirá para poder crear nuestar apis y realizar las peticiones de la información. En nuestro caso, usaremos MongoDB que es una base de datos no relacional.

**Componentes**
- Login: Va a ser necesario un login, donde se maneje el ingreso de sesión y el registro. 
- Barra de Navegación: Es obligatoría una barra de navegación para que el usuario pueda ir navegando por las distintas opciones que ofrece la web.
- Hamburguer menu (Opcional): Este menú es el que tiene Falabella, va en el lateral y tiene la imagen de 3 lineas, lo presionas y te muestra el menú lateral, donde puedes seleccionar las categorías que desees y los tipo de producto que estes buscando.
- Barra lateral de Filtros o Menú de Filtros: Esta barra considero que es fundamental, ya que ayuda al usuario a buscar con mayor precisión el producto que desea.
- Carrusel de Imágenes: Esto es decorativo y tambien una manera de promocionar artículos en tendencia o nuevos productos que han llegado a la tienda. 
- Carrito: Es necesario implementar el carrito de compras, donde el usuario va a poder almacenar todas sus proximas compras y manipular la cantidad que desea. 

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

**Filtro de productos:**
- El usuario selecciona los criterios que desea aplicar a su filtro
- El sistema toma los parámetros
- Se realiza un for para recorrer todos los productos e ir comparando sus atributos con los que ha seleccionado el usuario
- Los productos que cumplan con los criterios seleccionados por el usuario se muestran.

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

