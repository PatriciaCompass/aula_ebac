/// <reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {
    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve selecionar um produto da lista', () => {
       produtosPage.buscarProdutoLista('Ingrid Running Jacket')
        cy.get('#tab-title-description > a').should('contain' , 'Descrição')
    });

    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Ingrid Running Jacket'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('contain', produto)
    });

    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto('Ingrid Running Jacket')
    });

    it('Deve adicionar o produto ao carrinho', () => {
        produtosPage.buscarProduto('Ingrid Running Jacket')
        produtosPage.addProdutoCarrinho()

        cy.get('.woocommerce-message').should('exist')
    });
});