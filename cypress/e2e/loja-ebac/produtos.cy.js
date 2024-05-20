/// <reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {
    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Abominable Hoodie')
        cy.get('#tab-title-description > a').should('contain', 'Descrição')
    });

    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Abominable Hoodie'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('contain', produto)
    });

    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto('Abominable Hoodie')
    });

    it('Deve adicionar o produto ao carrinho', () => {
        produtosPage.buscarProduto('Ingrid Running Jacket')
        produtosPage.addProdutoCarrinho('M', 'Orange')

        cy.get('.woocommerce-message').should('exist')
    });

    it.only('Deve adicionar o produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto(dados[1].nomeProduto)
            produtosPage.addProdutoCarrinho(
                dados[1].tamanho,
                dados[1].cor,
                dados[1].quantidade)

            cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)
        })
    });
});