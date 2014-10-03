/** Jogo da forca v1.2
 *
 * @autor: Mick Hill
 *
 * 
 */

var plvSlc;
var dicaPlv;
var plvArr      = new Array();
var plvTmp      = new Array();
var ltrsDigts   = "";
var sepLtr      = "_";
var maxLtr      = 1;
var tent        = 0;
var erros       = 0;
var maxErro     = 6;
var plvRand     = new Array(
        "Randell Rodrigues",
        "Adriano Silva",
        "Harry Potter",
        "Metallica",
        "Ceara",
        "Rafael Regis",
        "Vinicius"
);
var dicaRand    = new Array(
        "Professor de informática do E-jovem.",
        "Gosto do bob-esponja e trabalho na SEDUC,\nquem sou eu?",
        "Personagem de filme.",
        "Banda de Rock internacional.",
        "Estado brasileiro.",
        "Amigo Gay de Mick Hill.\nSem preconceito... kkk",
        "Aluno de reforço de Mick Hill."
);




function modJogo(apcao)
{
        switch(apcao)
        {
                case 1:
                        var n   = aleatorioEntre(0, (plvRand.length-1));
                        
                        plvSlc  = plvRand[n].toUpperCase();
                        dicaPlv = dicaRand[n];
                        
                        iniciar();
                        dica();
                break;

                case 2:
                        plvSlc  = plvValida("Digite uma palavra(s) para começar!").toUpperCase();
                        dicaPlv = plvValida('Digite uma "Dica" para essa palavra!');

                        iniciar();
                break;

                default:
                        alert("Erro! opção invalida.");
                        location.reload();
                break;
        }
}

function iniciar()
{
        trataPlv(plvSlc);
        replaceConteudo();
}

function trataPlv(plvSlc)
{
        var espaco = "&nbsp;";

        for (var i = 0; i < plvSlc.length; i++)
        {
                if (plvSlc.charAt(i) == " ")
                {
                        plvTmp[i] = espaco;
                        plvArr[i] = espaco;
                }

                else
                {
                        plvTmp[i] = sepLtr;
                        plvArr[i] = plvSlc.charAt(i).toUpperCase();
                }
        }
}

function virificaPlv()
{
        tent++;
        var plvDigit = plvValida("Digite seu palpite:").toUpperCase();
        
        if(plvDigit == plvSlc)
        {
                alert("Parabéns!\nVocê adivinhou em apenas "+ tent +" tentativa(s).");
                location.reload();
        }
        else
        {
                alert("Palavra(s) errada(s) animalzinho!");
                erros++;
                replaceConteudo();
        }
}

function virificaLtr()
{
        var trocaLtr    = false;
        var ltrRepet    = false;
        var ltr         = document.getElementById("letra").value.toUpperCase();
            
        if (ltr.length == 0)
                alert("Digite algo...");
        
        else if (ltr.length > 1)
        {
                alert("Só é permitido uma letra por vez.");
                document.getElementById("letra").value = "";
        }
            
        else if (ltr == " ")
        {
                alert("Não é permitido espaço...");
                document.getElementById("letra").value = "";
        }
        
        else
        {
                for (var i = 0; i < plvSlc.length; i++)
                {
                        if(ltrsDigts.search(ltr) !== -1)
                                ltrRepet = true;

                        else if((plvArr[i] == ltr))
                        {
                                plvTmp[i] = plvArr[i];
                                trocaLtr  = true;
                        }
                }

                ltrsDigts += ltr;
                
                if(trocaLtr == true)
                {
                        tent++;
                        replaceConteudo();
                        comparaPlv();
                }
                
                else if(ltrRepet == true)
                {
                        alert("Você já digitou essa letra");
                        document.getElementById("letra").value = "";
                }

                else
                {
                        alert("Letra errada!");
                        erros++;
                        tent++;

                        if (erros > maxErro)
                        {
                                alert("Fim de jogo!\nVocê morreu animalzinho...");
                                location.reload();
                        }
                        else
                                replaceConteudo();
                }
        }
}

function comparaPlv()
{
        var fimJogo = true;

        for (var i = 0; i < plvSlc.length; i++)
        {
                verifica = plvTmp[i] == plvArr[i];

                if (verifica == false)
                        fimJogo = false;
        }

        if(fimJogo == true)
        {
                alert("Parabéns!\nEm apenas "+ tent +" tentativa(s) você adivinhou:\n\""+ plvSlc +"\".");
                location.reload();
        }
}

function plvValida(msg)
{
        var rs = false;

        do
        {
                rs = prompt(msg);

                if (rs.length == 0)
                {
                        alert("Digite algo...");
                        rs = false;
                }

                else if (rs == " ")
                {
                        alert("Não é permitido somente espaço.");
                        rs = false;
                }

                else
                        return rs;
        }
        while(rs == false)
}

function dica()
{
        alert("Dica:\n" + dicaPlv);
        document.getElementById("letra").focus();
}

function replaceConteudo()
{
        document.getElementById("menu-hide").
        innerHTML = '\
            <button type="button" title="Opções / Status" data-target=".navbar-bootsnipp-collapse" data-toggle="collapse" class="navbar-toggle">\n\
                <span class="icon-bar"></span>\n\
                <span class="icon-bar"></span>\n\
                <span class="icon-bar"></span>\n\
            </button>\n\
        ';
        
        document.getElementById("menu-opcoes").
        innerHTML = '\
            <li style="padding: 7px">\n\
                ' + tent + ' Tentativa(s),&nbsp;&nbsp;\n\
                ' + erros + ' Erro(s).&nbsp;&nbsp;\n\
            </li>\n\
            <li>\n\
                <button title="Já sei oque é!" onclick="virificaPlv();return false;" class="btn btn-default">\n\
                    <span class="glyphicon glyphicon-pencil"></span>\n\
                </button>\n\
                <button title="Dica" onclick="dica();return false;" class="btn btn-default">\n\
                    <span class="glyphicon glyphicon-question-sign"></span>\n\
                </button>\n\
                <button title="Reiniciar jogo" onclick="location.reload();" class="btn btn-default btn-filter">\n\
                    <span class="glyphicon glyphicon-refresh"></span>\n\
                </button>\n\
            </li>\n\
        ';

        document.getElementById("conteudo").
        innerHTML = '\
            <div class="bs-example">\n\
                <div>\n\
                    <img alt="100%x200" data-src="holder.js/100%x200" style="width: 100%; display: block;" src="img/boneco/'+ erros +'.png">\n\
                    <div class="caption">\n\
                        <h3 class="text-center">'+ plvTmp.join(" ") +'</h3>\n\
                        <form class="form-horizontal">\n\
                            <div class="input-group busca">\n\
                                <input type="text" maxlength="'+ maxLtr +'"  id="letra" placeholder="Digite uma letra!" class="form-control">\n\
                                <div class="input-group-btn">\n\
                                    <button type="submit" onclick="virificaLtr();return false;" class="btn btn-primary">\n\
                                        <i class="glyphicon glyphicon-search"></i>\n\
                                    </button>\n\
                                </div>\n\
                            </div>\n\
                        </form>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
        ';

        document.getElementById("letra").focus();
}

function aleatorioEntre(inicio, fim)
{
        var rs;
        var max = 10;

        if( (fim > 9) && (fim < 101) )
                max = 100;

        do
        {
                rs = Math.floor((Math.random() * max)); // Número de 0 a 9 *10.
        }
        while((rs < inicio) || (rs > fim))

        return rs;
}