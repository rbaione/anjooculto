# language: pt
@venda_para_loja
Funcionalidade: Venda de produtos para Loja
  Descrição da funcionalidade, preferencialmente atrelando a feature ao valor gerado para a organização

  @verificar_disponibilidade_produto
  Cenario: Cliente quer verificar disponibilidade de um produto
    Dado Que cliente VISITA a pagina do site
    Quando O cliente pesquisa por um produto
    Entao Deve ser consultado o estoque do produto
    E Retornar a quantidade de Produtos Disponiveis em estoque de cada loja

  @seleciona_produto_comprar
  Cenario: Cliente seleciona um produto e adiciona ao Carrinho de compras
    Dado Que cliente FEZ LOGIN na pagina do site
    Quando O cliente adiciona um produto ao carrinho de compras
    Entao O produto fica reservado por 15 minutos

  @finaliza_compra_produto
  Cenario: Cliente finaliza a compra do seu Carrinho de compras
    Dado Que cliente FEZ LOGIN na pagina do site
    E Cliente tem itens no seu Carrinho de Compras
    Quando O cliente finaliza a compra
    Entao Emite as opcoes de pagamento

  @finaliza_pagamento
  Cenario: Cliente efetua o pagamento
    Dado Que cliente finalizou a compra do seu Carrinho de Compras
    Quando Escolhe a opcao de pagamento
    E clica em finalizar Pagamento
    Entao O pagamento tem que ser concluido com sucesso
