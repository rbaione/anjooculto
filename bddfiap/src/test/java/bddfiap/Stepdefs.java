package bddfiap;

import cucumber.api.java.pt.Dado;
import cucumber.api.java.pt.Entao;
import cucumber.api.java.pt.Quando;

import static org.junit.Assert.*;


class Autenticacao {
    static String logarUsuario(String login, String pass) {
        if ( login.equals("usuario") & pass.equals("senha") ) {
            // Usuario autenticado
            return "Usuario autenticado";
        } else {
            // Visitante
            return "Visitante";
        }
    }
}


public class Stepdefs { 

    @Dado("Que cliente {string} VISITA a pagina do site com a senha {string} como {string}")
    public void que_cliente_VISITA_a_pagina_do_site(String usuario, String senha, String tipoVisita) {
        // Visitante no site
        String tipoVisitante = Autenticacao.logarUsuario(usuario, senha);
        assertEquals(tipoVisitante, tipoVisita);
    }

    
    @Quando("O cliente pesquisa por um produto {string}")
    public void o_cliente_pesquisa_por_um_produto(String string) {
        Produtos produtos = new Produtos();
        // "Produto disponivel"
        String disponibilidade = produtos.pesquisar(string);
        if (disponibilidade.equals("Dispositivo disponivel")) {
            assertEquals(disponibilidade,"Dispositivo disponivel");
        }
        // "Produto nao disponivel"
        if (disponibilidade.equals("Dispositivo nao disponivel")) {
            assertEquals(disponibilidade, "Dispositivo nao disponivel");
        }
    }

    
    @Entao("Deve ser consultado o estoque do Dispositivo {string}")
    public void deve_ser_consultado_o_estoque_do_produto(String string) {
        Produtos produtos = new Produtos();
        // Se o Produto for nao disponivel, cenario nao deve continuar
        // "Dispositivo disponivel"
        Integer quantidade = produtos.estoque(string);
        assertNotNull(quantidade);
    }

    
    @Entao("Retornar a quantidade de Dispositivo {string} Disponiveis : {string}")
    public void retornar_a_quantidade_de_Produtos_Disponiveis_em_estoque_de_cada_loja(String prod, String resultado) {
        Lojas lojas = new Lojas();
        String disponibilidade = lojas.pesquisar(prod);
        assertEquals(disponibilidade, resultado);
    }

}
