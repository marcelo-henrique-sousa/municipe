//Put all initializers and common JS functions here
//https://viacep.com.br/ws/64049610/json
$(document).ready(function () {
  $('.zipcode').on('blur', function() {
    var cep = this.value;
    var default_states = $('.states_select').children();

    $.ajax({
      type: 'GET',
      url: "https://viacep.com.br/ws/"+cep+"/json", //vviacep
      dataType: 'json',
      success: function (data, status, xhr) {
        if(xhr.status == 200 ){
          console.table(data);
          $('.city_select').children().remove().end()
              .append('<option value="'+data.localidade+'">'+data.localidade+'</option>');
          $('.address_street')[0].value = data.logradouro;
          $('.district')[0].value = data.bairro;
          $('.ibge_code')[0].value = data.ibge;
          
          default_states.each(function (index, item) {
            if( item.value == data.uf ) {
              $('.states_select').children().remove().end()
                .append(item);
            }else{
              $('.states_select').children().remove().end()
                .append('<option value="'+data.uf+'">'+data.uf+'</option>');
            }
          });
          
        }else {
          $('.address_street')[0].value = '';
          $('.district')[0].value = '';
          $('.city_select').children().remove().end()
              .append('<option value="">Selecione um estado</option>');
          $('.states_select').children().remove().end()
              .append('<option value="">Selecione um estado</option>');
        }
      }
    })

  });

  //https://servicodados.ibge.gov.br/api/v1/localidades/estados/PI/municipios
  $('.states_select').on('load click', function(){
    debugger;
    var state = this.value;
    $.ajax({
      type: 'GET',
      url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+state+"/municipios",
      dataType: 'json',
      success: function (data, status, xhr) {
        if(xhr.status == 200 ){
          $('.city_select').children().remove().end();
          data.forEach(function(item){
            $('.city_select')
                 .append('<option value="'+item.nome+'">'+item.nome+'</option>');
          });
        }else {
          $('.address_street')[0].value = '';
          $('.district')[0].value = '';
          $('.city_select').children().remove().end()
              .append('<option value="">Selecione um estado</option>');
          $('.states_select').children().remove().end()
              .append('<option value="">Selecione um estado</option>');
        }
      }
    })
  });
  
});


