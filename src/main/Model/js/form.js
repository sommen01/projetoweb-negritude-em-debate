/**
 * Validar preenchimento
 */
$(function() {
    //esconder os campos dos responsáveis, quando menor de idades
    $('#div-nome-responsavel').hide();
    $('#div-cpf-responsavel').hide();
    //próximo
    $('#proximo').on('click', function(){
        $('#autorizacao-tab').trigger('click');
    });

    //validade para menor de idade (DATA DO SERVIDOR)
    $('#dataNascimento').on('blur', function(){
        let d = new Date();
        let nA = $('#dataNascimento').val().split("-");
        let n = new Date(nA[1] + '-' + nA[2] + '-' + nA[0]);
        let ano = d.getFullYear() - n.getFullYear();
        let m = d.getMonth() - n.getMonth();
        
        if( m < 0 || (m == 0 && d.getDate() < n.getDate())){
            ano--;
        }

        //mostrar campos caso seja menor de idade
        if(ano < 18){
            $('#div-nome-responsavel').show();
            $('#div-cpf-responsavel').show();
        }
        else{
            $('#div-nome-responsavel').hide();
            $('#div-nome-responsavel').hide();
        }
    });
});

function validarFormulario(){
    //inserir validacoes aqui e SE estiver tudo ok, chama a funcao de upload.
    //Isso para garantir que o upload só acontecerá após o preenchimento de todo o formulário

    let validacaoOK = true;
    if(validacaoOK){
        uploadFile();
        return true;
    }
    return false;
}

/**
 * Função assíncrona com AJAX para realizar upload do arquivo (foto)
 */
function uploadFoto(){
    $('#nomeFoto').clone().appendTo("#fileForm");

    let myForm = document.getElementById('fileForm');
    let formDataFile = new FormData(myForm);

    $.ajax({
        url: 'uploadFoto', //URL do lado server que vai receber o arquivo
        data: formDataFile,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            //retorno ao us
        }
    })
}