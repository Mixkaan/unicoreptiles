    //array
    var an1 =document.getElementById("padre1");
    var an2 =document.getElementById("padre2"),
        array = ["nominal", "leatherback", "hypo", "cytrus", "orange", 
                "trans", "dunner"];

      for(i = 0; i< array.length; i++) {
        var option = document.createElement("option"),
          txt = document.createTextNode(array[i]);
        option.appendChild(txt);
        an1.insertBefore(option,an1.lastChild);
      }
    
      for (i = 0; i < array.length; i++) {
        var option = document.createElement("option"),
          txt = document.createTextNode(array[i]);
        option.appendChild(txt);
        an2.insertBefore(option, an2.lastChild);
      }


    var calcularAnimal = function (padre1, padre2) {
      var padre1 = document.getElementById('padre1').value;
      var padre2 = document.getElementById('padre2').value;


      if (padre1 == "nominal" && padre2 == "nominal") {
        var contenedorTxt = document.createElement("li");
        var resultadoTxt = document.createTextNode('100% NOMINAL');
        contenedorTxt.appendChild(resultadoTxt);
        document.getElementById("resultadoTxt").replaceWith(contenedorTxt);
        document.getElementById("resultadoImg").setAttribute("src", "/img/blog/iguana.jpg");
      }
      if (padre1 == "nominal" && padre2 == "leatherback"
          || padre1 == "leatherback" && padre2 == "nominal") {
        var contenedorTxt = document.createElement("li");
        var resultadoTxt = document.createTextNode(['50% NOMINAL','50%leatherback']);
        contenedorTxt.appendChild(resultadoTxt);
        document.getElementById("resultadoTxt").replaceWith(contenedorTxt);
        document.getElementById("resultadoImg").setAttribute("src", "/img/blog/iguana.jpg");
      }
      else{
        ;
      }
      
      return calcularAnimal (padre1, padre2);
    };

    /* var animal = function(an1, an2) {
      var an1 = (document.getElementById("an1").value);
      var an2 = (document.getElementById("an2").value);

      var resultado = function(an1, an2) {
        function resultadoInfo(infoTxt, infoImg) {
          var resultadoTxt = document.getElementById('resultadoTxt');
          var resultadoImg = document.getElementById('resultadoImg');
          var infoTxt
          var infoImg

          createTextNode(infoTxt);
          resultadoTxt
          resultadoImg.setAttribute(infoImg);


        }
        if (an1 == "nominal" && an2 == "nominal") {
          return "nominal";
        }
        if(an1 == "leatherback" && an2 == "leatherback") {

          var porcentajes = document.createElement("h3");
          var porcentajeTxt = document.createTextNode("50%-leatherback & 50%-silkty");
          porcentajes.appendChild(porcentajeTxt);
          document.getElementById("result").replaceWith(porcentajes);
          document.getElementById("imgMorph").setAttribute("src", "/img/blog/iguana.jpg")
          
        }
        if (an1 == "leatherback" && an2 == "nominal"
            || an1 =="nominal" && an2 =="leatherback") {

          return ["50%leatherback ", " 50%nominal"];
        }
        else {
          return "porfavor elije una fase";
        }

      }

      return resultado(an1, an2);

    } */


