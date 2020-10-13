$(document).ready(function() {
  //agregar clase activo al primer enlace -----------------------------
  $('.filtro__boton[categoria="todo"]').addClass('activo');
  

  //filtrando productos
  $('.filtro__boton').click(function() {
    var producto = $(this).attr('categoria');

    //agregando la clase "activo" al enlace seleccionado---------------
    $('.filtro__boton').removeClass('activo');
    $(this).addClass('activo');

    //ocultar productos------------------------------------------------
    $('.carta').hide();
    //mostrar productos------------------------------------------------
    $('.carta[categoria="'+producto+'"]').show();
  });

  //mostrando todos los productos--------------------------------------
  $('.filtro__boton[categoria="todo"]').click(function() {
    $('.carta').show();
  });
});